import {Tabs} from 'antd-mobile';
import AppBase, {$wechat} from 'components/scripts/index';

export default class extends AppBase {
  state = {
    tabs:
      [
        {
          title: '佣金规则',
          lists: []
        },
        {
          title: '常见问题'
          ,
          lists: []
        }
      ]
  };

  componentDidMount() {
    $wechat.updateTitle('关于-逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    const {tabs} = this.state;
    return (<section className="my-about bg-f">
      <div className="bg-f">
        <Tabs tabs={tabs} initialPage={0} animated={true} swipeable={false}>
          <div className="my-about-list wp-auto-p wp-bgf" key={0}>
            <div className="my-about-list-item">
              <div className="f16 c-37 mt20 mb15">佣金规则说明</div>
              <div className="f14 c-37 lh28">
                <p className="f15 bold c-37">1、佣金如何计算？</p>
                <p className="f14 c-37">您推荐的客户成功下单后，我们会按订单金额的5%给您计算佣金。
                  <br/>如订单金额为30万元，则佣金为30万*5%=15000元</p>
                <p className="f15 bold c-37">2、佣金提现的方式和时间？</p>
                <p className="f14 c-37">在个人中心，点击佣金—提现，绑定个人银行卡，即可完成佣金体提现。预计2天内，佣金会提现到账。</p>
              </div>
            </div>

          </div>
          <div className="my-about-list wp-auto bg-f" key={1}>
            <div className="my-about-list-item">
              <div className="f16 c-37 mt20 mb15">常见问题说明</div>
              <div className="f14 c-37 lh28">
                <p className="f15 bold c-37">1、逻辑分享家的服务流程是怎样的？</p>
                <p className="f14 c-37">我们的服务流程一般包括软装设计沟通、智能生产、交付安装和售后四个部分。<br/>
                  A、软装设计沟通<br/>
                  项目信息提交后24小时内，会有专人跟客户沟通，了解项目详细信息、设计要求及时间进度，设计师为客户设计软装搭配方案。方案确定后，报价人员会设计方案出具商品清单及预算。如客户已有软装方案可直接进行报价生产。  <br/>
                  B、智能生产<br/>
                  设计师跟客户确认家具的的面料和色板，确认无误后安排生产，同时计算工期。智慧工业4.0系统通过线上流程管理和大数据算法分析，更精准的把控生产品质，降低生产成本。
                  <br/>
                  C、安心交付<br/>
                  逻辑分享家自建物流与安装团队，8小时交钥匙法则，全品类全天侯，交付无忧。
                  <br/>

                  D、贴心售后<br/>
                  严格执行国家三包服务政策，用品质保驾护航，用态度践行服务，用真心赢得赞赏</p>
                <p className="f15 bold c-37">2、我的个人信息会保密么？</p>
                <p className="f14 c-37">您的所有个人信息都会经过加密处理，我们不会向任何人和机构透露您的个人信息。</p>
              </div>
            </div>

          </div>
        </Tabs>
        <div className="blank-50"/>
      </div>
    </section>)
  }
}
