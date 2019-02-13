import React from 'react'
import './GameRenderer.css'
import { inject } from 'mobx-react'

@inject( 'gameState' )
class GameRenderer extends React.Component {
  componentDidMount() {
    this.props.gameState.startGameLoop()
  }

  componentWillUnmount() {
    this.props.gameState.stopGameLoop()
  }

  render() {
    return (
      <div className='GameRenderer'>
        {this.props.gameState.gameObjects.map( gameObject => { return (
          <span key={gameObject.id}>GameObject {gameObject.id}</span>
        )})}
      </div>
    )
  }
}

export default GameRenderer