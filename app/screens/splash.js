import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageEditor,
    Image,
    ImageStore,
    FlatList,
    StyleSheet,
} from 'react-native';
import FeedHeader from "../components/feedHeader";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
        backgroundColor: "rgba(180,60,216,1)",
		justifyContent: 'center',
	},
	title: {
	    color: 'yellow',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
});

export default class Splash extends Component {

	render() {
		return (
			<View style={styles.container}>
                <FeedHeader/>
			</View>);
	}
}
