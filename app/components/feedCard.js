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
      flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    },
    icon: {
      zIndex:2,
        height: 25,
        width: 25,
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
    opacity: {
      opacity: 0.3,
    }
});

class FeedCard extends Component {

    getReactionContainer = ({currentUserReaction, onReactionClick, feedIndex, feedId, LOL, POOP}) => {
      if (currentUserReaction) {
          if(currentUserReaction === Constants.REACTION_TYPE.LOL) {
              return (
                  <View style={styles.reactionsContainer}>
                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                          <Image style={[styles.icon, styles.negativeRightMargin]} source={require('../img/lol.png')} />
                      </TouchableWithoutFeedback>

                      <LinearGradient
                          start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}}
                          locations={[0.3, 0.3,1]}
                          colors={['#fada57', '#916233', '#916233']} style={styles.reactionIndicator} />

                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.HAHA})}>
                          <Image style={[styles.icon, styles.negativeLeftMargin, styles.opacity]} source={require('../img/poop.png')} />
                      </TouchableWithoutFeedback>
                  </View>);
          } else {
              return (
                  <View style={styles.reactionsContainer}>
                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                          <Image style={[styles.icon, styles.negativeRightMargin, styles.opacity]} source={require('../img/lol.png')} />
                      </TouchableWithoutFeedback>

                      <LinearGradient
                          start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}}
                          locations={[0.3, 0.3,1]}
                          colors={['#fada57', '#916233', '#916233']} style={styles.reactionIndicator} />

                      <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.HAHA})}>
                          <Image style={[styles.icon, styles.negativeLeftMargin]} source={require('../img/poop.png')} />
                      </TouchableWithoutFeedback>
                  </View>);
          }

      } else {
          return (
              <View style={styles.reactionsContainer}>
                  <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.LOL})}>
                      <Image style={[styles.icon, styles.rightMargin]} source={require('../img/lol.png')} />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.HAHA})}>
                      <Image style={[styles.icon]} source={require('../img/poop.png')} />
                  </TouchableWithoutFeedback>
              </View>);
      }
  }

  render() {
    const data = this.props.card;
    const feedId = data[Constants.ID];
    const {onReactionClick, onCommentClick, onShareClick, feedIndex} = this.props;
    const {userReactions: {LOL, POOP}, commentCount, data: {width, src: url, height}, currentUserReaction} = data;
    const imgWidth = Dimensions.get('window').width;
    const scaleFactor = width / imgWidth;
    const imgHeight = height / scaleFactor;

    const getFooter = () => {
      if (1) {
        return (
          <View style={styles.cardFooter}>
              {this.getReactionContainer({currentUserReaction, onReactionClick, feedIndex, feedId, LOL, POOP})}
              <View style={styles.shareCommentContainer}>
                  <TouchableWithoutFeedback onPress={() => onCommentClick(data.id)}>
                      <Image style={styles.icon} source={require('../img/comment.png')} />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => onShareClick({feedIndex, feedId, url})}>
                      <Image style={styles.icon} source={require('../img/whatsapp.png')} />
                  </TouchableWithoutFeedback>
              </View>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={() => this.props.onCommentClick(this.props.card.id)}>
        <Image
          source={{uri: url}}
          style={{height: imgHeight, width: imgWidth}}
          defaultSource={require("../img/placeholder.jpg")}>
        </Image>
          </TouchableHighlight>
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

