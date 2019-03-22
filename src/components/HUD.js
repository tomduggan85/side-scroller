import React from 'react'
import './HUD.scss'
import PlayerHUD from './PlayerHUD'

class HUD extends React.Component {
  render() {
    const { players } = this.props
    return (
      <div className='hud'>
        { players.map( player => <PlayerHUD key={player.id} player={player} />)}
        <img
          className='logo'
          src='/assets/images/ui/hud_logo.png'
          alt='logo'
        />
      </div>
    )
  }
}

export default HUD