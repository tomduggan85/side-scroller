import Player from './Player'
import { observable } from 'mobx'

class BluePlayer extends Player {
  @observable
  spriteUrl = '/assets/images/player1.png'

  @observable
  name = 'Leo'

  animationTracks = {
    ...this.commonAnimationTracks,

    attack1: {
      frames: [
        { x: 15, y: 132, height: 160 }, 
        { x: 85, y: 132, height: 160, width: 80 },
        { x: 156, y: 132, height: 160, width: 130 },
      ],
      duration: 300,
    },

    attack2: {
      frames: [
        { x: 287, y: 132, height: 160 }, 
        { x: 360, y: 132, height: 160, width: 120 },
        { x: 465, y: 132, height: 160 },
      ],
      duration: 300,
    }
  }
}

export default BluePlayer