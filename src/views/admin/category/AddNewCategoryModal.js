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
import { FormikRadioButtonGroup } from '../../../containers/form-validation/FormikFields';
import { NotificationManager } from '../../../components/common/react-notifications';

import { apiCreateCategory } from '../../../services/category';
import { getCategoryList } from '../../../redux/actions';

const typeOptions = [
  { value: 'fiction', label: 'Fiction' },
  { value: 'non-fiction', label: 'Non Fiction' }
];

class AddNewCategoryModal extends Component {
  handleSubmit = async values => {
    const { t, toggleModal } = this.props;
    const res = await apiCreateCategory(values);
    console.log(res);
    if (!res.status) {
      NotificationManager.error(
        t('category.create-error'),
        res.msg,
        3000,
        () => {},
        null,
        'filled'
      );
    } else {
      NotificationManager.primary(
        t('category.create-success'),
        '',
        3000,
        () => {},
        null,
        'filled'
      );
      this.props.getCategoryList();
      toggleModal();
    }
  };

  render() {
    const { modalOpen, toggleModal, t } = this.props;
    const CategorySchema = Yup.object().shape({
      englishName: Yup.string().required(t('category.required-englishname')),
      vietnamName: Yup.string().required(t('category.required-vietnamname')),
      type: Yup.string().required(t('category.required-type'))
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
            englishName: '',
            vietnamName: '',
            type: ''
          }}
          validationSchema={CategorySchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
            <Form>
              <ModalHeader toggle={toggleModal}>
                {t('category.add-new')}
              </ModalHeader>
              <ModalBody>
                <FormGroup className="has-float-label mt-4">
                  <Label>{t('category.english-name')}</Label>
                  <Field
                    className="form-control"
                    name="englishName"
                    type="text"
                  />
                  {errors.englishName && touched.englishName ? (
                    <div className="invalid-feedback d-block">
                      {errors.englishName}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="has-float-label">
                  <Label>{t('category.vietnam-name')}</Label>
                  <Field
                    className="form-control"
                    name="vietnamName"
                    type="text"
                  />
                  {errors.vietnamName && touched.vietnamName ? (
                    <div className="invalid-feedback d-block">
                      {errors.vietnamName}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="">
                  <Label className="d-block">{t('category.type')}</Label>
                  <FormikRadioButtonGroup
                    inline
                    name="type"
                    id="type"
                    label="One of these please"
                    value={values.radioGroup}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={typeOptions}
                  />
                  {errors.type && touched.type ? (
                    <div className="invalid-feedback d-block">
                      {errors.type}
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

function mapStateToProps() {
  return {};
}

const mapActionToProps = { getCategoryList };

export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(AddNewCategoryModal)
);
