import React, {Component} from 'react';
import PropType from 'prop-types';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions, TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentProfileHeader from './commentProfileHeader';
import Gen from '../utils/gen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 15,
		elevation: 4,
		backgroundColor: '#FFFFFF',
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},
    bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		height: 64,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: '#c5c5c5',
	},
	icon: {},
	share: {},
});

class CommentCard extends Component {
	componentDidMount() {
	}

	render() {
		const data = this.props.card;
		const {onLikeClick, onProfileClick, feedIndex, commentIndex} = this.props;
		const {postId, _id, text, currentUserReaction, userReaction, createdAt, user: {_id: userId, displayName, imageUrl}} = data;
		const userReactionCount = Gen.getUserReactionCount({type: 'LIKE', userReaction});
		const time = Gen.getDisplayTime(createdAt);
		// TODO: add userlike count
        // TODO: add currentUserReaction effect on like
		return (
			<View style={styles.container}>
				<CommentProfileHeader name={displayName} url={imageUrl} onProfileClick={onProfileClick} time={time} />
				<Text>{text}</Text>
				<View style={styles.bottomContainer}>
					<TouchableHighlight onPress={() => this.props.onLikeClick({feedIndex, commentIndex, commentId: data['_id']})}>
						<Icon name='thumbs-up' size={20} color='#000' style={styles.icon} />
					</TouchableHighlight>
					<Text>{userReactionCount}</Text>
				</View>
			</View>
		);
	}
}

CommentCard.propTypes = {
	card: PropType.object.isRequired,
    feedIndex: PropType.number.isRequired,
    commentIndex: PropType.number.isRequired,
	onLikeClick: PropType.func.isRequired,
	onProfileClick: PropType.func.isRequired,
};

export default CommentCard;

