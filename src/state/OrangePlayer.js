import Player from './Player'
import { observable } from 'mobx'

class OrangePlayer extends Player {
  @observable
  spriteUrl = '/assets/images/player2.png'
}

export default OrangePlayer