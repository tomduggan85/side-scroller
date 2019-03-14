import BluePlayer from './BluePlayer'
import OrangePlayer from './OrangePlayer'
import Level from './Level'
import Camera from './Camera'
import { action, observable, computed } from 'mobx'
import GameObjectTypes from '../shared/enum/GameObjectTypes'
import history from '../shared/history'
import RootStore from './RootStore'
import PlayerTypes from '../shared/enum/PlayerTypes'


const PlayerTypesToClass = {
  [ PlayerTypes.blue ]: BluePlayer,
  [ PlayerTypes.orange ]: OrangePlayer,
}

export const MS_FRAME_SCALE = 60 / 1000

class GameState {

  @observable
  gameObjects = []

  gameObjectsToRemove = []

  constructor() {
    this.stepGameLoop = this.stepGameLoop.bind(this)
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
  beginGame() {
    this.gameObjects = []
    this.gameObjectsToRemove = []
    this.level = new Level()
    this.camera = new Camera({ gameState: this })

    //Players
    const { selectedPlayerTypes } = RootStore.playerSelection
    selectedPlayerTypes.forEach(( playerType, i ) => {
      const x = 200 + 100 * i
      const z = 100 + 100 * (i%2)
      this.addPlayer( PlayerTypesToClass[ playerType ], { x, y: 0, z })
    })

    //Level
    this.level.startingGameObjects.forEach( objectDef => {
      const {
        objectType,
        ...props
      } = objectDef

      this.addGameObject( objectType, props )
    })

    this.startGameLoop()
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

    this.cleanupRemovedGameObjects()

    this._gameLoopRAF = requestAnimationFrame(this.stepGameLoop)
  }

  removeGameObject( gameObject ) {
    this.gameObjectsToRemove.push( gameObject.id )
  }

  cleanupRemovedGameObjects() {
    this.gameObjectsToRemove.forEach( id => {
      const index = this.gameObjects.findIndex( gameObject => gameObject.id === id )
      this.gameObjects.splice(index, 1)
    })
    this.gameObjectsToRemove = []
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
        history.push('/')
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