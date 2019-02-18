import React from 'react'
import './HUD.scss'

class HUD extends React.Component {
  render() {
    return (
      <div className='hud'>
        <img
          className='logo'
          src='/assets/images/hud_logo.png'
          alt='logo'
        />
      </div>
    )
  }
}

export default HUD