'use client';
import React, { useState } from 'react';
import { Search, Download, FileText, Filter, Eye } from 'lucide-react';
import ActivityDetailPage from './[id]/page'; // Assurez-vous que le chemin est correct

const ActivityManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  /*const handleViewActivity = (activityId) => {
    // Simuler la navigation - vous pourrez remplacer ceci par votre logique de navigation
    console.log(`Redirection vers les détails de l'activité ${activityId}`);
    // Dans une vraie app Next.js, vous utiliseriez : router.push(`/activites/${activityId}`);
    alert(`Consultation de l'activité ${activityId} - Implémentez votre navigation ici`);
  };*/

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
      consultant: 'Jean Kouadio'
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
      consultant: 'Fatou Camara'
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
      consultant: 'Ali Diabaté'
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
      consultant: 'Ali Diakité'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 text-green-800';
      case 'Inscriptions':
        return 'bg-orange-100 text-orange-800';
      case 'Terminée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Formation':
        return 'bg-blue-500';
      case 'Innovation':
        return 'bg-green-500';
      case 'Diversité':
        return 'bg-red-500';
      case 'Planète Verte':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.consultant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec indicateurs */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Nombre d'activités</h3>
            <p className="text-2xl font-bold">{activities.length}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Nombre d'activités en cours</h3>
            <p className="text-2xl font-bold">
              {activities.filter(a => a.status === 'En cours').length}
            </p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Nombre d'activités non démarrées</h3>
            <p className="text-2xl font-bold">
              {activities.filter(a => a.status === 'Inscriptions').length}
            </p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Nombre d'activités terminées</h3>
            <p className="text-2xl font-bold">
              {activities.filter(a => a.status === 'Terminée').length}
            </p>
          </div>
        </div>

        {/* Barre d'outils */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
              <FileText size={16} />
              Exporter la liste des activités (PDF)
            </button>
            <div className="flex items-center gap-4">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Tous les statuts</option>
                <option value="En cours">En cours</option>
                <option value="Inscriptions">Inscriptions</option>
                <option value="Terminée">Terminée</option>
              </select>
              <button className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
                <Filter size={16} />
                Filtres avancés
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">LISTE DES ACTIVITÉS</h2>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des activités */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre d'étudiants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre de participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consulter
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(activity.type)} mr-3`}></div>
                        <span className="text-sm font-medium text-gray-900">{activity.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {activity.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {activity.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {activity.participants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewActivity(activity.id)}
                        className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        title="Consulter les détails de l'activité"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              Affichage de 1 à {filteredActivities.length} sur {activities.length} activités
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;
