import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
import Home from './pages/Home/Home';
// import UnderMaintenance from './pages/UnderMaintenance/UnderMaintenance'

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}

        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <Provider /> */}

    </div>
  );
}

export default App;
