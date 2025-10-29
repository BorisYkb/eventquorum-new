// superviseur/activites/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/superviseur';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

import InvitesList from 'src/sections/superviseur/activites/components/invites-list';
import ActivityDescription from 'src/sections/superviseur/activites/components/activity-description';
import ParticipantQuestions from 'src/sections/superviseur/activites/components/participant-questions';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SuperviseurActivityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;

  const [activeTab, setActiveTab] = useState(0);
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // TODO: API - Récupérer les données de l'activité
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);

        // TODO: Remplacer par un vrai appel API
        // const response = await fetch(`/api/activities/${activityId}`);
        // const data = await response.json();
        // setActivity(data);

        // Données simulées pour le développement
        const mockActivity = {
          id: activityId,
          name: 'Formation en développement web',
          type: 'Formation',
          description: 'Formation complète sur les technologies web modernes incluant React, Node.js et les bases de données.',
          objectifs: 'Cette activité vise à présenter les dernières innovations et techniques adaptées au contexte ivoirien.',
          consultant: 'Jean Kouadio',
          status: 'En cours',
          statusColor: 'success',
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
          prix: 15000,
          standing: 'Standard',
          hasDocument: true,
          hasVideo: true,
          documentUrl: '/documents/formation-react.pdf',
          videoUrl: '/videos/introduction-react.mp4',
          resources: [
            { type: 'Document', name: 'Guide de formation React.pdf', url: '/docs/guide.pdf' },
            { type: 'Lien', name: 'https://reactjs.org/docs', url: 'https://reactjs.org/docs' },
          ],
          photos: [
            '/assets/background/background-3.webp',
            '/assets/background/background-7.webp',
            '/assets/background/background-5.webp'
          ],
          intervenants: [
            {
              id: '1',
              nom: 'Dr. Kouakou',
              poste: 'Expert Agricole',
              bio: 'Spécialiste en développement agricole durable.',
              email: 'kouakou@sara2023.ci',
              phone: '+225 07 00 00 00',
              avatar: '/assets/images/mock/avatar/avatar-1.webp'
            }
          ]
        };

        setActivity(mockActivity);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [activityId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> =
      ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    return colors[index % colors.length];
  };

  const fontSizes = {
    iconSize: { width: 20, height: 20 },
    body1: { fontSize: '16px' }
  };

  const getStatusColor = (): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    if (!activity) return 'default';
    switch (activity.statusColor) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <DashboardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Typography>Chargement...</Typography>
        </Box>
      </DashboardContent>
    );
  }

  if (!activity) {
    return (
      <DashboardContent>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" color="error" gutterBottom>
            Activité non trouvée
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.back()}
            sx={{ mt: 2 }}
          >
            Retour
          </Button>
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Détails de l'activité"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités', href: '/superviseur/activites' },
          { name: activity.name }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.back()}
            sx={{ bgcolor: '#000', color: 'white', '&:hover': { bgcolor: '#333' } }}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* En-tête de l'activité */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Box sx={{ borderLeft: 4, borderColor: 'primary.main', p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                {activity.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* <Label variant="soft" color="primary" sx={{ borderRadius: 2, px: 2, py: 1 }}>
                  {activity.type}
                </Label> */}
                <Label variant="soft" color={getStatusColor()} sx={{ borderRadius: 2, px: 2, py: 1 }}>
                  {activity.status}
                </Label>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:calendar-date-bold" sx={{ color: 'primary.main', width: 20 }} />
              <Typography variant="body2">{activity.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:clock-circle-outline" sx={{ color: 'info.main', width: 20 }} />
              <Typography variant="body2">{activity.time}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Iconify icon="solar:tag-outline" sx={{ color: 'warning.main', ...fontSizes.iconSize }} />
              <Typography variant="body1" sx={fontSizes.body1}>{activity.type}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="solar:map-point-outline" sx={{ color: 'error.main', width: 20 }} />
              <Typography variant="body2">{activity.location}</Typography>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Tabs */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, fontSize: '14px' } }}
          >
            <Tab label="Description de l'activité" />
            <Tab label="Liste des invités" />
            <Tab label="Questions des invités" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <ActivityDescription activity={activity} activityId={activityId as string} />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <InvitesList activityId={activityId as string} />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <ParticipantQuestions activityId={activityId as string} />
        </TabPanel>
      </Card>
    </DashboardContent>
  );
}