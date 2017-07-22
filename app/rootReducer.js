import {combineReducers} from 'redux';
import {ActionTypes} from './actions';
import Gen from './utils/gen';
import Constants from './constants';

// NOTE: do Gen.deepClone(obj) whereever you want to copy object
const feed = (state = {
	posts: {
		results: [],
		pageInfo: {
			previousPageUrl: null,
			nextPageUrl: null,
		}}}, action) => {
	switch (action.type) {
	case ActionTypes.RECEIVE_FEED: {
		const {nextPageUrl, paginatedPosts: {results, pageInfo}} = action;
		const postResults = Gen.merge([...state.posts.results], results);
		const statePageInfo = {...state.posts.pageInfo};
		statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
		return {posts: {results: postResults, pageInfo: statePageInfo}};
	}
	case ActionTypes.RECEIVE_COMMENTS: {
		const {feedIndex, paginatedComments: {results, pageInfo}, nextPageUrl} = action;
		if(results.length === 0) return state;
		const commentResults = state.posts.results[feedIndex].comments ? Gen.merge([...state.posts.results[feedIndex].comments.results], results) : results;
		const statePageInfo = state.posts.results[feedIndex].comments ? {...state.posts.results[feedIndex].comments.pageInfo} : {};
		statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
		const comments = {results: commentResults, pageInfo: statePageInfo};
		const newState = Gen.deepClone(state);
		newState.posts.results[feedIndex].comments = comments;
		return newState;
	}
    case ActionTypes.RECEIVE_COMMENT: {
        const {feedIndex, postId, comment} = action;
        const newState = Gen.deepClone(state);
        const commentResults = newState.posts.results[feedIndex].comments ? Gen.merge([comment], [...newState.posts.results[feedIndex].comments.results]) : [comment];
        newState.posts.results[feedIndex].comments.results = commentResults;
        return newState;
    }
	case ActionTypes.REQUEST_COMMENT_USER_REACTION: {
		const {feedIndex, commentIndex, reactionType} = action;
        const newStateComment = Object.assign({}, state.posts.results[feedIndex].comments);
        const newStateCommentResults = newStateComment.results[commentIndex];
        const prevUserReaction = newStateCommentResults.currentUserReaction;
        // decrement count of previous user reaction and increment the count of current user reaction
        if (prevUserReaction) {
            newStateCommentResults.userReactions[prevUserReaction] -= 1;
        }
        newStateCommentResults.currentUserReaction = reactionType;
        newStateCommentResults.userReactions[reactionType] += 1;
        state.posts.results[feedIndex].comments = newStateComment;
        const newState = Object.assign({}, state);
        return newState;
	}
    case ActionTypes.REQUEST_COMMENT_USER_DEREACTION: {
        const {feedIndex, commentIndex} = action;
        const newState = Gen.deepClone(state);
        const comment = newState.posts.results[feedIndex].comments.results[commentIndex];
        comment.currentUserReaction = null;
        comment.userReaction['LIKE'] = Gen.max(comment.userReactions['LIKE'] - 1, 0);
        return newState;
    }
    case ActionTypes.REQUEST_POST_USER_REACTION: {
        const {feedIndex, reactionType} = action;
        const newStatePost = Object.assign({}, state.posts.results[feedIndex]);
        const prevUserReaction = newStatePost.currentUserReaction;
        // decrement count of previous user reaction and increment the count of current user reaction
        if (prevUserReaction) {
            newStatePost.userReactions[prevUserReaction] -= 1;
        }
        newStatePost.currentUserReaction = reactionType;
        newStatePost.userReactions[reactionType] += 1;
        state.posts.results[feedIndex] = newStatePost;
        const newState = Object.assign({}, state);
        return newState;
    }
    case ActionTypes.REQUEST_POST_USER_DEREACTION: {
        const {feedIndex, reactionType} = action;
        const newState = Gen.deepClone(state);
        newState.posts.results[feedIndex].currentUserReaction = null;
        newState.posts.results[feedIndex].userReactions[reactionType] -= 1;
        return newState;
    }
	default:
		return state;
	}
};

const rootReducer = combineReducers({
	feed,
});

export default rootReducer;
