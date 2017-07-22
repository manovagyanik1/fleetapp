import React, {Component} from 'react';
import {Text, View, Image, ScrollView, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import Carousel from 'react-native-looped-carousel';
import Gen from '../utils/gen';
import Icon from 'react-native-vector-icons/Ionicons';
import Analytics, {SCREEN} from "../utils/analytics";
import Splash from "./splash";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
        backgroundColor: '#B43BD8',
	},
	imageContainer: {
	    flex: 1,
		justifyContent: 'center',
        height: '100%',
        width: '100%',
	},
	carousel: {
		width: '100%',
		height: '85%',
	},
	image: {
	    width: '100%',
		height: '100%',
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
        color: '#fff',
	},
});
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggingIn: false,
        };
    }
	navigateToFeedPage = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Feed'})]
        });
        this.props.navigation.dispatch(actionToDispatch);
	};

    // returns a promise
    getLoginToken = (accessToken) => {
        const url = `${Gen.getBaseUrl()}/v1/login/fb-access-token`;
        const postData = {
            accessToken
        };
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)})
            .then(data => {
                return data.json();
            })
            .then(data => Gen.onSignIn({userToken: data.token, userId: data.userId}));
    };

	fbAuth = () => {
		LoginManager.logInWithReadPermissions(['public_profile'])
                    .then((result) => {
	if (result.isCancelled) {
		Gen.log('login was cancelled');
	} else {
		AccessToken.getCurrentAccessToken()
                .then(data => {
                    this.setState({loggingIn: true});
                    return this.getLoginToken(data.accessToken);
                })
                .then(() => this.navigateToFeedPage());

		Gen.log(`login was success ${result.grantedPermissions.toString()}`);
	}
}, (error) => {
	Gen.log(`An error occured ${error}`);
});
	};

    componentDidMount() {
        Analytics.trackScreenView(SCREEN.LOGIN);
    }

	render() {
		return (
            <View style={styles.container}>
            {!this.state.loggingIn ?
                <View style={styles.container}>
                    <Carousel
                        delay={4000}
                        style={styles.carousel}
                        autoplay
                        bullets
                        chosenBulletStyle={{backgroundColor: '#4F0166'}}
                        bulletStyle={{backgroundColor: '#D3D3D3'}}
                        onAnimateNextPage={(p) => console.log(p)}
                    >
                        <View style={styles.imageContainer}><Image style={styles.image} source={require('../img/loginScreen1.jpg')} /></View>
                        <View style={styles.imageContainer}><Image style={styles.image} source={require('../img/loginScreen2.jpg')} /></View>
                        <View style={styles.imageContainer}><Image style={styles.image} source={require('../img/loginScreen3.jpg')} /></View>
                    </Carousel>
                    <TouchableOpacity style={styles.facebookButton} onPress={this.fbAuth}>
                        <Icon name='logo-facebook' size={30} color='#fff' style={styles.icon} />
                        <Text style={styles.facebookText}>Continue with facebook</Text>
                    </TouchableOpacity>
                    <Text style={styles.contentText}>We don't post anything to facebook</Text>
                </View> : <Splash/>}
            </View>
		);
	}
}

export default Login;
