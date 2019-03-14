import Projectile from './Projectile'
import { observable } from 'mobx'

class SpearProjectile extends Projectile {
  @observable
  spriteUrl = '/assets/images/enemy.png'

  animationTracks = {
    default: {
      frames: [
        { x: 565, y: 385 },
      ],
      duration: 100,
    }
  }

  @observable 
  spriteScale = '3200px'

  @observable 
  screenWidth = 110

  @observable 
  screenHeight = 20

  @observable
  collisionWidth = 45

  @observable
  collisionHeight = 20

  @observable
  collisionDepth = 20

  @observable
  collisionBottom = 0

  @observable
  speed = 10
}

export default SpearProjectile