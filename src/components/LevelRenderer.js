import React from 'react'
import './LevelRenderer.css'
import { observer } from 'mobx-react'

@observer
class LevelRenderer extends React.Component {


  render() {
    const {
      backgroundUrl
    } = this.props.level

    return (
      <img
        className='level-renderer'
        src={ backgroundUrl }
        alt=''
      />
    )
  }
}

export default LevelRenderer