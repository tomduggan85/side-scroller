import GameObject from './GameObject'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

const WALK_SPEED = 2.5

const X_RANGE = 5
const Z_RANGE = 10
const TARGET_OFFSET = -10

class FootEnemy extends GameObject {

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
      duration: 900,
    },
  }

  @observable 
  spriteScale = '3200px'

  @observable
  spriteHeight = 132

  @observable
  spriteUrl = '/assets/images/enemy.png'

  @observable
  collisionWidth = 64

  @observable
  screenWidth = 68

  constructor( props ) {
    super( props )
    this.setAnimation( 'walking' )
    this.targetedPlayer = props.gameState.players[0]
  }

  @action
  step() {

    if ( !this.isAttacking() ) {
      this.setAnimation( 'walking' )
      let targetX;
      const targetZ = this.targetedPlayer.position.z
      //set direction from player
      if ( this.position.x < this.targetedPlayer.position.x ) {
        this.direction = directions.right
        targetX = this.targetedPlayer.position.x - this.collisionWidth +  - TARGET_OFFSET
      }
      else if ( this.position.x > this.targetedPlayer.position.x ) {
        this.direction = directions.left
        targetX = this.targetedPlayer.position.x + this.targetedPlayer.collisionWidth + TARGET_OFFSET
      }

      if ( this.position.x < targetX - X_RANGE ) {
        this.velocity.x = WALK_SPEED
      }
      else if ( this.position.x > targetX + X_RANGE ) {
        this.velocity.x = -WALK_SPEED
      }
      else {
        this.velocity.x = 0
      }

      if ( this.position.z < targetZ - Z_RANGE ) {
        this.velocity.z = WALK_SPEED
      }
      else if ( this.position.z > targetZ + Z_RANGE ) {
        this.velocity.z = -WALK_SPEED
      }
      else {
        this.velocity.z = 0
      }

      if ( this.velocity.x === 0 && this.velocity.z === 0 ) {
        this.attack()
      }
    }

    super.step()
  }

  isAttacking() {
    return this.attackingUntil && this.attackingUntil > performance.now()
  }

  @action
  attack() {
    this.setAnimation( 'attack' )
    this.attackingUntil = performance.now() + this.animationTracks.attack.duration
  }
}

export default FootEnemy