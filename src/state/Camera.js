import { action, observable } from 'mobx'
import { MS_FRAME_SCALE } from './GameState'

class Camera {

  @observable
  position = {
    x: 0,
    y: 0,
    z: 0
  }

  locked = false
  followWidth = 370
  screenRightEdge = 610
  screenLeftEdge = 20

  constructor( props ) {
    this.gameState = props.gameState
  }

  @action
  step( deltaTime ) {
    this.gameState.players.forEach( player => {
      if ( player.position.x > this.position.x + this.followWidth && !this.locked ) {
        // Move rightwards with the player, so they don't get further away
        this.position.x += Math.max( 0, player.velocity.x * deltaTime * MS_FRAME_SCALE )
      }
    })

    this.position.x = Math.min( this.gameState.level.maxCamPosition, this.position.x )
  }

  lock() {
    this.locked = true
  }

  unlock() {
    this.locked = false
  }
}

export default Camera