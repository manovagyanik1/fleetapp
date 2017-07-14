import React, { Component } from 'react';
import Gen from '../utils/gen';
import Feed from './Feed';
import Login from './login';

export default class App extends Component {
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
			return null;
		}

		if (signedIn) {
			return <Feed />;
		}
		return <Login />;
	}
}
