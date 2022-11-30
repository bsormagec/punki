import React from 'react';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';
import Departing from '../components/departing';
import Buying from '../components/buying';
import Selling from '../components/selling';
import Upgrades from '../components/upgrades';
import Finances from '../components/finances';
import Stocks from '../components/stocks';
import Choices from '../components/choices';
import TravellingMessages from '../components/travelling-messages';
import Banking from '../components/banking';
import Warehouse from '../components/warehouse';
import MoneyLender from '../components/moneylender';

import '../styles/reset.css';
import '../styles/index.css';

class Interface extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      musicPlaying: true
    };
  }

  toggleMusic() {
    this.setState({ musicPlaying: !this.state.musicPlaying });
  }

  renderInteractive() {
    const {
      currentScene
    } = this.props;

    switch (currentScene) {
      case UI_SCENES.IS_LEAVING:
        return <Departing />;
      case UI_SCENES.IS_BUYING:
        return <Buying />;
      case UI_SCENES.IS_UPGRADING:
        return <Upgrades />;
      case UI_SCENES.IS_SELLING:
        return <Selling />;
      case UI_SCENES.IS_BANKING:
        return <Banking />;
      case UI_SCENES.IS_STORING:
        return <Warehouse />;
      case UI_SCENES.IS_TRAVELLING:
        return <TravellingMessages />;
      case UI_SCENES.IS_BORROWING:
        return <MoneyLender />;
      default:
        return <Choices />;
    }
  }

  render() {
    const {
      destinations,
      currentIsland,
      date
    } = this.props;

    const currentLocation = destinations.filter(d => d.id === currentIsland.islandID)[0].name;

    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ marginLeft: '10px' }}>
          <h1>{'Nomadic Punks Trader'}</h1>
          <h2>{`${currentLocation}`}</h2>
          <div>{`${date.day} ${date.season} ${date.year}`}</div>
          <audio src="/mp3/unstoppable-adventure.mp3" autoPlay muted={!this.state.musicPlaying} loop />
        </div>

        <Stocks />

        <div style={{ display: 'flex', width: 'fit-content' }}>
          <Finances />
          {this.renderInteractive()}
        </div>

        <div
          onClick={this.toggleMusic.bind(this)}
          style={{ position: 'absolute', top: 300, left: 20, display: 'flex', width: 'fit-content', cursor: 'pointer' }}
        >
          {!this.state.musicPlaying ? '🔇' : '🔈'}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(Interface);
