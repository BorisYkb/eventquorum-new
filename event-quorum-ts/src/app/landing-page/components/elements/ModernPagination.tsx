"use client"
import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

/**
 * Composant de pagination moderne stylisé selon les standards de minimals.cc
 * Utilise Material-UI pour les composants de base avec un style personnalisé
 */

// Style personnalisé pour le bouton de page actif (jaune/orange)
const ActivePageButton = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#FFB020', // Couleur jaune/orange comme dans l'image
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '16px',
  boxShadow: '0 2px 8px rgba(255, 176, 32, 0.24)',
  border: 'none',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: '#FF9F00',
    boxShadow: '0 4px 12px rgba(255, 176, 32, 0.32)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Style pour les boutons de page inactifs (gris clair)
const InactivePageButton = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#F4F6F8', // Gris clair
  color: '#637381',
  fontWeight: 500,
  fontSize: '16px',
  border: 'none',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: '#DFE3E8',
    color: '#454F5B',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Style pour les boutons de navigation (précédent/suivant)
const NavigationButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#F4F6F8',
  color: '#637381',
  margin: '0 4px',
  '&:hover': {
    backgroundColor: '#DFE3E8',
    color: '#454F5B',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    backgroundColor: '#F9FAFB',
    color: '#C4CDD5',
    cursor: 'not-allowed',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// Style pour les points de suspension
const EllipsisButton = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'transparent',
  color: '#637381',
  fontWeight: 500,
  fontSize: '16px',
  border: 'none',
  margin: '0 4px',
  cursor: 'default',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

/**
 * Composant Pagination principal
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.currentPage - La page actuelle (commence à 1)
 * @param {number} props.totalPages - Le nombre total de pages
 * @param {Function} props.onPageChange - Fonction appelée lors du changement de page
 * @param {number} props.siblingCount - Nombre de pages à afficher de chaque côté de la page actuelle (défaut: 1)
 */
const ModernPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1
}: { currentPage: number; totalPages: number; onPageChange: Function; siblingCount: number; }) => {
  /**
   * Génère la liste des numéros de pages à afficher
   * Inclut la logique pour les points de suspension
   */
  const generatePageNumbers = () => {
    const pages = [];
    
    // Si le nombre total de pages est faible, afficher toutes les pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Toujours afficher la première page
    pages.push(1);

    // Calculer la plage de pages autour de la page actuelle
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    // Déterminer si nous devons afficher des points de suspension
    const shouldShowLeftEllipsis = leftSibling > 2;
    const shouldShowRightEllipsis = rightSibling < totalPages - 1;

    // Ajouter les points de suspension à gauche si nécessaire
    if (shouldShowLeftEllipsis) {
      pages.push('...');
    }

    // Ajouter les pages centrales
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Ajouter les points de suspension à droite si nécessaire
    if (shouldShowRightEllipsis) {
      pages.push('...');
    }

    // Toujours afficher la dernière page (si elle n'est pas déjà incluse)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  /**
   * Gère le clic sur un numéro de page
   * @param {number} page - Le numéro de la page cliquée
   */
  const handlePageClick = (page: number) => {
    if (typeof page === 'number' && page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  /**
   * Gère le clic sur le bouton précédent
   */
  const handlePreviousClick = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * Gère le clic sur le bouton suivant
   */
  const handleNextClick = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // Ne pas afficher la pagination s'il n'y a qu'une seule page
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0.5,
        padding: 2,
        flexWrap: 'wrap', // Pour la responsivité sur mobile
      }}
    >
      {/* Bouton Précédent */}
      <NavigationButton
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        <ChevronLeft />
      </NavigationButton>

      {/* Numéros de pages */}
      {pageNumbers.map((page, index) => {
        // Cas des points de suspension
        if (page === '...') {
          return (
            <EllipsisButton
              key={`ellipsis-${index}`}
              disabled
            >
              ...
            </EllipsisButton>
          );
        }

        // Cas des numéros de pages normaux
        const isActive = page === currentPage;
        const ButtonComponent = isActive ? ActivePageButton : InactivePageButton;

        return (
          <ButtonComponent
            key={page}
            onClick={() => {
              if (typeof page === 'number') {
                handlePageClick(page);
              }
            }}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </ButtonComponent>
        );
      })}

      {/* Bouton Suivant */}
      <NavigationButton
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        <ChevronRight />
      </NavigationButton>
    </Box>
  );
};

export default ModernPagination;