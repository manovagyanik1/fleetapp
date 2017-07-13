import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Gen from '../utils/gen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	profilePic: {
	    height: 40,
		width: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	textContainer: {},
	textHeader: {
	    fontSize: 14,
		fontWeight: 'bold',
	},
	textContent: {
	    fontSize: 14,
	},
});

// TODO: make it a pure/functional component
class CommentProfileHeader extends Component {
	componentDidMount() {
	}

	render() {
		const {name, url, time} = this.props;
		return (
			<View style={styles.container}>
				<Image style={styles.profilePic} source={{uri: url}} />
				<View style={styles.textContainer}>
					<Text style={styles.textHeader}>{name}</Text>
					<Text style={styles.textContent}>{Gen.getDisplayTime(time)}</Text>
				</View>
			</View>
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

