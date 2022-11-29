import { UI_SCENES } from './types';
import Router from 'next/router';
const wait = (delay = 2000) => new Promise(r => setTimeout(r, delay));

export const SAIL = 'SAIL';
export const ARRIVE = 'ARRIVE';
export const BUY = 'BUY';
export const SELL = 'SELL';
export const SET_DATE = 'SET_DATE';

export const UPDATE_CASH = 'UPDATE_CASH';
export const updateCash = (cash) => ({
  type: UPDATE_CASH,
  cash
});

export const SET_SHIP_STOCKS = 'SET_SHIP_STOCKS';
export const setShipStocks = (contents) => ({
  type: SET_SHIP_STOCKS,
  contents
});

export const SET_TRAVEL_MESSAGE = 'SET_TRAVEL_MESSAGE';
export const setTravelMessage = (message, choices) => (dispatch) => {
  if (choices) {
    return new Promise((r) => {
      dispatch({
        type: SET_TRAVEL_MESSAGE,
        message,
        choices,
        onSelect: (option) => r(option)
      });
    });
  }

  return dispatch({
    type: SET_TRAVEL_MESSAGE,
    message
  });
};


export const SET_CURRENT_SCENE = 'SET_CURRENT_SCENE';
export const setCurrentScene = (sceneType) => ({
  type: SET_CURRENT_SCENE,
  sceneType
});


export const buy = (goodType, quantity) => (dispatch, getState) => {
  const price = getState().currentIsland.market[goodType];
  const totalPrice = price * quantity;

  if (totalPrice > getState().cash) {
    return;
  }

  // TODO: Make sure ship can hold new quantity!
  dispatch({
    type: BUY,
    goodType,
    quantity,
    totalPrice
  });
};


export const sell = (goodType, quantity) => (dispatch, getState) => {
  const price = getState().currentIsland.market[goodType];
  const totalPrice = price * quantity;

  if (quantity > getState().ship.storage.contents[goodType]) {
    return;
  }

  // TODO: Make sure not to decrement past 0 quantity!
  dispatch({
    type: SELL,
    goodType,
    quantity,
    totalPrice
  });
};

export const STORE_IN_WAREHOUSE = 'STORE_IN_WAREHOUSE';
export const storeInWarehouse = (goodType, quantity) => (dispatch, getState) => {
  if (quantity > getState().ship.storage.contents[goodType]) {
    return;
  }

  // TODO: Make sure not to decrement past 0 quantity!
  dispatch({
    type: STORE_IN_WAREHOUSE,
    goodType,
    quantity
  });
};

export const WITHDRAW_FROM_WAREHOUSE = 'WITHDRAW_FROM_WAREHOUSE';
export const withdrawFromWarehouse = (goodType, quantity) => (dispatch, getState) => {
  if (quantity > getState().warehouse.contents[goodType]) {
    return;
  }
  dispatch({
    type: WITHDRAW_FROM_WAREHOUSE,
    goodType,
    quantity
  });
};



export const BANK_DEPOSIT = 'BANK_DEPOSIT';
export const deposit = (amount) => (dispatch, getState) => {
  if (getState().cash < amount || isNaN(amount)) {
    return;
  }

  dispatch({
    type: BANK_DEPOSIT,
    amount
  });
};

export const BANK_WITHDRAW = 'BANK_WITHDRAW';
export const withdraw = (amount) => (dispatch, getState) => {
  if (getState().bank < amount || isNaN(amount)) {
    return;
  }

  dispatch({
    type: BANK_WITHDRAW,
    amount
  });
};

export const UPGRADE_SHIP_STORAGE = 'UPGRADE_SHIP_STORAGE';
export const upgradeShipStorage = (max) => ({
  type: UPGRADE_SHIP_STORAGE,
  max
});

const offerShipUpgrade = () => async (dispatch, getState) => {
  const { cash, ship } = getState();

  const answer = await dispatch(setTravelMessage(
    'A mechanic is offering to upgrade your load capacity by 50kg for 5000$?',
    ['Yes', 'No']
  ));

  if (answer === 'Yes') {
    dispatch(updateCash(cash - 5000));
    dispatch(upgradeShipStorage(ship.storage.max + 50));
  }
};

export const inspection = () => async (dispatch) => {
  await dispatch(setTravelMessage(
    'Two border guards stop you and demand to search your cargo.',
    ['OK']
  ));

  await dispatch(setTravelMessage(
    'They have found illegal materials on your vehicle!\nAll of your cargo and cash have been confiscated.',
    ['Oh no.']
  ));

  await wait();

  dispatch(setShipStocks({
    yarn: 0,
    parts: 0,
    gems: 0,
    coils: 0,
    tomes: 0
  }));

  dispatch(updateCash(0));

  await wait();
};

const storm = () => async (dispatch, getState) => {
  await wait();
  await dispatch(setTravelMessage('Oh no! A thunder storm!\nYou\'ve lost some of your cargo...'));
  await wait();

  const { ship } = getState();
  const { storage } = ship;
  const { contents } = storage;

  // TODO: Remove only some of these
  dispatch(setShipStocks({
    yarn: Math.floor(contents.yarn / 1.2),
    parts: Math.floor(contents.parts / 1.2),
    gems: Math.floor(contents.gems / 1.2),
    coils: Math.floor(contents.coils / 1.2),
    tomes: Math.floor(contents.tomes / 1.2)
  }));
};

export const sail = (islandID) => async (dispatch, getState) => {

  const {
    cash,
    destinations,
    ship,
  } = getState();
  const oldDate = getState().date;
  const destination = destinations.filter(d => d.id === islandID)[0].name;

  // Start showing any travelling messages in the UI
  dispatch(setCurrentScene(UI_SCENES.IS_TRAVELLING));

  // Do any stuff during travel
  // Pirates
  // Storm
  // etc
  dispatch(setTravelMessage('Travelling ...'));

  // chance of storm
  if (Math.random() > 0.98) {
    await dispatch(storm());
  }

  // Resume travel
  dispatch(setTravelMessage('Travelling ...'));
  await wait();

  // TODO: date should advance properly. (Distances between destinations matter?)

  dispatch({
    type: SET_DATE,
    date: {
      ...oldDate,
      day: oldDate.day + 1
    }
  });

  // Arrive at destination
  dispatch({ type: ARRIVE, islandID });
  dispatch(setTravelMessage(`Arrived in ${destination}`));
  await wait();

  // Chance for ship inspection!
  if (ship.storage.contents.tomes > 0 && Math.random() > 0.85) {
    await dispatch(inspection());
  }

  // Chance for storage upgrade!
  if (cash >= 5000 && Math.random() > 0.90) {
    await dispatch(offerShipUpgrade());
  }

  if (getState().date.season === 'end' && getState().date.day === 150) {
    dispatch(setTravelMessage('Your year of adventuring and plunder is up!\n\nYou are being forced into retirement.'));
    await wait();
    await wait();
    Router.push('/retire');
  }

  else {
    // Clear messages, show options
    dispatch(setCurrentScene(UI_SCENES.NULL));
  }
};

export const BORROW = 'BORROW';
export const borrow = (amount) => (dispatch, getState) => {

  if (isNaN(amount)) {
    return;
  }

  dispatch({
    type: BORROW,
    amount
  });
};


export const REPAY = 'REPAY';
export const repay = (amount) => (dispatch, getState) => {
  if (getState().cash < amount || isNaN(amount)) {
    return;
  }

  if (amount > getState().loan) {
    amount = getState().loan;
  }

  dispatch({
    type: REPAY,
    amount
  });
};



