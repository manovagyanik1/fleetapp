import React, {Component} from 'react';
import PropType from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        height: 40,
    },
    logoLeft: {
        marginRight: 10,
    },
    logoRight: {
        marginLeft: 10,
    },
    logoStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
    },
    textContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textHeaderLeft: {
        fontSize: 20,
        color: '#CCCC00',
        fontWeight: '900',
        fontFamily: 'Roboto-Black',
    },
    textHeaderCenter: {
        fontSize: 20,
        color: '#CCCC00',
        fontWeight: '100',
        fontFamily: 'Roboto-Black',
    },
    textHeaderCenterRight: {
        color: '#916233',
        fontFamily: 'Roboto-Black',
    },
    textHeaderRight: {
        fontSize: 20,
        fontWeight: '100',
        color: '#916233',
        fontFamily: 'Roboto-Black',
    },
});

class FeedHeader extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.logoStyle, styles.logoLeft]} source={require('../img/lol.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.textHeaderLeft}>LOL</Text>
                    <Text style={styles.textHeaderCenter}>m</Text>
                    <Text style={[styles.textHeaderCenter, styles.textHeaderCenterRight]}>e</Text>
                    <Text style={styles.textHeaderRight}>NOW</Text>
                </View>
                <Image style={[styles.logoStyle, styles.logoRight]} source={require('../img/poop.png')} />
            </View>
        );
    }
}

export default FeedHeader;

