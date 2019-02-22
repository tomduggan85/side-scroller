import { observer } from 'mobx-react'
import keyboardControls from '../shared/keyboardControls'
import GameObjectRenderer from './GameObjectRenderer'

@observer
class PlayerRenderer extends GameObjectRenderer {

  componentDidMount() {
    document.addEventListener( 'keydown', this.onKeyDown )
    document.addEventListener( 'keyup', this.onKeyUp )
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.onKeyDown )
    document.removeEventListener( 'keyup', this.onKeyUp )
  }

  onKeyDown = ( e ) => {
    const controls = keyboardControls[ this.props.gameObject.playerNumber ]
    
    switch( e.keyCode ) {
      case controls.left:
        this.props.gameObject.onLeft()
        e.preventDefault()
        break

      case controls.right:
        this.props.gameObject.onRight()
        e.preventDefault()
        break

      case controls.up:
        this.props.gameObject.onUp()
        e.preventDefault()
        break

      case controls.down:
        this.props.gameObject.onDown()
        e.preventDefault()
        break

      case controls.jump:
        this.props.gameObject.onJump()
        e.preventDefault()
        break

      case controls.attack:
        this.props.gameObject.onAttack()
        e.preventDefault()
        break

      default:
        break
    }
  }

  onKeyUp = ( e ) => {
    const controls = keyboardControls[ this.props.gameObject.playerNumber ]

    switch( e.keyCode ) {
      case controls.left:
        this.props.gameObject.offLeft()
        e.preventDefault()
        break

      case controls.right:
        this.props.gameObject.offRight()
        e.preventDefault()
        break

      case controls.up:
        this.props.gameObject.offUp()
        e.preventDefault()
        break

      case controls.down:
        this.props.gameObject.offDown()
        e.preventDefault()
        break

      default:
        break
    }
  }
}

export default PlayerRenderer