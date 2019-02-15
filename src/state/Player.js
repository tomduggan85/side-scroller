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

  step() {
    super.step()
  }

  @action
  onRight() {
    this.keyState.right = true
    this.velocity.x = WALK_SPEED
  }

  @action
  offRight() {
    this.keyState.right = false
    this.velocity.x = this.keyState.left ? -WALK_SPEED : 0
  }

  @action
  onLeft() {
    this.keyState.left = true
    this.velocity.x = -WALK_SPEED
  }

  @action
  offLeft() {
    this.keyState.left = false
    this.velocity.x = 0
    this.velocity.x = this.keyState.right ? WALK_SPEED : 0
  }

  @action
  onUp() {
    this.keyState.up = true
    this.velocity.z = WALK_SPEED
  }

  @action
  offUp() {
    this.keyState.up = false
    this.velocity.z = this.keyState.down ? -WALK_SPEED : 0
  }

  @action
  onDown() {
    this.keyState.down = true
    this.velocity.z = -WALK_SPEED
  }

  @action
  offDown() {
    this.keyState.down = false
    this.velocity.z = this.keyState.up ? WALK_SPEED : 0
  }

  @action
  onJump() {
    if ( this.isOnGround()) {
      this.velocity.y = JUMP_VELOCITY
    }
  }
}

export default Player