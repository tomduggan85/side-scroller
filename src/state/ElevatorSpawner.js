import EnemySpawner from './EnemySpawner'
import { observable } from 'mobx'

class ElevatorSpawner extends EnemySpawner {
  @observable
  spriteUrl = '/assets/images/opening_elevator.png'

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
        { x: 232, y: 8 },
        { x: 332, y: 8 },
        { x: 436, y: 8 },
        { x: 133, y: 235 },
        { x: 283, y: 235 }
      ],
      loopStartFrame: 4,
      introDuration: 400,
      duration: 400,
    }
  }

  @observable 
  spriteScale = '545px'

  @observable 
  screenWidth = 100

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

export default ElevatorSpawner