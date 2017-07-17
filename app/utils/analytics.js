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

export default class Analytics {
    public static trackScreenView(screenName) {
        tracker.trackScreenView(screenName);
    }

    public static setUser() {
        tracker.setUser(Gen.getUserId().toString());
    }

    private static trackEvent(category, action, optionalValues) {
        tracker.trackEvent(category, action, optionalValues);
    }

    public static trackFeedCard(feedId) {
        Analytics.trackEvent(CATEGORY.FEED, ACTION.CLICK, {feedId});
    }

    public static startSession() {
        Analytics.trackEvent(CATEGORY.GARBAGE, ACTION.GARBAGE, {sessionControl: 'start'});
    }

    public static commentClick(feedId) {
        Analytics.trackEvent(CATEGORY.FEED_COMMENT, ACTION.CLICK, {feedId});
    }

    public static feedShare(feedId) {
        Analytics.trackEvent(CATEGORY.FEED_SHARE, ACTION.CLICK, {feedId});
    }

    public static feedReaction({feedId, reactionType}) {
        Analytics.trackEvent(CATEGORY.FEED_REACTION, ACTION.CLICK, {feedId, reactionType});
    }
}
