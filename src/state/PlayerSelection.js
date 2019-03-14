import { action, observable, computed } from 'mobx'

class PlayerSelection {

  @observable
  playerCount = 0

  @observable
  selectedPlayerTypes = []

  @action
  setNumberOfPlayers( count ) {
    this.playerCount = count
    this.selectedPlayerTypes = []
  }

  @action
  selectPlayer( playerType ) {
    this.selectedPlayerTypes.push( playerType )
  }

  @computed
  get hasSelectedAllPlayers() {
    return this.selectedPlayerTypes.length === this.playerCount
  }
}

export default PlayerSelection