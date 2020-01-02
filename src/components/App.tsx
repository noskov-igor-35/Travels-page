import * as React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers/filters';

import Filter from './App/Filter';
import Sorting from './App/Sorting';
import View from './App/View';
import Pagination from './App/Pagination';

import './App/App.less';

const store = createStore(reducers);

function App(): JSX.Element {
    return (
        <div className='App'>
            <Provider store={ store }>
                <div className='flexbox flex-direction--column padding--xl default-font-size'>
                    <div className='flexbox justify-content--space-between flex-direction--column-sm'>
                        <div className='padding-bottom--l'>
                            <Filter/>
                        </div>
                        <div className='padding-bottom--l'>
                            <Sorting/>
                        </div>
                    </div>
                    <div className='padding-bottom--xl'>
                        <View/>
                    </div>
                    <div className='flexbox justify-content--center'>
                        <Pagination/>
                    </div>
                </div>
            </Provider>
        </div>
    )
};

export default App;
