import React, { Component } from 'react';
import { Row, Card, CardTitle, Form, Label, Input, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { registerUser } from '../../redux/actions';

import { Colxx } from '../../components/common/CustomBootstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@gogo.com',
      password: 'gogo123',
      name: 'Sarah Kortney'
    };
  }
  onUserRegister() {
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.history.push('/');
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
                Please use this form to register. <br />
                If you are a member, please{' '}
                <NavLink to={`/login`} className="white">
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">{t('user.register')}</CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="name" defaultValue={this.state.name} />
                  {t('user.fullname')}
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  {t('user.email')}
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password" />
                  {t('user.password')}
                </Label>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserRegister()}
                  >
                    {t('user.register-button')}
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
      registerUser
    }
  )(Register)
);
