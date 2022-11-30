import { connect } from 'react-redux';
import { getTotalCargoWeight } from '../lib/selectors';

const Stocks = ({ ship, currentIsland, warehouse, maxStorage, currentCargoWeight }) => {
  return (
    <div style={{ display: 'flex', width: 'fit-content' }}>
      <div className="panel">
        <h3>{`Cargo ${currentCargoWeight}/${maxStorage}kg`}</h3>
        {Object.keys(ship.storage.contents).map((goodType, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}:`}</div>
              <div>{`${ship.storage.contents[goodType]} kg`}</div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <h3>{'Camp Prices'}</h3>
        {Object.keys(currentIsland.market).map((goodType, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}:`}</div>
              <div>{`${currentIsland.market[goodType]} $`}</div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <h3>{'Stashed Cargo'}</h3>
        {Object.keys(warehouse.contents).map((goodType, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}:`}</div>
              <div>{`${warehouse.contents[goodType]} kg`}</div>
            </div>
          );
        })}
      </div>

      <div className="panel">
        <h3>{'Upgrades'}</h3>
        {Object.keys(ship.upgrades.contents).map((upgradeType, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${upgradeType}:`}</div>
              <div>{`Lv. ${ship.upgrades.contents[upgradeType]}`}</div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default connect(
  (state) => ({
    ...state,
    maxStorage: state.ship.storage.max,
    currentCargoWeight: getTotalCargoWeight(state)
  })
)(Stocks);
