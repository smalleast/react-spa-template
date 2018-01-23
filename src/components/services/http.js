import nxAxios from 'react-axios';
import Config from './config';
import Q from 'q';
import $store from 'react-store';
import {Toast} from 'antd-mobile';

const WeiPaiHttp = nx.declare({
  extends: nxAxios,
  statics: {
    instance: null,
    getInstance: function () {
      if (!WeiPaiHttp.instance) {
        WeiPaiHttp.instance = new WeiPaiHttp();
      }
      return WeiPaiHttp.instance;
    }
  },
  methods: {
    init: function () {
      const env = nx.hashlize().env;
      this.$base.init.call(this);
      this.initHeaders();
      this.setDefaults({
        timeout: 600000,
        baseURL: Config.SERVER_URL || './'
      });
    },
    initHeaders: function () {

    },
    error: function (errorResponse) {
      const defer = Q.defer();
      let errorData = errorResponse.data;
      switch (errorData.status_code) {
        case 401:
          Toast.fail('登录已失效');
          $store.clear('token');
          break;
        case 400:
          Toast.fail(errorData.message);
          break;
        default:
          Toast.fail('服务器错误');
          break;
      }
      return defer.reject(errorResponse);
    },
    toData: function (inResponse) {
      return inResponse.data;
    },
    authorization: function (inRequest) {
      const {token} = $store.local;
      if (token) {
        inRequest.headers.common['Authorization'] = token.accessToken;
      }
      return inRequest;
    }
  }
});

export default WeiPaiHttp.getInstance();



