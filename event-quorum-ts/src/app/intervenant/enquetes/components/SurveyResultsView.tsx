// components/SurveyResultsView.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, OptionDetail } from '../types/survey';
import DetailModal from './modals/DetailModal';
import Button from '@mui/material/Button';
import { Iconify } from 'src/components/iconify';

interface SurveyResultsViewProps {
  surveyId: string;
  questions: Question[];
}

const SurveyResultsView: React.FC<SurveyResultsViewProps> = ({ surveyId, questions }) => {
  const router = useRouter();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOptionDetail, setSelectedOptionDetail] = useState<OptionDetail | null>(null);

  const handleBack = () => {
    router.push(`/enquetes/${surveyId}`);
  };

  const handleViewDetail = (question: Question, questionIndex: number, option: string, count: number) => {
    if (!question.responses) return;

    const total = Object.values(question.responses).reduce((a, b) => a + b, 0);
    const percentage = Math.round((count / total) * 100);

    setSelectedOptionDetail({
      question: question.question,
      questionNumber: questionIndex + 1,
      option: option,
      count: count,
      percentage: percentage,
      totalResponses: total
    });
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">

        <div className="flex gap-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
            ENQUÊTE {surveyId} - ACTIVITÉ 1
          </span>
          <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
            100 réponses
          </span>
          <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium">
            Questionnaire 1
          </span>
        </div>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          sx={{
            bgcolor: '#000',
            color: 'white',
            '&:hover': { bgcolor: '#333' }
          }}
        >
          Retour
        </Button>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4 text-gray-800">
              Question {index + 1}
            </h3>
            <p className="text-gray-700 mb-6">{question.question}</p>

            {question.responses && (
              <>
                <div className="mb-4">
                  <span className="text-sm text-gray-600">
                    {Object.values(question.responses).reduce((a, b) => a + b, 0)} participants / {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(question.responses).map(([option, count]) => {
                    const total = Object.values(question.responses!).reduce((a, b) => a + b, 0);
                    const percentage = Math.round((count / total) * 100);

                    return (
                      <div key={option} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{option}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                            <button
                              onClick={() => handleViewDetail(question, index, option, count)}
                              className="text-purple-600 hover:text-purple-800 text-sm cursor-pointer bg-transparent border-none underline"
                            >
                              Voir détail
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 min-w-0">{count} réponses</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <DetailModal
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
        selectedOptionDetail={selectedOptionDetail}
      />
    </div>
  );
};

export default SurveyResultsView;
