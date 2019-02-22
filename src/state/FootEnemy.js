import GameCharacter from './GameCharacter'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

const WALK_SPEED = 2.5

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
      duration: 700,
    },
    take_damage: {
      frames: [{ x: 52, y: 560 }],
      duration: 1000
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

  constructor( props ) {
    super( props )
    this.setAnimation( 'walking' )
    this.targetedPlayer = this.gameState.players[0]
  }

  @action
  stepMovement() {

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
      this.attack( 'attack', 250 )
    }

    super.stepMovement()
  }
}

export default FootEnemy