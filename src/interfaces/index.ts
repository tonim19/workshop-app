export interface Item {
  title: string;
  desc: string;
  price: number;
  category: "marketing" | "backend" | "frontend" | "design";
  date: string;
  imageUrl: string;
  userId: number;
  id: number;
  quantity: number;
}
