import {ActionTypes, Actions} from './actions';
import Gen from './utils/gen';
import * as Constants from './constants';

const errorFunc = (errorAction, dispatch) => (err) => {
	Gen.log(err);
	dispatch(Actions.decrementAPICount({}));
	dispatch(errorAction);
};

// TODO: implement afterTimeStamp
export const fetchFeed = ({beforeTimeStamp = null}) =>
    (dispatch) => {
        // TODO: add pagination logic
	dispatch(Actions.requestFeed({beforeTimeStamp}));
	dispatch(Actions.incrementAPICount({}));
	const url = `${Gen.getBaseUrl()}/v1/feed`;
	return fetch(url)
            .then(response => response.json())
            .then((paginatedPosts) => {
	Gen.log(paginatedPosts);
	dispatch(Actions.decrementAPICount({}));
	dispatch(Actions.receiveFeed({beforeTimeStamp, paginatedPosts}));
})
            .catch(errorFunc(Actions.errorFeed, dispatch));
};

export const fetchComments = ({feedIndex, beforeTimeStamp, postId}) => (dispatch) => {
    // TODO: add pagination logic
	dispatch(Actions.requestComment({}));
	dispatch(Actions.incrementAPICount({}));
	const url = `${Gen.getBaseUrl()}/v1/comments?postId=${postId}`;
	return fetch(url)
        .then(response => response.json())
        .then(paginatedComments => {
	Gen.log(paginatedComments);
	dispatch(Actions.decrementAPICount({}));
	dispatch(Actions.receiveComments({feedIndex, beforeTimeStamp, paginatedComments}));
})
        .catch(errorFunc(Actions.errorComments, dispatch));
};

export const fetchCommentReaction = ({feedIndex, commentIndex, commentId, reactionType}) => (dispatch) => {
	dispatch(Actions.requestCommentUserReaction({feedIndex, commentIndex, commentId, reactionType}));
	dispatch(Actions.incrementAPICount({}));
	const url = `${Gen.getBaseUrl()}/v1/user-reaction`;
	const postData = {
		targetId: commentId,
		reaction: reactionType,
		type: 'COMMENT',
	};
	return fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	})
        .then(response => response.json())
        .then(comment => {
	Gen.log(comment);
	dispatch(Actions.decrementAPICount());
	dispatch(Actions.receiveCommentUserReaction({feedIndex, commentIndex, commentId, comment}));
})
        .catch(errorFunc(Actions.errorCommentUserReaction, dispatch));
};

export const fetchFeedReaction = ({feedIndex, feedId, reactionType}) => (dispatch) => {
	dispatch(Actions.requestPostUserReaction({feedIndex, feedId, reactionType}));
	dispatch(Actions.incrementAPICount({}));
	const url = `${Gen.getBaseUrl()}/v1/user-reaction`;
	const postData = {
		targetId: feedId,
		reaction: reactionType,
		type: Constants.CONTENT_TYPE.POST,
	};
	return fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	})
        .then(response => response.json())
        .then(comment => {
	Gen.log(comment);
	dispatch(Actions.decrementAPICount());
	dispatch(Actions.receivePostUserReaction({feedIndex, feedId, comment}));
})
        .catch(errorFunc(Actions.errorPostUserReaction(), dispatch));
};

export const fetchComment = ({feedIndex, postId, text}) => (dispatch) => {
	dispatch(Actions.requestComment({feedIndex, postId, text}));
	dispatch(Actions.incrementAPICount({}));
	const url = `${Gen.getBaseUrl()}/v1/comment`;
	const postData = {
		postId,
		text,
	};
	return fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	})
        .then(response => response.json())
        .then(comment => {
	Gen.log(comment);
	dispatch(Actions.decrementAPICount());
	dispatch(Actions.receiveComment({feedIndex, postId, comment}));
})
        .catch(errorFunc(Actions.errorComment(), dispatch));
};

