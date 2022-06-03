
import './App.css';
import Home from './components/Home/Home';
import OldSales from './components/OldSales/OldSales.js'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:8080/sales')

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/oldsales' element={<OldSales />} />
        </Routes>
      </BrowserRouter>
        
      
      
    </div>
  );
}

export default App;
