export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  art: string;
  stock: number;
  featured: boolean;
  badge: string | null;
  specs: string[];
};

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  art: string;
  category: string;
  qty: number;
};

export type Customer = {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "Processing" | "Fulfilled" | "Cancelled";
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};
