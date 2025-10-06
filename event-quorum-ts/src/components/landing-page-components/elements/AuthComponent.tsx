"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Collapse,
  Alert,
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  PersonAdd,
  Login,
  Close,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

/**
 * Composant d'authentification réutilisable pour EventQuorum
 * Permet l'inscription et la connexion avec un formulaire dynamique
 */

// Style pour le conteneur principal
const AuthContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '24px',
  maxWidth: '500px',
  margin: '0 auto',
  width: '100%',
}));

// Style pour les boutons principaux (S'inscrire et Se connecter)
const MainButton = styled(Button)(({ theme }) => ({
  minHeight: '48px',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  padding: '12px 32px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

// Style pour le bouton d'inscription (bleu)
const RegisterButton = styled(MainButton)(({ theme }) => ({
  backgroundColor: '#2065D1',
  color: '#FFFFFF',
  border: '2px solid #2065D1',
  '&:hover': {
    backgroundColor: '#1939B7',
    borderColor: '#1939B7',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(32, 101, 209, 0.3)',
  },
}));

// Style pour le bouton de connexion (outline)
const LoginButton = styled(MainButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#2065D1',
  border: '2px solid #2065D1',
  '&:hover': {
    backgroundColor: '#F4F6F8',
    borderColor: '#1939B7',
    color: '#1939B7',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(32, 101, 209, 0.15)',
  },
}));

// Style pour le formulaire de connexion
const LoginForm = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid #E7E7E7',
  backgroundColor: '#FFFFFF',
  marginTop: '16px',
}));

// Style pour les champs de saisie
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#F9FAFB',
    '&:hover': {
      backgroundColor: '#F4F6F8',
    },
    '&.Mui-focused': {
      backgroundColor: '#FFFFFF',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E7E7E7',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C4CDD5',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#2065D1',
    borderWidth: '2px',
  },
  '& .MuiInputLabel-root': {
    color: '#637381',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#2065D1',
  },
}));

