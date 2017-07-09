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
		const {onLikeClick, onReplyClick, onProfileClick} = this.props;
		const {displayName, postId, replyCount, text, currentUserReaction, createdAt, userId} = data;
		const time = Gen.getDisplayTime(createdAt);
		// TODO: add userlike count
		return (
			<View style={styles.container}>
				<CommentProfileHeader name={displayName} url={'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png'} onProfileClick={onProfileClick} time={time} />
				<Text>{text}</Text>
				<View style={styles.bottomContainer}>
					<TouchableHighlight onPress={() => this.props.onLikeClick(data.id)}>
						<Icon name='thumbs-up' size={20} color='#000' style={styles.icon} />
					</TouchableHighlight>
					<Text>{replyCount}</Text>
				</View>
			</View>
		);
	}
}

CommentCard.propTypes = {
	card: PropType.object.isRequired,
	onLikeClick: PropType.func.isRequired,
	onReplyClick: PropType.func.isRequired,
	onProfileClick: PropType.func.isRequired,
};

export default CommentCard;

