import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/auth/Loging';
import Register from './pages/auth/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Items from './pages/item/Items';
import Cart from './pages/Cart';
import Layout from './layouts/Layout';
import AdvanceLevel from './pages/item/AdvanceLevel';
import Checkout from './pages/Checkout';
import Item from './pages/item/Item';
import University from './pages/item/University';
import OtherEducational from './pages/item/OtherEducational';
import Novels from './pages/item/Novels';
import Fiction from './pages/item/Fiction';
import Children from './pages/item/Children';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import SignOut from './customs/SignOut';




function App() {
  return (
    


    <div className="App">

    


      <BrowserRouter>

        <Routes>
        <Route path="/" element={<Layout />}>
          
        <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Homepage/>} />
              <Route path="/items" element={<Items />} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/items/al' element={<AdvanceLevel/>} />
              <Route path='/cart/checkout' element={<Checkout/>} />
              <Route path='/items/id' element={<Item/>} />
              <Route path='/items/university' element={<University/>} />
              <Route path='/items/otherEducational' element={<OtherEducational/>}/>
              <Route path='/items/novels' element={<Novels/>} />
              <Route path='/items/fiction' element={<Fiction/>} />
              <Route path='/items/Children' element={<Children/>} />
              <Route path='/aboutus' element={<AboutUs/>}/>
              <Route path='/signOut' element={<SignOut/>} />
            
            
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
