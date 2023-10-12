import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './views/Main'
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
