import React from 'react'
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex w-full h-screen">
      {/* Left Side: Fixed 50% width */}
      <div className="flex items-center justify-center bg-blue-300 w-1/2 px-12">
        <div className="w-full space-y-6 text-center ">
          <h1 className="text-5xl font-extrabold tracking-tight">Welcome to TF Market</h1>
        </div>
      </div>  

      {/* Right Side: Flex grow to fill remaining space */}
      <div className="flex flex-grow items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
