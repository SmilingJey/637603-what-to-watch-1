import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {getUserData} from '../../reducers/user/selectors';
import {ActionCreator} from '../../reducers/user/actions';
import {UserData} from '../../types';

interface Props {
  userData: UserData,
  onLogout: () => void,
}

class UserBlock extends React.PureComponent<Props, null> {
  render() {
    const {userData, onLogout} = this.props;
    return <div className="user-block">
      {userData ?
        <>
          <div className="user-block__avatar">
            <Link to="/mylist">
              <img src={userData.avatarUrl} alt="User avatar" width="63" height="63"/>
            </Link>
          </div>
          <Link to="" onClick={onLogout} className="user-block__link">Logout</Link>
        </> :
        <Link to={"/login"} className="user-block__link">Sign in</Link>
      }
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(ActionCreator.authorisationLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);
