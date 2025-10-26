export enum Page {
  Home = 'Home',
  Search = 'Search Waste',
  PostWaste = 'Post Waste',
  Impact = 'Impact',
  About = 'About',
  Profile = 'Profile',
}

export enum UserRole {
  Provider = 'Waste Provider',
  Researcher = 'Researcher',
  Innovator = 'Innovator',
}

export interface User {
  fullName: string;
  organization: string;
  email: string;
  phone?: string;
  location: string;
  fieldType: string;
  userCategory: string;
  role: 'provider' | 'researcher';
  wasteType?: string;
}

export interface WasteItem {
  id: string;
  title: string;
  type: string;
  quantity: string;
  location: string;
  description: string;
  imageUrl: string;
  user: {
    name: string;
    role: UserRole;
  };
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}