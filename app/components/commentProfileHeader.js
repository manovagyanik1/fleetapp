import React, {Component} from 'react';
import PropType from 'prop-types';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions, TouchableHighlight,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
	},
	imageContainer: {
		height: 128,
		width: 128,
		borderRadius: 64,
	},
	image: {
		height: 128,
		width: 128,
		borderRadius: 64,
	},
	icon: {},
	share: {},
});

// TODO: make it a pure/functional component
class CommentProfileHeader extends Component {
	componentDidMount() {
	}

	render() {
		const {name, url, time} = this.props;

		return (
			<ListItem
				avatar={{uri: url}}
				roundAvatar
				title={name}
				subtitle={time}
				hideChevron
			/>
			// <View style={styles.container}>
			// 	<Text>{name}</Text>
             //    <Text>{time}</Text>
			// 	<TouchableHighlight style={styles.imageContainer}>
			// 		<Image style={styles.image} source={{uri: url}} />
			// 	</TouchableHighlight>
			// </View>
		);
	}
}

CommentProfileHeader.propTypes = {
	name: PropType.string,
	url: PropType.string,
	time: PropType.string,
	onProfileClick: PropType.func.isRequired,
};

export default CommentProfileHeader;

