import React from 'react'
import './GameObjectRenderer.scss'
import { observer } from 'mobx-react'
import directions from '../shared/enum/directions'

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
      spriteWidth,
      spriteHeight,
      spriteScale,
    } = this.props.gameObject

    const directionScale = direction === directions.left ? -1 : 1
    const yTranslation =  (-y - z) // Combine Y and Z scene positions of the gameObject into a Y screen position (and negate it, so positive scene-Y moves up the screen)

    const transform = `translate3d(${ x }px, ${ yTranslation }px, 0) scaleX(${ directionScale })`
    const zIndex = 9999 - z
    const backgroundPosition = `${ -spriteX }px ${ -spriteY }px`
    const backgroundImage = `url(${ spriteUrl })`
    const backgroundSize = `${ spriteScale }`
    const width = `${ spriteWidth }px`
    const height = `${ spriteHeight }px`

    return (
      <div
        className='game-object-renderer'
        style={{
          transform,
          zIndex,
          backgroundPosition,
          backgroundImage,
          backgroundSize,
          width,
          height
        }}
      />
    )
  }
}

export default GameObjectRenderer