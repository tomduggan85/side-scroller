import React from 'react'
import './GameRenderer.css'
import { inject, observer } from 'mobx-react'
import PlayerRenderer from './PlayerRenderer'
import GameObjectRenderer from './GameObjectRenderer'
import LevelRenderer from './LevelRenderer'
import HUD from './HUD'
import GameObjectTypes from '../shared/enum/GameObjectTypes'

@inject( 'gameState' )
@observer
class GameRenderer extends React.Component {

  constructor( props ) {
    super( props )
    this.props.gameState.beginGame()
  }

  componentWillUnmount() {
    this.props.gameState.stopGameLoop()
  }

  render() {
    const {
      gameObjects,
      level,
      camera
    } = this.props.gameState

    return (
      <div className='GameRenderer'>
        
        <LevelRenderer level={level} camera={camera}>
          {gameObjects.map(( gameObject ) => {
            const RendererType = gameObject.type === GameObjectTypes.Player ? PlayerRenderer : GameObjectRenderer

            return (
              <RendererType
                key={gameObject.id}
                gameObject={gameObject}
              />
            )
          })}
        </LevelRenderer>
        <HUD players={this.props.gameState.players} />
      </div>
    )
  }
}

export default GameRenderer