// File: src/app/organisateur/gestionenquetes/nouveau/page.tsx

'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import QuestionDetailModal from '../components/QuestionDetailModal';

// Types
interface Question {
  id: number;
  question: string;
  type: 'choix_multiple' | 'echelle_appreciation' | 'zone_saisie' | 'choix_unique' | 'liste_deroulante' | 'note_etoile';
  reponses: string[];
  enqueteConcernee: string;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
}

interface EnqueteForm {
  titre: string;
  activite: string;
  typeEnquete: 'live' | 'asynchrone';
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
  questions: Question[];
}

const CreateEnquetePage: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const [enqueteForm, setEnqueteForm] = useState<EnqueteForm>({
    titre: '',
    activite: '',
    typeEnquete: 'live',
    enqueteAnonymat: false,
    authentificationNumerique: false,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'choix_multiple' as Question['type'],
    reponses: [''],
    enqueteConcernee: '',
    nombrePoints: 0,
    bonneReponse: 0,
    required: false
  });

  // État pour le modal de détail de question
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedQuestionForView, setSelectedQuestionForView] = useState<Question | null>(null);

  // Options disponibles pour les activités
  const activites = [
    "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
    "PANEL DE HAUT NIVEAU",
    "POINT DE PRESSE",
    "COOLING BREAK",
    "PAUSE CAFE"
  ];

  // Options pour les enquêtes concernées
  const enquetesConcernees = [
    "Enquête 1",
    "Enquête 2",
    "Enquête 3",
    "Enquête 4"
  ];

  // Types de questions disponibles
  const typeQuestions = [
    { value: 'choix_multiple', label: 'Choix multiple' },
    { value: 'echelle_appreciation', label: 'Échelle d\'appréciation' },
    { value: 'zone_saisie', label: 'Zone de saisie' },
    { value: 'choix_unique', label: 'Choix unique' },
    { value: 'liste_deroulante', label: 'Liste déroulante' },
    { value: 'note_etoile', label: 'Note étoile' }
  ];

  const handleEnqueteFormChange = (field: keyof EnqueteForm, value: any) => {
    setEnqueteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrentQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddReponse = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: [...prev.reponses, '']
    }));
  };

  const handleRemoveReponse = (index: number) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.filter((_, i) => i !== index)
    }));
  };

  const handleReponseChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.map((rep, i) => i === index ? value : rep)
    }));
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.question.trim()) return;

    const newQuestion: Question = {
      id: Date.now(),
      question: currentQuestion.question,
      type: currentQuestion.type,
      reponses: currentQuestion.reponses.filter(rep => rep.trim()),
      enqueteConcernee: currentQuestion.enqueteConcernee,
      nombrePoints: currentQuestion.nombrePoints,
      bonneReponse: currentQuestion.bonneReponse,
      required: currentQuestion.required
    };

    setEnqueteForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    // Reset current question
    setCurrentQuestion({
      question: '',
      type: 'choix_multiple',
      reponses: [''],
      enqueteConcernee: '',
      nombrePoints: 0,
      bonneReponse: 0,
      required: false
    });
  };

  const handleViewQuestion = (questionId: number) => {
    const question = enqueteForm.questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestionForView(question);
      setDetailModalOpen(true);
    }
  };

  const handleEditQuestion = (questionId: number) => {
    const question = enqueteForm.questions.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestion({
        question: question.question,
        type: question.type,
        reponses: question.reponses.length > 0 ? question.reponses : [''],
        enqueteConcernee: question.enqueteConcernee,
        nombrePoints: question.nombrePoints,
        bonneReponse: question.bonneReponse,
        required: question.required
      });
      handleDeleteQuestion(questionId);
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    setEnqueteForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleSaveEnquete = () => {
    if (!enqueteForm.titre.trim() || !enqueteForm.activite || enqueteForm.questions.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires et ajouter au moins une question.');
      return;
    }

    // Logique de sauvegarde
    console.log('Enquête à sauvegarder:', enqueteForm);

    // Redirection vers la liste des enquêtes
    router.push('/organisateur/gestionenquetes');
  };

  const handleCancel = () => {
    router.push('/organisateur/gestionenquetes');
  };

  const getTypeQuestionLabel = (type: string) => {
    return typeQuestions.find(t => t.value === type)?.label || type;
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* En-tête avec titre et bouton retour */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        pb: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: '2rem'
        }}>
          Créer une enquête
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{
            bgcolor: '#2c2c2c',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#1a1a1a',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          ← Retour
        </Button>
      </Box>

      {/* Section principale en deux colonnes */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Colonne gauche - Informations générales */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{
            p: 4,
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <Typography variant="h6" sx={{
              mb: 3,
              fontWeight: 600,
              color: '#333',
              fontSize: '1.2rem'
            }}>
              Informations générales
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Titre de l'enquête
              </Typography>
              <TextField
                fullWidth
                placeholder="Entrez le titre de votre enquête"
                value={enqueteForm.titre}
                onChange={(e) => handleEnqueteFormChange('titre', e.target.value)}
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
                Activité associée
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={enqueteForm.activite}
                  onChange={(e) => handleEnqueteFormChange('activite', e.target.value)}
                  displayEmpty
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <MenuItem value="">
                    <em>Sélectionner une activité</em>
                  </MenuItem>
                  {activites.map((activite) => (
                    <MenuItem key={activite} value={activite}>
                      {activite}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        {/* Colonne droite - Options */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{
            p: 4,
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <Typography variant="h6" sx={{
              mb: 3,
              fontWeight: 600,
              color: '#333',
              fontSize: '1.2rem'
            }}>
              Options de l'enquête
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 2,
                fontWeight: 600,
                color: '#555'
              }}>
                Type d'enquête
              </Typography>
              <RadioGroup
                value={enqueteForm.typeEnquete}
                onChange={(e) => handleEnqueteFormChange('typeEnquete', e.target.value)}
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
                    onChange={(e) => handleEnqueteFormChange('enqueteAnonymat', e.target.checked)}
                    sx={{ ml: 1 }}
                  />
                }
                label="Enquête anonyme"
                sx={{
                  justifyContent: 'space-between',
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
                    onChange={(e) => handleEnqueteFormChange('authentificationNumerique', e.target.checked)}
                    sx={{ ml: 1 }}
                  />
                }
                label="Authentification numérique"
                sx={{
                  justifyContent: 'space-between',
                  ml: 0,
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: '#555'
                  }
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Section Ajouter une question - Pleine largeur */}
      <Card sx={{
        p: 4,
        mb: 4,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}>
        <Typography variant="h6" sx={{
          mb: 4,
          fontWeight: 600,
          color: '#333',
          fontSize: '1.2rem'
        }}>
          Ajouter une question
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Question
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Saisissez votre question..."
                value={currentQuestion.question}
                onChange={(e) => handleCurrentQuestionChange('question', e.target.value)}
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
                Réponses possibles
              </Typography>
              {currentQuestion.reponses.map((reponse, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <Box sx={{
                    minWidth: 40,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Radio
                      checked={currentQuestion.bonneReponse === index}
                      onChange={() => handleCurrentQuestionChange('bonneReponse', index)}
                      size="small"
                      sx={{ p: 0.5 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {index + 1}.
                    </Typography>
                  </Box>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder={`Réponse ${index + 1}`}
                    value={reponse}
                    onChange={(e) => handleReponseChange(index, e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px'
                      }
                    }}
                  />
                  {currentQuestion.reponses.length > 1 && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRemoveReponse(index)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      ✕
                    </Button>
                  )}
                </Box>
              ))}
              <Button
                variant="outlined"
                size="small"
                onClick={handleAddReponse}
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  borderRadius: '6px'
                }}
              >
                + Ajouter une réponse
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Type de question
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={currentQuestion.type}
                    onChange={(e) => handleCurrentQuestionChange('type', e.target.value)}
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    {typeQuestions.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Enquête concernée
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={currentQuestion.enqueteConcernee}
                    onChange={(e) => handleCurrentQuestionChange('enqueteConcernee', e.target.value)}
                    displayEmpty
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <MenuItem value="">
                      <em>Sélectionner une enquête</em>
                    </MenuItem>
                    {enquetesConcernees.map((enquete) => (
                      <MenuItem key={enquete} value={enquete}>
                        {enquete}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Nombre de points
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="0"
                  value={currentQuestion.nombrePoints}
                  onChange={(e) => handleCurrentQuestionChange('nombrePoints', parseInt(e.target.value) || 0)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={currentQuestion.required}
                    onChange={(e) => handleCurrentQuestionChange('required', e.target.checked)}
                  />
                }
                label="Question obligatoire"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: '#555'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleAddQuestion}
            disabled={!currentQuestion.question.trim()}
            sx={{
              bgcolor: '#2e7d32',
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#1b5e20',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(46,125,50,0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Ajouter la question
          </Button>
        </Box>
      </Card>

      {/* Section Liste des questions - Pleine largeur */}
      {enqueteForm.questions.length > 0 && (
        <Card sx={{
          p: 4,
          mb: 4,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0'
        }}>
          <Typography variant="h6" sx={{
            mb: 3,
            fontWeight: 600,
            color: '#333',
            fontSize: '1.2rem'
          }}>
            Questions ajoutées ({enqueteForm.questions.length})
          </Typography>

          <TableContainer sx={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#f8f9fa', py: 2 } }}>
                  <TableCell sx={{
                    fontWeight: 600,
                    color: '#555',
                    fontSize: '14px',
                    width: '60px',
                    textAlign: 'center'
                  }}>
                    N°
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#555', fontSize: '14px' }}>
                    Question
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: 600,
                    color: '#555',
                    fontSize: '14px',
                    width: '150px',
                    textAlign: 'center'
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enqueteForm.questions.map((question, index) => (
                  <TableRow key={question.id} hover>
                    <TableCell sx={{
                      py: 3,
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#666'
                    }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Typography variant="body2" sx={{
                        fontSize: '15px',
                        color: '#333',
                        mb: 1,
                        fontWeight: 500
                      }}>
                        {question.question}
                      </Typography>
                      <Typography variant="caption" sx={{
                        color: '#666',
                        fontSize: '12px'
                      }}>
                        {getTypeQuestionLabel(question.type)} •
                        {question.required ? ' Obligatoire' : ' Facultative'} •
                        {question.nombrePoints} points
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 3, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Tooltip title="Voir détails" placement="top" arrow>
                          <IconButton
                            color="info"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewQuestion(question.id);
                            }}
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' }
                            }}
                          >
                            <Iconify icon="solar:eye-bold" width={16} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Modifier" placement="top" arrow>
                          <IconButton
                            color="warning"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditQuestion(question.id);
                            }}
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.08)' }
                            }}
                          >
                            <Iconify icon="solar:pen-bold" width={16} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Supprimer" placement="top" arrow>
                          <IconButton
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteQuestion(question.id);
                            }}
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' }
                            }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Boutons finaux - Pleine largeur */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        justifyContent: 'flex-end',
        pt: 3,
        borderTop: '1px solid #e0e0e0'
      }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            minWidth: 100,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#ccc',
            color: 'black',
            '&:hover': {
              borderColor: '#999',
              color: '#333',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveEnquete}
          disabled={!enqueteForm.titre.trim() || !enqueteForm.activite || enqueteForm.questions.length === 0}
          sx={{
            minWidth: 140,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
            },
            '&:disabled': {
              bgcolor: '#ccc',
              color: '#999'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Enregistrer
        </Button>
      </Box>

      {/* Modal de détail de question */}
      <QuestionDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        question={selectedQuestionForView}
        getTypeQuestionLabel={getTypeQuestionLabel}
      />
    </Box>
  );
};

export default CreateEnquetePage;
