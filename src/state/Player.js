import GameObject from './GameObject'
import GameObjectTypes from '../shared/GameObjectTypes'

class Player extends GameObject {

  type = GameObjectTypes.Player

  step() {
    super.step()
  }
}

export default Player