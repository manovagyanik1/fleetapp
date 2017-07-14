import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Feed from '../screens/Feed';
import Comments from '../screens/comments';
import Login from '../screens/login';

export const Root = StackNavigator({
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

