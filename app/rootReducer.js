import {combineReducers} from 'redux';
import {ActionTypes} from './actions';
import Gen from './utils/gen';

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
		const newState = {...state};
		newState.posts.results[feedIndex].comments = comments;
		return newState;
	}
	case ActionTypes.REQUEST_COMMENT_USER_REACTION: {
		const {feedIndex, commentIndex} = action;
		const newState = {...state};
		newState.posts.results[feedIndex].comments.results[commentIndex].currentUserReaction = 'LIKE';
		// TODO: update userReaction count
        return newState;
	}
    case ActionTypes.REQUEST_DISLIKE_COMMENT: {
        const {feedIndex, commentIndex} = action;
        const newState = {...state};
        newState.posts.results[feedIndex].comments.results[commentIndex].currentUserReaction = null;
        // TODO: update userReaction count
        return newState;
    }
    case ActionTypes.REQUEST_REACT_FEED: {
        const {feedIndex, reactionType} = action;
        const newState = {...state};
        const prevUserReaction = newState.posts.results[feedIndex].currentUserReaction;
        // decrement count of previous user reaction and increment the count of current user reaction
        if (prevUserReaction) {
            newState.posts.results[feedIndex].userReaction[prevUserReaction] -= 1;
        }
        newState.posts.results[feedIndex].currentUserReaction = reactionType;
        newState.posts.results[feedIndex].userReaction[reactionType] += 1;
        return newState;
    }
    case ActionTypes.REQUEST_UNREACT_FEED: {
        const {feedIndex, reactionType} = action;
        const newState = {...state};
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
