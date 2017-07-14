import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Feed from '../screens/Feed';
import Comments from '../screens/comments';
import Login from '../screens/login';
import Home from '../screens/home';

export const Root = StackNavigator({
    Home: {
        screen: Home,
        header: null,
    },
	Login: {
		screen: Login,
        header: null,
	},
	Feed: {
		screen: Feed,
		navigationOptions: {
			title: 'Feed',
		},
	},
	Comments: {
		screen: Comments,
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		}),
	},
}, {
    headerMode: 'none',
});

