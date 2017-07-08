import React, {Component} from 'react';
import PropType from 'prop-types';
import {ListItem} from 'react-native-elements';

// TODO: make it a pure/functional component
class CommentProfileHeader extends Component {
	componentDidMount() {
	}

	render() {
		const {name, url, time} = this.props;

		return (
			<ListItem
				avatar={{uri: url}}
				roundAvatar
				title={name}
				subtitle={time}
				hideChevron
			/>
		);
	}
}

CommentProfileHeader.propTypes = {
	name: PropType.string,
	url: PropType.string,
	time: PropType.string,
	onProfileClick: PropType.func.isRequired,
};

export default CommentProfileHeader;

