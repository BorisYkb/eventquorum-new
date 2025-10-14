// src/sections/gestionEvent/eventpasse/controller.ts

// src/sections/eventPasse/controller.ts

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EvenementRealise, EvenementNonRealise } from './types';
import { EVENEMENTS_REALISES_DISPONIBLES } from './types';

/**
 * Hook personnalisé pour gérer la logique des événements passés
 */
export const useEventPasseController = () => {
    // ==========================================
    // ÉTATS - ÉVÉNEMENTS RÉALISÉS
    // ==========================================

    // IDs des événements réalisés sélectionnés dans la liste déroulante
    const [selectedRealisesIds, setSelectedRealisesIds] = useState<number[]>([]);

    // Liste des événements réalisés à afficher sur la landing page
    const [evenementsRealisesAffiches, setEvenementsRealisesAffiches] = useState<EvenementRealise[]>([]);

    // ==========================================
    // ÉTATS - ÉVÉNEMENTS NON RÉALISÉS
    // ==========================================

    // Liste des événements non réalisés créés
    const [evenementsNonRealises, setEvenementsNonRealises] = useState<EvenementNonRealise[]>([]);

    // Fichiers uploadés pour le formulaire d'événement non réalisé
    const [files, setFiles] = useState<(File | string)[]>([]);

    // Index de l'événement en cours d'édition (null si création)
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Compteur pour générer des IDs uniques
    const [nextId, setNextId] = useState(1);

    // ==========================================
    // FORMULAIRE - ÉVÉNEMENT NON RÉALISÉ
    // ==========================================

    const methods = useForm({
        defaultValues: {
            nom: '',
            description: '',
            dateDebut: '',
            dateFin: '',
            lieu: '',
        },
    });

    const { handleSubmit, reset } = methods;

    // ==========================================
    // GESTIONNAIRES - ÉVÉNEMENTS RÉALISÉS
    // ==========================================

    /**
     * Changement de la sélection dans la liste déroulante
     */
    const handleRealisesSelectionChange = (event: any) => {
        setSelectedRealisesIds(event.target.value);
    };

    /**
     * Enregistrement des événements réalisés sélectionnés
     * Ces événements seront affichés sur la landing page
     */
    const handleEnregistrerRealises = () => {
        // Récupérer les événements complets à partir des IDs sélectionnés
        const evenementsSelectionnes = EVENEMENTS_REALISES_DISPONIBLES.filter(event =>
            selectedRealisesIds.includes(event.id)
        );

        setEvenementsRealisesAffiches(evenementsSelectionnes);

        console.log('Événements réalisés enregistrés:', evenementsSelectionnes);
        // TODO: Appel API pour sauvegarder la sélection
        // await saveSelectedEvents(selectedRealisesIds);

        alert(`${evenementsSelectionnes.length} événement(s) réalisé(s) enregistré(s) pour affichage sur la landing page !`);

        // Réinitialiser la sélection après enregistrement
        setSelectedRealisesIds([]);
    };

    /**
     * Suppression d'un événement réalisé de la liste d'affichage
     */
    const handleDeleteRealise = (eventId: number) => {
        setEvenementsRealisesAffiches(prev => prev.filter(e => e.id !== eventId));
        setSelectedRealisesIds(prev => prev.filter(id => id !== eventId));

        console.log('Événement réalisé retiré:', eventId);
        // TODO: Appel API pour mettre à jour la sélection
    };

    // ==========================================
    // GESTIONNAIRES - FICHIERS (NON RÉALISÉS)
    // ==========================================

    /**
     * Ajout de fichiers uploadés
     */
    const handleDropMultiFile = (acceptedFiles: File[]) => {
        setFiles(prev => [...prev, ...acceptedFiles]);
    };

    /**
     * Suppression d'un fichier
     */
    const handleRemoveFile = (inputFile: File | string) => {
        setFiles(prev => prev.filter(file => file !== inputFile));
    };

    /**
     * Suppression de tous les fichiers
     */
    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    // ==========================================
    // GESTIONNAIRES - ÉVÉNEMENTS NON RÉALISÉS
    // ==========================================

    /**
     * Soumission du formulaire d'événement non réalisé
     */
    const onSubmitNonRealise = handleSubmit((data) => {
        // Validation
        if (!data.nom.trim()) {
            alert('Veuillez saisir le nom de l\'événement.');
            return;
        }

        if (!data.dateDebut || !data.dateFin) {
            alert('Veuillez saisir la période de l\'événement.');
            return;
        }

        if (!data.lieu.trim()) {
            alert('Veuillez saisir le lieu de l\'événement.');
            return;
        }

        if (files.length === 0) {
            alert('Veuillez uploader au moins une image pour l\'événement.');
            return;
        }

        // Créer l'événement
        const nouvelEvenement: EvenementNonRealise = {
            id: editingIndex !== null ? evenementsNonRealises[editingIndex].id : nextId,
            nom: data.nom,
            description: data.description,
            dateDebut: data.dateDebut,
            dateFin: data.dateFin,
            lieu: data.lieu,
            images: [...files],
            logo: typeof files[0] === 'string' ? files[0] : URL.createObjectURL(files[0]), // La première image comme logo
        };

        if (editingIndex !== null) {
            // Mise à jour d'un événement existant
            const updated = [...evenementsNonRealises];
            updated[editingIndex] = nouvelEvenement;
            setEvenementsNonRealises(updated);
            setEditingIndex(null);

            console.log('Événement non réalisé mis à jour:', nouvelEvenement);
            alert('Événement non réalisé mis à jour avec succès !');
        } else {
            // Ajout d'un nouvel événement
            setEvenementsNonRealises(prev => [...prev, nouvelEvenement]);
            setNextId(prev => prev + 1);

            console.log('Événement non réalisé créé:', nouvelEvenement);
            alert('Événement non réalisé ajouté avec succès !');
        }

        // TODO: Appel API pour sauvegarder l'événement
        // await saveNonRealiseEvent(nouvelEvenement);

        // Réinitialiser le formulaire automatiquement
        reset();
        setFiles([]);
    });

    /**
     * Édition d'un événement non réalisé
     */
    const handleEditNonRealise = (index: number) => {
        const event = evenementsNonRealises[index];
        reset({
            nom: event.nom,
            description: event.description,
            dateDebut: event.dateDebut,
            dateFin: event.dateFin,
            lieu: event.lieu,
        });
        setFiles(event.images);
        setEditingIndex(index);

        // Scroll vers la section "Événements Passés Non Réalisés"
        const section = document.getElementById('section-non-realises');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    /**
     * Suppression d'un événement non réalisé
     */
    const handleDeleteNonRealise = (index: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            const deletedEvent = evenementsNonRealises[index];
            setEvenementsNonRealises(prev => prev.filter((_, i) => i !== index));

            // Si on supprime l'événement en cours d'édition, réinitialiser le formulaire
            if (editingIndex === index) {
                reset();
                setFiles([]);
                setEditingIndex(null);
            }

            console.log('Événement non réalisé supprimé:', deletedEvent);
            // TODO: Appel API pour supprimer l'événement

            alert('Événement non réalisé supprimé avec succès !');
        }
    };

    // ==========================================
    // UTILITAIRES
    // ==========================================

    /**
     * Formater la période d'un événement
     */
    const formatPeriode = (dateDebut: string, dateFin: string): string => {
        const debut = new Date(dateDebut).toLocaleDateString('fr-FR');
        const fin = new Date(dateFin).toLocaleDateString('fr-FR');

        if (dateDebut === dateFin) {
            return debut;
        }

        return `${debut} - ${fin}`;
    };

    // ==========================================
    // RETOUR DES DONNÉES ET FONCTIONS
    // ==========================================

    return {
        // Formulaire
        methods,

        // Événements réalisés
        selectedRealisesIds,
        evenementsRealisesAffiches,
        handleRealisesSelectionChange,
        handleEnregistrerRealises,
        handleDeleteRealise,

        // Événements non réalisés
        evenementsNonRealises,
        files,
        editingIndex,
        handleDropMultiFile,
        handleRemoveFile,
        handleRemoveAllFiles,
        onSubmitNonRealise,
        handleEditNonRealise,
        handleDeleteNonRealise,

        // Utilitaires
        formatPeriode,
    };
};