import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getUserData, getAuthorisationRequest} from '../../reducers/user/selectors';

const withAuthorizationRequire = (Component) => {
  const WithAuthorizationRequired = (props) => {
    if (props.waitGetAuthorisation) {
      return <></>;
    }

    if (!props.userData) {
      return <Redirect to={'/login'}/>;
    }

    return <Component {...props} />;
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    userData: getUserData(state),
    waitGetAuthorisation: getAuthorisationRequest(state)
  });

  return connect(mapStateToProps)(WithAuthorizationRequired);
};

export default withAuthorizationRequire;
