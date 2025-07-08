// components/ParticipantsDashboard.tsx
'use client'
import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import StatsCard from './StatsCard';
import ModernTable from './ModernTable';

interface Participant {
  id: number;
  nom_prenom: string;
  email: string;
  telephone: string;
  date: string;
  statut: string;
}

const ParticipantsDashboard = () => {
  const [activeTab, setActiveTab] = useState('inscriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous les statuts');

  const participantsData: Participant[] = [
    {
      id: 1,
      nom_prenom: "Boudou Kouacou",
      email: "boudou.kouacou@gmail.com",
      telephone: "0703815841",
      date: "10/06/2024 10:00",
      statut: "Acceptée"
    },
    {
      id: 2,
      nom_prenom: "Marie Dupont",
      email: "marie.dupont@email.com",
      telephone: "0756423189",
      date: "11/06/2024 14:30",
      statut: "En attente"
    },
    {
      id: 3,
      nom_prenom: "Jean Martin",
      email: "jean.martin@email.com",
      telephone: "0678945123",
      date: "12/06/2024 09:15",
      statut: "Rejetée"
    }
  ];

  const tabs = [
    { id: 'inscriptions', label: 'Liste des demandes d\'inscription', active: true },
    { id: 'invites', label: 'Liste des invités', active: false },
    { id: 'participants', label: 'Liste des participants', active: false }
  ];

  const columns = [
    {
      key: 'nom_prenom',
      label: 'Nom_prenom',
      sortable: true,
      render: (value: string) => <span className="font-medium text-gray-900">{value}</span>
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value: string) => <span className="text-blue-600">{value}</span>
    },
    {
      key: 'telephone',
      label: 'Téléphone',
      sortable: true,
      render: (value: string) => <span className="text-gray-700">{value}</span>
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value: string) => <span className="text-gray-700">{value}</span>
    },
    {
      key: 'statut',
      label: 'Statut',
      sortable: true,
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Acceptée' ? 'bg-green-100 text-green-700' :
          value === 'En attente' ? 'bg-orange-100 text-orange-700' :
          value === 'Rejetée' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Participants</h1>

        {/* Onglets */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatsCard
            title="Nombre de demande reçues"
            value="128"
            variant="primary"
          />
          <StatsCard
            title="Nombre de demande acceptée"
            value="86"
            variant="secondary"
          />
          <StatsCard
            title="Nombre de demandes rejetée"
            value="64"
            variant="primary"
          />
          <StatsCard
            title="Nombre de demandes en attentes"
            value="12"
            variant="secondary"
          />
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une demande"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Tous les statuts">Tous les statuts</option>
                <option value="Acceptée">Acceptée</option>
                <option value="En attente">En attente</option>
                <option value="Rejetée">Rejetée</option>
              </select>
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Download size={16} />
              Exporter
            </button>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Liste des demandes d'inscription (14 participants)
            </h2>

            <ModernTable
              columns={columns}
              data={participantsData}
              selectable={false}
              pagination={true}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDashboard;
