'use client';
import React, { useState } from 'react';
import { Search, Download, FileText, Filter, Eye, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';

const ActivityDetailPage = ({ onBack, activityId }) => {
  const [activeTab, setActiveTab] = useState('information');
  const [searchTerm, setSearchTerm] = useState('');

  const activity = {
    id: activityId,
    name: 'Formation en développement web',
    type: 'Formation',
    description: 'Formation complète sur les technologies web modernes incluant React, Node.js et les bases de données. Cette formation couvre les aspects fondamentaux du développement web moderne.',
    consultant: 'Jean Kouadio',
    status: 'En cours',
    date: '12/05/2025',
    time: '09:00 - 17:00',
    duration: '5 jours',
    location: 'Salle A - Campus Principal',
    participants: 180,
    maxParticipants: 200,
    invited: 220,
    presentielParticipants: 120,
    onlineParticipants: 60,
    connected: 175,
    resources: [
      { type: 'Document', name: 'Guide de formation React.pdf' },
      { type: 'Lien', name: 'https://reactjs.org/docs' },
      { type: 'Vidéo', name: 'Introduction aux concepts React' }
    ]
  };

  const invitedList = [
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', status: 'Confirmé' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', status: 'En attente' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', status: 'Confirmé' },
    { id: 4, name: 'Yao Emmanuel', email: 'emmanuel.yao@email.com', status: 'Refusé' },
    { id: 5, name: 'Kouassi Aissatou', email: 'kouassi.aissatou@email.com', status: 'En attente' }
  ];

  const participantsList = [
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', type: 'Présentiel', status: 'Connecté' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', type: 'En ligne', status: 'Connecté' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', type: 'Présentiel', status: 'Déconnecté' }
  ];

  const questionsList = [
    { id: 1, participant: 'Chonou Oriane', question: 'Comment gérer les états dans React ?', time: '10:30', answered: true },
    { id: 2, participant: 'Kouamé Boris Yakoué', question: 'Quelle est la différence entre props et state ?', time: '11:15', answered: false },
    { id: 3, participant: 'Kouakou Evariste', question: 'Comment optimiser les performances ?', time: '14:20', answered: true }
  ];

  const filteredInvited = invitedList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParticipants = participantsList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'information':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">{activity.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Date et Heure</h4>
                <p className="text-slate-600">{activity.date} | {activity.time}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Type d'activité</h4>
                <p className="text-slate-600">{activity.type}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Nom d'intervenant</h4>
                <p className="text-slate-600">{activity.consultant}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Lieu</h4>
                <p className="text-slate-600">{activity.location}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">Ressources</h4>
              <div className="space-y-2">
                {activity.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {resource.type}
                    </span>
                    <span className="text-slate-700">{resource.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'invited':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-slate-800">Liste des invités</h3>
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher un invité..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Nom</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredInvited.map((person) => (
                    <tr key={person.id}>
                      <td className="px-4 py-3 text-sm text-slate-900">{person.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{person.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          person.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                          person.status === 'En attente' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {person.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'participants':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-slate-800">Liste des participants</h3>
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Rechercher un participant..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Nom</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredParticipants.map((person) => (
                    <tr key={person.id}>
                      <td className="px-4 py-3 text-sm text-slate-900">{person.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{person.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{person.type}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          person.status === 'Connecté' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {person.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'questions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-800">Liste des questions</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-slate-600">Questions répondues</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {questionsList.filter(q => q.answered).length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-slate-600">Questions en attente</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                    {questionsList.filter(q => !q.answered).length.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {questionsList.map((question) => (
                <div key={question.id} className="border border-slate-200 rounded-lg">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800">****</span>
                        <span className="text-sm font-medium text-slate-700">Participant</span>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded ${
                        question.answered ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {question.answered ? 'Répondu' : 'En attente'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-slate-600">Question :</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 mb-4">
                      <p className="text-slate-800">{question.question}</p>
                    </div>

                    <div className="mb-2">
                      <span className="text-sm font-medium text-slate-600">Réponse :</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200 min-h-[60px]">
                      {question.answered ? (
                        <p className="text-slate-800">
                          {question.id === 1 && "Pour gérer les états dans React, vous pouvez utiliser le hook useState pour les composants fonctionnels ou this.state pour les composants de classe. Le hook useState retourne un tableau avec la valeur actuelle de l'état et une fonction pour le mettre à jour."}
                          {question.id === 3 && "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants."}
                        </p>
                      ) : (
                        <p className="text-slate-400 italic">En attente de réponse...</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          ← Retour à la liste des activités
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* En-tête avec nom et type */}
          <div className="border-l-4 border-blue-500 pl-6 mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{activity.name}</h1>
            <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {activity.type}
            </span>
          </div>

          {/* 6 éléments statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-800">{activity.invited}</div>
              <div className="text-sm text-slate-600">Invités</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-800">{activity.participants}</div>
              <div className="text-sm text-slate-600">Participants</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-sm font-medium text-slate-800">{activity.status}</div>
              <div className="text-sm text-slate-600">Statut</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-800">{activity.presentielParticipants}</div>
              <div className="text-sm text-slate-600">Présentiel</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-800">{activity.onlineParticipants}</div>
              <div className="text-sm text-slate-600">En ligne</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-800">{activity.connected}</div>
              <div className="text-sm text-slate-600">Connectés</div>
            </div>
          </div>

          {/* Onglets */}
          <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'information', label: 'Information' },
                { id: 'invited', label: 'Liste des invités' },
                { id: 'participants', label: 'Liste des participants' },
                { id: 'questions', label: 'Questions des participants' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm('');
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewActivity = (activityId) => {
    setSelectedActivity(activityId);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedActivity(null);
  };

  const handleExportPDF = () => {
    // Simulation de l'export PDF
    alert('Export PDF en cours de développement...');
  };

  const handleAdvancedFilters = () => {
    // Simulation des filtres avancés
    alert('Filtres avancés en cours de développement...');
  };

  if (showDetails) {
    return <ActivityDetailPage onBack={handleBackToList} activityId={selectedActivity} />;
  }

  const activities = [
    {
      id: 1,
      name: 'Atelier',
      type: 'Formation',
      title: 'Formation en développement web',
      students: 200,
      participants: 180,
      status: 'En cours',
      date: '12/05/2025',
      consultant: 'Jean Kouadio',
      progress: 75
    },
    {
      id: 2,
      name: 'Salon',
      type: 'Innovation',
      title: 'Salon de l\'innovation technologique',
      students: 150,
      participants: 140,
      status: 'Inscriptions',
      date: '10/05/2025',
      consultant: 'Fatou Camara',
      progress: 30
    },
    {
      id: 3,
      name: 'Conférence',
      type: 'Diversité',
      title: 'Conférence sur la diversité en entreprise',
      students: 300,
      participants: 280,
      status: 'Terminée',
      date: '08/05/2025',
      consultant: 'Ali Diabaté',
      progress: 100
    },
    {
      id: 4,
      name: 'Festival',
      type: 'Planète Verte',
      title: 'Festival écologique et développement durable',
      students: 250,
      participants: 245,
      status: 'Inscriptions',
      date: '05/05/2025',
      consultant: 'Ali Diakité',
      progress: 25
    },
    {
      id: 5,
      name: 'Atelier',
      type: 'Formation',
      title: 'Formation en entrepreneuriat',
      students: 210,
      participants: 100,
      status: 'En cours',
      date: '13/05/2025',
      consultant: 'Jean Franck',
      progress: 75
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'En cours':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: '🟢'
        };
      case 'Inscriptions':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: '🟡'
        };
      case 'Terminée':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: '✅'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          icon: '⚫'
        };
    }
  };

  const getTypeConfig = (type) => {
    switch (type) {
      case 'Formation':
        return {
          color: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'Innovation':
        return {
          color: 'bg-green-500',
          lightBg: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'Diversité':
        return {
          color: 'bg-red-500',
          lightBg: 'bg-red-50',
          textColor: 'text-red-700'
        };
      case 'Planète Verte':
        return {
          color: 'bg-orange-500',
          lightBg: 'bg-orange-50',
          textColor: 'text-orange-700'
        };
      default:
        return {
          color: 'bg-slate-500',
          lightBg: 'bg-slate-50',
          textColor: 'text-slate-700'
        };
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.consultant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === '' || activity.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const statsCards = [
    {
      title: "Nombre d'activités",
      value: activities.length,
      icon: <FileText className="text-white" size={24} />,
      bg: "bg-gradient-to-r from-blue-500 to-blue-600",
      change: "+2.5%"
    },
    {
      title: "Activités en cours",
      value: activities.filter(a => a.status === 'En cours').length,
      icon: <TrendingUp className="text-white" size={24} />,
      bg: "bg-gradient-to-r from-green-500 to-green-600",
      change: "+12%"
    },
    {
      title: "En attente d'inscription",
      value: activities.filter(a => a.status === 'Inscriptions').length,
      icon: <Users className="text-white" size={24} />,
      bg: "bg-gradient-to-r from-orange-500 to-orange-600",
      change: "-5%"
    },
    {
      title: "Activités terminées",
      value: activities.filter(a => a.status === 'Terminée').length,
      icon: <CheckCircle className="text-white" size={24} />,
      bg: "bg-gradient-to-r from-red-500 to-red-600",
      change: "+8%"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec titre */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Gestion des Activités</h1>
          <p className="text-slate-600">Suivez et gérez toutes vos activités en temps réel</p>
        </div>

        {/* Cartes de statistiques */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-slate-100 text-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex-1 min-w-[200px] max-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-200 rounded-lg">
                  <div className="text-slate-600">
                    {React.cloneElement(card.icon, { className: "text-slate-600" })}
                  </div>
                </div>
                <span className="text-sm font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded">
                  {card.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-slate-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Barre d'outils */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-slate-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-3 bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FileText size={18} />
              <span className="font-medium">Exporter la liste des activités (PDF)</span>
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <select
                className="border-2 border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tous les statuts</option>
                <option value="En cours">En cours</option>
                <option value="Inscriptions">Inscriptions</option>
                <option value="Terminée">Terminée</option>
              </select>

              <button
                onClick={handleAdvancedFilters}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <Filter size={18} />
                Filtres avancés
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              LISTE DES ACTIVITÉS
            </h2>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher par nom, titre ou consultant..."
                  className="w-full pl-12 pr-4 py-3 border-y border-x  border-slate-300 rounded-lg transition-all duration-200 bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des activités */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Activité
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Étudiants
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Consulter
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredActivities.map((activity, index) => {
                  const statusConfig = getStatusConfig(activity.status);
                  const typeConfig = getTypeConfig(activity.type);

                  return (
                    <tr key={activity.id} className="hover:bg-slate-50 transition-all duration-200 group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${typeConfig.color} mr-4 shadow-sm`}></div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{activity.name}</div>
                            <div className="text-xs text-slate-500">Consultant: {activity.consultant}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${typeConfig.lightBg} ${typeConfig.textColor} border ${typeConfig.color.replace('bg-', 'border-')}`}>
                          {activity.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-900 max-w-xs">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          Progression: {activity.progress}%
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                          <div className={`h-1.5 rounded-full ${typeConfig.color}`} style={{ width: `${activity.progress}%` }}></div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="text-sm font-bold text-slate-900">{activity.students}</div>
                        <div className="text-xs text-slate-500">inscrits</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <div className="text-sm font-bold text-slate-900">{activity.participants}</div>
                        <div className="text-xs text-slate-500">présents</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <span>{statusConfig.icon}</span>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{activity.date}</div>
                        <div className="text-xs text-slate-500">Date limite</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewActivity(activity.id)}
                          className="inline-flex items-center justify-center w-10 h-10 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-2 border-blue-200 hover:border-blue-600 group-hover:scale-110"
                          title="Consulter les détails de l'activité"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination améliorée */}
          <div className="bg-slate-50 px-6 py-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-sm text-slate-600">
              <span className="font-medium">
                Affichage de <span className="text-slate-900 font-bold">1</span> à <span className="text-slate-900 font-bold">{filteredActivities.length}</span> sur <span className="text-slate-900 font-bold">{activities.length}</span> activités
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border-2 border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 font-medium">
                Précédent
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all duration-200 font-medium shadow-md">
                1
              </button>
              <button className="px-4 py-2 border-2 border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 font-medium">
                Suivant
              </button>
            </div>
          </div>
        </div>

        {/* Message si aucun résultat */}
        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200 mt-8">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Aucune activité trouvée</h3>
            <p className="text-slate-500">Essayez de modifier vos critères de recherche ou filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityManagement;
