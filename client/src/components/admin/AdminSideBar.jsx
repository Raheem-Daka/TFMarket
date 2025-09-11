import { useNavigate, useLocation } from 'react-router-dom';
import { AdminSideBarMenuItems } from '@/config';
import { Fragment } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const SideBarMenuItems = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderMenuItems = () => {
    return AdminSideBarMenuItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <button
          key={item.id}
          onClick={() => {
            navigate(item.path);
            setOpen && setOpen(false); // Close the menu on small screens
          }}
          className={`flex items-center gap-2 rounded-md px-3 py-2 w-full text-left transition-colors ${
            isActive ? 'bg-blue-400' : 'hover:bg-blue-200 hover:text-foreground'
          }`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      );
    });
  };

  return (
    <Fragment>
      {/* Sidebar for small screens */}
      <Sheet 
      open={open} 
      onOpenChange={setOpen}
      >
        <SheetContent side="left" className="w-64 bg-white w-64 border-l">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b">
              <SheetTitle>Admin Panel</SheetTitle>
            </SheetHeader>
            <nav className="my-8 flex flex-col gap-2">
              {renderMenuItems()}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for large screens (visible on lg and up) */}
      <nav className="w-64 hidden  p-2 bg-blue-50 lg:block flex flex-col gap-2">
        {renderMenuItems()}
      </nav>
    </Fragment>
  );
};

export default SideBarMenuItems;
