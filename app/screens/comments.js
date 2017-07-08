import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchComments} from '../thunks';
import FeedCard from "../components/feedCard";
import {
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { users } from '../config/data';

class CommentsScreenElements extends Component {
  componentDidMount() {
      this.props.onMountDispatch();
  }

  render() {
    const {index, comments} = this.props;
    return (
            results.length > 0 ?
              <FlatList
                data={results}
                renderItem={({item}) => {
                  return <FeedCard
                    card={item}
                    onCommentClick={onItemClick}
                    onLikeClick={() => console.log("like clicked")}
                    onShareClick={() => console.log("share clicked")}
                  />
                }}
                keyExtractor={(card, index) => index}
            />
            : null
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    console.log("hello"); 
    const {index} = ownProps.navigation.state.params;
    return {
        comments: state.feed.posts.results[index].comments,
        index,
    }
};

const mapDispatchToProps = (dispatch) => ({
    onMountDispatch: () => {
        dispatch(fetchComments({}));
    }
}) ;

const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsScreenElements);

export default Comments;
