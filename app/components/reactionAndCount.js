import React, {Component} from 'react';
import PropType from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 5,
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
			<TouchableWithoutFeedback onPress={() => this.refs.view.bounceInDown(800).then((endState) => onReactionClick())}>
				<Animatable.View ref="view" style={styles.container}>
					<Image style={styles.icon} source={imageSource} />
					{reactionCount !== undefined && reactionCount !== null ? <Text style={styles.reactionCount}>{reactionCount}</Text> : null }
				</Animatable.View>
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

