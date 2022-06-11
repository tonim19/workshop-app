export interface Item {
  title: string;
  desc: string;
  price: number;
  category: "marketing" | "backend" | "frontend" | "design";
  date: string;
  time: string;
  imageUrl: string;
  userId: number;
  id: number;
  quantity: number;
}

export interface CartState {
  hidden: boolean;
  cartItems: Item[];
}
