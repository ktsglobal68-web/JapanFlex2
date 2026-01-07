
export interface Tour {
  id: string;
  title: string;
  image: string;
  description: string;
  highlights: string[];
  days: number;
  locations: string[];
  rating: number;
  budget: 'low' | 'mid' | 'high';
  style: 'family' | 'couple' | 'solo' | 'luxury';
}

export interface Review {
  name: string;
  location: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  tips: string;
}

export interface CustomItineraryResponse {
  itinerary: ItineraryDay[];
  totalEstimatedCost: string;
  recommendations: string[];
}
