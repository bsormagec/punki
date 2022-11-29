import React from 'react';
import * as actions from '../lib/actions';
import { connect } from 'react-redux';
import { UI_SCENES } from '../lib/types';

const MoneyLender = ({ borrow, repay, setCurrentScene, cash, hasBorrowed }) => {

  let textInput = React.createRef();
  let repayInput = React.createRef();

  return (
    <div style={{ padding: '10px', width: '320px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
        {'Loan Shark'}
        <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
      </h3>
      {
        !hasBorrowed ?
        <>
          <input
            type="number"
            style={{ marginBottom: '5px', marginRight: '5px', textAlign: 'center' }}
            placeholder={`Borrow max ${Math.floor(cash * 2)}`}
            ref={textInput}
          />
          <button onClick={() => borrow(parseInt(textInput.current.value, 10))}>{'Borrow'}</button>
        </>
        : null
      }

      <input
        type="number"
        style={{ marginBottom: '5px', marginRight: '5px', textAlign: 'center' }}
        placeholder={'Repay how much?'}
        ref={repayInput}
      />
      <button onClick={() => repay(parseInt(repayInput.current.value, 10))}>{'Repay'}</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
  borrow: (amount) => dispatch(actions.borrow(amount)),
  repay: (amount) => dispatch(actions.repay(amount))
});

export default connect(
  (state) => ({ ...state }),
  mapDispatchToProps
  )(MoneyLender);
