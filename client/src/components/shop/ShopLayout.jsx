import React from 'react';
import { Outlet } from 'react-router-dom';
import ShoppingHeader from './ShopHeader';

function ShoppingLayout() {
  return (
    <div className="shop-layout w-full">
      {/* Header with shopping cart, user account, etc. */}
      <ShoppingHeader />
      
      {/* Main content area where the nested routes will be displayed */}
      <main className="p-4 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
