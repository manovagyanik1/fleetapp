import {GoogleAnalyticsTracker, GoogleAnalyticsSettings} from 'react-native-google-analytics-bridge';
import Gen from './gen';

const tracker = new GoogleAnalyticsTracker('UA-102700032-1');
GoogleAnalyticsSettings.setDispatchInterval(10); // dispatch analytics call every 10 seconds default is 20.
GoogleAnalyticsSettings.setDryRun(false); // make it true when testing the app.

const CATEGORY = {
    FEED: 'feed',
    GARBAGE: 'garbage',
    FEED_COMMENT: 'feed_comment',
    FEED_SHARE: 'feed_share',
    FEED_REACTION: 'feed_reaction',
    COMMENT_SHARE: 'comment_share',
};

export const SCREEN = {
    FEED: 'feed',
    COMMENT: 'comment',
    LOGIN: 'login',
};

const ACTION = {
    VIEW: 'view',
    CLICK: 'click',
    GARBAGE: 'garbage',
};

// TODO: uninstall tracking
// TODO: dev, I don't know why public static wasn't working. So I have to remove public/private declarations from functions

export default class Analytics {
    static trackScreenView(screenName) {
        tracker.trackScreenView(screenName);
    }

    static setUser() {
        tracker.setUser(Gen.getUserId().toString());
    }

    static trackEvent(category, action, optionalValues) {
        tracker.trackEvent(category, action, optionalValues);
    }

    static trackFeedCard(feedId) {
        Analytics.trackEvent(CATEGORY.FEED, ACTION.CLICK, {feedId});
    }

    // NOTE: use it when you believe that a session is getting started
    static startSession() {
        Analytics.trackEvent(CATEGORY.GARBAGE, ACTION.GARBAGE, {sessionControl: 'start'});
    }

    static commentClick(postId) {
        Analytics.trackEvent(CATEGORY.FEED_COMMENT, ACTION.CLICK, {postId});
    }

    static shareClick(postId) {
        Analytics.trackEvent(CATEGORY.FEED_SHARE, ACTION.CLICK, {postId});
    }

    static reactionClick({postId, reactionType}) {
        Analytics.trackEvent(CATEGORY.FEED_REACTION, ACTION.CLICK, {postId, reactionType});
    }
}
