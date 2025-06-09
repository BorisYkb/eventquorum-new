// components/modals/DetailModal.tsx
import React from 'react';
import { OptionDetail } from '../../types/survey';

interface DetailModalProps {
  showDetailModal: boolean;
  setShowDetailModal: (show: boolean) => void;
  selectedOptionDetail: OptionDetail | null;
}

const DetailModal: React.FC<DetailModalProps> = ({
  showDetailModal,
  setShowDetailModal,
  selectedOptionDetail
}) => {
  if (!showDetailModal || !selectedOptionDetail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Détail de la réponse</h3>
            <button
              onClick={() => setShowDetailModal(false)}
              className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Question {selectedOptionDetail.questionNumber}</div>
              <div className="text-gray-800 font-medium mb-4">{selectedOptionDetail.question}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-1">Type de question</div>
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  Choix multiple
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nombre de participants</span>
                  <span className="font-bold text-gray-800">{selectedOptionDetail.totalResponses}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nombre de réponses</span>
                  <span className="font-bold text-gray-800">{selectedOptionDetail.totalResponses}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="bg-white rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{selectedOptionDetail.option}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                      Réponse {selectedOptionDetail.option === 'Oui' ? '1' : selectedOptionDetail.option === 'Non' ? '2' : '3'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Nombre de points</span>
                    <span className="font-bold text-blue-600">{selectedOptionDetail.count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowDetailModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors border-none cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
