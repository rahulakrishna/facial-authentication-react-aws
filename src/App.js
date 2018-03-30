import React, { Component } from 'react';
import Camera from './Camera';

import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        Facial Authentication
        <Route path='/face/:id' component={Camera}/>
      </div>
  )
  }
}

export default App;
