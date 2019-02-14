import GameObject from './GameObject'
import GameObjectTypes from '../shared/GameObjectTypes'
import { action } from 'mobx'

const WALK_SPEED = 3
const JUMP_VELOCITY = 15

class Player extends GameObject {

  type = GameObjectTypes.Player

  step() {
    super.step()
  }

  @action
  onRight() {
    this.velocity.x = WALK_SPEED
  }

  @action
  offRight() {
    this.velocity.x = 0
  }

  @action
  onLeft() {
    this.velocity.x = -WALK_SPEED
  }

  @action
  offLeft() {
    this.velocity.x = 0
  }

  @action
  onUp() {
    this.velocity.z = WALK_SPEED
  }

  @action
  offUp() {
    this.velocity.z = 0
  }

  @action
  onDown() {
    this.velocity.z = -WALK_SPEED
  }

  @action
  offDown() {
    this.velocity.z = 0
  }

  @action
  onJump() {
    if ( this.isOnGround()) {
      this.velocity.y = JUMP_VELOCITY
    }
  }
}

export default Player