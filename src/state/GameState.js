import BluePlayer from './BluePlayer'
import OrangePlayer from './OrangePlayer'
import Fire from './Fire'
import Level from './Level'
import { action, observable, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

class GameState {

  playerCount = 0

  @observable
  gameObjects = []

  level = new Level()

  constructor() {
    this.stepGameLoop = this.stepGameLoop.bind(this)
    
    //Player 1
    this.addPlayer( BluePlayer )
    
    //Player 2
    this.addPlayer( OrangePlayer, { x: 300, y: 0, z: 0 })

    //Fire
    this.gameObjects.push(new Fire())
  }

  addPlayer( PlayerType, position = { x: 0, y: 0, z: 0} ) {
    this.gameObjects.push(new PlayerType( {
      position,
      playerNumber: this.playerCount
    }))

    this.playerCount++
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