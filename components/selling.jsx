import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Selling = (props) => {
  const { setCurrentScene, sell, currentIsland, ship } = props;

  return (
    <div style={{ padding: '10px', width: '320px' }}>

      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'What do you want to sell?'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>

      {Object.keys(currentIsland.market).map((goodType, i) => {
        const max = ship.storage.contents[goodType];
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{`${goodType}`}</div>
            <div>
            {
                max >= 1 ?
                <button onClick={sell.bind(null, goodType, 1)}>{1}</button>
                : null
              }

              {
                max >= 5 ?
                <button onClick={sell.bind(null, goodType, 5)}>{5}</button>
                : null
              }
              <button
                onClick={sell.bind(null, goodType, max)}
                style={{ minWidth: '90px' }}
              >
                {`Max (${max})`}
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
  sell: (goodType, quantity) => dispatch(actions.sell(goodType, quantity))
});


export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
)(Selling);
