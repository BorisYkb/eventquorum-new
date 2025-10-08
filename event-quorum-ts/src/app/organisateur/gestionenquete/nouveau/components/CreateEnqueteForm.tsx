// File: src/app/organisateur/gestionenquetes/nouveau/components/CreateEnqueteForm.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EnqueteFormData, ACTIVITES } from '../types';

interface CreateEnqueteFormProps {
  onEnqueteCreated: (enquete: EnqueteFormData) => void;
}

/**
 * Composant pour créer de nouvelles enquêtes
 * Partie 1 de la page de création - Version Accordion
 */
const CreateEnqueteForm: React.FC<CreateEnqueteFormProps> = ({
  onEnqueteCreated
}) => {
  // État du formulaire d'enquête
  const [enqueteForm, setEnqueteForm] = useState<EnqueteFormData>({
    titre: '',
    activite: '',
    typeEnquete: 'live',
    enqueteAnonymat: false,
    authentificationNumerique: false
  });

  // État pour contrôler l'expansion de l'accordéon
  const [expanded, setExpanded] = useState<boolean>(false);

  /**
   * Gestionnaire de changement des champs du formulaire
   */
  const handleFormChange = (field: keyof EnqueteFormData, value: any) => {
    setEnqueteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Validation et création de l'enquête
   */
  const handleValidateEnquete = () => {
    if (!enqueteForm.titre.trim()) {
      alert('Veuillez saisir un titre d\'enquête.');
      return;
    }

    if (!enqueteForm.activite) {
      alert('Veuillez sélectionner une activité.');
      return;
    }

    // Appel du callback pour créer l'enquête
    onEnqueteCreated(enqueteForm);

    // Réinitialisation du formulaire
    setEnqueteForm({
      titre: '',
      activite: '',
      typeEnquete: 'live',
      enqueteAnonymat: false,
      authentificationNumerique: false
    });

    alert('Enquête créée avec succès !');
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
      sx={{
        mb: 4,
        borderRadius: '12px !important',
        // boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '2px solid #f0f0f0',
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0 0 32px 0',
        }
      }}
    >
      {/* En-tête de l'accordéon */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          '&.Mui-expanded': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          '& .MuiAccordionSummary-content': {
            margin: '16px 0',
          }
        }}
      >
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '1.2rem'
        }}>
          Informations de l'enquête
        </Typography>
      </AccordionSummary>

      {/* Contenu de l'accordéon */}
      <AccordionDetails sx={{ p: 4 }}>
        {/* Formulaire en deux colonnes */}
        <Grid container spacing={6}>
          {/* Colonne gauche - Informations générales */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Titre de l'enquête *
              </Typography>
              <TextField
                fullWidth
                placeholder="Entrez le titre de votre enquête"
                value={enqueteForm.titre}
                onChange={(e) => handleFormChange('titre', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Activité associée *
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={enqueteForm.activite}
                  onChange={(e) => handleFormChange('activite', e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <MenuItem value="">
                    <em>Sélectionner une activité</em>
                  </MenuItem>
                  {ACTIVITES.map((activite) => (
                    <MenuItem key={activite} value={activite}>
                      {activite}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Colonne droite - Options */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 2,
                fontWeight: 600,
                color: '#555'
              }}>
                Options d'enquête
              </Typography>
              <RadioGroup
                value={enqueteForm.typeEnquete}
                onChange={(e) => handleFormChange('typeEnquete', e.target.value)}
                row
              >
                <FormControlLabel
                  value="live"
                  control={<Radio sx={{ color: '#666' }} />}
                  label="Live"
                  sx={{ mr: 3 }}
                />
                <FormControlLabel
                  value="asynchrone"
                  control={<Radio sx={{ color: '#666' }} />}
                  label="Asynchrone"
                />
              </RadioGroup>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={enqueteForm.enqueteAnonymat}
                    onChange={(e) => handleFormChange('enqueteAnonymat', e.target.checked)}
                    sx={{ ml: 1 }}
                  />
                }
                label="Enquête anonyme"
                sx={{
                  justifyContent: 'start',
                  ml: 0,
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: '#555'
                  }
                }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={enqueteForm.authentificationNumerique}
                    onChange={(e) => handleFormChange('authentificationNumerique', e.target.checked)}
                    sx={{ ml: 1 }}
                  />
                }
                label="Autoriser plusieurs réponses"
                sx={{
                  justifyContent: 'start',
                  ml: 0,
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: '#555'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Bouton de validation */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleValidateEnquete}
            disabled={!enqueteForm.titre.trim() || !enqueteForm.activite}
            sx={{
              bgcolor: '#2e7d32',
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#1b5e20',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(46,125,50,0.3)'
              },
              '&:disabled': {
                bgcolor: '#ccc',
                color: '#999'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Valider
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateEnqueteForm;