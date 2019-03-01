import React from 'react'
import './GameObjectRenderer.scss'
import { observer } from 'mobx-react'
import directions from '../shared/enum/directions'

const MAX_SCENE_ZINDEX = 9999

@observer
class GameObjectRenderer extends React.Component {

  render() {
    const {
      position: {
        x,
        y,
        z
      },
      spritePosition: {
        x: spriteX,
        y: spriteY,
      },
      direction,
      spriteUrl,
      screenWidth,
      screenHeight,
      spriteWidth,
      spriteHeight,
      spriteScale,
      onGround,
      isForeground,
    } = this.props.gameObject

    const directionScale = direction === directions.left ? -1 : 1
    
    const zIndex = isForeground ? MAX_SCENE_ZINDEX + 1 : MAX_SCENE_ZINDEX - Math.max( 0, z )
    const backgroundPosition = `${ -spriteX }px ${ -spriteY }px`
    const backgroundImage = `url(${ spriteUrl })`
    const backgroundSize = `${ spriteScale }`

    const transform = `translate3d(${ x }px, ${ -z }px, 0)`

    const spriteTransform = `translate3d(0, ${ -y }px, 0) scaleX(${ directionScale })`

    if ( !spriteUrl ) {
      return null
    }

    return (
      <div
        className='game-object-renderer'
        style={{
          zIndex,
          transform,
          width: `${ screenWidth }px`,
          height: `${ screenHeight }px`,
        }}
      >
        <div
          className='game-object-shadow'
          style={{
            display: onGround ? 'none' : 'block',
          }}
        />
        <div
          className='sprite'
          style={{
            transform: spriteTransform,
            backgroundPosition,
            backgroundImage,
            backgroundSize,
            width: `${ spriteWidth }px`,
            height: `${ spriteHeight }px`,
            left: direction === directions.right ? 0 : 'auto',
            right: direction === directions.left ? 0 : 'auto'
          }}
        />
      </div>
    )
  }
}

export default GameObjectRenderer