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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#3b5998',
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
				<Text style={styles.title}>LolMeNow</Text>
			</View>);
	}
}
