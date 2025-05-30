'use client'
import React, { useState } from 'react';
import { Users, BarChart3, Settings, Eye, Edit, Trash2, Plus, ChevronRight, Calendar, FileText, CheckCircle, AlertCircle, Search } from 'lucide-react';

const SurveyManagementApp = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showSurveyDetail, setShowSurveyDetail] = useState(false);
  const [showSurveyResults, setShowSurveyResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  // Données d'exemple
  const surveys = [
    {
      id: 1,
      title: "Satisfaction des internautes",
      activity: "Activité 1",
      code: "52340",
      participants: 60,
      responses: 43,
      status: "Terminée",
      statusColor: "red",
      description: "Enquête sur la satisfaction des utilisateurs de notre plateforme web",
      option: "Option A",
      dateCreation: "15/01/2024"
    },
    {
      id: 2,
      title: "Les conditions de vie",
      activity: "Activité 1",
      code: "55290",
      participants: 35,
      responses: 28,
      status: "En cours",
      statusColor: "green",
      description: "Étude sur les conditions de vie des participants",
      option: "Option B",
      dateCreation: "20/01/2024"
    },
    {
      id: 3,
      title: "Satisfaction des participants",
      activity: "Activité 2",
      code: "79863",
      participants: 42,
      responses: 35,
      status: "Non démarrée",
      statusColor: "orange",
      description: "Évaluation de la satisfaction générale des participants",
      option: "Option C",
      dateCreation: "25/01/2024"
    },
    {
      id: 4,
      title: "Évaluation cyber",
      activity: "Activité 2",
      code: "10125",
      participants: 45,
      responses: 38,
      status: "En cours",
      statusColor: "green",
      description: "Évaluation des compétences en cybersécurité",
      option: "Option D",
      dateCreation: "30/01/2024"
    }
  ];

  const questionTypes = [
    { id: 'text', name: 'Texte libre', icon: '📝' },
    { id: 'choice', name: 'Choix multiple', icon: '☑️' },
    { id: 'scale', name: 'Échelle', icon: '📊' },
    { id: 'yesno', name: 'Oui/Non', icon: '✅' }
  ];

  const sampleQuestions = [
    {
      id: 1,
      type: 'choice',
      question: 'Les participants de ce site d\'étude pouvait-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?',
      options: ['Oui', 'Non', 'Sans avis'],
      responses: { 'Oui': 156, 'Non': 31, 'Sans avis': 25 }
    },
    {
      id: 2,
      type: 'choice',
      question: 'Quelles sont les bonnes modalités de création des activités ?',
      options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
      responses: { 'Réponse 1': 87, 'Réponse 2': 45, 'Réponse 3': 32, 'Réponse 4': 23 }
    },
    {
      id: 3,
      type: 'choice',
      question: 'Les prestataires de ce site d\'étude pouvaient-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?',
      options: ['Oui', 'Non', 'Sans avis'],
      responses: { 'Oui': 142, 'Non': 28, 'Sans avis': 17 }
    }
  ];

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.code.includes(searchTerm);
    const matchesStatus = statusFilter === '' || survey.status === statusFilter;
    const matchesActivity = activityFilter === '' || survey.activity === activityFilter;
    return matchesSearch && matchesStatus && matchesActivity;
  });

  const uniqueStatuses = [...new Set(surveys.map(s => s.status))];
  const uniqueActivities = [...new Set(surveys.map(s => s.activity))];

  const SearchAndFilterBar = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par titre, activité ou code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-y border-x border-slate-300 rounded-lg transition-all duration-200 bg-white shadow-md"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Tous les statuts</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Toutes les activités</option>
            {uniqueActivities.map(activity => (
              <option key={activity} value={activity}>{activity}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-gray-800 mb-2">4</div>
        <div className="text-gray-600 font-medium">Toutes les enquêtes</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">2</div>
        <div className="text-gray-600 font-medium">En cours</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-orange-500 mb-2">1</div>
        <div className="text-gray-600 font-medium">Non démarrées</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-red-500 mb-2">1</div>
        <div className="text-gray-600 font-medium">Terminées</div>
      </div>
    </div>
  );

  const SurveyList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setActiveTab('create')}
          className="bg-blue-600 border-none cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Nouvelle Enquête
        </button>
      </div>

      <StatsCards />
      <SearchAndFilterBar />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des enquêtes</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Titre enquête</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Activité</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Code</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Nombre de participants</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Statut</th>
              <th className="text-center py-4 px-6 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurveys.map((survey, index) => (
              <tr key={survey.id} className="hover:bg-blue-50 transition-colors">
                <td className="py-4 px-6 text-gray-800 font-medium">{survey.title}</td>
                <td className="py-4 px-6 text-gray-700">{survey.activity}</td>
                <td className="py-4 px-6">
                  <span className="text-gray-700 font-mono bg-gray-100 rounded px-2 py-1 text-sm">
                    {survey.code}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-bold text-gray-800">{survey.participants}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    survey.statusColor === 'red' ? 'bg-red-100 text-red-700' :
                    survey.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                    survey.statusColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {survey.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => {
                      setSelectedSurvey(survey);
                      setShowSurveyDetail(true);
                    }}
                    className="p-2 border-none text-gray-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                    title="Voir les détails"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SurveyDetailView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowSurveyDetail(false)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-2"
        >
          ← Retour
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Détail de l'enquête</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Titre de l'enquête</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-800 text-lg">
            {selectedSurvey?.title}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">Code d'enquête</div>
            <div className="text-xl font-bold">{selectedSurvey?.code}</div>
          </div>
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">Option</div>
            <div className="text-xl font-bold">{selectedSurvey?.option}</div>
          </div>
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">Activité</div>
            <div className="text-xl font-bold">{selectedSurvey?.activity}</div>
          </div>
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">Participants</div>
            <div className="text-xl font-bold">{selectedSurvey?.participants}</div>
          </div>
          <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center">
            <div className="text-sm font-medium opacity-90 mb-1">Date de création</div>
            <div className="text-xl font-bold">{selectedSurvey?.dateCreation}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} />
              Liste des questions
            </h4>
            <button
              onClick={() => setShowSurveyResults(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors border-none cursor-pointer"
            >
              Voir les résultats
            </button>
          </div>

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
                {sampleQuestions.map((question, index) => (
                  <tr key={question.id} className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 text-center font-bold text-gray-800">{index + 1}</td>
                    <td className="py-4 px-6 text-gray-800">{question.question}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="w-8 h-8 bg-gray-200 hover:bg-blue-50 hover:text-blue-600 rounded-lg border-none cursor-pointer flex items-center justify-center  transition-colors">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const SurveyResultsView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowSurveyResults(false)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-2"
        >
          ← Retour
        </button>
        <div className="flex gap-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
            ENQUÊTE 1 - ACTIVITÉ 1
          </span>
          <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
            100 réponses
          </span>
          <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium">
            Questionnaire 1
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {sampleQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4 text-gray-800">
              Question {index + 1}
            </h3>
            <p className="text-gray-700 mb-6">{question.question}</p>

            <div className="mb-4">
              <span className="text-sm text-gray-600">
                {Object.values(question.responses).reduce((a, b) => a + b, 0)} participants / {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
              </span>
            </div>

            <div className="space-y-4">
              {Object.entries(question.responses).map(([option, count], optionIndex) => {
                const total = Object.values(question.responses).reduce((a, b) => a + b, 0);
                const percentage = Math.round((count / total) * 100);

                return (
                  <div key={option} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{option}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
                        <button className="text-purple-600 hover:text-purple-800 text-sm">
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
          </div>
        ))}
      </div>
    </div>
  );

  const CreateSurvey = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center border-none gap-4 mb-6">
        <button
          onClick={() => setActiveTab('list')}
          className="text-blue-600 hover:text-blue-800 border-none"
        >
          ← Retour
        </button>
        <h2 className="text-2xl font-bold border-none text-gray-800">Créer une nouvelle enquête</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de l'enquête
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Saisissez le titre de votre enquête..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
              placeholder="Décrivez votre enquête..."
            ></textarea>
          </div>

          <div className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Questions</h3>
              <button
                onClick={() => setShowQuestionModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Ajouter une question
              </button>
            </div>

            <div className="space-y-3">
              {sampleQuestions.slice(0, 2).map((q, index) => (
                <div key={q.id} className="rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {questionTypes.find(t => t.id === q.type)?.name}
                        </span>
                      </div>
                      <p className="text-gray-800">{q.question}</p>
                      {q.options && (
                        <div className="mt-2 space-y-1">
                          {q.options.map((option, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-3 h-3 rounded"></div>
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={() => setActiveTab('list')}
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Sauvegarder en brouillon
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Publier l'enquête
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QuestionModal = () => (
    showQuestionModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Ajouter une question</h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de question
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {questionTypes.map(type => (
                    <button
                      key={type.id}
                      className="p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{type.icon}</span>
                        <span className="font-medium">{type.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-20"
                  placeholder="Saisissez votre question..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options de réponse
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Option 1"
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Option 2"
                  />
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <Plus size={16} />
                    Ajouter une option
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6">
              <button
                onClick={() => setShowQuestionModal(false)}
                className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ajouter la question
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Enquêtes</h1>
            <nav className="flex gap-6">
              <button
                onClick={() => {
                  setActiveTab('list');
                  setShowSurveyDetail(false);
                  setShowSurveyResults(false);
                }}
                className={`px-3 py-2 rounded-lg transition-colors inset-shadow-2xs cursor-pointer ${
                  activeTab === 'list' && !showSurveyDetail && !showSurveyResults ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mes Enquêtes
              </button>
              <button
                onClick={() => {
                  setActiveTab('create');
                  setShowSurveyDetail(false);
                  setShowSurveyResults(false);
                }}
                className={`px-3 py-2 rounded-lg transition-colors inset-shadow-2xs cursor-pointer ${
                  activeTab === 'create' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Créer
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'list' && !showSurveyDetail && !showSurveyResults && <SurveyList />}
        {activeTab === 'create' && <CreateSurvey />}
        {showSurveyDetail && !showSurveyResults && <SurveyDetailView />}
        {showSurveyResults && <SurveyResultsView />}

        <QuestionModal />
      </div>
    </div>
  );
};

export default SurveyManagementApp;
