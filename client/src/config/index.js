import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

// Signup Form Controls
export const SignupFormControls = [
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your Username',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your Email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your Password',
    componentType: 'input',
    type: 'password'
  }
];

// Signin Form Controls
export const SigninFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your Email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your Password',
    componentType: 'input',
    type: 'password'
  }
];

// Admin Sidebar Menu Items
export const AdminSideBarMenuItems = [
  {
    id: "admindashboard",
    label: "Dashboard",
    path: "/admin/admindashboard",
    icon: LayoutDashboard
  },
  {
    id: "adminproducts",
    label: "Products",
    path: "/admin/adminproducts",
    icon: ShoppingBasket
  },
  {
    id: "adminorders",
    label: "Orders",
    path: "/admin/adminorders",
    icon: BadgeCheck
  }
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

