import GameCharacter from './GameCharacter'
import { observable } from 'mobx'
import directions from '../shared/enum/directions'

const CANCEL_GRAVITY = 0.6 // FIXME

class Projectile extends GameCharacter {
  @observable
  spriteUrl = '/assets/images/wrecking_ball.png'

  animationTracks = {
    default: {
      frames: [
        { x: 0, y: 0 },
      ],
      duration: 100,
    }
  }

  @observable 
  spriteScale = '100%'

  @observable 
  screenWidth = 64

  @observable 
  screenHeight = 64

  @observable
  collisionWidth = 64

  @observable
  collisionHeight = 64

  @observable
  collisionDepth = 40

  @observable
  collisionBottom = 0

  constructor( props ) {
    super( props )
    this.setAnimation( 'default' )
    this.direction = props.direction
    this.setFreefall({
      x: this.direction === directions.right ? this.speed : -this.speed,
      y: 0,
      z: 0
    }, 1)
  }

  step( deltaTime ) {
    this.freefall.velocity.y += CANCEL_GRAVITY
    super.step( deltaTime )
  }
}

export default Projectile