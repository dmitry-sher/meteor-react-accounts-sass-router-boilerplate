import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import * as util from '../lib/util';

@ReactMixin(ReactMeteorData)
class SecretPage extends Component {
	componentWillMount() {
	    if (!this.props.user && !this.props.loggingIn) {
			this.context.router.push('/');
		}
	}

	render() {
		if (!this.props.user && !this.props.loggingIn) {
			return null;
		}
		return (
			<div className="index">
				this is secret!<br />
				<a href="/">back</a>
			</div>
		);
	}
}

SecretPage.contextTypes = {
	router: React.PropTypes.object
};

export default createContainer(util.getUserMeteorData, SecretPage);