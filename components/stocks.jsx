import { connect } from 'react-redux';
import { getTotalCargoWeight } from '../lib/selectors';

const Stocks = ({ ship, currentIsland, warehouse, maxStorage, currentCargoWeight }) => {
  return (
    <div style={{ display: 'flex', width: 'fit-content' }}>
      <div className="panel">
        <h3>{`Vehicle ${currentCargoWeight}/${maxStorage}kg`}</h3>
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
        <h3>{'Town Prices'}</h3>
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
        <h3>{'Hometown Stocks'}</h3>
        {Object.keys(warehouse.contents).map((goodType, i) => {
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{`${goodType}:`}</div>
              <div>{`${warehouse.contents[goodType]} kg`}</div>
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
