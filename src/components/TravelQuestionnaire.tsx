import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { JsonDisplay } from './JsonDisplay';

export interface Question {
  id: string;
  question: string;
  options: string[];
}

export interface QuestionnaireAnswers {
  [questionId: string]: string[];
}

const travelQuestions: Question[] = [
  {
    id: 'travel_frequency',
    question: 'How often do you travel?',
    options: ['Never', '1-2 times per year', '3-5 times per year', '6-10 times per year', 'More than 10 times per year', 'I travel monthly']
  },
  {
    id: 'travel_purpose',
    question: 'What are your main purposes for traveling?',
    options: ['Leisure/Vacation', 'Business', 'Visiting family/friends', 'Adventure/Exploration', 'Cultural experiences', 'Educational trips']
  },
  {
    id: 'accommodation_preference',
    question: 'What type of accommodation do you prefer?',
    options: ['Hotels', 'Airbnb/Vacation rentals', 'Hostels', 'Resorts', 'Camping', 'Staying with locals/friends']
  },
  {
    id: 'travel_style',
    question: 'How would you describe your travel style?',
    options: ['Budget-conscious', 'Mid-range comfort', 'Luxury', 'Backpacking', 'All-inclusive', 'Spontaneous']
  },
  {
    id: 'destination_preference',
    question: 'What types of destinations appeal to you most?',
    options: ['Beach/Coastal', 'Mountains/Nature', 'Cities/Urban', 'Historical sites', 'Countryside/Rural', 'Desert/Exotic']
  },
  {
    id: 'group_size',
    question: 'Who do you usually travel with?',
    options: ['Solo', 'Partner/Spouse', 'Family with children', 'Friends', 'Organized tour groups', 'Extended family']
  },
  {
    id: 'activities',
    question: 'What activities do you enjoy while traveling?',
    options: ['Sightseeing', 'Adventure sports', 'Museums/Culture', 'Food experiences', 'Shopping', 'Nightlife', 'Relaxation/Spa', 'Photography']
  },
  {
    id: 'transportation',
    question: 'What modes of transportation do you prefer?',
    options: ['Flying', 'Driving/Road trips', 'Trains', 'Cruises', 'Public transportation', 'Walking/Cycling']
  },
  {
    id: 'trip_duration',
    question: 'What\'s your preferred trip duration?',
    options: ['Weekend (1-3 days)', 'Short trip (4-7 days)', 'Medium trip (1-2 weeks)', 'Long trip (3-4 weeks)', 'Extended travel (1+ months)']
  },
  {
    id: 'budget_range',
    question: 'What\'s your typical travel budget range per person?',
    options: ['Under $500', '$500-$1,500', '$1,500-$3,000', '$3,000-$5,000', '$5,000-$10,000', 'Over $10,000']
  },
  {
    id: 'booking_preference',
    question: 'How do you usually book your travel?',
    options: ['Online travel agencies', 'Directly with airlines/hotels', 'Travel agent', 'Package deals', 'Last-minute bookings', 'Travel apps']
  },
  {
    id: 'food_preference',
    question: 'What\'s your approach to food while traveling?',
    options: ['Try local cuisine', 'Stick to familiar foods', 'Fine dining experiences', 'Street food', 'Vegetarian/Vegan options', 'All-inclusive meals']
  },
  {
    id: 'climate_preference',
    question: 'What climate do you prefer when traveling?',
    options: ['Tropical/Warm', 'Temperate/Mild', 'Cold/Winter destinations', 'Seasonal variety', 'Dry climate', 'No preference']
  },
  {
    id: 'travel_challenges',
    question: 'What challenges do you face when traveling?',
    options: ['Language barriers', 'Budget constraints', 'Time limitations', 'Health/mobility issues', 'Safety concerns', 'Planning overwhelm']
  },
  {
    id: 'technology_usage',
    question: 'How do you use technology while traveling?',
    options: ['Navigation apps', 'Translation apps', 'Social media sharing', 'Travel planning apps', 'Mobile payments', 'Offline maps']
  },
  {
    id: 'sustainable_travel',
    question: 'How important is sustainable/eco-friendly travel to you?',
    options: ['Very important', 'Somewhat important', 'Not a priority', 'I actively seek eco-friendly options', 'I offset my carbon footprint', 'I\'m learning about it']
  },
  {
    id: 'travel_inspiration',
    question: 'Where do you get travel inspiration?',
    options: ['Social media', 'Travel blogs/websites', 'Friends/family recommendations', 'Travel shows/documentaries', 'Travel magazines', 'Personal research']
  },
  {
    id: 'memorable_experiences',
    question: 'What makes a travel experience memorable for you?',
    options: ['Cultural immersion', 'Adventure activities', 'Meeting new people', 'Beautiful scenery', 'Unique accommodations', 'Learning opportunities']
  },
  {
    id: 'future_plans',
    question: 'What are your future travel aspirations?',
    options: ['Visit all continents', 'Learn new languages through travel', 'Adventure/extreme travel', 'Luxury travel experiences', 'Digital nomad lifestyle', 'Retirement travel']
  },
  {
    id: 'continent_country_preference',
    question: 'Which continents and countries are you most interested in visiting?',
    options: ['Asia (Japan, Thailand, Singapore)', 'Europe (Italy, France, Germany)', 'North America (USA, Canada)', 'South America (Brazil, Peru, Argentina)', 'Africa (Egypt, South Africa, Morocco)', 'Australia/Oceania (Australia, New Zealand)', 'Multiple continents', 'No specific preference']
  },
  {
    id: 'indian_region_preference',
    question: 'If traveling within India, which regions interest you most?',
    options: ['North India (Delhi, Punjab, Himachal Pradesh, Uttarakhand)', 'South India (Karnataka, Tamil Nadu, Kerala, Andhra Pradesh)', 'West India (Maharashtra, Gujarat, Goa, Rajasthan)', 'East India (West Bengal, Odisha, Jharkhand)', 'Northeast India (Assam, Meghalaya, Arunachal Pradesh)', 'Central India (Madhya Pradesh, Chhattisgarh)', 'All regions equally', 'Not interested in domestic travel']
  }
];

export const TravelQuestionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < travelQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleGenerateJson = () => {
    setShowResults(true);
  };

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentQuestionIndex + 1) / travelQuestions.length) * 100;

  if (showResults) {
    return (
      <JsonDisplay 
        answers={answers} 
        questions={travelQuestions}
        onStartOver={handleStartOver} 
      />
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Travel Questionnaire</h1>
          <p className="text-muted-foreground text-lg">Help us understand your travel preferences</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestionIndex + 1} of {travelQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="travel-progress">
            <div 
              className="travel-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={travelQuestions[currentQuestionIndex]}
          selectedOptions={answers[travelQuestions[currentQuestionIndex].id] || []}
          onAnswerChange={handleAnswerChange}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="text-center text-sm text-muted-foreground">
            Use checkboxes to select multiple answers
          </div>

          {currentQuestionIndex === travelQuestions.length - 1 ? (
            <button
              onClick={handleGenerateJson}
              className="travel-button-primary"
            >
              Generate JSON
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="travel-button-primary"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};