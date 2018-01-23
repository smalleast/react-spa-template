import './index.scss'
import {Link} from 'react-router-dom';
import AppBase, {RA, $store, $wechat, $api, $app} from "components/scripts/index";
import {Toast} from 'antd-mobile';

export default class extends AppBase {
  state = {
    logo: '',
  };

  _onClickAvatar() {
    $wechat.chooseImages({count: 1}).then(res => {
      if (res.errMsg === 'chooseImage:ok') {
        let localId = res.localIds[0];
        return this._uploadImage(localId);
      }
      else {
        Toast.fail('选图出错了,请重试');
      }

    }).then(res => {
      let serverId = res.serverId;
      return this._downloadImage(serverId);
    }).then(res => {
      let localId = res.localId;
      return this._getImageData(localId)
    }).then(res => {
      let localData = res.localData;
      if (res.localData.indexOf('base64') > -1) {
        localData = res.localData.replace(/^.*?,/, '');
      }
      return this._uploadOss(localData);
    }).then(res => {
      let id = res.data.id;
      return this._avatar(id);
    }).then(res => {
      return this._getInfo();
    }).then(res => {
      let _info = res.data;
      $store.local = {
        info: _info
      };
      this._getLogo();
    })
  }

  _chooseImages() {
    return $wechat.chooseImages({count: 1});
  }

  _uploadImage(localId) {
    return $wechat.uploadImage(localId);
  }

  _downloadImage(serverId) {
    return $wechat.downloadImage(serverId);
  }

  _getImageData(localId) {
    return $wechat.getImageData(localId);
  }

  _uploadOss(inBase) {
    return $api.files('post', {base64: inBase, type: 1}, 'wei_xin_upload');
  }

  _avatar(id) {
    return $api.user('put', {avatarFile: {id: id}}, 'avatar');
  }

  _getLogo() {
    let {info} = $store.local;
    if (info.avatarFile) {
      this.setState({
        logo: $app.toImg(info.avatarFile.key)
      })
    }
  }

  componentWillMount() {
    this._getLogo();
  }

  componentDidMount() {
    $wechat.updateTitle('个人资料-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {logo} = this.state;
    const {info} = $store.local;
    return (
      <section className="my-info wp-bgef">
        <div className="hd bg-f">
          <div className="row row-center row-no-padding wp-auto" onClick={this._onClickAvatar.bind(this)}>
            <div className="left f15 c-37">
              头像
            </div>
            <div className="col tr">
              <RA url={logo || 'http://zhulogic-formal.oss-cn-hangzhou.aliyuncs.com/market_icon/icon%20copy.png'}
                  size=".98rem"/>
            </div>
            <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
          </div>
        </div>
        <div className="bd">
          <div className="line-d-1"/>
          <Link to="/my/info/name">
            <div className="row row-center row-no-padding wp-auto-p bg-f wp-item">
              <div className="left tl f15 c-37">用户名</div>
              <div className="right col tr">
                <span className="f15 c-b5">{info.realName}</span>
              </div>
              <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
            </div>
          </Link>
          <div className="mt10"/>
          <Link to="/my/info/phone">
            <div className="row row-center row-no-padding wp-auto-p bg-f wp-item">
              <div className="left tl f15 c-37">电话号码</div>
              <div className="center col tr">
                <span className="f15 c-b5">{info.mobilePhone}</span>
              </div>
              <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
            </div>
          </Link>
          <div className="line-d-1"/>
          {
            info.identityType === 1 && <Link to="/my/info/up">
              <div className="row row-center row-no-padding wp-auto-p bg-f wp-item">
                <div className="left tl f15 c-37">独立分享家</div>
                <div className="center col tr">
                  <span className="f15 c-b5">去升级</span>
                </div>
                <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
              </div>
            </Link>
          }
          {
            info.identityType === 2 && <div className="row row-center row-no-padding wp-auto-p bg-f wp-item">
              <div className="left tl f15 c-37">机构分享家</div>
              <div className="center col tr">
                <span className="f15 c-b5">已绑定</span>
              </div>
              <div className="right ml15"><i className="iconfont wx-arrow-left"/></div>
            </div>
          }
          <div className="line-d-1"/>
          <Link to="/my/info/set">
            <div className="row row-center row-no-padding wp-auto-p bg-f wp-item">
              <div className="left tl f15 c-37">修改登录密码</div>
              <div className="right col tr">
                <i className="iconfont wx-arrow-left"/>
              </div>
            </div>
          </Link>
        </div>
      </section>
    )
  }
}
