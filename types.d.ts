type User = {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone_number: string;
  brand: string;
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
  };
  subscription: Subscription;
  roles: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Subscription = {
  plan: string;
  status: string;
  startDate: Date;
  endDate: Date;
  paymentId: string;
  isTrial: boolean;
};

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  size: string;
  brand: string;
  stock: number;
  category: Category;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Category = {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Order = {
  _id: string;
  user: User;
  order_date: Date;
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
  };
  status: string;
  total_amount: number;
  payment_status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type OrderedItem = {
  _id: string;
  order: Order;
  product: Product;
  quantity: number;
  price: number;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Address = {
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
};
