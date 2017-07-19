import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
	icon: {
		height: 25,
		width: 25,
	},
});

class ReactionAndCount extends Component {
	componentDidMount() {
	}

	render() {
		const {imageSource, reactionCount, onReactionClick} = this.props;
		// {reactionCount !== undefined && reactionCount !== null ? <Text style={styles.reactionCount}>{reactionCount}</Text> : null }
		return (
			<TouchableWithoutFeedback onPress={() => onReactionClick()}>
                <Image style={styles.icon} source={imageSource} />
			</TouchableWithoutFeedback>
		);
	}
}

ReactionAndCount.propTypes = {
	imageSource: PropType.any.isRequired,
	reactionCount: PropType.number,
	onReactionClick: PropType.func.isRequired,
};

export default ReactionAndCount;

