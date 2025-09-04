import React, { useState } from 'react';
import { Question, QuestionnaireAnswers } from './TravelQuestionnaire';

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
  const [copied, setCopied] = useState(false);

  // Create structured JSON with question text and answers
  const structuredData = {
    questionnaire: "Travel Preferences Survey",
    timestamp: new Date().toISOString(),
    totalQuestions: questions.length,
    answeredQuestions: Object.keys(answers).length,
    responses: questions.map(question => ({
      questionId: question.id,
      question: question.question,
      selectedAnswers: answers[question.id] || [],
      answerCount: (answers[question.id] || []).length
    })),
    summary: {
      totalSelections: Object.values(answers).flat().length,
      averageSelectionsPerQuestion: Object.values(answers).flat().length / Object.keys(answers).length || 0,
      questionsWithMultipleAnswers: Object.values(answers).filter(ans => ans.length > 1).length
    }
  };

  const jsonString = JSON.stringify(structuredData, null, 2);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-questionnaire-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Questionnaire Complete! 🎉</h1>
          <p className="text-muted-foreground text-lg">Here are your travel preferences in JSON format</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {structuredData.answeredQuestions}
            </div>
            <div className="text-muted-foreground">Questions Answered</div>
          </div>
          
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-travel-forest mb-2">
              {structuredData.summary.totalSelections}
            </div>
            <div className="text-muted-foreground">Total Selections</div>
          </div>
          
          <div className="travel-card p-6 text-center">
            <div className="text-3xl font-bold text-travel-ocean mb-2">
              {structuredData.summary.questionsWithMultipleAnswers}
            </div>
            <div className="text-muted-foreground">Multi-Answer Questions</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleCopyToClipboard}
            className="travel-button-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg font-medium bg-travel-forest text-white hover:bg-travel-forest/90 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download JSON
          </button>
          
          <button
            onClick={onStartOver}
            className="px-6 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
          >
            Start Over
          </button>
        </div>

        {/* JSON Display */}
        <div className="travel-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-foreground">Generated JSON Data</h3>
            <span className="text-sm text-muted-foreground">
              {(new Blob([jsonString]).size / 1024).toFixed(1)}KB
            </span>
          </div>
          
          <div className="relative">
            <pre className="bg-muted/50 rounded-lg p-6 text-sm overflow-x-auto max-h-96 overflow-y-auto border border-border/50">
              <code className="text-foreground font-mono leading-relaxed">
                {jsonString}
              </code>
            </pre>
          </div>
        </div>

        {/* Usage Note */}
        <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30">
          <p className="text-accent-foreground text-sm">
            <strong>Note:</strong> This JSON contains your complete travel preferences and can be used for data analysis, 
            personalized recommendations, or integration with travel planning systems.
          </p>
        </div>
      </div>
    </div>
  );
};