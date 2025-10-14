// src/sections/gestionEvent/eventpasse/types.ts

/**
 * Interface pour un événement réalisé (existant dans le système)
 */
export interface EvenementRealise {
  id: number;
  nom: string;
  logo: string; // URL de l'image
  description: string;
  dateDebut: string; // Format: YYYY-MM-DD
  dateFin: string; // Format: YYYY-MM-DD
  lieu: string;
}

/**
 * Interface pour un événement non réalisé (à créer)
 */
export interface EvenementNonRealise {
  id?: number; // Optionnel car généré lors de l'ajout
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  images: (File | string)[]; // Liste des images uploadées
  logo?: string; // La première image servira de logo
}

/**
 * Données mockées - Événements réalisés disponibles dans le système
 * Ces données viennent normalement de la base de données
 */
export const EVENEMENTS_REALISES_DISPONIBLES: EvenementRealise[] = [
  {
    id: 1,
    nom: 'SARA 2023',
    logo: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=SARA+2023',
    description: 'Salon International de l\'Agriculture et des Ressources Animales',
    dateDebut: '2023-09-29',
    dateFin: '2023-10-08',
    lieu: 'Abidjan, Côte d\'Ivoire'
  },
  {
    id: 2,
    nom: 'Tech Summit 2024',
    logo: 'https://via.placeholder.com/150/3498DB/FFFFFF?text=Tech+Summit',
    description: 'Conférence technologique annuelle regroupant experts et innovateurs',
    dateDebut: '2024-03-15',
    dateFin: '2024-03-17',
    lieu: 'Paris, France'
  },
  {
    id: 3,
    nom: 'Gala de Charité 2024',
    logo: 'https://via.placeholder.com/150/E74C3C/FFFFFF?text=Gala+2024',
    description: 'Soirée caritative pour soutenir les enfants défavorisés',
    dateDebut: '2024-05-20',
    dateFin: '2024-05-20',
    lieu: 'Genève, Suisse'
  },
  {
    id: 4,
    nom: 'Festival de Musique 2024',
    logo: 'https://via.placeholder.com/150/9B59B6/FFFFFF?text=Festival',
    description: 'Festival international de musique avec artistes du monde entier',
    dateDebut: '2024-07-10',
    dateFin: '2024-07-15',
    lieu: 'Marseille, France'
  },
  {
    id: 5,
    nom: 'Conférence Santé 2024',
    logo: 'https://via.placeholder.com/150/1ABC9C/FFFFFF?text=Sante+2024',
    description: 'Conférence sur les innovations en santé publique',
    dateDebut: '2024-08-05',
    dateFin: '2024-08-07',
    lieu: 'Dakar, Sénégal'
  },
  {
    id: 6,
    nom: 'Salon de l\'Éducation 2024',
    logo: 'https://via.placeholder.com/150/F39C12/FFFFFF?text=Education',
    description: 'Salon dédié aux nouvelles méthodes pédagogiques',
    dateDebut: '2024-09-12',
    dateFin: '2024-09-14',
    lieu: 'Bruxelles, Belgique'
  },
  {
    id: 7,
    nom: 'Forum Économique 2024',
    logo: 'https://via.placeholder.com/150/34495E/FFFFFF?text=Forum+Eco',
    description: 'Forum sur le développement économique en Afrique',
    dateDebut: '2024-10-01',
    dateFin: '2024-10-03',
    lieu: 'Accra, Ghana'
  },
  {
    id: 8,
    nom: 'Journée Environnement 2024',
    logo: 'https://via.placeholder.com/150/27AE60/FFFFFF?text=Environnement',
    description: 'Journée de sensibilisation à la protection de l\'environnement',
    dateDebut: '2024-11-22',
    dateFin: '2024-11-22',
    lieu: 'Nairobi, Kenya'
  }
];