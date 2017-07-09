export const ActionTypes = {
    REQUEST_FEED: "request_feed",
    RECEIVE_FEED: "receive_feed",
    ERROR_FEED: "error_feed",
    REQUEST_COMMENTS: "request_comments",
    RECEIVE_COMMENTS: "receive_comments",
    ERROR_COMMENTS: "error_comments",
    ERROR_POST_USER_REACTION: "error_post_user_reaction",
    ERROR_COMMENT_USER_REACTION: "error_comment_user_reaction",
    INCREMENT_API_COUNT: "increment_api_count",
    DECREMENT_API_COUNT: "decrement_api_count",
    REQUEST_LIKE_COMMENT: "request_like_comment",
    RECEIVE_LIKE_COMMENT: "receive_like_comment",
    REQUEST_DISLIKE_COMMENT: "request_dislike_comment",
    RECEIVE_DISLIKE_COMMENT: "receive_dislike_comment",
    REQUEST_REACT_FEED: "request_react_feed",
    RECEIVE_REACT_FEED: "receive_react_feed",
    REQUEST_UNREACT_FEED: "request_unreact_feed",
    RECEIVE_UNREACT_FEED: "receive_unreact_feed",
    REQUEST_POST_USER_REACTION: 'request_post_user_reaction',
    REQUEST_COMMENT_USER_REACTION: 'request_comment_user_reaction',
    RECEIVE_POST_USER_REACTION: 'receive_post_user_reaction',
    RECEIVE_COMMENT_USER_REACTION: 'receive_comment_user_reaction',
    REQUEST_SHARE: "request_share",
    RECEIVE_SHARE: "receive_share",
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

    static errorCommentUserReaction = () => ({
        type: ActionTypes.ERROR_COMMENT_USER_REACTION,
    });

    static errorPostUserReaction = () => ({
        type: ActionTypes.ERROR_POST_USER_REACTION,
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

    static requestPostUserReaction = ({feedIndex, reactionType, postId}) => {
        return {
            feedIndex,
            postId,
            reactionType,
            type: ActionTypes.REQUEST_POST_USER_REACTION
        }
    };

    static requestCommentUserReaction = ({feedIndex, commentIndex, commentId, reactionType}) => {
        // NOTE: right as of now reactionType for a comment is also LIKE
        return {
            feedIndex,
            commentIndex,
            commentId,
            reactionType,
            type: ActionTypes.REQUEST_COMMENT_USER_REACTION
        }
    };

    static receivePostUserReaction = ({feedIndex, post, feedId}) => {
        return {
            feedIndex,
            feedId,
            post,
            type: ActionTypes.RECEIVE_POST_USER_REACTION
        }
    };

    static receiveCommentUserReaction = ({feedIndex, commentIndex, comment, commentId}) => {
        return {
            feedIndex,
            commentId,
            commentIndex,
            comment,
            type: ActionTypes.RECEIVE_COMMENT_USER_REACTION
        }
    };


}
