import React, { useState, useMemo } from 'react';
import { Question, QuestionnaireAnswers } from './TravelQuestionnaire';

interface PlaceRecommendation {
  name: string;
  country: string;
  description: string;
  highlights: string[];
  matchReason: string;
  image: string;
  rating: number;
}

interface JsonDisplayProps {
  answers: QuestionnaireAnswers;
  questions: Question[];
  onStartOver: () => void;
}

export const JsonDisplay: React.FC<JsonDisplayProps> = ({
  answers,
  questions,
  onStartOver
}) => {
  const [showAllPlaces, setShowAllPlaces] = useState(false);

  const generatePlaceRecommendations = useMemo((): PlaceRecommendation[] => {
    const places: PlaceRecommendation[] = [];
    
    // Analyze user preferences
    const preferences = {
      destinations: answers.destination_preference || [],
      activities: answers.activities || [],
      climate: answers.climate_preference || [],
      budget: answers.budget_range || [],
      style: answers.travel_style || [],
      accommodation: answers.accommodation_preference || [],
      duration: answers.trip_duration || [],
      group: answers.group_size || []
    };

    // Beach/Coastal destinations
    if (preferences.destinations.includes('Beach/Coastal')) {
      places.push({
        name: 'Santorini',
        country: 'Greece',
        description: 'A stunning Greek island with white-washed buildings, blue domes, and breathtaking sunsets.',
        highlights: ['Iconic sunsets', 'Volcanic beaches', 'Traditional villages', 'Wine tasting'],
        matchReason: 'Perfect for beach lovers seeking scenic coastal beauty',
        image: '🏖️',
        rating: 4.8
      });
      
      places.push({
        name: 'Maldives',
        country: 'Maldives',
        description: 'Tropical paradise with crystal-clear waters, overwater bungalows, and pristine beaches.',
        highlights: ['Overwater villas', 'Snorkeling', 'Spa treatments', 'Private beaches'],
        matchReason: 'Ultimate beach destination for relaxation and luxury',
        image: '🏝️',
        rating: 4.9
      });
    }

    // Mountains/Nature destinations
    if (preferences.destinations.includes('Mountains/Nature')) {
      places.push({
        name: 'Swiss Alps',
        country: 'Switzerland',
        description: 'Majestic mountain ranges with pristine lakes, charming villages, and world-class skiing.',
        highlights: ['Mountain hiking', 'Scenic railways', 'Alpine villages', 'Winter sports'],
        matchReason: 'Perfect for mountain and nature enthusiasts',
        image: '⛰️',
        rating: 4.7
      });
      
      places.push({
        name: 'Patagonia',
        country: 'Chile/Argentina',
        description: 'Wild and remote region with glaciers, mountains, and incredible wildlife.',
        highlights: ['Glacier trekking', 'Wildlife viewing', 'Remote wilderness', 'Photography'],
        matchReason: 'Ideal for adventure seekers and nature lovers',
        image: '🏔️',
        rating: 4.6
      });
    }

    // Cities/Urban destinations
    if (preferences.destinations.includes('Cities/Urban')) {
      places.push({
        name: 'Tokyo',
        country: 'Japan',
        description: 'Vibrant metropolis blending traditional culture with cutting-edge technology.',
        highlights: ['Traditional temples', 'Modern architecture', 'Food scene', 'Shopping districts'],
        matchReason: 'Perfect urban destination with rich culture',
        image: '🏙️',
        rating: 4.8
      });
      
      places.push({
        name: 'Barcelona',
        country: 'Spain',
        description: 'Mediterranean city famous for Gaudí architecture, beaches, and vibrant nightlife.',
        highlights: ['Gaudí buildings', 'Gothic Quarter', 'Beach access', 'Tapas culture'],
        matchReason: 'Great city with culture, architecture, and beaches',
        image: '🏛️',
        rating: 4.7
      });
    }

    // Historical sites
    if (preferences.destinations.includes('Historical sites')) {
      places.push({
        name: 'Rome',
        country: 'Italy',
        description: 'The Eternal City with incredible ancient history, art, and culinary traditions.',
        highlights: ['Colosseum', 'Vatican City', 'Ancient ruins', 'Italian cuisine'],
        matchReason: 'Rich in history and cultural heritage',
        image: '🏛️',
        rating: 4.8
      });
      
      places.push({
        name: 'Angkor Wat',
        country: 'Cambodia',
        description: 'Ancient temple complex showcasing the grandeur of the Khmer Empire.',
        highlights: ['Temple complexes', 'Sunrise views', 'Ancient architecture', 'Cultural tours'],
        matchReason: 'Incredible historical and architectural significance',
        image: '🕌',
        rating: 4.7
      });
    }

    // Adventure-focused destinations
    if (preferences.activities.includes('Adventure sports')) {
      places.push({
        name: 'Queenstown',
        country: 'New Zealand',
        description: 'Adventure capital with bungee jumping, skydiving, and stunning landscapes.',
        highlights: ['Bungee jumping', 'Skydiving', 'Hiking trails', 'Lake activities'],
        matchReason: 'Perfect for thrill-seekers and adventure enthusiasts',
        image: '🪂',
        rating: 4.8
      });
      
      places.push({
        name: 'Costa Rica',
        country: 'Costa Rica',
        description: 'Central American gem with zip-lining, wildlife, and eco-adventures.',
        highlights: ['Zip-lining', 'Wildlife tours', 'Volcano hikes', 'Eco-lodges'],
        matchReason: 'Great for adventure activities and nature',
        image: '🦜',
        rating: 4.6
      });
    }

    // Cultural experiences
    if (preferences.activities.includes('Museums/Culture')) {
      places.push({
        name: 'Kyoto',
        country: 'Japan',
        description: 'Former imperial capital with thousands of temples, traditional gardens, and geishas.',
        highlights: ['Ancient temples', 'Traditional gardens', 'Geisha districts', 'Tea ceremonies'],
        matchReason: 'Rich cultural heritage and traditional experiences',
        image: '⛩️',
        rating: 4.9
      });
      
      places.push({
        name: 'Morocco',
        country: 'Morocco',
        description: 'North African country with vibrant markets, desert landscapes, and rich culture.',
        highlights: ['Medinas', 'Desert tours', 'Traditional crafts', 'Moroccan cuisine'],
        matchReason: 'Immersive cultural experiences and traditions',
        image: '🕌',
        rating: 4.5
      });
    }

    // Food experiences
    if (preferences.activities.includes('Food experiences')) {
      places.push({
        name: 'Lyon',
        country: 'France',
        description: 'French culinary capital with world-renowned restaurants and food markets.',
        highlights: ['Michelin restaurants', 'Food markets', 'Cooking classes', 'Wine tasting'],
        matchReason: 'Paradise for food lovers and culinary enthusiasts',
        image: '🍷',
        rating: 4.7
      });
      
      places.push({
        name: 'Bangkok',
        country: 'Thailand',
        description: 'Street food paradise with incredible flavors and bustling food markets.',
        highlights: ['Street food', 'Floating markets', 'Cooking classes', 'Night markets'],
        matchReason: 'Amazing street food and culinary adventures',
        image: '🍜',
        rating: 4.6
      });
    }

    // If no specific preferences, add some popular destinations
    if (places.length === 0) {
      places.push(
        {
          name: 'Paris',
          country: 'France',
          description: 'The City of Light with iconic landmarks, art museums, and romantic atmosphere.',
          highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River', 'French cuisine'],
          matchReason: 'Classic destination with universal appeal',
          image: '🗼',
          rating: 4.8
        },
        {
          name: 'Bali',
          country: 'Indonesia',
          description: 'Tropical island with beautiful beaches, rice terraces, and spiritual culture.',
          highlights: ['Beach resorts', 'Rice terraces', 'Hindu temples', 'Yoga retreats'],
          matchReason: 'Perfect blend of relaxation and culture',
          image: '🌺',
          rating: 4.7
        }
      );
    }

    return places.slice(0, 8); // Return top 8 recommendations
  }, [answers]);

  const displayedPlaces = showAllPlaces ? generatePlaceRecommendations : generatePlaceRecommendations.slice(0, 3);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Perfect Travel Destinations! ✈️</h1>
          <p className="text-muted-foreground text-lg">Based on your travel preferences, here are our top recommendations</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {generatePlaceRecommendations.length}
            </div>
            <div className="text-muted-foreground">Destinations Found</div>
          </div>
          
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-travel-forest mb-2">
              {Object.keys(answers).length}
            </div>
            <div className="text-muted-foreground">Questions Answered</div>
          </div>
          
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-travel-ocean mb-2">
              {(generatePlaceRecommendations.reduce((sum, place) => sum + place.rating, 0) / generatePlaceRecommendations.length).toFixed(1)}
            </div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setShowAllPlaces(!showAllPlaces)}
            className="travel-button-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showAllPlaces ? 'Show Less' : 'Show All Destinations'}
          </button>
          
          <button
            onClick={onStartOver}
            className="px-6 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
          >
            Start Over
          </button>
        </div>

        {/* Place Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedPlaces.map((place, index) => (
            <div key={index} className="travel-card p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{place.name}</h3>
                  <p className="text-muted-foreground">{place.country}</p>
                </div>
                <div className="text-4xl">{place.image}</div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(place.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">{place.rating}/5</span>
              </div>
              
              <p className="text-foreground mb-4 text-sm leading-relaxed">{place.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {place.highlights.map((highlight, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-border/50 pt-3">
                <p className="text-xs text-muted-foreground italic">
                  <strong>Why this matches:</strong> {place.matchReason}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Personalized Note */}
        <div className="mt-6 p-6 bg-gradient-to-br from-primary/5 to-travel-ocean/5 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold text-foreground mb-2">✨ Personalized for You</h3>
          <p className="text-foreground/80 text-sm leading-relaxed">
            These destinations were carefully selected based on your travel preferences including your preferred destinations, 
            activities, climate, and travel style. Each recommendation is tailored to match what you're looking for in your next adventure!
          </p>
        </div>
      </div>
    </div>
  );
};