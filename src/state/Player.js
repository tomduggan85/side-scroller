import GameObject from './GameObject'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action } from 'mobx'

const WALK_SPEED = 3
const JUMP_VELOCITY = 15

class Player extends GameObject {

  type = GameObjectTypes.Player
  keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  animationTracks = {
    standing: {
      startX: 15,
      startY: 0,
      frameWidth: 30,
      frameCount: 1,
      duration: 1000,
    },
    walking: {
      startX: 125,
      startY: 0,
      frameWidth: 50,
      frameCount: 3,
      duration: 600,
    }
  }

  constructor( props ) {
    super( props )
    this.setAnimation( 'standing' )
  }

  @action
  onRight() {
    this.setAnimation( 'walking' )
    this.keyState.right = true
    this.velocity.x = WALK_SPEED
  }

  @action
  offRight() {
    this.keyState.right = false
    this.velocity.x = this.keyState.left ? -WALK_SPEED : 0
    this.maybeShowStanding()
  }

  @action
  onLeft() {
    this.setAnimation( 'walking' )
    this.keyState.left = true
    this.velocity.x = -WALK_SPEED
  }

  @action
  offLeft() {
    this.keyState.left = false
    this.velocity.x = 0
    this.velocity.x = this.keyState.right ? WALK_SPEED : 0
    this.maybeShowStanding()
  }

  @action
  onUp() {
    this.setAnimation( 'walking' )
    this.keyState.up = true
    this.velocity.z = WALK_SPEED
  }

  @action
  offUp() {
    this.keyState.up = false
    this.velocity.z = this.keyState.down ? -WALK_SPEED : 0
    this.maybeShowStanding()
  }

  @action
  onDown() {
    this.setAnimation( 'walking' )
    this.keyState.down = true
    this.velocity.z = -WALK_SPEED
  }

  @action
  offDown() {
    this.setAnimation( 'walking' )
    this.keyState.down = false
    this.velocity.z = this.keyState.up ? WALK_SPEED : 0
    this.maybeShowStanding()
  }

  @action
  maybeShowStanding() {
    if ( !Object.values(this.keyState).some( k => k )) {
      this.setAnimation( 'standing' )
    }
  }

  @action
  onJump() {
    if ( this.isOnGround()) {
      this.velocity.y = JUMP_VELOCITY
    }
  }
}

export default Player