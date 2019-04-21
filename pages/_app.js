import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import makeStore from '../redux/reducers';
import withRedux from 'next-redux-wrapper';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faCheckCircle, faSyncAlt);

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/css/styles.css';

class Main extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
export default withRedux(makeStore)(Main);
