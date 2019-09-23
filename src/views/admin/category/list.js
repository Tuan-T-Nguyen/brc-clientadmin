/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { getCategoryList } from '../../../redux/actions';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      lastChecked: null,

      displayOptionsIsOpen: false
    };
  }

  componentDidMount() {
    this.props.getCategoryList();
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  render() {
    const { t } = this.props;
    const {
      categories,
      loading,
      selectedItems,
      errorGetList
    } = this.props.categoryRedux;
    const { modalOpen } = this.state;
    return (
      <>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>{t('menu.todo')}</h1>
            </div>
            {loading && errorGetList && (
              <div className="float-sm-right">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={this.toggleModal}
                >
                  {t('title.add-new')}
                </Button>{' '}
                <ButtonDropdown
                  isOpen={this.state.dropdownSplitOpen}
                  toggle={this.toggleSplit}
                >
                  <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                    <CustomInput
                      className="custom-checkbox mb-0 d-inline-block"
                      type="checkbox"
                      id="checkAll"
                      checked={selectedItems.length >= categories.length}
                      onClick={() => this.handleChangeSelectAll()}
                      onChange={() => this.handleChangeSelectAll()}
                      label={
                        <span
                          className={`custom-control-label ${
                            selectedItems.length > 0 &&
                            selectedItems.length < categories.length
                              ? 'indeterminate'
                              : ''
                          }`}
                        />
                      }
                    />
                  </div>
                  <DropdownToggle
                    caret
                    color="primary"
                    className="dropdown-toggle-split pl-2 pr-2"
                  />
                  <DropdownMenu right>
                    <DropdownItem>{t('title.action')}</DropdownItem>
                    <DropdownItem>{t('title.another-action')}</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            )}
          </Colxx>
        </Row>
      </>
    );
  }
}

const mapStateToProps = ({ categoryRedux }) => {
  return { categoryRedux };
};

const mapActionToProps = {
  getCategoryList
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(CategoryList)
);
