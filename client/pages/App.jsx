import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from '../components/common/Accounts';
import { createContainer } from 'meteor/react-meteor-data';
// import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}