import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';
import { getTotalCargoWeight } from '../lib/selectors';

const Buying = (props) => {
  const { buy, setCurrentScene, currentIsland, cash, storageLeft } = props;

  return (
    <div style={{ padding: '10px', width: '320px' }}>

      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'What do you want to buy?'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>

      {Object.keys(currentIsland.market).map((goodType, i) => {

        const canAfford = Math.floor(cash / currentIsland.market[goodType]);
        let maxBuy;
        if (canAfford > storageLeft) {
          maxBuy = storageLeft;
        } else {
          maxBuy = canAfford;
        }

        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{`${goodType}`}</div>
            <div>
              {
                canAfford >= 1 && storageLeft >= 1 ?
                <button onClick={buy.bind(null, goodType, 1)}>{1}</button>
                : null
              }

              {
                canAfford >= 5  && storageLeft >= 5 ?
                <button onClick={buy.bind(null, goodType, 5)}>{5}</button>
                : null
              }
              <button
                onClick={buy.bind(null, goodType, maxBuy)}
                style={{ minWidth: '90px' }}
              >
                {`Max (${maxBuy})`}
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
  buy: (goodType, quantity) => dispatch(actions.buy(goodType, quantity))
});

export default connect(
  (state) => ({
    ...state,
    storageLeft: state.ship.storage.max - getTotalCargoWeight(state)
  }),
  mapDispatchToProps
)(Buying);
