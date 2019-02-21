import React from 'react'
import './LevelRenderer.scss'
import { observer } from 'mobx-react'

@observer
class LevelRenderer extends React.Component {


  render() {
    const {
      backgroundUrl
    } = this.props.level

    const { camera } = this.props

    return (
      <div
        className='level-renderer'
        style={{
          transform: `translate3d(${ -camera.position.x }px, 0, 0)`
        }}
      >
        <img
          className='level-background'
          src={ backgroundUrl }
          alt=''
        />
        <div className='level-game-objects'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default LevelRenderer