import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/auth/Loging';
import Register from './pages/auth/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Items from './pages/item/Items';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

        <Route element={<ProtectedRoute />}>
              <Route path="/" element={<>Homepage</>} />
              <Route path="/items" element={<Items />} />     
            </Route>


          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
