import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Player from './components/Player';


const store = configureStore();

export default function Root() {
    return (
        <Provider store={store}>
            <Player />
        </Provider>
    );
}
