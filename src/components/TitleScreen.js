import React from 'react'
import { withRouter } from 'react-router-dom'
import './TitleScreen.scss'
import { inject } from 'mobx-react'
import classnames from 'classnames'

const NEXT_SCREEN_DELAY = 1500

@inject( 'playerSelection' )
class TitleScreen extends React.Component {

  state = {
    selectedOption: null,
  }

  onSelectOnePlayer = () => this.selectNumberOfPlayers( 1 )

  onSelectTwoPlayers = () => this.selectNumberOfPlayers( 2 )

  selectNumberOfPlayers( count ) {
    this.setState({ selectedOption: count })
    this.props.playerSelection.setNumberOfPlayers( count )
    this.nextScreenTimeout = setTimeout(() => {
      this.props.history.push('/player_select')  
    }, NEXT_SCREEN_DELAY )
  }

  componentWillUnmount() {
    clearTimeout( this.nextScreenTimeout )
  }

  render() {
    const { selectedOption } = this.state

    return (
      <div className='TitleScreen'>
        <img
          src='/assets/images/ui/title_screen.png'
          className='title-image'
          alt=''
        />
        <div className='start-button-container'>
          <div
            className={classnames('start-button', {selected: selectedOption === 1})}
            onClick={this.onSelectOnePlayer}
          >
            <div className='indicator' />
            <span>1 Turtle</span>
          </div>
          <div
            className={classnames('start-button', {selected: selectedOption === 2})}
            onClick={this.onSelectTwoPlayers}
          >
            <div className='indicator' />
            <span>2 Turtles</span>
          </div>
        </div>
        <div className='instructions'>

          <span className='hover-hint'>?</span>
          <div className='instructions-text'>
            Player 1: WSAD, spaceebar to jump, shift to attack<br/>
            Player 2: Arrow keys, option to jump, / to attack
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter( TitleScreen )