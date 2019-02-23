import EnemySpawner from './EnemySpawner'
import { observable } from 'mobx'

class DoorSpawner extends EnemySpawner {
  @observable
  spriteUrl = '/assets/images/breaking_door.png'

  animationTracks = {
    default: {
      frames: [
        { x: 4, y: 8 },
      ],
      duration: 400,
    },
    broken: {
      frames: [
        { x: 130, y: 8 },
        { x: 230, y: 8 },
        { x: 400, y: 8 },
        { x: 8, y: 235 },
        { x: 133, y: 235 },
        { x: 283, y: 235 }
      ],
      loopStartFrame: 3,
      introDuration: 300,
      duration: 400,
    }
  }

  @observable 
  spriteScale = '545px'

  @observable 
  screenWidth = 128

  @observable 
  screenHeight = 170

  constructor( props ) {
    super( props )
    this.setAnimation( 'default' )
  }

  trigger() {
    super.trigger()
    this.setAnimation( 'broken' )
  }
}

export default DoorSpawner