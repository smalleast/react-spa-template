import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AppBase, {$store} from 'components/scripts/index';

import Layout from './layout';
import store from "../store/createStore";
import {Provider} from 'react-redux';

export default class extends AppBase {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/" forceRefresh={true} keyLength={12}>
          <Route component={Layout}/>
        </Router>
      </Provider>

    )
  }
}
