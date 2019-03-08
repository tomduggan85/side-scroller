import BluePlayer from './BluePlayer'
import OrangePlayer from './OrangePlayer'
import Level from './Level'
import Camera from './Camera'
import { action, observable, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

export const MS_FRAME_SCALE = 60 / 1000

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
    //this.addPlayer( OrangePlayer, { x: 300, y: 0, z: 200 })

    //Level
    this.level.startingGameObjects.forEach( objectDef => {
      const {
        objectType,
        ...props
      } = objectDef

      this.addGameObject( objectType, props )
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
      gameState: this,
      ...props
    }))
  }

  @action
  startGameLoop() {
    this.lastStepTime = performance.now()
    this.stepGameLoop()
  }

  @action
  stopGameLoop() {
    cancelAnimationFrame(this._gameLoopRAF)
  }

  @action
  stepGameLoop() {
    // calculate delta time
    const now = performance.now()
    const deltaTime = ( now - this.lastStepTime ) || 0
    this.lastStepTime = now

    this.gameObjects.forEach( gameObject => gameObject.step( deltaTime ))
    
    this.camera.step( deltaTime )

    if ( this.isGameOver()) {
      this.onGameOver()
    }

    this._gameLoopRAF = requestAnimationFrame(this.stepGameLoop)
  }

  @computed
  get players() {
    return this.gameObjects.filter( g => g.type === GameObjectTypes.Player )
  }

  isGameOver() {
    return this.players.length > 0 && this.players.every( p => p.isDead )
  }

  onGameOver() {
    if ( !this.gameOverTimer ) {
      this.gameOverTimer = setTimeout(() => {
        window.location.reload() // For now, restart the game by reloading the page
      }, 1500)
    }
  }

  getGameObjectsInsideBox( box ) { 
    return this.gameObjects.filter( gameObject => {
      
      return (
        gameObject.position.x + gameObject.collisionWidth >= box.x.min &&
        gameObject.position.x <= box.x.max &&
        gameObject.position.y + gameObject.collisionHeight >= box.y.min &&
        gameObject.position.y + gameObject.collisionBottom <= box.y.max &&
        gameObject.position.z >= box.z.min &&
        gameObject.position.z <= box.z.max
      )
    })
  }
}

export default GameState