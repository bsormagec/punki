import React from 'react';
import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const Banking = ({ deposit, withdraw, setCurrentScene }) => {

  let textInput = React.createRef();

  return (
    <div style={{ padding: '10px', width: '320px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Banking'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>
      <input
        type="text"
        style={{ marginBottom: '2px', marginRight: '5px', textAlign: 'center' }}
        placeholder="Amount"
        ref={textInput}
      />
      <button onClick={() => deposit(parseInt(textInput.current.value, 10))}>{'Deposit'}</button>
      <button onClick={() => withdraw(parseInt(textInput.current.value, 10))}>{'Withdraw'}</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  deposit: (amount) => dispatch(actions.deposit(amount)),
  withdraw: (amount) => dispatch(actions.withdraw(amount))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
  )(Banking);
