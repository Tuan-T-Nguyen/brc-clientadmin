import React, { Component } from 'react';
import { Row, Card, CardTitle, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Colxx } from '../components/common/CustomBootstrap';

class Error extends Component {
  componentDidMount() {
    document.body.classList.add('background');
  }

  componentWillUnmount() {
    document.body.classList.remove('background');
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white mb-0">Yes, it is indeed!</p>
                  </div>
                  <div className="form-side">
                    <NavLink to="/" className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      {t('pages.error-title')}
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      {t('pages.error-code')}
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/admin"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      {t('pages.go-back-home')}
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </>
    );
  }
}
export default withTranslation()(Error);