// Style pour le bouton de soumission du formulaire
const SubmitButton = styled(Button)(({ theme }) => ({
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#FFB020',
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(255, 176, 32, 0.3)',
  '&:hover': {
    backgroundColor: '#FF9F00',
    boxShadow: '0 6px 20px rgba(255, 176, 32, 0.4)',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    backgroundColor: '#C4CDD5',
    color: '#637381',
    boxShadow: 'none',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

/**
 * Composant principal d'authentification
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.registerPath - Chemin vers la page d'inscription (défaut: "/register")
 * @param {Function} props.onLoginSuccess - Fonction appelée après une connexion réussie
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Object} props.style - Styles inline additionnels
 */
const AuthComponent = ({
  registerPath = "/register",           // Chemin vers la page d'inscription
  onLoginSuccess = (user: any) => {},   // Callback après connexion réussie
  className = "custom-class",           // Classes CSS additionnelles
  style = { marginTop: '2rem' }
}) => {
  const router = useRouter();
  
  // États pour la gestion du formulaire
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // États pour les données du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accessCode: ''
  });

  /**
   * Gère la redirection vers la page d'inscription
   */
  const handleRegisterClick = () => {
    router.push("/contact");
  };

  /**
   * Affiche/masque le formulaire de connexion
   */
  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm);
    // Réinitialiser les messages et le formulaire quand on ferme
    if (showLoginForm) {
      setError('');
      setSuccess('');
      setFormData({
        firstName: '',
        lastName: '',
        accessCode: ''
      });
    }
  };

  /**
   * Gère les changements dans les champs du formulaire
   * @param {React.ChangeEvent<HTMLInputElement>} event - L'événement de changement
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer les messages d'erreur quand l'utilisateur tape
    if (error) setError('');
    if (success) setSuccess('');
  };

  /**
   * Valide les données du formulaire
   * @returns {boolean} True si le formulaire est valide
   */
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('Le prénom est requis');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Le nom est requis');
      return false;
    }
    if (!formData.accessCode.trim()) {
      setError('Le code d\'accès est requis');
      return false;
    }
    if (formData.accessCode.length < 4) {
      setError('Le code d\'accès doit contenir au moins 4 caractères');
      return false;
    }
    return true;
  };

  /**
   * Gère la soumission du formulaire de connexion
   * @param {React.FormEvent<HTMLFormElement>} event - L'événement de soumission
   */
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Valider le formulaire
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      // Simulation d'une requête API de connexion
      // Remplacez cette partie par votre logique d'authentification réelle
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation de délai réseau
  
      // Exemple de validation simple (à remplacer par votre logique)
      if (formData.accessCode === 'demo123' || formData.accessCode === 'admin') {
        setSuccess('Connexion réussie ! Redirection en cours...');
        
        // Sauvegarder les données utilisateur (exemple)
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        };
        
        // Stocker dans sessionStorage (ou votre système de gestion d'état)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('userData', JSON.stringify(userData));
        }
  
        // Appeler la fonction de callback si fournie
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
  
        // Redirection après 2 secondes
        setTimeout(() => {
          router.push('/dashboard'); // Ou votre page de destination
        }, 2000);
  
      } else {
        setError('Code d\'accès invalide. Veuillez réessayer.');
      }
  
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Ferme le formulaire de connexion
   */
  const handleCloseForm = () => {
    setShowLoginForm(false);
    setError('');
    setSuccess('');
    setFormData({
      firstName: '',
      lastName: '',
      accessCode: ''
    });
  };

  return (
    <AuthContainer className={className} style={style}>
      {/* Boutons principaux */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Bouton S'inscrire */}
        <RegisterButton
          variant="contained"
          className='vl-btn1'
          startIcon={<PersonAdd />}
          onClick={handleRegisterClick}
          sx={{ minWidth: '160px' }}
        >
          S'inscrire
        </RegisterButton>

        {/* Bouton Se connecter */}
        <LoginButton
          variant="outlined"
          startIcon={<Login />}
          onClick={handleLoginClick}
          sx={{ minWidth: '160px' }}
        >
          Se connecter
        </LoginButton>
      </Box>

      {/* Formulaire de connexion (apparaît avec animation) */}
      <Collapse in={showLoginForm} timeout={400}>
        <LoginForm elevation={0}>
          {/* En-tête du formulaire */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: '#212B36',
                fontSize: '1.5rem',
              }}
            >
              Se connecter
            </Typography>
            
            <IconButton
              onClick={handleCloseForm}
              sx={{
                color: '#637381',
                '&:hover': {
                  backgroundColor: '#F4F6F8',
                  color: '#454F5B',
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Messages d'alerte */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  fontSize: '14px',
                },
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  fontSize: '14px',
                },
              }}
            >
              {success}
            </Alert>
          )}

          {/* Formulaire */}
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            {/* Champ Prénom */}
            <StyledTextField
              name="firstName"
              label="Prénom *"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
              placeholder="Entrez votre prénom"
            />

            {/* Champ Nom */}
            <StyledTextField
              name="lastName"
              label="Nom *"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
              placeholder="Entrez votre nom"
            />

            {/* Champ Code d'accès */}
            <StyledTextField
              name="accessCode"
              label="Code d'accès *"
              type={showPassword ? 'text' : 'password'}
              value={formData.accessCode}
              onChange={handleInputChange}
              fullWidth
              disabled={isLoading}
              placeholder="Entrez votre code d'accès"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#637381' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {/* Informations d'aide */}
            <Typography
              variant="body2"
              sx={{
                color: '#637381',
                fontSize: '13px',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              💡 Code de démonstration : <strong>demo123</strong> ou <strong>admin</strong>
            </Typography>

            {/* Bouton de soumission */}
            <SubmitButton
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 1 }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Connexion en cours...
                </Box>
              ) : (
                'Se connecter'
              )}
            </SubmitButton>
          </Box>

          {/* Lien vers l'inscription */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: '#637381' }}>
              Pas encore de compte ?{' '}
              <Button
                variant="text"
                onClick={handleRegisterClick}
                sx={{
                  color: '#2065D1',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                S'inscrire ici
              </Button>
            </Typography>
          </Box>
        </LoginForm>
      </Collapse>
    </AuthContainer>
  );
};

export default AuthComponent;