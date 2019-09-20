import React, { Component } from 'react';
import { Row, Card, CardTitle, Form, Label, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@gogo.com',
      password: 'gogo123'
    };
  }
  onUserLogin() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.loginUser(this.state, this.props.history);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use your credentials to login.
                <br />
                If you are not a member, please{' '}
                <NavLink to={`/register`} className="white">
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">{t('user.login-title')}</CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  {t('user.email')}
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password" />
                  {t('user.password')}
                </Label>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/forgot-password`}>
                    {t('user.forgot-password-question')}
                  </NavLink>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserLogin()}
                  >
                    {t('user.login-button')}
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default withTranslation()(
  connect(
    mapStateToProps,
    {
      loginUser
    }
  )(Login)
);
