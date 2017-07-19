import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Feed from '../screens/Feed';
import Comments from '../screens/comments';
import Login from '../screens/login';
import Home from '../screens/home';
import FeedHeader from "../components/feedHeader";

export const Root = StackNavigator({
    Home: {
        screen: Home,
        header: null,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        },
    },
	Login: {
		screen: Login,
        header: null,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        },
	},
	Feed: {
		screen: Feed,
		navigationOptions: {
			title: 'Feed',
            header: <FeedHeader />,
		},
	},
	Comments: {
		screen: Comments,
		navigationOptions: ({navigation}) => ({
			title: 'Comments',
		}),
	},
});

