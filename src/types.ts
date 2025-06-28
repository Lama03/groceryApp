export type Product = {
    id: string;
    title: string;
    price: number;
    discountPrice?: number;
    img: string;
    rating: number;
};


export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    MainApp: undefined;
  
  };
  
  export type HomeStackParamList = {
    Home: undefined;
    ProductList: { categoryId: number, title: string };
    ProductDetail: {
      product: Product;
    };
  
  };
  
  export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
  };


  export type CartStackParamList = {
    Cart: undefined;
    Checkout: {total:number};
  };



  
  export type Address = {
    id: string;
    title: string;
    details: string;
};

  
  export type CartItem = Product & { quantity: number };
