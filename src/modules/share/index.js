import './index.scss'
import {InputItem, TextareaItem, Toast} from 'antd-mobile';
import AppBase, {MyRadio, MyPicker, MyInput, $api, $app, $items,$wechat} from 'components/scripts/index';
import Filter from './filter';
import FilterItem from './filter-item';

export default class extends AppBase {
  state = {
    sex: true,
    project: '',
    styles: [],
    price: '',
    hasStyle: false,
    hasProject: false,
    hasDisabled: true,
    projectList: [],
    budgetList: [],
    name: '',
    phone: '',
    wechat: '',
    remark: '',
  };

  componentWillMount() {
    this.init();
  }

  init() {
    this._getProjectType().then(res => {
      this.setState({
        projectList: res[0].data,
        budgetList: res[1].data.map(item => {
          item.value = item.label;
          return item;
        })
      });
    })
  }

  _getProjectType() {
    return $api.all([$api.dictionaries('get', 'project_type'), $api.dictionaries('get', 'purchase_budget')]);
  }

  _onSex(hasSex) {
    if (hasSex) {
      this.setState({
        sex: true
      })
    } else {
      this.setState({
        sex: false
      })
    }
  }

  _onSearch(key) {
    let newKey = [];
    if (key.length > 0) {
      newKey = key;
    }

    this.setState({
      hasStyle: false,
      styles: newKey
    })
  }

  _openStyle() {
    this.setState({
      hasStyle: true
    })
  }

  _openProject() {
    this.setState({
      hasProject: true
    })
  }

  _onChange(inField, inItem) {
    this.setState({
      [inField]: inItem,
      hasProject: false
    })
  }

  _verification() {
    const {name, phone} = this.state;
    if (name && phone) {
      this.setState({
        hasDisabled: false
      })
    } else {
      this.setState({
        hasDisabled: true
      })
    }
  }

  _onSubmit() {
    this._customers().then(res => {
      Toast.success('推荐成功');
      setTimeout(() => {
        this.props.history.push('/client/list')
      }, 1000)
    })
  }

  _customers() {
    const {name, sex, phone, wechat, project, styles, price, remark} = this.state;
    let newStyles = styles.map((item) => {
      return item.id;
    });
    return $api.customers('post', {
      mobilePhone: $app.trim(phone),
      name: name,
      projectType: project.id,
      purchaseBudget: price,
      remark: remark,
      sex: sex ? '男' : '女',
      styles: newStyles,
      weiXin: wechat
    }, 'recommend');
  }

  _onPriceSelect(inItem) {
    this.setState({
      price: inItem[0]
    })
  }
  componentDidMount() {
    $wechat.updateTitle('推荐-逻辑分享家');
    $wechat.settingShare();
  }
  render() {
    const {sex, project, styles, hasStyle, hasProject, projectList, budgetList, hasDisabled} = this.state;

    return (
      <section className="share-index wp-bgf bg-f">
        <article className="hd bg-primary c-f tc f12">
          <div className="hd-tip f13">温馨提示：详细的被推荐人信息能提高成单率，手机号必填项</div>
        </article>
        <article className="bd">
          <MyInput title="被推荐人称呼：" placeholder="请输入被推荐人称呼" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'name')}/>
          <div className="row row-center row-no-padding wp-item wp-auto wp-10">
            <div className="left tl f15">
              性别：<span className="c-da f14">*</span>
            </div>
            <div className="col tl">
              <MyRadio className="mr5" active={sex} onClick={this._onSex.bind(this, true)}/>
              <span className="f14 c-37">男</span>
              <MyRadio className="mr5" active={!sex} onClick={this._onSex.bind(this, false)}/>
              <span className="f14 c-37">女</span>
            </div>
          </div>
          <div className="line-d-1"/>
          <MyInput title="被推荐人电话：" type="phone" placeholder="请输入手机号" left={true} required={true}
                   onChange={this.inputChange.bind(this, 'phone')}/>
          <MyInput title="被推荐人微信：" placeholder="请输入微信" left={true}
                   onChange={this.inputChange.bind(this, 'wechat')}/>
          <div className="row row-center row-no-padding wp-item">
            <div className="left f15 c-37 pl15">项目类型：</div>
            <div className="right">
               <span className="wx-select f14 c-37" onClick={this._openProject.bind(this)}>{project.label || '选择'} <i
                 className="iconfont wx-arrow-left"/></span>
            </div>
          </div>
          <div className="line-d-1"/>
          <div className="row row-center row-no-padding wp-item">
            <div className="left f15 c-37 pl15">风格喜好：</div>
            <div className="right">
              <span className="wx-select f14 c-37" onClick={this._openStyle.bind(this)}>
              {
                styles.length === 0 && <span className="f14 c-37">选择</span>
              }
                {
                  styles.length > 0 && styles.map((item, index) => {
                    return <span key={index} className="f14 c-37">{index === 0 ? '' : '/'}{item.label}</span>
                  })
                } <i className="iconfont wx-arrow-left"/></span>
            </div>
          </div>
          <div className="line-d-1"/>
          <MyPicker lists={budgetList} onSelect={this._onPriceSelect.bind(this)}>采购预算（万元）</MyPicker>
          <div className="line-d-1"/>
          <TextareaItem title="备注信息：" className="pr10" rows={4} placeholder="您的建议对我们十分宝贵"
                        onChange={this.inputChange.bind(this, 'remark', this._verification.bind(this))}/>

        </article>

        <article className="fd wp-fd bottom">
          <div className="line-d-1"/>
          <button className="button button-primary" onClick={this._onSubmit.bind(this)}>提交
          </button>
        </article>
        <Filter visible={hasStyle} onSearch={this._onSearch.bind(this)}/>
        <FilterItem visible={hasProject} title="项目类型" lists={projectList}
                    onChange={this._onChange.bind(this, 'project')}/>
      </section>
    )
  }
}
