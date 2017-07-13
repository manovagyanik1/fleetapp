import React, {Component} from "react";
import PropType from "prop-types";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions, TouchableHighlight
} from "react-native";
import * as Constants from '../constants';
import ReactionAndCount from "./reactionAndCount";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    elevation: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    }
  },
    cardFooter: {
        flex: 1,
        flexDirection: "row",
        height: 64,
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    reactionsContainer: {
      flex: 0.6,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    shareCommentContainer: {
      flex: 0.4,
        flexDirection: 'row',
        marginTop: 5,
    },
    emptyView: {
      flex: 1,
    }
});

class FeedCard extends Component {
  state = {
    imgWidth: 0,
    imgHeight: 0,
  };

  componentDidMount() {
    const data = this.props.card;
    Image.getSize(data.url, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
    })
  }

  render() {
    const data = this.props.card;
    const feedId = data[Constants.ID];
    const {imgWidth, imgHeight} = this.state;
    const {onReactionClick, onCommentClick, onShareClick, feedIndex} = this.props;
    const {userReaction: {CLAP, HAHA, LOL, WOW, COMMENT}} = data;
    const getFooter = () => {
      if (imgHeight > 0) {
        return (
          <View style={styles.cardFooter}>
              <View style={styles.reactionsContainer}>
                  <ReactionAndCount
                      imageSource={require('../img/lol.png')}
                      reactionCount={LOL}
                      onReactionClick={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})} />
                  <ReactionAndCount
                      imageSource={require('../img/haha.png')}
                      reactionCount={HAHA}
                      onReactionClick={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.HAHA})} />
                  <ReactionAndCount
                      imageSource={require('../img/wow.png')}
                      reactionCount={WOW}
                      onReactionClick={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.WOW})} />
                  <ReactionAndCount
                      imageSource={require('../img/clap.png')}
                      reactionCount={CLAP}
                      onReactionClick={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.CLAP})} />
              </View>
              <View style={styles.emptyView} />
              <View style={styles.shareCommentContainer}>
                  <ReactionAndCount
                      imageSource={require('../img/comment.png')}
                      reactionCount={COMMENT}
                      onReactionClick={() => onCommentClick(data.id)} />
                  <ReactionAndCount
                      imageSource={require('../img/share.png')}
                      onReactionClick={() => console.log('share clicked!')} />
              </View>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <Image
          source={{uri: data.url}}
          style={{height: imgHeight, width: imgWidth}}
          defaultSource={require("../img/placeholder.jpg")}>
        </Image>
        {getFooter()}
      </View>
    );
  };
}

FeedCard.propTypes = {
    card: PropType.object.isRequired,
    feedIndex: PropType.number.isRequired,
    onCommentClick: PropType.func.isRequired,
    onReactionClick: PropType.func.isRequired,
    onShareClick: PropType.func.isRequired,
};

export default FeedCard;

