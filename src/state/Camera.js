import { action, observable } from 'mobx'

class Camera {

  @observable
  position = {
    x: 0,
    y: 0,
    z: 0
  }

  @observable
  screenWidth = 670

  @observable
  screenLeftEdge = 20

  constructor( props ) {
    this.gameState = props.gameState
  }

  @action
  step() {
    this.gameState.players.forEach( player => {
      if ( player.position.x > this.position.x + this.screenWidth ) {
        this.position.x = player.position.x - this.screenWidth
      }  
    })
  }
}

export default Camera