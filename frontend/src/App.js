
import './App.css';
import Home from './components/Home/Home';
import OldSales from './components/OldSales/OldSales.js'
import { SaveProduct } from './components/SaveProduct.js/SaveProduct';
import {ListOfPrice} from './components/ListOfPrice/ListOfPrice';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { EditProduct } from './components/EditProduct/EditProduct';
import NavBar from './components/Navbar/Navbar.js';
// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:8080/sales')

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <NavBar/>
              <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route path='/oldsales' element={<OldSales />} />
                  <Route path='/saveproduct' element={<SaveProduct />} />
                  <Route path='/list' element={<ListOfPrice />} />
                  <Route path='/edit/:id' element={<EditProduct />} />
              </Routes>
      </BrowserRouter>
        
      
      
    </div>
  );
}

export default App;
