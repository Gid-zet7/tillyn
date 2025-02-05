type User = {
  _id: string;
  email: string;
  preferred_email: string;
  picture?: string;
  last_name: string;
  first_name: string;
  is_suspended?: boolean;
  phone_number?: string;
  address?: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
  };
  // createdAt: Date;
  // updatedAt: Date;
  __v: number;
};

type Users = {
  _id: string;
  email: string;
  picture?: string;
  last_name: string;
  first_name: string;
  is_suspended?: boolean;
  phone_number?: string;
  address?: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}[];

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
  image_url: string;
  description: string;
  price: number;
  ratings: number;
  size: string;
  brand: string;
  stock: number;
  category: Category;
  seller: User;
  selectedSize: string;
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

type Cart = {
  _id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type CartItem = {
  _id: string;
  name: string;
  image_url: string;
  price: number;
  product: Product;
  quantity: number;
  brand: string;
  size: string;
  selectedSize: string;
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

type UsersArray =
  | {
      id?: string;
      provided_id?: string;
      email?: string;
      username?: string;
      last_name?: string;
      first_name?: string;
      is_suspended?: boolean;
      picture?: string;
      total_sign_ins?: number | null;
      failed_sign_ins?: number | null;
      last_signed_in?: string | null;
      created_on?: string | null;
      organizations?: Array<string>;
      identities?: Array<{
        type?: string;
        identity?: string;
      }>;
    }[]
  | undefined;
