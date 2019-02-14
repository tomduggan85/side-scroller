import React from 'react'
import './GameRenderer.css'
import { inject } from 'mobx-react'
import PlayerRenderer from './PlayerRenderer'

@inject( 'gameState' )
class GameRenderer extends React.Component {
  componentDidMount() {
    this.props.gameState.startGameLoop()
  }

  componentWillUnmount() {
    this.props.gameState.stopGameLoop()
  }

  render() {
    //TODO: do not assume every gameObject is a player

    return (
      <div className='GameRenderer'>
        {this.props.gameState.gameObjects.map( gameObject => (
          <PlayerRenderer
            key={gameObject.id}
            player={gameObject}
          />
        ))}
      </div>
    )
  }
}

export default GameRenderer