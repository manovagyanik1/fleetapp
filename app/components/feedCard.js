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
    icon: {
        height: 30,
        width:30,
        marginRight: 5,
        marginLeft: 5,
    },
    cardFooter: {
    flex: 1,
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: 'space-around',
    backgroundColor: "#fff"
    },
    reactionContainer: {
      flex: 1,
        flexDirection: "row",
    },
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
    const getFooter = () => {
      if (imgHeight > 0) {
        return (
          <View style={styles.cardFooter}>
              <View style={styles.reactionContainer}>
                  <TouchableHighlight onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.WOW})}>
                      <Image style={styles.icon} source={require('../img/laugh.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.WOW})}>
                      <Image style={styles.icon} source={require('../img/haha.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.HAHA})}>
                      <Image style={styles.icon} source={require('../img/wow.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => onReactionClick({feedIndex, feedId, reactionType: Constants.REACTION_TYPE.CLAP})}>
                      <Image style={styles.icon} source={require('../img/clap.png')}/>
                  </TouchableHighlight>
              </View>
            <TouchableHighlight onPress={() => onCommentClick(data.id)}>
                <Image style={styles.icon} source={require('../img/comment.png')}/>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => onShareClick(data.id)}>
                <Image style={styles.icon} source={require('../img/share.png')}/>
            </TouchableHighlight>
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

