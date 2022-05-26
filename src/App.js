import './App.css';
import React from 'react';
import MainRouter from './MainRouter/MainRouter';
import store from './Features/store';
import {Provider} from 'react-redux';

function App() {
//comment add new

return(
    <div className="App">

        
    <Provider store={store}>
          <MainRouter />
    </Provider>
    </div>
  
) 
}

  

export default App ;
