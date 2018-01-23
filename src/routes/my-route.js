import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import Layouts from '../layouts/index';
import {$store} from "components/scripts/index";

const propTypes = {
  isBar: PropTypes.bool,
  isAuth: PropTypes.bool,
  component: PropTypes.func.isRequired
};


function MyRoute({
                   component: Component,
                   isAuth = false,
                   isBar = true,
                   ...rest
                 }) {
  const {token} = $store.local;
  return (
    <div>
      {
        isAuth && !token &&<Route
          {...rest}
          render={_props => {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {from: _props.location}
                }}
              />
            )
          }
          }
        />
      }
      {
        (!isAuth||token) && <div><Route
          {...rest}
          render={_props => {
            return (
              <Component {..._props} />
            )
          }
          }
        />
          {
            isBar && <Layouts/>
          }
        </div>
      }


    </div>
  );
}

MyRoute.propTypes = propTypes;

export default MyRoute;
