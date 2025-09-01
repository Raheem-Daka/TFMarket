import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/signin" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/admindashboard" />;
      } else {
        return <Navigate to="/shop/shophome" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/signin") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/signin" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/signin") ||
      location.pathname.includes("/signup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/admindashboard" />;
    } else {
      return <Navigate to="/shop/shophome" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauthpage" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/admindashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;