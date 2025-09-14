import { HomeIcon, HousePlug, MenuIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { SheetTrigger, Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { shoppingHeaderMenuItems } from '@/config';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ShoppingCart } from 'lucide-react';
import user from "../../../../server/models/user"

function MenuItems({ className = "" }) {
  return (
    <nav className={`flex flex-col mb-3 lg:mb-0 lg:items-center gap-2 lg:flex-row ${className}`}>
      {shoppingHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-medium text-gray-700 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}; 

function HeaderLeftContent (){
  console.log(user.email)
  return(
    <div className="flex lg:items-center lg:flex-row gap-2">
      <Button variant="outline" size="icon"> 
        <ShoppingCart className="w-6 h-6"/>
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-blue-300">
            <AvatarFallback className="items-center">
              `${user.email}`
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  )
}

function ShoppingHeader() {

  const {isAuthenticated} = useSelector(state=>state.auth);

  return (
    <header className="sticky bg-background  border-b border-blue-100 top-0 z-40 w-full">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/shophome" className="flex item-center gap-6">
        <HomeIcon className="text-blue-400"/>
        <span className="font-bold">gyMarket</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto lg:hidden border border-blue-400">
              <MenuIcon className="h-6 w-6 rounded text-blue-400" side="right"/>
              <span className="sr-only">Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white w-full max-w-xs">
            <SheetTitle className="border-b border-blue-100 text-blue-400 pb-2">Menu</SheetTitle>
            <MenuItems className="pt-3"/>
          </SheetContent>
        </Sheet>

        {/* largescreens menus*/}
        <div className="hidden lg:block">
          <MenuItems className="gap-3"/>
        </div>
        {
          isAuthenticated ? 
          <div>
            <HeaderLeftContent />
          </div> : null
        }
      </div>
    </header>
  )
}
export default ShoppingHeader;