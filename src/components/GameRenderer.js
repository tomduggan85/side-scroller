import React from 'react'
import './GameRenderer.css'
import { inject } from 'mobx-react'
import PlayerRenderer from './PlayerRenderer'
import GameObjectRenderer from './GameObjectRenderer'
import LevelRenderer from './LevelRenderer'
import HUD from './HUD'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

@inject( 'gameState' )
class GameRenderer extends React.Component {
  componentDidMount() {
    this.props.gameState.startGameLoop()
  }

  componentWillUnmount() {
    this.props.gameState.stopGameLoop()
  }

  render() {
    const {
      gameObjects,
      level,
    } = this.props.gameState

    return (
      <div className='GameRenderer'>
        
        <LevelRenderer level={level} />
        <div className='game-objects'>
        {gameObjects.map(( gameObject ) => {
          const RendererType = gameObject.type === GameObjectTypes.Player ? PlayerRenderer : GameObjectRenderer

          return (
            <RendererType
              key={gameObject.id}
              gameObject={gameObject}
            />
          )
        })}
        </div>
        <HUD />
      </div>
    )
  }
}

export default GameRenderer