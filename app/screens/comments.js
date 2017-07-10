import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchCommentReaction, fetchComment} from '../thunks';
import {
  Text,
  View,
  ScrollView,
    StyleSheet,
  FlatList,
} from 'react-native';
import {users} from '../config/data';
import Gen from '../utils/gen';
import CommentCard from '../components/commentCard';
import CommentForm from '../components/commentForm';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	commentList: {
	    flex: 1,
		flexGrow: 1,
	},
	commentPost: {
	    flex: 0,
		flexShrink: 1,
		maxHeight: 40,
	},
});

class CommentsScreenElements extends Component {
	componentDidMount() {
		this.props.onMountDispatch();
	}

	render() {
		const {index: feedIndex, comments, onLikeClick, onProfileClick, postId, onCommentPost, onMountDispatch, fetchNextComments} = this.props;
		if (!comments) return null;
		const {results} = comments;
		return (
          results.length > 0 ?
	<View style={styles.container}>
		<FlatList
			data={results}
			refreshing={comments.isFetching === true}
			onRefresh={() => onMountDispatch()}
			onEndReachedThreshold={0.5}
			onEndReached={() => fetchNextComments({nextPageUrl: comments.pageInfo.nextPageUrl})}
			style={styles.commentList}
			removeClippedSubviews={false}
			renderItem={({item, index}) => (<CommentCard
				card={item}
				onProfileClick={onProfileClick}
				onLikeClick={onLikeClick}
				feedIndex={feedIndex}
				commentIndex={index}
			/>)}
			keyExtractor={(card, index) => index}
		/>
		<CommentForm style={styles.commentPost} feedIndex={feedIndex} postId={postId} onCommentPost={(data) => onCommentPost(data)} />
	</View>
              : null
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	return {
		comments: state.feed.posts.results[index].comments,
		index,
		postId: state.feed.posts.results[index]._id,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	return {
		onMountDispatch: () => {
			dispatch(fetchComments({feedIndex: index}));
		},
        fetchNextComments: ({nextPageUrl}) => {
            dispatch(fetchComments({nextPageUrl}));
        },
		onLikeClick: ({feedIndex, commentIndex, commentId, reactionType}) => {
		    dispatch(fetchCommentReaction({feedIndex, commentIndex, commentId, reactionType}));
		},
		onProfileClick: ({userId}) => {
			Gen.log(`Profile clicked for user id${userId}`);
		},
		onCommentPost: ({feedIndex, postId, text}) => {
			dispatch(fetchComment({feedIndex, postId, text}));
		},
	};
};

const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsScreenElements);

export default Comments;
