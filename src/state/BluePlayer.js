import Player from './Player'
import { observable } from 'mobx'

class BluePlayer extends Player {
  @observable
  spriteUrl = '/assets/images/player1.png'
}

export default BluePlayer