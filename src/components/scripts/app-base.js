import 'resolution';
import FastClick from 'fastclick';
import {ReduxAppBase} from 'd-react-redux';
import NxDomEvent from 'd-dom-event';
import $api from '../services/api';
import Wechat from '../services/wechat';


export default class AppBase extends ReduxAppBase {


  constructor(props) {
    super(props);

    //polyfill Promise:
    require('es6-promise').polyfill();

    //fastclick:
    FastClick.attach(document.body);
    Wechat.sign(false);
  }

  inputChange(inField, inCallback, inEvent) {
    console.log(inField, inCallback, inEvent);
    let newEvent = typeof inCallback === 'function' ? inEvent : inCallback;
    this._callback = inCallback || nx.noop;
    this.setState({[inField]: typeof newEvent === 'object' ? newEvent.target.value : newEvent}, () => {
      if (this._callback && typeof this._callback === 'function') {
        this._callback();
      }
    });
  }



  _EmptyChange(inField, inBool) {
    console.log(inBool);
    this.setState({
      [inField]: inBool
    })
  }

  _getInfo() {
    return $api.user('get', '', 'info');
  }

  componentWillMount() {


    this.registReloadEvent();
  }

  onScrolling() {

  }

  registReloadEvent() {
    window.onpageshow = (event) => {
      if (event.persisted) {
        AppBase.command('page.iosInit');
      }
    };

    NxDomEvent.on(window, 'scroll', () => {
      this.onScrolling();
    });
  }

}

