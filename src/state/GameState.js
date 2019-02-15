import Player from './Player'
import { action, observable, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

class GameState {

  @observable
  gameObjects = []

  constructor() {
    this.stepGameLoop = this.stepGameLoop.bind(this)
    this.addPlayer({ x: 0, y: 0, z: 0 })
    this.addPlayer({ x: 300, y: 0, z: 0 })
  }

  addPlayer( position ) {
    this.gameObjects.push(new Player({ position }))
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

  @computed
  get players() {
    return this.gameObjects.filter( g => g.type === GameObjectTypes.Player )
  }
}

export default GameState