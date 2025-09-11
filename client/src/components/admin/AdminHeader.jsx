import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const AdminHeader = ({ setOpen }) => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out');
    // You can redirect the user to a login page or reset the session.
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
