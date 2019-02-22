import { observable, action, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import directions from '../shared/enum/directions'
import uuid from 'uuid'

const GRAVITY = 0.6

class GameObject {

  type = GameObjectTypes.GameObject
  id = uuid.v4()
  movementFreezes = {}

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
  airborneOverrideVelocity = null

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

  @observable
  screenWidth = 0

  @observable
  screenHeight = 0

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
    this.level = props.level
    this.camera = props.camera
    this.gameState = props.gameState
  }

  @action
  step() {
    if ( this.airborneOverrideVelocity ) {
      this.stepAirborneOverrideVelocity()
    }
    else if ( !this.isMovementFrozen() ) {
      this.stepMovement()
    }
    this.stepAnimation()
  }

  @action
  stepAirborneOverrideVelocity() {
    //Add gravity to y-velocity, if in the air
    if ( !this.onGround ) {
      this.airborneOverrideVelocity.y -= GRAVITY
    }

    //Integrate velocity
    this.position.x += this.airborneOverrideVelocity.x
    this.position.y += this.airborneOverrideVelocity.y
    this.position.z += this.airborneOverrideVelocity.z

    //Prevent falling through the ground
    if ( this.position.y <= 0 ) {
      this.position.y = 0
      this.onReturnToGround()
    }
  }

  @action
  stepMovement() {
    //Add gravity to y-velocity, if in the air
    if ( !this.onGround ) {
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
      loopStartFrame,
      introDuration,
    } = this.animationTracks[ trackName ]
    
    const now = performance.now()
    let currentFrame
    if ( loopStartFrame ) {
      if ( now - startTime <= introDuration ) {
        currentFrame = Math.floor(( now - startTime ) / introDuration ) * loopStartFrame
      }
      else {
        currentFrame = loopStartFrame + Math.floor((( now - startTime - introDuration ) / duration % 1 ) * ( frames.length - loopStartFrame ))
      }
    }
    else {
      currentFrame = Math.floor((( now - startTime ) / duration % 1 ) * frames.length)  
    }
    
      
    this.spritePosition.x = frames[ currentFrame ].x
    this.spritePosition.y = frames[ currentFrame ].y
    this.spriteWidth = frames[ currentFrame ].width || this.screenWidth
    this.spriteHeight = frames[ currentFrame ].height || this.screenHeight
  }

  @computed
  get onGround() {
    return this.position.y === 0
  }

  @action
  onReturnToGround() {
    this.airborneOverrideVelocity = null
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

  freezeMovement( duration, reason ) {
    this.movementFreezes[ reason ] = performance.now() + duration
  }

  clearMovementFreezes() {
    this.movementFreezes = {}
  }

  isMovementFrozen() {
    const now = performance.now()
    return Object.values( this.movementFreezes ).some( frozenUntilTime => frozenUntilTime >= now )
  }

  setAirborneOverrideVelocity( velocity ) {
    this.airborneOverrideVelocity = velocity
  }
}

export default GameObject