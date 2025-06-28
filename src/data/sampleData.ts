export const sampleShops = [
  {
    _id: 'shop1',
    name: 'Café Aroma',
    category: 'Restaurant',
    location: 'Town Center',
    isOpen: true,
    image: 'https://source.unsplash.com/400x300/?cafe,coffee',
  },
  {
    _id: 'shop2',
    name: 'Mechanix Garage',
    category: 'Mechanic',
    location: 'West End',
    isOpen: false,
    image: 'https://source.unsplash.com/400x300/?garage,mechanic',
  },
  {
    _id: 'shop3',
    name: 'Style Hub',
    category: 'Fashion',
    location: 'East Side',
    isOpen: true,
    image: 'https://source.unsplash.com/400x300/?fashion,store',
  },
  {
    _id: 'shop4',
    name: 'Green Grocery',
    category: 'Grocery',
    location: 'North Market',
    isOpen: true,
    image: 'https://source.unsplash.com/400x300/?grocery,shop',
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
  startDate: '2025-08-01T18:00:00Z',
  description: 'Join us for an exciting community cricket event!',
  adminNote: 'Registration closes a week before the event.',
  image: 'https://source.unsplash.com/600x300/?cricket',
};
