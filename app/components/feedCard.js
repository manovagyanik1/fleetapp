import React, {Component} from "react";
import PropType from "prop-types";
import {
  View,
  Image,
  Text,
    StatusBar,
  StyleSheet,
    TouchableWithoutFeedback,
  Dimensions, TouchableHighlight
} from "react-native";
import * as Constants from '../constants';
import ReactionAndCount from "./reactionAndCount";
import LinearGradient from 'react-native-linear-gradient';
import Analytics from "../utils/analytics";
import Gen from "../utils/gen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    elevation: 4,
      alignItems:'flex-start',
      justifyContent: 'flex-start',
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
      flex: 1,
        height: 40,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 20,
        marginLeft: 20,
    },
    shareCommentContainer: {
      flex: 0.3,
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 40,
    },
    reactionIndicator: {
      flex: 1,
        height: 15,
        borderRadius: 10,
        zIndex: 1,
        alignSelf: 'center',
        marginBottom: 20,
    },
    icon: {
      zIndex:2,
        height: 25,
        width: 25,
    },
    iconContainer: {
      zIndex: 2,
        alignItems: 'center',
    },
    negativeRightMargin: {
      marginRight: -10,
    },
    negativeLeftMargin: {
      marginLeft: -10,
    },
    rightMargin: {
      marginRight: 10,
    },
    leftMargin: {
        marginLeft: 10,
    },
    opacity: {
      opacity: 0.5,
    }
});

class FeedCard extends Component {
    componentDidMount(){
        const {feedIndex} = this.props;
        Analytics.trackFeedCard(feedIndex);
    }

    getReactionContainer = ({currentUserReaction, onReactionClick, feedIndex, feedId, LOL, POOP}) => {
        const reactionRatio = Gen.getReactionRatio({LOL, POOP});
      if (currentUserReaction) {
          if(currentUserReaction === Constants.REACTION_TYPE.LOL) {
              return (
                  <View style={styles.reactionsContainer}>
                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                          <View style={styles.iconContainer}>
                              <Image style={[styles.icon]} source={require('../img/lol.png')} />
                              <Text>{LOL}</Text>
                          </View>
                      </TouchableWithoutFeedback>

                      <LinearGradient
                          start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}}
                          locations={[reactionRatio, reactionRatio,1]}
                          colors={['#fada57', '#916233', '#916233']} style={styles.reactionIndicator} />

                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.POOP})}>
                          <View style={styles.iconContainer}>
                              <Image style={[styles.icon, styles.opacity]} source={require('../img/poop.png')} />
                              <Text>{POOP}</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  </View>);
          } else {
              return (
                  <View style={styles.reactionsContainer}>
                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                          <View style={styles.iconContainer}>
                              <Image style={[styles.icon, styles.opacity]} source={require('../img/lol.png')} />
                              <Text>{LOL}</Text>
                          </View>
                      </TouchableWithoutFeedback>

                      <LinearGradient
                          start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}}
                          locations={[reactionRatio, reactionRatio,1]}
                          colors={['#fada57', '#916233', '#916233']} style={styles.reactionIndicator} />

                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.POOP})}>
                          <View style={styles.iconContainer}>
                              <Image style={[styles.icon]} source={require('../img/poop.png')} />
                              <Text>{POOP}</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  </View>);
          }

      } else {
          return (
              <View style={styles.reactionsContainer}>
                  <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                      <View style={[styles.iconContainer, styles.rightMargin]}>
                          <Image style={[styles.icon]} source={require('../img/lol.png')} />
                          <Text></Text>
                      </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.POOP})}>
                      <View style={[styles.iconContainer, styles.leftMargin]}>
                          <Image style={[styles.icon]} source={require('../img/poop.png')} />
                          <Text></Text>
                      </View>
                  </TouchableWithoutFeedback>
              </View>);
      }
  }

  render() {
    const data = this.props.card;
    const feedId = data[Constants.ID];
    const {onReactionClick, onCommentClick, onShareClick, feedIndex} = this.props;
    const {userReactions: {LOL, POOP}, commentCount, data: {width, src: url, height}, currentUserReaction, _id: postId} = data;
    const imgWidth = Dimensions.get('window').width;
    const scaleFactor = width / imgWidth;
    const imgHeight = height / scaleFactor;

    const getFooter = () => {
      if (1) {
        return (
          <View style={styles.cardFooter}>
              {this.getReactionContainer({currentUserReaction, onReactionClick, feedIndex, feedId, LOL, POOP})}
              <View style={styles.shareCommentContainer}>
                  <TouchableWithoutFeedback onPress={() => onCommentClick({index: feedIndex, postId})}>
                      <View style={styles.iconContainer}>
                          <Image style={[styles.icon]} source={require('../img/comment.png')} />
                          <Text>{commentCount}</Text>
                      </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => onShareClick({feedIndex, feedId, url})}>
                      <View style={styles.iconContainer}>
                          <Image style={[styles.icon]} source={require('../img/whatsapp.png')} />
                          <Text></Text>
                      </View>
                  </TouchableWithoutFeedback>
              </View>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.props.onCommentClick({index: feedIndex, postId})}>
        <Image
          source={{uri: url}}
          style={{height: imgHeight, width: imgWidth}}
          defaultSource={require("../img/placeholder.jpg")}>
        </Image>
          </TouchableWithoutFeedback>
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

