import Head from 'next/head';
import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';

class NomadicPunks extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>{'Nomadic Punks Trader'}</title>
          <meta name="description" content="A Taipan-like game of profit and adventure in a nomadic world of tribes."/>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(NomadicPunks);
