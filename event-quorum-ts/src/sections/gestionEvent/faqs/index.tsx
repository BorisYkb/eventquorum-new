'use client';

import { useState } from 'react';

import { Button } from '@mui/material';

export default function Faqs() {
  // États pour le formulaire
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  // États pour les FAQs
  const [tempFaqs, setTempFaqs] = useState([]);
  const [savedFaqs, setSavedFaqs] = useState([]);

  // Fonction pour ajouter une FAQ temporaire
  const handleAddFaq = () => {
    if (question.trim() && answer.trim()) {
      const newFaq = {
        id: Date.now(),
        question: question.trim(),
        answer: answer.trim()
      };
      setTempFaqs([...tempFaqs, newFaq]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour supprimer une FAQ temporaire
  const handleDeleteTemp = (id) => {
    setTempFaqs(tempFaqs.filter((faq) => faq.id !== id));
  };

  // Fonction pour enregistrer toutes les FAQs temporaires
  const handleSave = () => {
    if (tempFaqs.length > 0) {
      setSavedFaqs([...savedFaqs, ...tempFaqs]);
      setTempFaqs([]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour annuler toutes les FAQs temporaires
  const handleCancel = () => {
    setTempFaqs([]);
    setQuestion('');
    setAnswer('');
  };

  // Fonction pour supprimer une FAQ enregistrée
  const handleDeleteSaved = (id) => {
    setSavedFaqs(savedFaqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Gestion des FAQs
        </h1>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ajouter une nouvelle question
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Question
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-x-0 border-t-0 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Entrez votre question..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Réponse
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Entrez la réponse..."
              />
            </div>
            
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleAddFaq}
              disabled={!question.trim() || !answer.trim()}
            >
              
              Ajouter la question
            </button>
          </div>
        </div>

        {/* Liste temporaire des FAQs */}
        {tempFaqs.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Questions en cours d'édition ({tempFaqs.length})
            </h2>
            
            <div className="space-y-3 mb-6">
              {tempFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        Q: {faq.question}
                      </p>
                      <p className="text-gray-600">
                        R: {faq.answer}
                      </p>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-lg transition-colors"
                      onClick={() => handleDeleteTemp(faq.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex gap-3">
              <Button
                variant="contained"
                color="success"
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleSave}
              >
                
                Enregistrer
              </Button>
              <Button
                variant="outlined"
                color="error"
                className="flex items-center gap-2 bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                onClick={handleCancel}
              >
                
                Annuler
              </Button>
            </div>
          </div>
        )}

        {/* Tableau des FAQs enregistrées */}
        {savedFaqs.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              FAQs Enregistrées ({savedFaqs.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Question
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Réponse
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700 w-24">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedFaqs.map((faq, index) => (
                    <tr 
                      key={faq.id} 
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {faq.question}
                      </td>
                      <td className="p-4 text-gray-600">
                        {faq.answer}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-lg transition-colors inline-flex"
                          onClick={() => handleDeleteSaved(faq.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {savedFaqs.length === 0 && tempFaqs.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune FAQ enregistrée
            </h3>
            <p className="text-gray-500">
              Commencez par ajouter des questions et réponses ci-dessus
            </p>
          </div>
        )}
      </div>
    </div>
  );
}