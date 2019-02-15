import React from 'react'
import './PlayerRenderer.css'
import { observer } from 'mobx-react'
import directions from '../shared/enum/directions'
import keyboardControls from '../shared/keyboardControls'

@observer
class PlayerRenderer extends React.Component {

  componentDidMount() {
    document.addEventListener( 'keydown', this.onKeyDown )
    document.addEventListener( 'keyup', this.onKeyUp )
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.onKeyDown )
    document.removeEventListener( 'keyup', this.onKeyUp )
  }

  onKeyDown = ( e ) => {
    const controls = keyboardControls[ this.props.playerNumber ]
    
    switch( e.keyCode ) {
      case controls.left: //A
        this.props.player.onLeft()
        e.preventDefault()
        break

      case controls.right: //D
        this.props.player.onRight()
        e.preventDefault()
        break

      case controls.up: //W
        this.props.player.onUp()
        e.preventDefault()
        break

      case controls.down: //S
        this.props.player.onDown()
        e.preventDefault()
        break

      case controls.jump: //S
        this.props.player.onJump()
        e.preventDefault()
        break

      default:
        break
    }
  }

  onKeyUp = ( e ) => {
    const controls = keyboardControls[ this.props.playerNumber ]

    switch( e.keyCode ) {
      case controls.left: //A
        this.props.player.offLeft()
        e.preventDefault()
        break

      case controls.right: //D
        this.props.player.offRight()
        e.preventDefault()
        break

      case controls.up: //W
        this.props.player.offUp()
        e.preventDefault()
        break

      case controls.down: //S
        this.props.player.offDown()
        e.preventDefault()
        break

      default:
        break
    }
  }

  render() {
    const {
      position: {
        x,
        y,
        z
      },
      direction
    } = this.props.player

    const directionScale = direction === directions.left ? -1 : 1
    const yTranslation =  (-y - z) // Combine Y and Z scene positions of the gameObject into a Y screen position (and negate it, so positive scene-Y moves up the screen)

    const transform = `translate3d(${ x }px, ${ yTranslation }px, 0) scaleX(${ directionScale })`

    return (
      <div
        className='player-renderer'
        style={{ transform }}
      />
    )
  }
}

export default PlayerRenderer