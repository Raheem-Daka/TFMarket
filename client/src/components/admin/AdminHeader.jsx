import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice/index";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/auth/signin");  // redirect to signin page
      } else {
        console.error("Logout failed:", resultAction.payload || resultAction.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="w-full flex items-center bg-blue-50 justify-between p-2">
      {/* Mobile Toggle Button */}
      <Button 
        onClick={() => setOpen(true)} 
        className="lg:hidden sm:block bg-blue-400 rounded p-2"
        aria-label="Toggle Sidebar Menu"
      >
        <AlignJustify size={24} />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Right-Aligned Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button 
          onClick={handleLogout} 
          className="inline-flex gap-2 items-center bg-blue-400 rounded p-2"
          aria-label="Logout"
        >
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
