import React from 'react'
import { observer } from 'mobx-react'
import './PlayerHUD.scss'

const MAX_DISPLAY_HEALTH = 12

@observer
class PlayerHUD extends React.Component {
  render() {
    const {
      name,
      health,
      damageDealt,
      kills
    } = this.props.player

    return (
      <div className='player-hud'>
        <div className='name'>{name}</div>
        <div className='points'>{kills}</div>
        <div className='health-bar'>
          {[...Array( Math.min( health, MAX_DISPLAY_HEALTH ))].map((_, i) => (
            <div className='health' key={i}/>
          ))}
        </div>
      </div>
    )
  }
}

export default PlayerHUD