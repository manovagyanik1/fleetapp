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
import Gen from '../utils/gen';
import CommentCard from '../components/commentCard';
import CommentForm from '../components/commentForm';

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
    state = {
        imgWidth: 0,
        imgHeight: 0,
    };

    componentDidMount() {
        this.props.onMountDispatch();
        const {url} = this.props;
        Image.getSize(url, (width, height) => {
            // calculate image width and height
            const screenWidth = Dimensions.get('window').width;
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
        })
    }

    getImageCard = () => {
        const {url} = this.props;
        const {imgWidth, imgHeight} = this.state;
        return (<Image
            source={{uri: url}}
            style={{height: imgHeight, width: imgWidth}}
            defaultSource={require('../img/placeholder.jpg')}
        />);
    }

    getCommentPost = ({feedIndex, postId, onCommentPost}) => {
        return (<View style={styles.commentPost}>
            <CommentForm style={styles.commentPost} feedIndex={feedIndex} postId={postId}
                         onCommentPost={(data) => onCommentPost(data)}/>
        </View>);
    }

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
	return {
	    url: state.feed.posts.results[index].url,
		comments: state.feed.posts.results[index].comments,
		index,
		postId: state.feed.posts.results[index]._id,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const {index} = ownProps.navigation.state.params;
	return {
		onMountDispatch: () => {
			dispatch(fetchComments({feedIndex: index}));
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
