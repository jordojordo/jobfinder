import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
	componentDidMount() {
		this.props.googleLogin();
		this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if (props.accessToken) {
			this.props.navigation.navigate('map');
		}
	}

	render() {
		return(
			<View />
		);
	}
}

function mapStateToProps({ auth }) {
	return { accessToken: auth.accessToken };
}

export default connect(mapStateToProps, actions)(AuthScreen);