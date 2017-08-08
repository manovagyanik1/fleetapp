import { AppRegistry } from 'react-native';
import App from './app/index';

import { Sentry } from 'react-native-sentry';

Sentry.config("https://0d97517af38b4beeb0d6a50398f9d1a4:9d6553eb33d94564b25a96c4daf8afa0@sentry.io/193878").install();

AppRegistry.registerComponent('LolMeNow', () => App);
