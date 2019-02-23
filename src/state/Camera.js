import { action, observable } from 'mobx'

class Camera {

  @observable
  position = {
    x: 0,
    y: 0,
    z: 0
  }

  locked = false
  followWidth = 450
  screenRightEdge = 710
  screenLeftEdge = 20

  constructor( props ) {
    this.gameState = props.gameState
  }

  @action
  step() {
    this.gameState.players.forEach( player => {
      if ( player.position.x > this.position.x + this.followWidth && !this.locked ) {
        this.position.x = player.position.x - this.followWidth
      }  
    })
  }

  lock() {
    this.locked = true
  }

  unlock() {
    this.locked = false
  }
}

export default Camera