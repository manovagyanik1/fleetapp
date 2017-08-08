import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Feed from '../screens/Feed';

export const Root = StackNavigator({
	Feed: {
		screen: Feed,
        header: null,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        },
	},
});

