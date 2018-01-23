import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import MyRoute from './my-route';
import Home from '../modules/home/index';
import HomeBanner from '../modules/home/banner';
import HomeVideo from '../modules/home/video';
import {
  DomeList,
  DomeDetail
} from '../modules/dome/index';

import Share from '../modules/share/index';
import {ClientList, ClientDetail} from '../modules/client/index';
import {
  MyIndex,
  Brokerage,
  BrokerageWait,
  BrokerageWithdraw,
  BrokerageWithdrawSelect,
  BrokerageSuccess,
  Message,
  Recommend,
  RecommendList,
  RecommendShare,
  Info,
  InfoName,
  InfoPhone,
  InfoShareUp,
  InfoSetPassword,
  BankList,
  BankAdd,
  HelpRule,
  HelpQuestion,
  HelpFeedback,
  About
} from '../modules/my/index';
import {
  Login,
  Register,
  Forget
} from '../modules/account/index';
import Protocol from '../modules/protocol/index';


function Layout({logged}) {
  return (
    <div>
      <Switch>
        <MyRoute isBar={true} isAuth={false} exact={true} path="/home" component={Home}/>
        <MyRoute isBar={false} isAuth={false} path="/home/banner" component={HomeBanner}/>
        <MyRoute isBar={false} isAuth={false} path="/home/video" component={HomeVideo}/>
        <MyRoute isBar={true} isAuth={false} path="/dome/list" component={DomeList}/>
        <MyRoute isBar={false} isAuth={false} path="/dome/detail/:id" component={DomeDetail}/>
        <MyRoute isBar={false} isAuth={true} path="/share" component={Share}/>
        <MyRoute isBar={false} isAuth={false} path="/protocol" component={Protocol}/>
        <MyRoute isBar={true} isAuth={true} path="/client/list" component={ClientList}/>
        <MyRoute isBar={false} isAuth={true} path="/client/detail/:id/:customerId" component={ClientDetail}/>
        <MyRoute isBar={true} isAuth={true} path="/my/index" component={MyIndex}/>
        <MyRoute isBar={false} isAuth={true} exact={true} path="/my/brokerage" component={Brokerage}/>
        <MyRoute isBar={false} isAuth={true} path="/my/brokerage/wait" component={BrokerageWait}/>
        <MyRoute isBar={false} isAuth={true} path="/my/brokerage/withdraw/:id" component={BrokerageWithdraw}/>
        <MyRoute isBar={false} isAuth={true} path="/my/brokerage/withdraw-select" component={BrokerageWithdrawSelect}/>
        <MyRoute isBar={false} isAuth={true} path="/my/brokerage/success/:id" component={BrokerageSuccess}/>
        <MyRoute isBar={false} isAuth={true} path="/my/message" component={Message}/>
        <MyRoute isBar={false} isAuth={false} path="/my/recommend/index" component={Recommend}/>
        <MyRoute isBar={false} isAuth={true} path="/my/recommend/list" component={RecommendList}/>
        <MyRoute isBar={false} isAuth={false} path="/my/recommend/share" component={RecommendShare}/>
        <MyRoute isBar={false} isAuth={true} exact={true} path="/my/info" component={Info}/>
        <MyRoute isBar={false} isAuth={true} path="/my/info/name" component={InfoName}/>
        <MyRoute isBar={false} isAuth={true} path="/my/info/phone" component={InfoPhone}/>
        <MyRoute isBar={false} isAuth={true} path="/my/info/up" component={InfoShareUp}/>
        <MyRoute isBar={false} isAuth={true} path="/my/info/set" component={InfoSetPassword}/>
        <MyRoute isBar={false} isAuth={true} path="/my/bank/list" component={BankList}/>
        <MyRoute isBar={false} isAuth={true} path="/my/bank/add" component={BankAdd}/>
        <MyRoute isBar={true} isAuth={true} path="/my/help/rule" component={HelpRule}/>
        <MyRoute isBar={true} isAuth={true} path="/my/help/question" component={HelpQuestion}/>
        <MyRoute isBar={true} isAuth={true} path="/my/help/feedback" component={HelpFeedback}/>
        <MyRoute isBar={false} isAuth={true} path="/my/about" component={About}/>
        <MyRoute isBar={false} isAuth={false} path="/login" component={Login}/>
        <MyRoute isBar={false} isAuth={false} path="/register" component={Register}/>
        <MyRoute isBar={false} isAuth={false} path="/forget" component={Forget}/>
      </Switch>

    </div>
  );
}

const propTypes = {
  logged: PropTypes.bool.isRequired
};
Layout.propTypes = propTypes;

const mapStateToProps = state => ({
  logged: state.logged
});
export default connect(mapStateToProps)(Layout);
