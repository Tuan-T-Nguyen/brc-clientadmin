import React, { Component } from 'react';
import { Row, Card, CardTitle, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';

class Login extends Component {
  componentWillReceiveProps = nextProp => {
    const { t } = nextProp;
    if (!nextProp.loading && nextProp.error) {
      NotificationManager.error(
        t('user.login-error-description'),
        t('user.login-error'),
        2000,
        null,
        null,
        'filled'
      );
    }
  };

  handleSubmit = values => {
    // eslint-disable-next-line no-shadow
    const { loginUser, history } = this.props;
    loginUser(values, history);
  };

  render() {
    const { loading, t } = this.props;
    const LoginSchema = Yup.object().shape({
      email: Yup.string()
        .email(t('common.invalid-email'))
        .required(t('common.required-email')),
      password: Yup.string().required(t('common.required-password'))
    });
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">{t('user.login-description')}</p>
            </div>
            <div className="form-side">
              <div className="logo-single d-block mx-auto" />
              <CardTitle className="mb-4">
                <span>{t('user.login-title')}</span>
              </CardTitle>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  await this.handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form noValidate>
                    <Label className="form-group has-float-label mb-4">
                      <Field
                        className="form-control"
                        type="email"
                        name="email"
                      />
                      <span>{t('user.email')}</span>
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                    </Label>
                    <Label className="form-group has-float-label mb-4">
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                      />
                      <span>{t('user.password')}</span>
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      ) : null}
                    </Label>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary btn-primary-gradient"
                        className="btn-shadow mx-auto"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {loading ? (
                          <i className="mr-2 fas fa-spinner fa-spin" />
                        ) : null}
                        {t('user.login-button')}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

const mapActionToProps = { loginUser };

export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(Login)
);
