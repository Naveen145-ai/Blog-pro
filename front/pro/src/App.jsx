import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Wishlist from './pages/WishList/WishList';
import CreateBlog from './pages/CreateBlog/CreateBlog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/create-blog" element={<CreateBlog />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
