// components/SurveyDetailView.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Survey, Question } from '../types/survey';

interface SurveyDetailViewProps {
  survey: Survey;
  questions: Question[];
}

const SurveyDetailView: React.FC<SurveyDetailViewProps> = ({ survey, questions }) => {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  const handleViewResults = () => {
    router.push(`/intervenant/enquetes/${survey.id}/resultats`);
  };

  const handleBack = () => {
    router.push('/intervenant/enquetes');
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(questions.map((_, index) => index));
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    if (checked) {
      setSelected([...selected, index]);
    } else {
      setSelected(selected.filter(i => i !== index));
    }
  };

  const totalPages = Math.ceil(questions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedQuestions = questions.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center justify-between mb-6'>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Détail de l'enquête</h1>

          {/* Bouton retour */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
        </div>


        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Titre de l'enquête */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Titre de l'enquête</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-800 text-lg">
              {survey.title}
            </div>
          </div>

          {/* Cards d'informations - Style original */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-medium opacity-90 mb-1">Code d'enquête</div>
              <div className="text-xl font-bold">{survey.code}</div>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-medium opacity-90 mb-1">Option</div>
              <div className="text-xl font-bold">{survey.option}</div>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
              <div className="text-sm font-medium opacity-90 mb-1">Activité</div>
              <div className="text-xl font-bold">{survey.activity}</div>
            </div>

          </div>

          {/* Section des questions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Liste des questions
              </h3>
              <button
                onClick={handleViewResults}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Consulter les résultats
              </button>
            </div>

            {/* Tableau des questions - Style image 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700 w-16">N°</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Question</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-700 w-20">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuestions.map((question, index) => {
                    const actualIndex = startIndex + index;
                    return (
                      <tr key={question.id} className="hover:bg-white transition-colors">
                        <td className="py-4 px-6 text-center font-bold text-gray-800">{actualIndex + 1}</td>
                        <td className="py-4 px-6 text-gray-800">{question.question}</td>
                        <td className="py-4 px-6 text-center">
                          <button className="w-8 h-8 bg-gray-200 hover:bg-blue-50 hover:text-blue-600 rounded-lg border-none cursor-pointer flex items-center justify-center transition-colors">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Footer avec Dense et Pagination - Style image 1 */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={dense}
                      onChange={(e) => setDense(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Dense</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                  </div>

                  <div className="text-sm text-gray-700">
                    {startIndex + 1}-{Math.min(startIndex + rowsPerPage, questions.length)} of {questions.length}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetailView;
