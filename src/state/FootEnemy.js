import GameCharacter from './GameCharacter'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'
import sortBy from 'lodash/sortBy'

const WALK_SPEED = 2.4

const X_RANGE = 10
const Z_RANGE = 10
const TARGET_OFFSET = -10

class FootEnemy extends GameCharacter {

  type = GameObjectTypes.Enemy

  animationTracks = {
    walking: {
      frames: [
        { x: 42, y: 20 },
        { x: 114, y: 20 },
        { x: 184, y: 20 },
        { x: 114, y: 20 },
      ],
      duration: 700,
    },
    attack: {
      frames: [
        { x: 42, y: 405 },
        { x: 120, y: 402, width: 120 },
        { x: 42, y: 20 },
      ],
      duration: 800,
    },
    take_damage: {
      frames: [{ x: 52, y: 560 }],
      duration: 1000
    },
    dead: {
      frames: [{ x: 140, y: 550, width: 120 }],
      duration: 1000
    },
    jump_kick: {
      frames: [
        { x: 35, y: 200 },
        { x: 170, y: 150, width: 150 },
      ],
      loopStartFrame: 1,
      introDuration: 100,
      duration: 400,
    },
    explode: {
      frames: [
        { x: 400, y: 460 },
        { x: 490, y: 450, width: 100 },
        { x: 0, y: 0, width: 1 },
      ], 
      loopStartFrame: 2,
      introDuration: 200,
      duration: 1000,
    }
  }

  @observable 
  spriteScale = '3200px'

  @observable
  spriteUrl = '/assets/images/enemy.png'

  @observable
  collisionWidth = 64

  @observable
  screenWidth = 68

  @observable
  screenHeight = 132

  @observable
  collisionHeight = 90

  @observable
  collisionBottom = 20

  @observable
  collisionDepth = 30

  longRangeAttackChance = 0.2

  longRangeAttackTimeout = 1000

  constructor( props ) {
    super( props )
    this.lastLongRangeAttackConsideredAt = 0
    this.setAnimation( 'walking' )
  }

  distToMe = ( player ) => {
    const { x, z } = this.position
    return Math.pow( player.position.x - x, 2) + Math.pow(player.position.z - z, 2 )
  }

  updateTargetedPlayer() {
    const playersByDistanceSquared = sortBy( this.gameState.players.filter( p => !p.isDead ), this.distToMe )
    if ( !playersByDistanceSquared.length ) {
      return
    }

    if ( !this.targetedPlayer || this.targetedPlayer.isDead ) {
      this.targetedPlayer = playersByDistanceSquared[0]
    }
    else if ( this.distToMe(this.targetedPlayer ) / this.distToMe( playersByDistanceSquared[0] ) >= 2) { //If a new target is twice as close as the existing target
      this.targetedPlayer = playersByDistanceSquared[0]
    }
  }

  getTargetPosition() {
    let x;
    if ( this.position.x < this.targetedPlayer.position.x ) {
      this.direction = directions.right
      x = this.targetedPlayer.position.x - this.collisionWidth +  - TARGET_OFFSET
    }
    else if ( this.position.x > this.targetedPlayer.position.x ) {
      this.direction = directions.left
      x = this.targetedPlayer.position.x + this.targetedPlayer.collisionWidth + TARGET_OFFSET
    }

    return {
      x,
      z: this.targetedPlayer.position.z
    }
  }

  @action
  moveTowardsTargetedPlayer() {
    this.setAnimation( 'walking' )
    const target = this.getTargetPosition()

    if ( this.position.x < target.x - X_RANGE ) {
      this.velocity.x = WALK_SPEED
    }
    else if ( this.position.x > target.x + X_RANGE ) {
      this.velocity.x = -WALK_SPEED
    }
    else {
      this.velocity.x = 0
    }

    if ( this.position.z < target.z - Z_RANGE ) {
      this.velocity.z = WALK_SPEED
    }
    else if ( this.position.z > target.z + Z_RANGE ) {
      this.velocity.z = -WALK_SPEED
    }
    else {
      this.velocity.z = 0
    }
  }

  shouldDoLongRangeAttack() {
    const now = performance.now()
    if ( this.lastLongRangeAttackConsideredAt + this.longRangeAttackTimeout < now) {
      this.lastLongRangeAttackConsideredAt = now
      return this.velocity.z === 0 && Math.random() <= this.longRangeAttackChance
    }
  }

  shouldDoShortRangeAttack() {
    return this.velocity.x === 0 && this.velocity.z === 0
  }

  @action
  doShortRangeAttack() {
    this.attack( 'attack', 350 )
  }

  @action
doLongRangeAttack() {
    this.setAnimation('jump_kick')
    this.setFreefall({
      x: this.direction === directions.right ? 6 : -6,
      y: 10,
      z: 0
    }, 1)
  }

  @action
  stepMovement( deltaTime ) {
    this.updateTargetedPlayer()
    this.moveTowardsTargetedPlayer()

    // Short-range attack takes precedence over long-range attack
    if ( this.shouldDoShortRangeAttack()) {
      this.doShortRangeAttack()
    }
    else if ( this.shouldDoLongRangeAttack()) {
      this.doLongRangeAttack()
    }

    super.stepMovement( deltaTime )
  }

  @action
  onReturnToGround() {
    if ( this.isDead ) {
      setTimeout( this.explode, 500 )
    }
    super.onReturnToGround()
  }

  @action
  explode = () => {
    this.setAnimation( 'explode' )
  }
}

export default FootEnemy