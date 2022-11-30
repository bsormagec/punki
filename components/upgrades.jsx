import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Upgrades = (props) => {
  const { upgrade, setCurrentScene, currentIsland, cash } = props;

  return (
    <div style={{ padding: '10px', width: '320px' }}>

      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'What do you want to upgrade?'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>

      {Object.keys(currentIsland.upgrades).map((upgradeType, i) => {

        const canAfford = Math.floor(cash / currentIsland.upgrades[upgradeType]);
        let maxUpgrades = canAfford;

        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{`${upgradeType}`}</div>
            <div>
              {
                canAfford >= 1 ?
                <button onClick={upgrade.bind(null, upgradeType, 1)}>{1}</button>
                : null
              }

              {
                canAfford >= 5  ?
                <button onClick={upgrade.bind(null, upgradeType, 5)}>{5}</button>
                : null
              }
              <button
                onClick={upgrade.bind(null, upgradeType, maxUpgrades)}
                style={{ minWidth: '90px' }}
              >
                {`Max (${maxUpgrades})`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  upgrade: (upgradeType, quantity) => dispatch(actions.upgrade(upgradeType, quantity))
});

export default connect(
  (state) => ({
    ...state
  }),
  mapDispatchToProps
)(Upgrades);
