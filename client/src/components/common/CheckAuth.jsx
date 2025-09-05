import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  
  console.log(location.pathname, isAuthenticated);

  // Redirect to specific home page based on authentication status
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/signin" />;
    } else {
      return user?.role === "admin" 
        ? <Navigate to="/admin/admindashboard" /> 
        : <Navigate to="/shop/shophome" />;
    }
  }

  // If not authenticated and not on signin or signup pages, redirect to signin
  if (!isAuthenticated && !location.pathname.includes("/signin") && !location.pathname.includes("/signup")) {
    return <Navigate to="/auth/signin" />;
  }

  // If authenticated and trying to access signin/signup pages, redirect to user dashboard
  if (isAuthenticated && (location.pathname.includes("/signin") || location.pathname.includes("/signup"))) {
    return user?.role === "admin" 
      ? <Navigate to="/admin/admindashboard" /> 
      : <Navigate to="/shop/shophome" />;
  }

  // If user is authenticated and trying to access admin pages but is not an admin, redirect to unauth page
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauthpage" />;
  }

  // If admin is trying to access shop pages, redirect to admin dashboard
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/admindashboard" />;
  }

  // If none of the above conditions match, render the children (i.e., allow access)
  return <>{children}</>;
}

export default CheckAuth;
