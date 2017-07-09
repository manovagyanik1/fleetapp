import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchCommentReaction} from '../thunks';
import {
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {users} from '../config/data';
import Gen from '../utils/gen';
import CommentCard from '../components/commentCard';

class CommentsScreenElements extends Component {
	componentDidMount() {
		this.props.onMountDispatch();
	}

	render() {
		const {index: feedIndex, comments, onLikeClick, onProfileClick} = this.props;
		if (!comments) return null;
		const {results} = comments;
		return (
          results.length > 0 ?
	<FlatList
		data={results}
		renderItem={({item, index}) => (<CommentCard
			card={item}
			onProfileClick={onProfileClick}
			onLikeClick={onLikeClick}
			feedIndex={feedIndex}
			commentIndex={index}
		/>)}
		keyExtractor={(card, index) => index}
	/>
              : null
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	return {
		comments: state.feed.posts.results[index].comments,
		index,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	return {
		onMountDispatch: () => {
			dispatch(fetchComments({feedIndex: index}));
		},
		onLikeClick: ({feedIndex, commentIndex, commentId}) => {
		    dispatch(fetchCommentReaction({feedIndex, commentIndex, commentId}));
		},
		onProfileClick: ({userId}) => {
			Gen.log(`Profile clicked for user id${userId}`);
		},
	};
};

const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsScreenElements);

export default Comments;
