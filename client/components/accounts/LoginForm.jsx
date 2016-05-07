import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import * as util from '../../lib/util';

class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false
		}

		this.onSubmit = (e) => {
			e.preventDefault();
			e.stopPropagation();
			var user = this.refs.login.value, pass = this.refs.pass.value;
			this.setState({error: false});
			Meteor.loginWithPassword(user, pass, (err, res) => {
				if (err) {
					this.setState({error: err.message});
					return;
					// this.refs.
				}
				// console.log('[LoginForm.onSubmit callback] err = ', err, ', res = ', res);
			});
		}
	}

	render() {
		var errClasses = ['err'];
		if (!this.state.error)
			errClasses.push('hidden');
		return (
			<form onSubmit={this.onSubmit} className="loginForm">
				You must be logged in to get access to this site.
				<input type="text" ref="login" placeholder="login" className="login" />
				<input type="password" ref="pass" placeholder="pass" className="pass" />
				<input type="submit" className="submit" value="log in" />
				<div className={errClasses.join(' ')} ref="msg">{this.state.error}</div>
			</form>
		);
	}
}

export default createContainer(util.getUserMeteorData, LoginForm);