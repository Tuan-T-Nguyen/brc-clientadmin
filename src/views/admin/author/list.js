/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Row,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { getAuthorPagingList } from '../../../redux/actions';
import AuthorListItem from './AuthorListItem';
import AddNewAuthorModal from './AddNewAuthorModal';

class AuthorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      displayOptionsIsOpen: false,
      selectedCategory: null,
      modalOpen: false
    };
  }

  componentDidMount() {
    this.props.getAuthorPagingList(1, '');
  }

  toggleDisplayOptions = () => {
    this.setState(prevState => ({
      displayOptionsIsOpen: !prevState.displayOptionsIsOpen
    }));
  };

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  toggleUpdateModal = category => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      selectedCategory: category
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      selectedCategory: null
    }));
  };

  render() {
    const { t, authorRedux } = this.props;
    const {
      pagingAuthors,
      pagingLoading,
      pagingError,
      searchKeyword
    } = authorRedux;
    const { modalOpen, selectedCategory } = this.state;
    return (
      <>
        <Row className="survey-app">
          <Colxx xss="12">
            <div className="mb-2">
              <h1>{t('menu.author')}</h1>
              {!pagingLoading && !pagingError && (
                <div className="float-sm-right">
                  <Button color="primary" size="lg" onClick={this.toggleModal}>
                    {t('title.add-new')}
                  </Button>{' '}
                  <ButtonDropdown
                    isOpen={this.state.dropdownSplitOpen}
                    toggle={this.toggleSplit}
                  >
                    <div className="btn btn-primary pl-4 pr-0 check-button check-all" />
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
              {!pagingLoading ? (
                pagingAuthors.map(author => (
                  <AuthorListItem
                    key={author.id}
                    item={author}
                    toggleUpdateModal={this.toggleUpdateModal}
                  />
                ))
              ) : (
                <div className="loading" />
              )}
            </Row>
            <AddNewAuthorModal
              toggleModal={this.toggleModal}
              modalOpen={modalOpen}
              item={selectedCategory}
            />
          </Colxx>
        </Row>
      </>
    );
  }
}

const mapStateToProps = ({ authorRedux }) => {
  return { authorRedux };
};

const mapActionsToProps = { getAuthorPagingList };
export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(AuthorList)
);
