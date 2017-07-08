export const ActionTypes = {
    REQUEST_FEED: "request_feed",
    RECEIVE_FEED: "receive_feed",
    ERROR_FEED: "error_feed",
    REQUEST_COMMENTS: "request_comments",
    RECEIVE_COMMENTS: "receive_comments",
    ERROR_COMMENTS: "error_comments",
    INCREMENT_API_COUNT: "increment_api_count",
    DECREMENT_API_COUNT: "decrement_api_count",
};

export class Actions {

    static incrementAPICount = () => ({
        type: ActionTypes.INCREMENT_API_COUNT,
    });

    static decrementAPICount = () => ({
        type: ActionTypes.DECREMENT_API_COUNT,
    });

    static errorFeed = () => ({
        type: ActionTypes.ERROR_FEED,
    });

    static errorComments = () => ({
        type: ActionTypes.ERROR_COMMENTS,
    });

    static requestFeed = ({beforeTimeStamp}) => ({
        beforeTimeStamp,
        type: ActionTypes.REQUEST_FEED
    });

    static requestComment = ({beforeTimeStamp}) => ({
        beforeTimeStamp,
        type: ActionTypes.REQUEST_COMMENTS
    });

    static receiveFeed = ({beforeTimeStamp, paginatedPosts}) => {
        return {
            beforeTimeStamp,
            paginatedPosts,
            type: ActionTypes.RECEIVE_FEED
        }
    };

    static receiveComments = ({feedIndex, beforeTimeStamp, paginatedComments}) => {
        return {
            feedIndex,
            beforeTimeStamp,
            paginatedComments,
            type: ActionTypes.RECEIVE_COMMENTS
        }
    };
}
