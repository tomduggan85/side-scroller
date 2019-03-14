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

  onSelectOnePlayer = () => {
    this.setState({ selectedOption: 1 })
    this.props.playerSelection.setPlayerCount( 1 )
    this.gotoNextScreen()
  }

  onSelectTwoPlayers = () => {
    this.setState({ selectedOption: 2 })
    this.props.playerSelection.setPlayerCount( 2 )
    this.gotoNextScreen()
  }

  gotoNextScreen() {
    this.nextScreenTimeout = setTimeout(() => {
      this.props.history.push('/game')  
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
          src='/assets/images/title_screen.png'
          className='title-image'
          alt=''
        />
        <div className='start-button-container'>
          <div
            className={classnames('start-button', {selected: selectedOption === 1})}
            onClick={this.onSelectOnePlayer}
          >
            1 Turtle
          </div>
          <div
            className={classnames('start-button', {selected: selectedOption === 2})}
            onClick={this.onSelectTwoPlayers}
          >
            2 Turtles
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter( TitleScreen )