import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchFeed, fetchFeedReaction} from '../thunks';
import FeedCard from "../components/feedCard";
import {
  Text,
  View,
  ScrollView,
    ImageEditor,
    Image,
    ImageStore,
  FlatList,
    StyleSheet,
} from 'react-native';
import Gen from "../utils/gen";
import Splash from './splash';


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#999DA4",
    }
});


class FeedScreenElements extends Component {
  componentDidMount() {
      this.props.onMountDispatch();
  }

  onCommentClick = (index) => {
    this.props.navigation.navigate('Comments', {index});
  };

  onShareClick = ({feedIndex, feedId, url}) => {
      Gen.shareImage(url);
      // TODO: make api calls to backend to update share count
  }

  render() {
    const {feed: {posts}, onReactionClick, onMountDispatch, fetchNextPageFeed} = this.props;
    const {results} = posts;
    // implement isFetching. do in request posts.
    return (
            results.length > 0 ?
              <FlatList
                data={results}
                style={styles.container}
                refreshing={posts.isFetching === true}
                onRefresh={() => onMountDispatch()}
                onEndReachedThreshold={0.5}
                onEndReached={() => fetchNextPageFeed({nextPageUrl: posts.pageInfo.nextPageUrl})}
                renderItem={({item, index}) => {
                  return <FeedCard
                    card={item}
                    onCommentClick={() => this.onCommentClick(index)}
                    onReactionClick={({feedIndex, feedId, reactionType}) => onReactionClick({feedIndex, feedId, reactionType})}
                    feedIndex={index}
                    onShareClick={(data) => this.onShareClick(data)}
                  />
      }}
      keyExtractor={(card, index) => index}
    />
            : <Splash/>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        feed: state.feed
    }
};

const mapDispatchToProps = (dispatch) => ({
    onMountDispatch: () => {
        dispatch(fetchFeed({}));
    },
    fetchNextPageFeed: ({nextPageUrl}) => {
        dispatch(fetchFeed({nextPageUrl}));
    },
    onReactionClick: ({feedIndex, feedId, reactionType}) => {
        dispatch(fetchFeedReaction({feedIndex, feedId, reactionType}));
    },
}) ;


const Feed = connect(mapStateToProps, mapDispatchToProps)(FeedScreenElements);

export default Feed;
