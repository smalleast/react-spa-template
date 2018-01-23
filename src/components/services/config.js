let NODE_ENV = process.env.NODE_ENV;
let PUBLISH_VERSION = '1.0.0';
let IMG_SERVER = 'http://zhulogic-marketing.oss-cn-shanghai.aliyuncs.com';
let SERVER_URL = NODE_ENV === 'development' ? 'http://test.zhulogic.com:8040' : 'http://webapi.zhulogic.com:8040';
//let SERVER_URL = NODE_ENV === 'development' ? 'http://192.168.10.26:8040' : 'http://webapi.zhulogic.com';

export default class {
  static IMG_SERVER = IMG_SERVER;
  static SERVER_URL = SERVER_URL;
  static PUBLISH_VERSION = PUBLISH_VERSION;
  static API_WITH_TOKEN = {
    baseUrl: '/marketing_api/',
    items: [
      'user',
      'projects',
      'customers',
      'commission',
      'development_broker',
      'messages',
      'dictionaries',
      'weChat',
      'banners',
      'files'
    ]
  };

}
