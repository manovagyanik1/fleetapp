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
		const {beforeTimeStamp, paginatedPosts: {results, pageInfo}} = action;
		const postResults = Gen.merge([...state.posts.results], results);
		const statePageInfo = {...state.posts.pageInfo};
		statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
		return {posts: {results: postResults, pageInfo: statePageInfo}};
	}
	case ActionTypes.RECEIVE_COMMENTS: {
		const {feedIndex, paginatedComments: {results, pageInfo}, beforeTimeStamp} = action;
		const commentResults = state.posts.results[feedIndex].comments ? Gen.merge([...state.posts.results[feedIndex].comments.results], results) : results;
		const statePageInfo = state.posts.results[feedIndex].comments ? {...state.posts.results[feedIndex].comments.pageInfo} : {};
		statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
		const comments = {results: commentResults, pageInfo: statePageInfo};
		const newState = Gen.deepClone(state);
		newState.posts.results[feedIndex].comments = comments;
		return newState;
	}
    case ActionTypes.RECEIVE_COMMENT: {
        const {feedIndex, postId, comment} = action;\
        const newState = Gen.deepClone(state);
        const commentResults = newState.posts.results[feedIndex].comments ? Gen.merge([comment], [...newState.posts.results[feedIndex].comments.results]) : [comment];
        newState.posts.results[feedIndex].comments.results = commentResults;
        return newState;
    }
	case ActionTypes.REQUEST_COMMENT_USER_REACTION: {
		const {feedIndex, commentIndex} = action;
		const newState = Gen.deepClone(state);
		const comment = newState.posts.results[feedIndex].comments.results[commentIndex];
		comment.currentUserReaction = 'LIKE';
        comment.userReaction['LIKE'] += 1;
        return newState;
	}
    case ActionTypes.REQUEST_COMMENT_USER_DEREACTION: {
        const {feedIndex, commentIndex} = action;
        const newState = Gen.deepClone(state);
        const comment = newState.posts.results[feedIndex].comments.results[commentIndex];
        comment.currentUserReaction = null;
        comment.userReaction['LIKE'] = Gen.max(comment.userReaction['LIKE'] - 1, 0);
        return newState;
    }
    case ActionTypes.REQUEST_POST_USER_REACTION: {
        const {feedIndex, reactionType} = action;
        const newState = Gen.deepClone(state);
        const prevUserReaction = newState.posts.results[feedIndex].currentUserReaction;
        // decrement count of previous user reaction and increment the count of current user reaction
        if (prevUserReaction) {
            newState.posts.results[feedIndex].userReaction[prevUserReaction] -= 1;
        }
        newState.posts.results[feedIndex].currentUserReaction = reactionType;
        newState.posts.results[feedIndex].userReaction[reactionType] += 1;
        return newState;
    }
    case ActionTypes.REQUEST_POST_USER_DEREACTION: {
        const {feedIndex, reactionType} = action;
        const newState = Gen.deepClone(state);
        newState.posts.results[feedIndex].currentUserReaction = null;
        newState.posts.results[feedIndex].userReaction[reactionType] -= 1;
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
