import React from 'react'
import { withRouter } from 'react-router-dom'
import './PlayerSelectScreen.scss'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'
import PlayerTypes from '../shared/enum/PlayerTypes'

const NEXT_DELAY = 1500

@inject( 'playerSelection' )
@observer
class PlayerSelectScreen extends React.Component {

  state = {
    currentlySelectingFor: 0,
    canSelect: true,
  }

  componentWillUnmount() {
    clearTimeout( this.nextTimeout )
  }

  selectPlayerType = playerType => {
    this.props.playerSelection.selectPlayer( playerType )
    this.setState({ canSelect: false })

    const { hasSelectedAllPlayers } = this.props.playerSelection

    this.nextTimeout = setTimeout(
      hasSelectedAllPlayers ? this.gotoGame : this.beginSelectingNextPlayer,
      NEXT_DELAY
    )
  }

  gotoGame = () => {
    this.props.history.push('/game')
  }

  beginSelectingNextPlayer = () => {
    this.setState({
      canSelect: true,
      currentlySelectingFor: this.state.currentlySelectingFor + 1
    })
  }

  render() {
    const {
      currentlySelectingFor,
      canSelect,
    } = this.state

    const { selectedPlayerTypes } = this.props.playerSelection
    
    return (
      <div className={classnames('PlayerSelectScreen', { canSelect })}>
        <div className='instructions'>Select your turtle</div>

        <div className='player-types'>
          {Object.values( PlayerTypes ).map( playerType => {
            const isSelected = selectedPlayerTypes[ currentlySelectingFor ] === playerType

            return (
              <div
                className={classnames('player-type', { isSelected })}
                onClick={() => this.selectPlayerType( playerType )}
                key={playerType}
              >
                <img
                  className='player-image'
                  src={`/assets/images/${ playerType }_player_select.png`}
                  alt={playerType}
                />
                <img
                  className='indicator'
                  src={`/assets/images/select_indicator_${ currentlySelectingFor }.png`}
                  alt=''
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withRouter( PlayerSelectScreen )