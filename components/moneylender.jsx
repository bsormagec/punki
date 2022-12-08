import React from 'react';
import * as actions from '../lib/actions';
import {connect} from 'react-redux';
import {UI_SCENES} from '../lib/types';

const MoneyLender = ({borrow, repay, setCurrentScene, cash, hasBorrowed, loan}) => {

    let textInput = React.createRef();
    let repayInput = React.createRef();

    return (
        <div style={{padding: '10px', width: '320px', display: 'flex', flexDirection: 'column'}}>
            <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
                {'Loan Shark'}
                <button onClick={setCurrentScene.bind(null, UI_SCENES.NULL)}>{'Back'}</button>
            </h3>
            {
                !hasBorrowed ?
                    <>
                        <div style={{
                            'display': 'flex',
                            'flexDirection': 'row',
                            'width': '100%',
                            'justifyContent': 'center',
                            'alignItems': 'center',
                            'marginBottom': '5px',
                        }}
                        >
                            <input
                                type="number"
                                style={{marginRight: '5px', textAlign: 'center', width: '100%'}}
                                placeholder={`Borrow max ${Math.floor(cash * 2)}`}
                                onChange={() => textInput.current.value > Math.floor(cash * 2) ? textInput.current.value = Math.floor(cash * 2) : null}
                                ref={textInput}
                            />
                            <button onClick={() => textInput.current.value = Math.floor(cash * 2)}>{'Max'}</button>
                        </div>

                        <button onClick={() => borrow(parseInt(textInput.current.value, 10))}>{'Borrow'}</button>
                    </>
                    : null
            }

            <input
                type="number"
                style={{marginBottom: '5px', marginRight: '5px', textAlign: 'center'}}
                placeholder={'Repay how much?'}
                hidden={loan < 1}
                ref={repayInput}
            />
            <button hidden={loan < 1} onClick={() => repay(parseInt(repayInput.current.value, 10))}>{'Repay'}</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentScene: (sceneType) => dispatch(actions.setCurrentScene(sceneType)),
    borrow: (amount) => dispatch(actions.borrow(amount)),
    repay: (amount) => {
        if (amount > 0) {
            dispatch(actions.repay(amount));
        } else {
            // eslint-disable-next-line no-alert
            alert('You must repay at least 1');
        }
    }
});

export default connect(
    (state) => ({...state}),
    mapDispatchToProps
)(MoneyLender);
