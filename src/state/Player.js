import GameObject from './GameObject'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

const WALK_SPEED = 3
const JUMP_VELOCITY = 20

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
      frames: [{ x: 15, y: 0 }],
      duration: 1000,
    },
    walking: {
      frames: [
        { x: 216, y: 0 }, 
        { x: 280, y: 0 },
        { x: 216, y: 0 },
        { x: 154, y: 0 }
      ],
      duration: 600,
    },
    in_air: {
      frames: [
        { x: 358, y: 0 }, 
        { x: 432, y: 0 }, 
        { x: 500, y: 0 },
        { x: 580, y: 0 },
        { x: 655, y: 0 }
      ],
      loopStartFrame: 1,
      introDuration: 100,
      duration: 400,
    }
  }

  @observable 
  spriteScale = '1300%'

  @observable
  spriteHeight = 132

  @observable
  screenWidth = 68

  @observable
  collisionWidth = 64

  constructor( props ) {
    super( props )
    this.playerNumber = props.playerNumber
    this.setAnimation( 'standing' )
  }

  @action
  onRight() {
    this.keyState.right = true
    this.velocity.x = WALK_SPEED
    this.updateMovementAnimation()
  }

  @action
  offRight() {
    this.keyState.right = false
    this.velocity.x = this.keyState.left ? -WALK_SPEED : 0
    this.updateMovementAnimation()
  }

  @action
  onLeft() {
    this.keyState.left = true
    this.velocity.x = -WALK_SPEED
    this.updateMovementAnimation()
  }

  @action
  offLeft() {
    this.keyState.left = false
    this.velocity.x = 0
    this.velocity.x = this.keyState.right ? WALK_SPEED : 0
    this.updateMovementAnimation()
  }

  @action
  onUp() {
    this.keyState.up = true
    this.velocity.z = WALK_SPEED
    this.updateMovementAnimation()
  }

  @action
  offUp() {
    this.keyState.up = false
    this.velocity.z = this.keyState.down ? -WALK_SPEED : 0
    this.updateMovementAnimation()
  }

  @action
  onDown() {
    this.keyState.down = true
    this.velocity.z = -WALK_SPEED
    this.updateMovementAnimation()
  }

  @action
  offDown() {
    this.setAnimation( 'walking' )
    this.keyState.down = false
    this.velocity.z = this.keyState.up ? WALK_SPEED : 0
    this.updateMovementAnimation()
  }

  @action
  onJump() {
    if ( this.onGround ) {
      this.velocity.y = JUMP_VELOCITY
      this.setAnimation( 'in_air' )
    }
  }

  @action
  onReturnToGround() {
    this.updateMovementAnimation()
  }

  @action
  updateMovementAnimation() {
    if ( !this.onGround ) {
      this.setAnimation( 'in_air' )
    }
    else if ( Object.values(this.keyState).some( k => k )) {
      this.setAnimation( 'walking' )
    }
    else {
      this.setAnimation( 'standing' ) 
    }
  }

  @action
  step() {
    super.step()

    // Set direction based on x-velocity.  If velocity is 0, leave direction alone (preserving the previous direction)
    if ( this.velocity.x < 0 ) {
      this.direction = directions.left
    }
    else if ( this.velocity.x > 0 ) {
      this.direction = directions.right
    }

    //Prevent walking outside of level
    this.position.z = Math.max( this.level.minZ, Math.min( this.level.maxZ, this.position.z ))

    //Prevent backtracking past camera
    this.position.x = Math.max( this.camera.position.x + this.camera.screenLeftEdge, this.position.x )
  }
}

export default Player