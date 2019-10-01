import React from 'react';
import { Card, Button, Row } from 'reactstrap';
import moment from 'moment';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { defaultAvatar, DATE_FORMAT } from '../../../constants/defaultValues';

const avatarAuthorStyle = {
  width: `${100}px !important`
};
const AuthorListItem = ({ item, toggleUpdateModal }) => {
  return (
    <Colxx xxs="12">
      <Card className="mb-3">
        <div className="d-flex flex-row">
          <div className="w-20">
            <a href="!#" className="w-10">
              <img
                style={avatarAuthorStyle}
                src={
                  item.avatarUrls.length > 1
                    ? item.avatarUrls[0]
                    : defaultAvatar
                }
                alt={item.name}
                className="list-thumbnail border-0 card-img-left card-img-left-w100"
              />
            </a>
          </div>
          <div className="w-80 align-self-center">
            <Row className="ml-2">
              <Colxx sm="6">
                <a className="" href="/app/pages/product/thumb-list?p=18">
                  <p className="list-item-heading mb-1">{item.name}</p>
                </a>
              </Colxx>
              <Colxx sm="2">
                <p className="mb-1 text-muted text-small">
                  {item.bornDate
                    ? moment(item.bornDate).format(DATE_FORMAT)
                    : ''}
                </p>
              </Colxx>
              <Colxx sm="2">
                <p className="mb-1 text-muted text-small">
                  {item.dieDate ? moment(item.dieDate).format(DATE_FORMAT) : ''}
                </p>
              </Colxx>
              <Colxx sm="2">
                <Button
                  className="mr-2"
                  color="secondary"
                  size="xs"
                  onClick={() => toggleUpdateModal(item)}
                >
                  <i className="iconsminds-file-edit" />
                </Button>
              </Colxx>
            </Row>
            <Row className="ml-2">
              <Colxx xss="12">
                <div>
                  <p>{item.description}</p>
                </div>
              </Colxx>
            </Row>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};
export default React.memo(AuthorListItem);
