import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/auth/Loging';
import Register from './pages/auth/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Items from './pages/item/Items';
import Cart from './pages/Cart';
import Layout from './layouts/Layout';
import AdvanceLevel from './pages/item/AdvanceLevel';



function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
              <Route path="/" element={<>Homepage</>} />
              <Route path="/items" element={<Items />} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/items/al' element={<AdvanceLevel/>} />
            
            </Route>
            </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
