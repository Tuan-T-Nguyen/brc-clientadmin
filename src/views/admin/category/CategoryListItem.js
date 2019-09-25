import React from 'react';
import { Card, CardBody, Badge, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

const CategoryListItem = ({ item, handleCheckChange, isSelected }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              id={`toggler${item._id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
              <span className="align-middle d-inline-block">
                {item.englishName}
              </span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.vietnamName}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {item.createdAt}
            </p>
            <div className="w-15 w-xs-100">
              <Badge
                color={item.type === 'fiction' ? 'primary' : 'secondary'}
                pill
              >
                {item.type}
              </Badge>
            </div>
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${item._id}`}
              checked={isSelected}
              onChange={event => handleCheckChange(event, item._id)}
              label=""
            />
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo only rerenders if props change */
export default React.memo(CategoryListItem);
