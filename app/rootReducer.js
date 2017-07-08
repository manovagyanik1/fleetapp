import { combineReducers } from 'redux'
import {ActionTypes} from './actions';

const feed = (state = {
	posts: {
		results: [],
		pageInfo: {
			previousPageUrl: null,
			nextPageUrl: null
    }}}, action) => {
	switch (action.type) {
		case ActionTypes.RECEIVE_FEED: {
		const {beforeTimeStamp, paginatedPosts:{results, pageInfo}}= action;
        const postResults = [... state.posts.results].concat(...results);
        const statePageInfo = {...state.posts.pageInfo};
        statePageInfo.nextPageUrl = pageInfo.nextPageUrl;
        return {posts: {results: postResults, pageInfo: statePageInfo}};
		}
		default:
			return state;
	}
};

const rootReducer = combineReducers({
    feed,
});

export default rootReducer;