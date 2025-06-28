// src/data/products.ts

export type Product = {
    id: string;
    title: string;
    price: number;
    discountPrice?: number;
    img: string;
    categoryId:number;
    rating: number;
};

export const products: Product[] = [
    {
        id: '1',
        title: 'Wireless Headphones',
        img: 'https://www.producemarketguide.com/media/user_5q6Kv4eMkN/400/broccoli_commodity-page.png',
        rating: 4.5,
        price: 79.99,
        discountPrice: 59.99,
        categoryId:1,

    },
    {
        id: '2',
        title: 'Chicken 1000 g',
        img: "https://westcofoods.com/wp-content/uploads/2022/05/Whole-Chicken.jpg",
        rating: 4.2,
        price: 149.99,
        categoryId:3,
    },
    {
        id: '3',
        title: 'Bluetooth Speaker',
        img: 'https://www.papyrusnatural.co.za/wp-content/uploads/2021/05/1-1.png',
        rating: 4.6,
        price: 49.99,
        categoryId:4,

    },
    {
        id: '4',
        title: 'Gaming Mouse',
        img: 'https://cdn.usdairy.com/optimize/getmedia/9091b0fa-4e5c-42cc-90ca-34614818982d/emmental.jpg.jpg.aspx?format=webp',
        rating: 4.8,
        price: 39.99,
        discountPrice: 29.99,
        categoryId:4,
    },
    {
        id: '5',
        title: `Product 5`,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsa3K1PkfEgVzc6JeayE-uGwejpsBDBbVBUw&s',
        rating: 4.8,
        price: 39.99,
        discountPrice: 29.99,
        categoryId:2,
    },
    {
        id: '6',
        title: `Product 6`,
        img: 'https://www.aicr.org/wp-content/uploads/2019/11/redmeats.png',
        rating: 4.8,
        price: 39.99,
        categoryId:3,
    },
    {
        id: '7',
        title: `Product 7`,
        img: 'https://www.shutterstock.com/image-photo/salmon-trout-steak-slice-fresh-260nw-1511754797.jpg',
        rating: 5.00,
        price: 10.99,
        categoryId:3,
    },
    {
        id: '8',
        title: `Product 8`,
        img: 'https://www.halfyourplate.ca/wp-content/uploads/2014/12/one-apple-with-leaves.jpg',
        rating: 5.00,
        price: 10.99,
        categoryId:2,
    },
    {
        id: '9',
        title: `Product 9`,
        img: 'https://www.pharmamirror.com/wp-content/uploads/2013/06/Banna-as-Hepatitis-Oral-Vaccine.jpg',
        rating: 5.00,
        price: 10.99,
        categoryId:2,
    },
    {
        id: '10',
        title: `Product 10`,
        img: 'https://nutritionadvance.com/wp-content/uploads/2018/01/whole-and-sliced-eggplant-aubergine.jpg',
        rating: 4.45,
        price: 10.99,
        categoryId:1,
    },
    {
        id: '11',
        title: `Product 11`,
        img: 'https://nutritionadvance.com/wp-content/uploads/2018/01/several-fresh-carrots-with-intact-green-stems.jpg',
        rating: 5.00,
        price: 15.99,
        categoryId:1,
    },
    {
        id: '12',
        title: `Product 12`,
        img: 'https://www.yayla.de/assets/images/products/3680_packshot.png',
        rating: 5.00,
        price: 10.99,
        categoryId:4,
    },
    {
        id: '13',
        title: `Product 13`,
        img: 'https://minimalistbaker.com/wp-content/uploads/2015/08/AMAZING-5-Ingredient-Vanilla-Coconut-Ice-Cream-Incredibly-simple-perfectly-sweet-INSANELY-creamy-vegan-glutenfree-icecream-dessert-recipe-vanilla-coconuticecream-coconut.jpg',
        rating: 5.00,
        price: 10.99,
        categoryId:4,
    },
    {
        id: '14',
        title: `Product 14`,
        img: 'https://gridironmeat.co.uk/wp-content/uploads/2023/11/Classic-Pork-Sausage-Meat.jpg',
        rating: 5.00,
        price: 10.99,
        categoryId:3,
    },
    {
        id: '15',
        title: `Product 15`,
        img: 'https://veggies.my/cdn/shop/products/sawi-bunga_398x.jpg?v=1576761897',
        rating: 3.20,
        price: 4.99,
        categoryId:1,
    },
    {
        id: '16',
        title: `Product 16`,
        img: 'https://produits.bienmanger.com/36700-0w0h0_Organic_Red_Onion_From_Italy.jpg',
        rating: 5.00,
        price: 8.83,
        categoryId:1,
    },
    {
        id: '17',
        title: `Product 17`,
        img: 'https://cdn.mafrservices.com/sys-master-root/h88/h89/9432784535582/599388_1.jpg',
        rating: 4.00,
        price: 7.76,
        categoryId:1,
    },
];
