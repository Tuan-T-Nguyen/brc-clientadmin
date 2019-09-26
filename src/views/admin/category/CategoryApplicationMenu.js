/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ApplicationMenu from '../../../components/common/ApplicationMenu';
import { getCategoryListWithFilter } from '../../../redux/actions';

class CategoryApplicationMenu extends Component {
  addFilter = (column, value) => {
    this.props.getCategoryListWithFilter(column, value);
  };

  render() {
    const { categoryRedux, t } = this.props;
    const { filter, labels } = categoryRedux;
    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">{t('category.types')}</p>
            <div>
              {labels.map(l => {
                return (
                  <p className="d-sm-inline-block mb-1 mr-1" key={l.label}>
                    <NavLink
                      to="#"
                      // eslint-disable-next-line no-unused-vars
                      onClick={e => this.addFilter('type', l.label)}
                    >
                      <Badge
                        className="mb-1"
                        color={`${
                          filter &&
                          filter.column === 'type' &&
                          filter.value === l.label
                            ? l.color
                            : `outline-${l.color}`
                        }`}
                        pill
                      >
                        {l.label}
                      </Badge>
                    </NavLink>
                  </p>
                );
              })}
            </div>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}

const mapStateToProps = ({ categoryRedux }) => {
  return {
    categoryRedux
  };
};

const mapActionToProps = {
  getCategoryListWithFilter
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapActionToProps
  )(CategoryApplicationMenu)
);
