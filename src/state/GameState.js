import Player from './Player'
import { action } from 'mobx'

class GameState {

  gameObjects = []

  constructor() {
    this.stepGameLoop = this.stepGameLoop.bind(this)
    this.addPlayer()
  }

  addPlayer() {
    this.gameObjects.push(new Player())
  }

  @action
  startGameLoop() {
    this.stepGameLoop()
  }

  @action
  stopGameLoop() {
    cancelAnimationFrame(this._gameLoopRAF)
  }

  @action
  stepGameLoop() {
    this.gameObjects.forEach( gameObject => gameObject.step())
    this._gameLoopRAF = requestAnimationFrame(this.stepGameLoop)
  }
}

export default GameState