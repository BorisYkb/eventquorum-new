// components/SurveyList.tsx

'use client'

import { Eye } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import StatsCards from './StatsCards';
import ModernTable from './ModernTable';
import { Survey } from '../types/survey';
import SearchAndFilterBar from './SearchAndFilterBar';

interface SurveyListProps {
  surveys: Survey[];
}

const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

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

  const handleViewSurvey = (surveyId: number) => {
    router.push(`/intervenant/enquetes/${surveyId}`);
  };

  const columns = [
    {
      key: 'title',
      label: 'Titre enquête',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-800">{value}</span>
      )
    },
    {
      key: 'activity',
      label: 'Activité',
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-700">{value}</span>
      )
    },
    {
      key: 'code',
      label: 'Code',
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-700 font-mono bg-gray-100 rounded px-2 py-1 text-sm">
          {value}
        </span>
      )
    },
    {
      key: 'participants',
      label: 'Participants',
      sortable: true,
      render: (value: number) => (
        <div className="text-center">
          <span className="font-bold text-gray-800">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value: string, row: Survey) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.statusColor === 'red' ? 'bg-red-100 text-red-700' :
          row.statusColor === 'green' ? 'bg-green-100 text-green-700' :
          row.statusColor === 'orange' ? 'bg-orange-100 text-orange-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Action',
      render: (_: any, row: Survey) => (
        <div className="text-center">
          <button
            onClick={() => handleViewSurvey(row.id)}
            className="p-2 border-none text-gray-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
            title="Voir les détails"
          >
            <Eye size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <StatsCards surveys={surveys} />

      <SearchAndFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        activityFilter={activityFilter}
        setActivityFilter={setActivityFilter}
        uniqueStatuses={uniqueStatuses}
        uniqueActivities={uniqueActivities}
      />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Liste des enquêtes</h2>

      <ModernTable
        columns={columns}
        data={filteredSurveys}
        selectable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
};

export default SurveyList;
