import { observable, action } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import directions from '../shared/enum/directions'
import uuid from 'uuid'

const GRAVITY = 1

class GameObject {

  type = GameObjectTypes.GameObject
  id = uuid.v4()

  @observable
  position = {
    x: 0,
    y: 0,
    z: 0,
  }

  @observable
  velocity = {
    x: 0,
    y: 0,
    z: 0,
  }

  @observable
  direction = directions.right

  constructor( props ) {
    if ( props.position ) {
      this.position = { ...props.position }
    }
  }

  @action
  step() {

    // Set direction based on x-velocity.  If velocity is 0, leave direction alone (preserving the previous direction)
    if ( this.velocity.x < 0 ) {
      this.direction = directions.left
    }
    else if ( this.velocity.x > 0 ) {
      this.direction = directions.right
    }

    //Add gravity to y-velocity, if in the air
    if ( !this.isOnGround()) {
      this.velocity.y -= GRAVITY
    }

    //Integrate velocity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.position.z += this.velocity.z

    //Prevent falling through the ground
    if ( this.position.y < 0 ) {
      this.position.y = 0
    }
  }

  isOnGround() {
    return this.position.y === 0
  }
}

export default GameObject