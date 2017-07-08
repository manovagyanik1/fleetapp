import {combineReducers} from 'redux';
import {ActionTypes} from './actions';

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
			const postResults = [...state.posts.results].concat(...results);
			const statePageInfo = {...state.posts.pageInfo};
			statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
			return {posts: {results: postResults, pageInfo: statePageInfo}};
		}
		case ActionTypes.RECEIVE_COMMENTS: {
			const {feedIndex, paginatedComments: {results, pageInfo}, beforeTimeStamp} = action;
			const commentResults = state.posts.results[feedIndex].comments ? [...state.posts.results[feedIndex].comments.results].concat(...results) : results;
			const statePageInfo = state.posts.results[feedIndex].comments ? {...state.posts.results[feedIndex].comments.pageInfo} : {};
			statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
			const comments = {results: commentResults, pageInfo: statePageInfo};
			const newState = {...state};
			newState.posts.results[feedIndex].comments = comments;
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
