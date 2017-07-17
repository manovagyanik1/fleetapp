import React, {Component} from 'react';
import {Text, View, Image, ScrollView, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import Carousel from 'react-native-looped-carousel';
import Gen from '../utils/gen';
import Icon from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	imageContainer: {
	    flex: 1,
		justifyContent: 'center',
	},
	carousel: {
		width: '100%',
		height: '85%',
	},
	image: {
	    width: '90%',
		height: '80%',
	},
	facebookButton: {
	    marginLeft: 20,
		marginRight: 20,
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#3b5998',
		justifyContent: 'center',
		alignItems: 'center',
	},
	facebookText: {
	    color: '#fff',
	    fontSize: 20,
		marginLeft: 20,
	},
	contentText: {
	    margin: 10,
		alignSelf: 'center',
		fontSize: 16,
	},
});
class Login extends Component {
	navigateToFeedPage = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Feed'})]
        })
        this.props.navigation.dispatch(actionToDispatch);
	}

    // returns a promise
    getLoginToken = (accessToken) => {
        const url = `${Gen.getBaseUrl()}/v1/login/callback?code=${accessToken}`;
        return fetch(url)
            .then(data => data.json())
            .then(token => Gen.onSignIn({userToken: data.token, userId: data.userId}));
    }

	fbAuth = () => {
		LoginManager.logInWithReadPermissions(['public_profile'])
                    .then((result) => {
	if (result.isCancelled) {
		Gen.log('login was cancelled');
	} else {
		AccessToken.getCurrentAccessToken()
                .then(data => this.getLoginToken(data.accessToken))
                .then(() => this.navigateToFeedPage());

		Gen.log(`login was success ${result.grantedPermissions.toString()}`);
	}
}, (error) => {
	Gen.log(`An error occured ${error}`);
});
	}


	render() {
		return (
			<View style={styles.container}>
				<Carousel
					delay={2000}
					style={styles.carousel}
					autoplay
					bullets
					chosenBulletStyle={{backgroundColor: '#3b5998'}}
					bulletStyle={{backgroundColor: '#D3D3D3'}}
					onAnimateNextPage={(p) => console.log(p)}
				>
					<View style={styles.imageContainer}><Image style={styles.image} source={require('../img/img1.jpg')} /></View>
					<View style={styles.imageContainer}><Image style={styles.image} source={require('../img/img1.jpg')} /></View>
					<View style={styles.imageContainer}><Image style={styles.image} source={require('../img/img1.jpg')} /></View>
				</Carousel>
				<TouchableOpacity style={styles.facebookButton} onPress={this.fbAuth}>
					<Icon name='logo-facebook' size={30} color='#fff' style={styles.icon} />
					<Text style={styles.facebookText}>Continue with facebook</Text>
				</TouchableOpacity>
				<Text style={styles.contentText}>We don't post anything to facebook</Text>
			</View>
		);
	}
}

export default Login;
