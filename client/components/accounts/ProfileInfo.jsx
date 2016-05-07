import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import * as util from '../../lib/util';

class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.onLogoutClick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			Meteor.logout();
		}
	}

	render() {
		if (!this.props.user)
			return null;

		return (
			<div className="profilePage">
				Hi, {this.props.user.username}!<br />
				<a href="/secret">Here is your secret page</a>
				<button className="logout" onClick={this.onLogoutClick}>Log out</button>
			</div>
		);
	}
}

export default createContainer(util.getUserMeteorData, ProfilePage);