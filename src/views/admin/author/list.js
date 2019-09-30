import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class AuthorList extends Component {
  render() {
    return <div>Author List</div>;
  }
}

export default connect(mapStateToProps)(AuthorList);
