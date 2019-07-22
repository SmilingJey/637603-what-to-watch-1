import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {ActionCreator as UserActionCreator} from '../../reducers/user/actions';

import {UserData} from '../../types';

import Footer from '../../components/footer/footer';
import {getAuthorisationError, getAuthorisationSubmitting, getUserData} from '../../reducers/user/selectors';

interface SignInFormValues {
  ['user-email']: string,
  ['user-password']: string,
}

interface Props {
  submitting: boolean,
  userData: UserData,
  submitError: string,
  submitAuthorisation: (SignInFormValues) => void;
}

class SignInPage extends React.PureComponent <Props, null> {

  render() {
    const {submitAuthorisation, submitting, userData, submitError} = this.props;
    if (userData) {
      return <Redirect to="/" />;
    }

    return <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <Formik
          initialValues={{['user-email']: ``, ['user-password']: ``}}
          validate={(values) => {
            const errors = {};
            if (!values['user-email']) {
              errors['user-email'] = 'Required';
            }
            if (!values['user-password']) {
              errors['user-password'] = 'Required';
            }
            return errors;
          }}
          onSubmit={(values: SignInFormValues) => {
            submitAuthorisation(values);
          }}
        >
          {() => (
              <Form className="sign-in__form">
                <div className="sign-in__message">
                  <p>Enter any valid email and any password, registration is not working yet</p>
                </div>
                {submitError &&
                <div className="sign-in__message">
                  <p>{submitError}</p>
                </div>}
                <div className="sign-in__fields">
                  <div className="sign-in__field">
                    <Field className="sign-in__input"
                           type="text" placeholder="Email address"
                           name="user-email"
                           id="user-email"
                    />
                    <label className="sign-in__label visually-hidden"
                           htmlFor="user-email">
                      Email address
                    </label>
                  </div>
                  <div className="sign-in__field">
                    <Field className="sign-in__input"
                           type="password"
                           placeholder="Password"
                           name="user-password"
                           id="user-password"/>
                    <label className="sign-in__label visually-hidden"
                           htmlFor="user-password">
                      Password
                    </label>
                  </div>
                </div>
                <div className="sign-in__submit">
                  <button className="sign-in__btn" type="submit"
                          disabled={submitting}>
                    Sign in
                  </button>
                </div>
              </Form>
            )}
        </Formik>
      </div>
      <Footer />
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  submitting: getAuthorisationSubmitting(state),
  userData: getUserData(state),
  submitError: getAuthorisationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitAuthorisation: (data) => dispatch(UserActionCreator.submitAuthorisation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
