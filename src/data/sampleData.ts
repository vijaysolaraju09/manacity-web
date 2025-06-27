export const sampleShops = [
  {
    _id: 'shop1',
    name: 'Star Electronics',
    category: 'Electronics',
    location: 'Town Center',
    address: '123 Market Street',
    image: 'https://source.unsplash.com/400x300/?electronics-shop',
    products: [
      {
        _id: 'prod1',
        name: 'LED TV',
        price: 12000,
        image: 'https://source.unsplash.com/300x200/?tv',
      },
      {
        _id: 'prod2',
        name: 'Bluetooth Speaker',
        price: 3500,
        image: 'https://source.unsplash.com/300x200/?speaker',
      },
    ],
  },
];

export const sampleProduct = {
  _id: 'prod1',
  name: 'Sample Product',
  image: 'https://source.unsplash.com/600x300/?product',
  price: 999,
  description: 'This is a placeholder product description.',
  category: 'General',
  shopName: 'Star Electronics',
  discount: 10,
};

export const sampleVerifiedUser = {
  _id: 'user1',
  name: 'Jane Doe',
  profession: 'Electrician',
  bio: 'Experienced electrician providing quality services.',
  location: 'Town Center',
  contact: '1234567890',
  avatar: 'https://source.unsplash.com/300x200/?portrait',
};

export const sampleEvent = {
  _id: 'event1',
  name: 'Community Cricket Match',
  category: 'Sports',
  location: 'City Stadium',
  date: '2025-08-01',
  description: 'Join us for an exciting community cricket event!',
  adminNote: 'Registration closes a week before the event.',
  image: 'https://source.unsplash.com/600x300/?cricket',
};
