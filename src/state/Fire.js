import GameObject from './GameObject'
import { observable } from 'mobx'

class Fire extends GameObject {
  @observable
  spriteUrl = '/assets/images/gameObjects/fire.png'

  animationTracks = {
    default: {
      frames: [
        { x: 0, y: 0 },
        { x: 0, y: 128 },
        { x: 0, y: 256 },
      ],
      duration: 400,
    }
  }

  @observable 
  spriteScale = 'auto 305%'

  @observable 
  screenWidth = 8000

  @observable 
  screenHeight = 125

  @observable
  isForeground = true

  @observable
  position = {
    x: 0,
    y: 0,
    z: -10,
  }

  constructor( props ) {
    super( props )
    this.setAnimation( 'default' )
  }
}

export default Fire