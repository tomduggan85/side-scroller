import { observable, action } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import directions from '../shared/enum/directions'
import uuid from 'uuid'

const GRAVITY = 0.8

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
  spritePosition = {
    x: 0,
    y: 0
  }

  @observable
  spriteUrl = ''

  @observable
  spriteScale = 0

  @observable
  spriteWidth = 0 

  @observable
  spriteHeight = 0  

  animationState = {
    trackName: null,
    startTime: 0,
  };

  @observable
  direction = directions.right

  constructor( props = {} ) {
    if ( props.position ) {
      this.position = { ...props.position }
    }
  }

  @action
  step() {
    this.stepMovement()
    this.stepAnimation()
  }

  @action
  stepMovement() {
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
    if ( this.position.y <= 0 && this.velocity.y < 0 ) {
      this.position.y = 0
      this.velocity.y = 0
      this.onReturnToGround()
    }
  }

  @action
  stepAnimation() {
    const { trackName, startTime } = this.animationState
    if ( !trackName ) {
      return
    }

    const {
      duration,
      frames,
    } = this.animationTracks[ trackName ]
    
    const now = performance.now()
    const currentFrame = Math.floor((( now - startTime ) / duration % 1 ) * frames.length)
      
    this.spritePosition.x = frames[ currentFrame ].x
    this.spritePosition.y = frames[ currentFrame ].y
  }

  isOnGround() {
    return this.position.y === 0
  }

  @action
  onReturnToGround() {
    
  }

  @action
  setAnimation( trackName ) {
    if ( this.animationState.trackName === trackName ) {
      return
    }

    this.animationState = {
      trackName,
      startTime: performance.now(),
    }
  }
}

export default GameObject