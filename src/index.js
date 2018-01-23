import './fonts/iconfont.css';
import 'components/styles/index.scss';
import {ReduxBoot} from 'd-react-redux';
import Routes from './routes/index';
import store from './store/createStore';
//ReduxBoot.run(Routes, 'app');
ReactDOM.render(
  React.createElement(Routes,{store}),
  document.getElementById('app')
);
