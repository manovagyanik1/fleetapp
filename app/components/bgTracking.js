import React, { Component } from 'react';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import {Text, View} from "react-native";

class BgTracking extends Component {
  componentWillMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      locationTimeout: 30,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
      interval: 100,
      fastestInterval: 100,
        saveBatteryOnBackground: false,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'https://eaea8462.ngrok.io ',
      httpHeaders: {
        'X-FOO': 'bar'
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      //handle your locations here
        console.log('[DEBUG] BackgroundGeolocation location '+location);
        //Actions.sendLocation(location);
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      //handle stationary locations here
        console.log('[DEBUG] BackgroundGeolocation stationary '+stationaryLocation);

        //Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.start(() => {
      console.log('[DEBUG] BackgroundGeolocation started successfully');    
    });

      BackgroundGeolocation.isLocationEnabled((data) => {
          console.log('[DEBUG] BackgroundGeolocation isLocationEnabled'  + data);
      });
  }
  render() {
      return <Text>Hello</Text>
  }
}

export default BgTracking;
