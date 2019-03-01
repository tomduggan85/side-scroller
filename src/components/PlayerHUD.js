import React from 'react'
import { observer } from 'mobx-react'
import './PlayerHUD.scss'

@observer
class PlayerHUD extends React.Component {
  render() {
    const {
      name,
      health
    } = this.props.player

    return (
      <div className='player-hud'>
        <div className='name'>{name}</div>
        <div className='points'>56</div>
      </div>
    )
  }
}

export default PlayerHUD