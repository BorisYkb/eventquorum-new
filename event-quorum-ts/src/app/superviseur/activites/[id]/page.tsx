import React, { useState } from 'react';
import { ArrowLeft, Users, UserCheck, Wifi, Monitor, FileText } from 'lucide-react';

const ActivityDetailPage = () => {
  const [activeTab, setActiveTab] = useState('Information');

  // Données de l'activité
  const activity = {
    title: 'ACTIVITÉ 1 : ATELIER -> FORMATION',
    name: 'Formation en développement web',
    stats: {
      invites: 250,
      participants: 180,
      statut: 'En cours',
      participantsPresentiels: 120,
      participantsEnLigne: 60,
      connectes: 45
    },
    description: `Le SRA A 2023 est destiné dans le but d'innover l'Éco-aide Expertisée dans l'objectif d'une plus grande dans diverses. Ce petites séances mais questions le rôle de plus en plus important de l'école dans l'éco. Ces activités cherche à offrir aux personnes des informations diverses et utiles. Cette SRA vise à développer les compétences digitales des apprenants et à des professionnels aux innovations numériques et de développement.`,
    date: '29/07/2024',
    startTime: '10H00',
    endTime: '12H00',
    type: 'Atelier',
    resources: {
      documents: 'Fichier 1',
      lien: '',
      video: ''
    },
    note: 'Excellentes données activité'
  };

  const tabs = [
    { key: 'Information', label: 'Information', color: 'bg-orange-500' },
    { key: 'Liste des invités', label: 'Liste des invités', color: 'bg-blue-500' },
    { key: 'Liste des participants', label: 'Liste des participants', color: 'bg-green-500' },
    { key: 'Questions', label: 'Voir les questions des participants', color: 'bg-purple-500' }
  ];

  const handleGoBack = () => {
    console.log('Retour à la liste des activités');
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'En cours':
        return 'bg-green-100 text-green-800';
      case 'Terminée':
        return 'bg-red-100 text-red-800';
      case 'Inscriptions':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* Bouton retour */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors bg-white px-3 py-2 rounded-md shadow-sm border"
        >
          <ArrowLeft size={18} />
          <span>Retour à la liste des activités</span>
        </button>

        {/* Header avec titre et statistiques */}
        <div className="bg-white border-2 border-gray-300 mb-4">
          <div className="bg-blue-600 text-white px-4 py-3">
            <h1 className="text-lg font-bold">{activity.title}</h1>
          </div>

          {/* Statistiques en haut */}
          <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-300">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users size={16} className="text-blue-600" />
                <span className="text-xs font-medium text-gray-600 uppercase">Invités</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{activity.stats.invites}</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserCheck size={16} className="text-green-600" />
                <span className="text-xs font-medium text-gray-600 uppercase">Participants</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{activity.stats.participants}</div>
            </div>

            <div className="text-center">
              <div className="mb-1">
                <span className="text-xs font-medium text-gray-600 uppercase">Statut</span>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatutColor(activity.stats.statut)}`}>
                {activity.stats.statut}
              </span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Monitor size={16} className="text-purple-600" />
                <span className="text-xs font-medium text-gray-600 uppercase">Présentiel</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{activity.stats.participantsPresentiels}</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Wifi size={16} className="text-orange-600" />
                <span className="text-xs font-medium text-gray-600 uppercase">En ligne</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{activity.stats.participantsEnLigne}</div>
            </div>

            <div className="text-center">
              <div className="mb-1">
                <span className="text-xs font-medium text-gray-600 uppercase">Connectés</span>
              </div>
              <div className="text-xl font-bold text-green-600">{activity.stats.connectes}</div>
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
            </div>
          </div>
        </div>

        {/* Section des onglets */}
        <div className="bg-white border-2 border-gray-300">

          {/* Onglets empilés */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-r border-gray-300 transition-colors ${
                  activeTab === tab.key
                    ? `${tab.color} text-white shadow-sm`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section informative */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
            <p className="text-xs text-gray-600">
              Informations Vous accorderez Vous êtes participants Vous les questions Ses informations
            </p>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">

            {activeTab === 'Information' && (
              <div className="space-y-6">
                {/* Section Description */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-16 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-semibold mb-2">Description</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Date/Heure */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-12 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-semibold mb-3">Date/Heure</h3>
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <span className="text-gray-600 block mb-1">Date:</span>
                          <div className="font-medium">{activity.date}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 block mb-1">Heure de début:</span>
                          <div className="font-medium">{activity.startTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 block mb-1">Heure de fin:</span>
                          <div className="font-medium">{activity.endTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Type d'activité */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-8 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-semibold mb-2">Type d'activité</h3>
                      <span className="text-sm text-gray-700">{activity.type}</span>
                    </div>
                  </div>
                </div>

                {/* Section Ressources */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-24 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-semibold mb-4">Ressources</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={activity.resources.documents}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                            />
                            <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm hover:bg-gray-200">
                              <FileText size={14} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Lien</label>
                          <input
                            type="text"
                            value={activity.resources.lien}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                            placeholder=""
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vidéo</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={activity.resources.video}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50"
                              placeholder=""
                            />
                            <button className="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded text-sm hover:bg-blue-600">
                              Ajouter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Note d'évaluation */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-12 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h3 className="text-blue-600 font-semibold mb-2">Note d'évaluation</h3>
                      <p className="text-sm text-gray-700 mb-2">{activity.note}</p>
                      <div className="text-xs text-gray-500">
                        Accordé le: Accordé Questions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Liste des invités' && (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Liste des Invités</h3>
                <p className="text-gray-600 mb-4">{activity.stats.invites} personnes invitées à cette activité</p>
                <div className="bg-blue-50 rounded-lg p-4 inline-block">
                  <div className="text-2xl font-bold text-blue-600">{activity.stats.invites}</div>
                  <div className="text-sm text-blue-800">Total des invités</div>
                </div>
              </div>
            )}

            {activeTab === 'Liste des participants' && (
              <div className="text-center py-12">
                <UserCheck size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Liste des Participants</h3>
                <p className="text-gray-600 mb-4">{activity.stats.participants} participants confirmés</p>
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-600">{activity.stats.participants}</div>
                    <div className="text-xs text-green-800">Total</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-600">{activity.stats.participantsPresentiels}</div>
                    <div className="text-xs text-purple-800">Présentiel</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-orange-600">{activity.stats.participantsEnLigne}</div>
                    <div className="text-xs text-orange-800">En ligne</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Questions' && (
              <div className="text-center py-12">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">❓</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Questions des Participants</h3>
                <p className="text-gray-600 mb-4">Consultez toutes les questions posées par les participants</p>
                <div className="bg-purple-50 rounded-lg p-4 inline-block">
                  <div className="text-sm text-purple-800">Questions en attente de réponse</div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
