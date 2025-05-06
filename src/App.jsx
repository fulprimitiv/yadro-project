import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import Header from './components/Header';
import ButtonPanel from './components/ButtonPanel';
import Chart from './components/Chart';
import Table from './components/Table';

function App() {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <Header />
        <div className="app-container">
          <ButtonPanel />
          <Chart />
          <Table />
        </div>
      </div>
    </Provider>
  );
}

export default App;
