export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'cement' | 'steel' | 'tanks' | 'roofing' | 'construction';
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}