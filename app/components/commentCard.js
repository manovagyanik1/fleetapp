import React, {Component} from 'react';
import PropType from 'prop-types';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions, TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommentProfileHeader from './commentProfileHeader';
import Gen from '../utils/gen';
import {REACTION_TYPE} from '../constants'

const styles = StyleSheet.create({
	container: {
		flex: 1,
        padding: 10,
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
    },
    reactionContainer: {
	    marginLeft: 50,
        marginTop: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
    commentText: {
	  marginLeft: 50,
        fontSize: 16,
        marginTop: -15,
    },
    userReactionCount: {
	    marginLeft: 8,
	    fontSize: 12,
    },
    icon: {
        height: 20,
        width: 20,
    },
	share: {},
});

class CommentCard extends Component {
	componentDidMount() {
	}

	render() {
		const data = this.props.card;
		const {onReactionClick, onProfileClick, feedIndex, commentIndex} = this.props;
		const {postId, _id, text, currentUserReaction, userReactions, createdAt, userDetails: {_id: userId, fullName, nickName: displayName, profilePicUrl}} = data;
        const LolCount = Gen.getUserReactionCount({type: 'LOL', userReactions});
        const PoopCount = Gen.getUserReactionCount({type: 'POOP', userReactions});
        // TODO: add currentUserReaction effect on like
		return (
			<View style={styles.container}>
				<CommentProfileHeader name={displayName} url={profilePicUrl} onProfileClick={onProfileClick} />
				<Text style={styles.commentText}>{text}</Text>
				<View style={styles.bottomContainer}>
					<TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, commentIndex, commentId: data['_id'], reactionType: REACTION_TYPE.LOL})}>
						<View style={styles.reactionContainer} >
                            <Image style={[styles.icon]} source={require('../img/lol.png')} />
                            <Text style={styles.userReactionCount}>{LolCount}</Text>
                        </View>
					</TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, commentIndex, commentId: data['_id'], reactionType: REACTION_TYPE.POOP})}>
                        <View style={styles.reactionContainer} >
                            <Image style={[styles.icon]} source={require('../img/poop.png')} />
                            <Text style={styles.userReactionCount}>{PoopCount}</Text>
                        </View>
                    </TouchableWithoutFeedback>
				</View>
			</View>
		);
	}
}

CommentCard.propTypes = {
	card: PropType.object.isRequired,
    feedIndex: PropType.number.isRequired,
    commentIndex: PropType.number.isRequired,
    onReactionClick: PropType.func.isRequired,
	onProfileClick: PropType.func.isRequired,
};

export default CommentCard;

