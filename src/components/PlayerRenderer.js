import React from 'react'
import './PlayerRenderer.css'
import { observer } from 'mobx-react'

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
    switch( e.keyCode ) {
      case 65: //A
        this.props.player.onLeft()
        break

      case 68: //D
        this.props.player.onRight()
        break

      case 87: //W
        this.props.player.onUp()
        break

      case 83: //S
        this.props.player.onDown()
        break

      case 32: //S
        this.props.player.onJump()
        break

      default:
        break
    }
  }

  onKeyUp = ( e ) => {
    switch( e.keyCode ) {
      case 65: //A
        this.props.player.offLeft()
        break

      case 68: //D
        this.props.player.offRight()
        break

      case 87: //W
        this.props.player.offUp()
        break

      case 83: //S
        this.props.player.offDown()
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
      }
    } = this.props.player
    const transform = `translateX(${ x }px) translateY(${( -y - z) }px)` //Y and Z movement of the player both move the renderer upwards on the screen

    return (
      <div
        className='player-renderer'
        style={{ transform }}
      />
    )
  }
}

export default PlayerRenderer