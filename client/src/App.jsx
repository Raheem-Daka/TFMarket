import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import AdminLayout from './components/admin/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFeatures from './pages/admin/AdminFeatures';
import NotFound from './pages/notFound';
import ShoppingLayout from './components/shop/ShopLayout';
import ShopCheckOut from './pages/shop/ShopCheckOut';
import ShopListing from './pages/shop/ShopListing';
import ShopHome from './pages/shop/ShopHome';
import ShopAccount from './pages/shop/ShopAccount';
import CheckAuth from './components/common/CheckAuth';
import UnauthPage from './pages/unauthPage/UnauthPage';

function App() {

  const isAuthenticated = false;
  const user = null;

  return (
    <Routes>
      {/* Root Route */}
      <Route path="/" element={<Home />} />
      
      {/* Authentication Routes */}
      <Route path="/auth" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>      
      }>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      }>
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="adminfeatures" element={<AdminFeatures />} />
        <Route path="adminorders" element={<AdminOrders />} />
        <Route path="adminproducts" element={<AdminProducts />} />
      </Route>

       {/* Shop Routes */}
      <Route path="/shop" element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      }>
        <Route path="shopaccount" element={<ShopAccount />} />
        <Route path="shophome" element={<ShopHome />} />
        <Route path="shoplisting" element={<ShopListing />} />
        <Route path="shopcheckout" element={<ShopCheckOut />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path="/unauthpage" element={<UnauthPage />}/>
      <Route path="*" element={<NotFound />}/>
     
    </Routes>
  );
}

export default App;
