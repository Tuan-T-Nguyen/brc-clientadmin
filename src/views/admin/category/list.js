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
import CategoryListItem from './CategoryListItem';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import CategoryApplicationMenu from './CategoryApplicationMenu';
import AddNewCategoryModal from './AddNewCategoryModal';
import {
  getCategoryList,
  getCategoryListWithOrder
} from '../../../redux/actions';

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

  changeOrderBy = column => {
    this.props.getCategoryListWithOrder(column);
  };

  render() {
    const { t } = this.props;
    const {
      reduceCategories,
      loading,
      selectedItems,
      errorGetList,
      orderColumns,
      orderColumn,
      searchKeyword
    } = this.props.categoryRedux;
    const { modalOpen } = this.state;
    return (
      <>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>{t('menu.category')}</h1>
              {!loading && !errorGetList && (
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
                        checked={
                          selectedItems.length >= reduceCategories.length
                        }
                        onClick={() => this.handleChangeSelectAll()}
                        onChange={() => this.handleChangeSelectAll()}
                        label={
                          <span
                            className={`custom-control-label ${
                              selectedItems.length > 0 &&
                              selectedItems.length < reduceCategories.length
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
              <Breadcrumb match={this.props.match} t={t} />
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                id="displayOptions"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                {t('todo.display-options')}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      {`${t('title.orderby')} ${
                        orderColumn ? orderColumn.label : ''
                      }`}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder={t('menu.search')}
                      defaultValue={searchKeyword}
                      onKeyPress={e => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {!loading ? (
                reduceCategories.map(item => (
                  <CategoryListItem
                    key={item.id}
                    item={item}
                    handleCheckChange={this.handleCheckChange}
                    isSelected={
                      loading ? selectedItems.includes(item.id) : false
                    }
                  />
                ))
              ) : (
                <div className="loading" />
              )}
            </Row>
            {!loading && <CategoryApplicationMenu />}
            <AddNewCategoryModal
              toggleModal={this.toggleModal}
              modalOpen={modalOpen}
            />
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
  getCategoryList,
  getCategoryListWithOrder
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(CategoryList)
);
