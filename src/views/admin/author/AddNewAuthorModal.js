/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FormikDatePicker } from '../../../containers/form-validation/FormikFields';
import { NotificationManager } from '../../../components/common/react-notifications';

import { apiCreateAuthor } from '../../../services/author';
import { getAuthorPagingList } from '../../../redux/actions';

import { DATE_FORMAT } from '../../../constants/defaultValues';

class AddNewAuthorModal extends Component {
  handleSubmit = async values => {
    const { t, toggleModal, item } = this.props;
    const res = !item
      ? await apiCreateAuthor(values)
      : await apiCreateAuthor(item.id, values); // todo change api
    if (!res.status) {
      NotificationManager.error(
        item ? t('category.update-error') : t('category.create-error'),
        res.msg,
        3000,
        () => {},
        null,
        'filled'
      );
    } else {
      NotificationManager.primary(
        item ? t('category.update-success') : t('category.create-success'),
        '',
        3000,
        () => {},
        null,
        'filled'
      );
      this.props.getAuthorPagingList(1, '');
      toggleModal();
    }
  };

  render() {
    const { modalOpen, toggleModal, t, item } = this.props;
    const AuthorSchema = Yup.object().shape({
      name: Yup.string().required(t('category.required-englishname')),
      description: Yup.string(),
      bornDate: Yup.date(),
      dieDate: Yup.date(),
      avatarUrls: Yup.array().of(Yup.string())
    });

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <Formik
          initialValues={{
            name: item ? item.name : '',
            description: item ? item.description : '',
            bornDate: item ? item.bornDate : '',
            dieDate: item ? item.dieDate : '',
            avatarUrls: []
          }}
          validationSchema={AuthorSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
            <Form>
              <ModalHeader toggle={toggleModal}>
                {item ? t('category.update') : t('category.add-new')}
              </ModalHeader>
              <ModalBody>
                <FormGroup className="has-float-label mt-4">
                  <Label>{t('category.english-name')}</Label>
                  <Field className="form-control" name="name" type="text" />
                  {errors.name && touched.name ? (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="has-float-label">
                  <Label>{t('category.vietnam-name')}</Label>
                  <Field
                    className="form-control"
                    name="description"
                    type="text"
                  />
                  {errors.description && touched.description ? (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="has-float-label">
                  <Label>{t('category.vietnam-name')}</Label>
                  <FormikDatePicker
                    name="bornDate"
                    value={values.bornDate}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.bornDate && touched.bornDate ? (
                    <div className="invalid-feedback d-block">
                      {errors.bornDate}
                    </div>
                  ) : null}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" outline onClick={toggleModal}>
                  {t('title.cancel')}
                </Button>
                <Button color="primary" type="submit">
                  {t('title.submit')}
                </Button>{' '}
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapActionToProps = { getAuthorPagingList };
export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(AddNewAuthorModal)
);
