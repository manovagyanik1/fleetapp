import React, { Component } from 'react';
import {connect} from "react-redux";
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
import BgTracking from "../components/bgTracking";


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    feedHeader: {
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(180,60,216,0.85)',
        height: 40,
    },
    feedHeaderPlaceholder: {
        width: '100%',
        backgroundColor: '#fff',
        height: 40,
    },
    feedContainer: {
        backgroundColor: "rgba(180,60,216, .3)",
    }
});


class FeedScreenElements extends Component {

  render() {
    return (
            <BgTracking/>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
};


const Feed = connect(mapStateToProps)(FeedScreenElements);

export default Feed;
