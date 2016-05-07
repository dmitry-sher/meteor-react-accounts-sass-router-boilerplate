import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import * as util from '../lib/util';
import LoginForm from '../components/accounts/LoginForm';
import ProfileInfo from '../components/accounts/ProfileInfo';

@ReactMixin(ReactMeteorData)
class HomePage extends Component {
	render() {
		if (this.props.loggingIn || !this.props.user)
			return (
				<LoginForm />
			);
		if (this.props.user) {
			return (
				<ProfileInfo />
			);
		};
		return null;
	}
}

export default createContainer(util.getUserMeteorData, HomePage);