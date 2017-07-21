import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchCommentReaction, fetchComment} from '../thunks';
import {
  Text,
  View,
  ScrollView,
    StyleSheet,
    Image,
    Dimensions,
  FlatList,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Gen from '../utils/gen';
import CommentCard from '../components/commentCard';
import CommentForm from '../components/commentForm';
import Analytics, {SCREEN} from "../utils/analytics";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	commentList: {
	    flex: 1,
		marginBottom: 50,
	},
	commentPost: {
		position: 'absolute',
		flex: 0.1,
		left: 0,
		right: 0,
		bottom: 10,
		height: 40,
	},
});

class CommentsScreenElements extends Component {
    componentDidMount() {
        this.props.onMountDispatch();
        Analytics.trackScreenView(SCREEN.LOGIN);
    }

    getImageCard = () => {
        const {url, height, width} = this.props;
        const imgWidth = Dimensions.get('window').width;
        const scaleFactor = width / imgWidth;
        const imgHeight = height / scaleFactor;

        return (
            <ImageZoom cropWidth={imgWidth}
                       cropHeight={imgHeight}
                       imageWidth={imgWidth}
                       imageHeight={imgHeight}>
                <Image
            source={{uri: url}}
            style={{height: imgHeight, width: imgWidth}}
            defaultSource={require('../img/placeholder.jpg')}
        />
            </ImageZoom>);
    };

    getCommentPost = ({feedIndex, postId, onCommentPost}) => {
        return (<View style={styles.commentPost}>
            <CommentForm style={styles.commentPost} feedIndex={feedIndex} postId={postId}
                         onCommentPost={(data) => onCommentPost(data)}/>
        </View>);
    };

    render() {
        const {index: feedIndex, comments, onLikeClick, onProfileClick, postId, onCommentPost, onMountDispatch, fetchNextComments} = this.props;
        return (
            <View style={styles.container}>
                {comments && comments.results.length > 0 ?
                    (
                        <FlatList
                            ListHeaderComponent={() => this.getImageCard()}
                            data={comments.results}
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
                        />) :
                    <FlatList
                        ListHeaderComponent={() => this.getImageCard()} />}
                {this.getCommentPost({feedIndex, postId, onCommentPost})}
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	const {data: {width, height, src: url}} = state.feed.posts.results[index];
	return {
	    url,
        height,
        width,
		comments: state.feed.posts.results[index].comments,
		index,
		postId: state.feed.posts.results[index]._id,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const {index, postId} = ownProps.navigation.state.params;
	return {
		onMountDispatch: () => {
			dispatch(fetchComments({feedIndex: index, postId}));
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
