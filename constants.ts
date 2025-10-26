import { WasteItem, UserRole } from './types';

export const mockWasteItems: WasteItem[] = [
  {
    id: '1',
    title: 'Spent Coffee Grounds',
    type: 'Food Waste',
    quantity: '50 kg/week',
    location: 'Downtown Cafe, San Francisco, CA',
    description: 'High-quality arabica coffee grounds, collected daily. Perfect for compost, substrate for mushroom cultivation, or bioplastic production.',
    imageUrl: 'https://picsum.photos/seed/coffee/400/300',
    user: {
      name: 'John Doe',
      role: UserRole.Provider,
    },
  },
  {
    id: '2',
    title: 'Wood Chips and Sawdust',
    type: 'Agricultural Waste',
    quantity: '2 tons',
    location: 'Oakwood Mill, Portland, OR',
    description: 'Mixed hardwood chips and sawdust. Available for immediate pickup. Suitable for biofuel, particleboard, or as a carbon source in composting.',
    imageUrl: 'https://picsum.photos/seed/wood/400/300',
    user: {
      name: 'Jane Smith',
      role: UserRole.Provider,
    },
  },
   {
    id: '3',
    title: 'Citrus Peels',
    type: 'Food Waste',
    quantity: '200 lbs/day',
    location: 'Juice Factory, Miami, FL',
    description: 'Orange and grapefruit peels from our daily juicing operations. Rich in limonene and pectin, ideal for essential oil extraction or producing biopolymers.',
    imageUrl: 'https://picsum.photos/seed/citrus/400/300',
    user: {
      name: 'Fresh Juices Inc.',
      role: UserRole.Provider,
    },
  },
];
