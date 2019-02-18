import GameObject from './GameObject'
import { observable } from 'mobx'

class Fire extends GameObject {
  @observable
  spriteUrl = '/assets/images/fire.png'

  animationTracks = {
    default: {
      yPos: 0,
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
  spriteWidth = 2000

  @observable 
  spriteHeight = 125

  constructor( props ) {
    super( props )
    this.setAnimation( 'default' )
  }
}

export default Fire