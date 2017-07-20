import React, { Component } from 'react';
import { Root, Tabs } from './config/router';
import { Provider } from 'react-redux';
import configureStore from "./store";
import OneSignal from 'react-native-onesignal';

const store = configureStore();

const AppRoot = ({ store }) => (
    <Provider store={store}>
        <Root/>
    </Provider>
);

OneSignal.configure({});

const App = () => <AppRoot store={store}/>

export default App;
