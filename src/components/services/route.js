import Config from './config';

export default class Route {

  static addUniqueTag(inUrl, dontAdd) {
    if (dontAdd === true) return inUrl;
    const publishVersion = Config.PUBLISH_VERSION;
    let urlArray = location.href.split('#');
    return urlArray[0] + '#' + inUrl;
  }

  static go(inUrl, dontAddTag) {
    location.href = Route.addUniqueTag(inUrl, dontAddTag);
  }

  static replace(inUrl, dontAddTag) {
    location.replace(Route.addUniqueTag(inUrl, dontAddTag));
  }

  static back() {
    window.history.back();
  }
}
