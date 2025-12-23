import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Wishlist from './pages/WishList/WishList';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import ProfileHistory from "./pages/ProfileHistory/ProfileHistory";
import SearchResults from "./pages/SearchResults/SearchResults";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-history"
          element={
            <ProtectedRoute>
              <ProfileHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/get-blog/:id" element={<BlogDetails />} />
        <Route path="/search" element={<SearchResults />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
