import BluePlayer from './BluePlayer'
import OrangePlayer from './OrangePlayer'
import Fire from './Fire'
import FootEnemy from './FootEnemy'
import Level from './Level'
import Camera from './Camera'
import { action, observable, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

class GameState {

  @observable
  gameObjects = []

  level = new Level()

  camera = new Camera({ gameState: this })

  constructor() {
    this.stepGameLoop = this.stepGameLoop.bind(this)
    
    //Player 1
    this.addPlayer( BluePlayer, { x: 200, y: 0, z: 100 })
    
    //Player 2
    this.addPlayer( OrangePlayer, { x: 300, y: 0, z: 200 })

    //Fire
    this.addGameObject( Fire )

    //Enemy
    this.addGameObject( FootEnemy, {
      position: { x: 20, y: 0, z: 200 },
      gameState: this,
    })
  }

  addPlayer( PlayerType, position = { x: 0, y: 0, z: 0} ) {
    this.addGameObject( PlayerType, {
      position,
      playerNumber: this.players.length,
    })
  }

  addGameObject( GameObjectType, props ) {
    this.gameObjects.push( new GameObjectType({
      level: this.level,
      camera: this.camera,
      ...props
    }))
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
    
    this.camera.step()

    this._gameLoopRAF = requestAnimationFrame(this.stepGameLoop)
  }

  @computed
  get players() {
    return this.gameObjects.filter( g => g.type === GameObjectTypes.Player )
  }
}

export default GameState