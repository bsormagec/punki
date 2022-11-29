import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Departing = (props) => {
  const { setCurrentScene, sail, destinations, currentIsland } = props;

  // const currentLocation = destinations.filter(d => d.id === currentIsland.islandID)[0].name;

  return (
    <div style={{ padding: '10px', width: '320px' }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Where do you want to travel?'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {destinations.map((dest, i) => {
          return (
            <button key={i} onClick={currentIsland.islandID === dest.id ? () => {} : sail.bind(null, dest.id)}>
              {`${currentIsland.islandID === dest.id ? '*' : ''}${dest.name}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  sail: (destID) => dispatch(actions.sail(destID))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
)(Departing);


