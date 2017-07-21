import React, {Component} from 'react';
import PropType from 'prop-types';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Gen from '../utils/gen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
        backgroundColor: '#fff',
	},
	input: {
		height: 40,
		marginBottom: 20,
        fontSize: 16,
		color: '#000',
		paddingHorizontal: 10,
		flexGrow: 1,
	},
	buttonContainer: {
	    height: 40,
		width: 40,
	},
	icon: {
	    flex: 1,
		alignSelf: 'center',
	},
});

class CommentForm extends Component {
	componentDidMount() {
	}

	render() {
		const {onCommentPost, postId, feedIndex} = this.props;
		return (
			<View behavior="padding" style={styles.container}>
				<TextInput
					placeholder="Say something funny"
					placeholderTextColor="rgba(120,5, 155, 1)"
					style={styles.input}
					autoCapitalize="none"
                    ref="commentText"
					autoCorrect={false}
					returnKeyType="go"
				/>
				<TouchableHighlight style={styles.buttonContainer} onPress={() => onCommentPost({postId, feedIndex, text: this.refs.commentText._lastNativeText})}>
					<Icon name="md-send" size={30} color="#78059B" style={styles.icon} />
				</TouchableHighlight>
			</View>
		);
	}
}

CommentForm.propTypes = {
	onCommentPost: PropType.func.isRequired,
	feedIndex: PropType.number.isRequired,
	postId: PropType.string.isRequired,
};

export default CommentForm;

