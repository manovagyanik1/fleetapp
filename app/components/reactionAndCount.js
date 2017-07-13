import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: {
		height: 20,
		width: 20,
	},
	reactionCount: {
	    fontSize: 14,
		fontWeight: 'bold',
	},
});

class ReactionAndCount extends Component {
	componentDidMount() {
	}

	render() {
		const {imageSource, reactionCount, onReactionClick} = this.props;
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => onReactionClick()}>
					<Image style={styles.icon} source={imageSource} />
				</TouchableHighlight>
				{reactionCount !== undefined && reactionCount !== null ? <Text style={styles.reactionCount}>{reactionCount}</Text> : null }
			</View>
		);
	}
}

ReactionAndCount.propTypes = {
	imageSource: PropType.any.isRequired,
	reactionCount: PropType.number,
	onReactionClick: PropType.func.isRequired,
};

export default ReactionAndCount;

