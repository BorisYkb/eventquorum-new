// File: src/app/organisateur/gestionenquetes/components/EnqueteQuestionsTable.tsx

import React, { useState } from 'react';

import {
  Box,
  Button,
  Card,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  IconButton,
  Checkbox,
  FormControlLabel,
  Switch,
  Tooltip
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Import the correct Question type from the types file
import { Question } from '../nouveau/types';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface EnqueteQuestionsTableProps {
  questions: Question[];
  onViewQuestion: (questionId: number) => void;
  onEditQuestion: (questionId: number) => void;
  onDeleteQuestion: (questionId: number) => void;
}

/**
 * Composant Tableau des questions de l'enquête
 * Affiche la liste des questions avec les actions possibles
 */
const EnqueteQuestionsTable: React.FC<EnqueteQuestionsTableProps> = ({
  questions,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion
}) => {
  // États pour la gestion du tableau
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  // États pour la modal de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  // Types de questions disponibles pour l'affichage - Updated to match new types
  const typeQuestions = [
    { value: 'liste_deroulante', label: 'Liste déroulante' },
    { value: 'case_a_cocher', label: 'Case à cocher' },
    { value: 'question_libre', label: 'Question libre' },
    { value: 'echelle_lineaire', label: 'Échelle linéaire' },
    { value: 'choix_multiple', label: 'Choix multiple' }
  ];

  /**
   * Obtient le label d'un type de question
   */
  const getTypeQuestionLabel = (type: string) => typeQuestions.find(t => t.value === type)?.label || type;

  /**
   * Gestion de la sélection de toutes les questions
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = questions.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Gestion de la sélection d'une question
   */
  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  /**
   * Changement de page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Changement du nombre de lignes par page
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Ouverture de la modal de confirmation de suppression
   */
  const handleDeleteClick = (question: Question) => {
    setQuestionToDelete(question);
    setDeleteModalOpen(true);
  };

  /**
   * Confirmation de la suppression
   */
  const handleConfirmDelete = () => {
    if (questionToDelete) {
      onDeleteQuestion(questionToDelete.id);
      setQuestionToDelete(null);
    }
  };

  /**
   * Fermeture de la modal de suppression
   */
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  /**
   * Vérifie si une ligne est sélectionnée
   */
  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  return (
    <Box>
      {/* En-tête de la section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: '#333'
        }}>
          Liste des questions ({questions.length})
        </Typography>
      </Box>

      {/* Tableau des questions */}
      <Card sx={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            {/* En-tête du tableau */}
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < questions.length}
                    checked={questions.length > 0 && selected.length === questions.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{
                  fontWeight: 600,
                  color: '#555',
                  width: '60px',
                  textAlign: 'center'
                }}>
                  N°
                </TableCell>
                <TableCell sx={{
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Question
                </TableCell>
                <TableCell align="center" sx={{
                  fontWeight: 600,
                  color: '#555',
                  width: '140px'
                }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Corps du tableau */}
            <TableBody>
              {questions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question, index) => {
                  const isItemSelected = isSelected(index);
                  const actualIndex = page * rowsPerPage + index;

                  return (
                    <TableRow
                      key={question.id}
                      hover
                      onClick={(event) => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      {/* Checkbox de sélection */}
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>

                      {/* Numéro de la question */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{
                          fontWeight: 600,
                          color: '#666'
                        }}>
                          {actualIndex + 1}
                        </Typography>
                      </TableCell>

                      {/* Contenu de la question */}
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: '#333',
                          fontWeight: 500,
                          mb: 0.5,
                          lineHeight: 1.4
                        }}>
                          {question.question}
                        </Typography>
                        <Typography variant="caption" sx={{
                          color: '#666',
                          fontSize: '0.75rem'
                        }}>
                          {getTypeQuestionLabel(question.type)} •
                          {question.required ? ' Obligatoire' : ' Facultative'} •
                          {question.nombrePoints} points
                        </Typography>
                      </TableCell>

                      {/* Boutons d'actions */}
                      <TableCell align="center">
                        <Box sx={{
                          display: 'flex',
                          gap: 0.5,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          {/* Bouton Voir détails */}
                          <Tooltip title="Voir détails" placement="top" arrow>
                            <IconButton
                              color="info"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewQuestion(question.id);
                              }}
                              size="small"
                              sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                  bgcolor: 'rgba(33, 150, 243, 0.08)'
                                }
                              }}
                            >
                              <Iconify icon="solar:eye-bold" width={16} />
                            </IconButton>
                          </Tooltip>

                          {/* Bouton Modifier */}
                          <Tooltip title="Modifier" placement="top" arrow>
                            <IconButton
                              color="warning"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditQuestion(question.id);
                              }}
                              size="small"
                              sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                  bgcolor: 'rgba(255, 152, 0, 0.08)'
                                }
                              }}
                            >
                              <Iconify icon="solar:pen-new-square-linear" width={15} />
                            </IconButton>
                          </Tooltip>

                          {/* Bouton Supprimer */}
                          <Tooltip title="Supprimer" placement="top" arrow>
                            <IconButton
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(question);
                              }}
                              size="small"
                              sx={{
                                width: 32,
                                height: 32,
                                '&:hover': {
                                  bgcolor: 'rgba(244, 67, 54, 0.08)'
                                }
                              }}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer avec Dense et Pagination */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
          px: 2,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
          flexWrap: 'wrap',
          gap: 2,
          minHeight: '50px'
        }}>
          {/* Switch Dense */}
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(e) => setDense(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Dense
              </Typography>
            }
          />

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={questions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Lignes par page:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
            }
            sx={{
              '& .MuiTablePagination-toolbar': {
                minHeight: '40px',
                height: '40px',
                padding: '0 16px'
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '0.875rem',
                margin: 0
              },
              '& .MuiTablePagination-select': {
                fontSize: '0.875rem'
              },
              '& .MuiTablePagination-actions': {
                marginLeft: '8px'
              },
              '& .MuiIconButton-root': {
                padding: '4px'
              }
            }}
          />
        </Box>
      </Card>

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Êtes-vous sûr de supprimer la question ?"
        message="Vous ne pourrez pas annuler cette action !"
      />

    </Box>
  );
};

export default EnqueteQuestionsTable;