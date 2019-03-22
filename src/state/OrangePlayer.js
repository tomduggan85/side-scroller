import Player from './Player'
import { observable } from 'mobx'

class OrangePlayer extends Player {
  @observable
  spriteUrl = '/assets/images/gameObjects/orange_player.png'

  @observable
  name = 'Mike'

  animationTracks = {
    ...this.commonAnimationTracks,

    attack1: {
      frames: [
        { x: 20, y: 145, width: 90 }, 
        { x: 115, y: 145, width: 90 },
        { x: 188, y: 145, width: 130 },
      ],
      duration: 300,
    },

    attack2: {
      frames: [
        { x: 320, y: 145, width: 80 },
        { x: 400, y: 145, width: 90 },
        { x: 492, y: 126, width: 107, height: 180 },
      ],
      duration: 300,
    }
  }
}

export default OrangePlayer