import GameCharacter from './GameCharacter'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import { action, observable } from 'mobx'
import directions from '../shared/enum/directions'

const WALK_SPEED = 3
const JUMP_VELOCITY = 17

const JUMP_KICK_XVEL = 8

class Player extends GameCharacter {

  type = GameObjectTypes.Player
  keyState = {
    up: false,
    down: false,
    left: false,
    right: false,
  }
  attackCount = 0

  commonAnimationTracks = {
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
    },
    take_damage: {
      frames: [{ x: 25, y: 300 }],
      duration: 1000,
    },
    jump_kick: {
      frames: [{ x: 740, y: 0, width: 120 }],
      duration: 1000,
    },
  }

  @observable 
  spriteScale = '870px'

  @observable
  screenHeight = 132

  @observable
  screenWidth = 68

  @observable
  collisionWidth = 64

  @observable
  collisionHeight = 80

  @observable
  collisionBottom = 20

  @observable
  collisionDepth = 30

  @observable
  health = 9999

  constructor( props ) {
    super( props )
    this.playerNumber = props.playerNumber
    this.setAnimation( 'standing' )
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
    if ( this.onGround && !this.isMovementFrozen() ) {
      this.velocity.y = JUMP_VELOCITY
      this.setAnimation( 'in_air' )
    }
  }

  @action
  onReturnToGround() {
    this.updateMovementAnimation()
    super.onReturnToGround()
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
  stepMovement() {
    super.stepMovement()

    this.updateMovementAnimation()

    // Set direction based on x-velocity.  If velocity is 0, leave direction alone (preserving the previous direction)
    if ( this.velocity.x < 0 ) {
      this.direction = directions.left
    }
    else if ( this.velocity.x > 0 ) {
      this.direction = directions.right
    }
  }

  @action
  step() {
    super.step()
    
    //Prevent walking outside of level
    this.position.z = Math.max( this.level.minZ, Math.min( this.level.maxZ, this.position.z ))

    //Prevent backtracking behind camera
    this.position.x = Math.max( this.camera.position.x + this.camera.screenLeftEdge, this.position.x )

    //Prevent walking past camera
    this.position.x = Math.min( this.camera.position.x + this.camera.screenRightEdge, this.position.x )
  }

  @action
  jumpKick() {
    if ( !this.isMovementFrozen() && !this.inFreefall()) {
      this.setAnimation('jump_kick')
      this.setFreefall({
        x: this.direction === directions.right ? JUMP_KICK_XVEL : -JUMP_KICK_XVEL,
        y: -2,
        z: 0
      }, 1)
    }
  }

  @action
  onAttack() {
    if ( !this.onGround ) {
      this.jumpKick()
    }
    else {
      const attackAnimation = this.attackCount % 2 === 0 ? 'attack1' : 'attack2'
      this.attack( attackAnimation, 150 )
      this.attackCount += 1
    }
  }
}

export default Player