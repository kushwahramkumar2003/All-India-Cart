// Define the enumeration for AuthProvider
enum AuthProvider {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  GITHUB = "GITHUB",
}

// Define the User interface
export interface User {
  id: string; // Prisma generates this automatically
  username?: string | null;
  name?: string | null;
  email: string;
  provider: AuthProvider;
  createdAt: Date;
  lastLogin?: Date | null;
  profile: UserProfile;
  userProfileId: string; // Foreign key to UserProfile
}

// Define the UserProfile interface
export interface UserProfile {
  id: string; // Prisma generates this automatically
  class?: string | null;
  room?: string | null;
  building?: string | null;
  addresses?: Address[]; // Assuming Address is another model
  voiceMail?: string | null;
  creditCard?: string | null;
  dateEntered?: Date | null;
  dateUpdated?: Date | null;
  active: boolean;
  deleted: boolean;
  notes?: string | null;
  billingAddressId?: string | null; // Assuming Address is another model
  shippingAddressId?: string | null; // Assuming Address is another model
  orders?: Order[]; // Assuming Order is another model
  createdAt: Date;
  users: User[];
  creditCardType?: CreditCardType | null; // Assuming CreditCardType is another model
  creditCardTypeId?: string | null;
  cardExpiration?: CardExpiration | null; // Assuming CardExpiration is another model
  cardExpirationId?: string | null;
}

// Define the Address interface
export interface Address {
  id: string; // Prisma generates this automatically
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: AddressType; // Assuming AddressType is another model
  typeId: string;
  userProfile?: UserProfile | null;
  userProfileId?: string | null;
}

// Define the AddressType interface
export interface AddressType {
  id: string; // Prisma generates this automatically
  name: string;
  addresses: Address[];
}

// Define the CreditCardType interface
export interface CreditCardType {
  id: string; // Prisma generates this automatically
  name: string;
  userProfiles: UserProfile[];
}

// Define the CardExpiration interface
export interface CardExpiration {
  id: string; // Prisma generates this automatically
  month: number;
  year: number;
  userProfiles: UserProfile[];
}

// Define the Category interface
export interface Category {
  id: string; // Prisma generates this automatically
  name: string;
  description: string;
  picture?: string | null;
  active: boolean;
  products: Product[];
}

// Define the Shipper interface
export interface Shipper {
  id: string; // Prisma generates this automatically
  companyName: string;
  phone: string;
  orders: Order[];
}

// Define the Payment interface
export interface Payment {
  id: string; // Prisma generates this automatically
  type: string;
  allowed: boolean;
  orders: Order[];
}

// Define the Order interface
export interface Order {
  id: string; // Prisma generates this automatically
  orderNumber: number;
  payment: Payment;
  paymentId: string;
  orderDate: Date;
  shipDate: Date;
  requiredDate: Date;
  shipper: Shipper;
  shipperId: string;
  freight: string;
  salesTax: number;
  timestamp: Date;
  transactStatus: boolean;
  errLocation: string;
  errMsg: string;
  fulfilled: boolean;
  deleted: boolean;
  paid: boolean;
  paymentDate: Date;
  orderDetails: OrderDetail[];
  userProfile?: UserProfile | null;
  userProfileId?: string | null;
}

// Define the OrderDetail interface
export interface OrderDetail {
  id: string; // Prisma generates this automatically
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
  fulfilled: boolean;
  shipDate: Date;
  billDate: Date;
}

// Define the Product interface
export interface Product {
  id: string; // Prisma generates this automatically
  sku: string; // UUID generated by Prisma
  name: string;
  description: string;
  supplier: Supplier;
  supplierId: string;
  category: Category;
  categoryId: string;
  quantityPerUnit: number;
  unitPrice: number;
  msrp: number;
  availableSize: string[];
  availableColors: string[];
  size: string;
  color: string;
  discount: number;
  unitWeight: number;
  unitInStock: boolean;
  unitsOnOrder?: number | null;
  reorderLevel: number;
  productAvailable: boolean;
  currentOrder?: number | null;
  picture: string[];
  createdAt: Date;
  updatedAt: Date;
  ranking?: number | null;
  notes?: string | null;
  tag: Tags;
  orderDetails: OrderDetail[];
}

// Define the Supplier interface (not included in the initial schema, but referenced in Product)
export interface Supplier {
  id: string; // Prisma generates this automatically
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  homePage: string;
  products: Product[];
}

// Define the Tags enum (assuming it's an enum)
export enum Tags {
  NEW = "NEW",
  SALE = "SALE",
  CLEARANCE = "CLEARANCE",
}
