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
  freefall = null

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

  @observable
  isForeground = false

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
    if ( this.inFreefall() ) {
      this.stepFreefall()
    }
    else if ( !this.isMovementFrozen() && !this.isDead ) {
      this.stepMovement()
    }
    this.stepAnimation()
  }

  @action
  integrateVelocity( velocity ) {
    //Add gravity to y-velocity, if in the air
    if ( !this.onGround ) {
      velocity.y -= GRAVITY
    }

    this.position.x += velocity.x
    this.position.y += velocity.y
    this.position.z += velocity.z

    //Prevent falling through the ground
    if ( this.position.y <= 0 && velocity.y < 0 ) {
      this.position.y = 0
      velocity.y = 0
      this.onReturnToGround()
    }
  }

  @action
  stepFreefall() {
    this.integrateVelocity( this.freefall.velocity )
    if ( this.freefall && this.freefall.damage ) {
      const box = {
        x: { min: this.position.x, max: this.position.x + this.collisionWidth },
        y: { min: this.position.y + this.collisionBottom, max: this.position.y + this.collisionHeight },
        z: { min: this.position.z - this.collisionDepth, max: this.position.z + this.collisionDepth }
      }
      
      this.gameState.getGameObjectsInsideBox(box).forEach( gameObject => {
        if ( gameObject !== this && gameObject.canTakeDamage && !gameObject.isDead ) {
          gameObject.takeDamage( this.freefall.damage, this.position.x < gameObject.position.x ? directions.left : directions.right )
        }
      })
    }
  }

  @action
  stepMovement() {
    this.integrateVelocity( this.velocity )
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
        currentFrame = Math.floor(( now - startTime ) / introDuration  * loopStartFrame )
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
    this.freefall = null
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

  setFreefall( velocity, damage = 0 ) {
    // Zero out any current y-velocity, since the freefall will take the object back to the ground
    this.velocity.y = 0

    this.freefall = {
      velocity,
      damage
    }
  }

  inFreefall() {
    return !!this.freefall
  }

  stopRenderingForever() {
    this.spriteUrl = null
  }
}

export default GameObject