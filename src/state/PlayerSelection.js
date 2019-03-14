import { action, observable } from 'mobx'

class PlayerSelection {

  @observable
  playerCount = 0

  @action
  setPlayerCount( count ) {
    this.playerCount = count
  }
}

export default PlayerSelection