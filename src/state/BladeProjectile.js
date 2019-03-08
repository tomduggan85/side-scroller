import Projectile from './Projectile'
import { observable } from 'mobx'

class BladeProjectile extends Projectile {
  @observable
  spriteUrl = '/assets/images/enemy.png'

  animationTracks = {
    default: {
      frames: [
        { x: 1410, y: 238 },
      ],
      duration: 100,
    }
  }

  @observable 
  spriteScale = '3200px'

  @observable 
  screenWidth = 40

  @observable 
  screenHeight = 30

  @observable
  collisionWidth = 40

  @observable
  collisionHeight = 30

  @observable
  collisionDepth = 20

  @observable
  collisionBottom = 0

  @observable
  speed = 8
}

export default BladeProjectile