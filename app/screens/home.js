import React, { Component } from 'react';
import Gen from '../utils/gen';
import Feed from './Feed';
import Login from './login';
import Splash from './splash';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false,
		};
	}

	componentWillMount() {
		Gen.isSignedIn()
            .then(res => this.setState({signedIn: res, checkedSignIn: true}))
            .catch(err => alert('An error occurred'));
	}

	render() {
		const {checkedSignIn, signedIn} = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
		if (!checkedSignIn) {
			return <Splash/>;
		}

		if (signedIn) {
			return <Feed navigation={this.props.navigation}/>;
		}
		return <Login navigation={this.props.navigation} />;
	}
}
