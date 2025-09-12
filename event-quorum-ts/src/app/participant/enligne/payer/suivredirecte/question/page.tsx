//src/app/participant/enligne/payer/suivredirecte/question/page.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { useTheme, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

/**
 * Types pour les messages
 */
interface ChatMessage {
    id: string;
    message: string;
    timestamp: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    isMe: boolean;
}

/**
 * Participant actuel (simulé)
 */
const CURRENT_USER = {
    id: 'participant-001',
    name: 'Kouacou Evarist',
    avatar: '', // Sera généré
    role: 'Participant'
};

/**
 * Organisateur (simulé)
 */
const ORGANIZER = {
    id: 'organizer-001',
    name: 'Organisateur SARA',
    avatar: '', // Sera généré
    role: 'Organisateur'
};

/**
 * Messages initiaux du chat
 */
const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: '1',
        message: 'Quel est l\'objectif principal de l\'activité ?',
        timestamp: '12/04/2024 à 11H00',
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        isMe: true
    },
    {
        id: '2',
        message: 'Partager des connaissances, des recherches ou des innovations dans un domaine spécifique, et permettre le réseautage entre experts et participants.',
        timestamp: '12/04/2024 à 11H05',
        senderId: ORGANIZER.id,
        senderName: ORGANIZER.name,
        isMe: false
    },
    {
        id: '3',
        message: 'Combien de participants sont attendus ?',
        timestamp: '12/04/2024 à 11H30',
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        isMe: true
    },
    {
        id: '4',
        message: 'Le nombre de participants attendus est 100.',
        timestamp: '12/04/2024 à 11H40',
        senderId: ORGANIZER.id,
        senderName: ORGANIZER.name,
        isMe: false
    }
];

// ----------------------------------------------------------------------

/**
 * Page de chat pour poser des questions
 */
export default function QuestionChatPage() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // États
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    /**
     * Calcule les tailles responsives
     */
    const getResponsiveSizes = () => {
        if (isMobile) {
            return {
                headerPadding: 2,
                messagePadding: 1.5,
                inputHeight: 50,
                avatarSize: 32,
                titleFont: { fontSize: '1rem', fontWeight: 600 },
                messageFont: { fontSize: '0.8125rem', fontWeight: 400 },
                timestampFont: { fontSize: '0.7rem', fontWeight: 400 },
                buttonFont: { fontSize: '0.75rem', fontWeight: 500 }
            };
        }

        if (isTablet) {
            return {
                headerPadding: 2.5,
                messagePadding: 2,
                inputHeight: 56,
                avatarSize: 36,
                titleFont: { fontSize: '1.125rem', fontWeight: 600 },
                messageFont: { fontSize: '0.875rem', fontWeight: 400 },
                timestampFont: { fontSize: '0.75rem', fontWeight: 400 },
                buttonFont: { fontSize: '0.8125rem', fontWeight: 500 }
            };
        }

        // Desktop
        return {
            headerPadding: 3,
            messagePadding: 2.5,
            inputHeight: 64,
            avatarSize: 40,
            titleFont: { fontSize: '1.25rem', fontWeight: 600 },
            messageFont: { fontSize: '0.9375rem', fontWeight: 400 },
            timestampFont: { fontSize: '0.8125rem', fontWeight: 400 },
            buttonFont: { fontSize: '0.875rem', fontWeight: 500 }
        };
    };

    const sizes = getResponsiveSizes();

    /**
     * Scroll vers le bas automatiquement
     */
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    /**
     * Retour à la page précédente
     */
    const handleGoBack = () => {
        router.back();
    };

    /**
     * Gestionnaire de changement de message
     */
    const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    }, []);

    /**
     * Envoi du message
     */
    const handleSendMessage = useCallback(
        async (event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (event && event.key !== 'Enter') return;
            if (!newMessage.trim()) return;

            // Ajouter le message de l'utilisateur
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                message: newMessage.trim(),
                timestamp: new Date().toLocaleString('fr-FR'),
                senderId: CURRENT_USER.id,
                senderName: CURRENT_USER.name,
                isMe: true
            };

            setMessages(prev => [...prev, userMessage]);
            setNewMessage('');
            setIsTyping(true);

            // Simuler la réponse de l'organisateur après 2 secondes
            setTimeout(() => {
                const organizerResponse: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    message: 'Merci pour votre question. Un organisateur vous répondra sous peu.',
                    timestamp: new Date().toLocaleString('fr-FR'),
                    senderId: ORGANIZER.id,
                    senderName: ORGANIZER.name,
                    isMe: false
                };

                setMessages(prev => [...prev, organizerResponse]);
                setIsTyping(false);
                scrollToBottom();
            }, 2000);

            scrollToBottom();
        },
        [newMessage, scrollToBottom]
    );

    /**
     * Gestionnaire de fichier joint
     */
    const handleAttach = useCallback(() => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }, []);

    /**
     * Rendu de l'en-tête du chat
     */
    const renderHeader = () => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: sizes.headerPadding,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}
        >
            {/* Bouton retour */}
            <IconButton onClick={handleGoBack} size="small">
                <Iconify icon="solar:arrow-left-linear" />
            </IconButton>

            {/* Informations du chat */}
            <Avatar
                sx={{ width: sizes.avatarSize, height: sizes.avatarSize }}
                src={ORGANIZER.avatar}
            >
                {ORGANIZER.name.charAt(0)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={sizes.titleFont}>
                    Questions & Réponses
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={sizes.timestampFont}>
                    Chat avec l'organisateur
                </Typography>
            </Box>

            {/* Statut en ligne */}
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main'
                }}
            />
        </Box>
    );

    /**
     * Rendu d'un message
     */
    const renderMessage = (message: ChatMessage) => (
        <Box
            key={message.id}
            sx={{
                display: 'flex',
                justifyContent: message.isMe ? 'flex-end' : 'flex-start',
                mb: 2,
                px: sizes.messagePadding
            }}
        >
            <Box
                sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: message.isMe ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: 1
                }}
            >
                {/* Avatar */}
                {!message.isMe && (
                    <Avatar
                        sx={{ width: 28, height: 28 }}
                        src={message.senderAvatar}
                    >
                        {message.senderName.charAt(0)}
                    </Avatar>
                )}

                {/* Bulle de message */}
                <Box>
                    <Card
                        sx={{
                            bgcolor: message.isMe ? 'primary.main' : 'grey.100',
                            color: message.isMe ? 'primary.contrastText' : 'text.primary',
                            borderRadius: 2,
                            boxShadow: 1
                        }}
                    >
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Typography variant="body2" sx={sizes.messageFont}>
                                {message.message}
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Timestamp */}
                    <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{
                            ...sizes.timestampFont,
                            display: 'block',
                            textAlign: message.isMe ? 'right' : 'left',
                            mt: 0.5,
                            px: 0.5
                        }}
                    >
                        {message.timestamp}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );

    /**
     * Rendu de l'indicateur de frappe
     */
    const renderTypingIndicator = () => (
        isTyping && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: sizes.messagePadding, mb: 2 }}>
                <Avatar sx={{ width: 28, height: 28 }}>
                    {ORGANIZER.name.charAt(0)}
                </Avatar>
                <Card sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {[1, 2, 3].map((dot) => (
                            <Box
                                key={dot}
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: 'text.disabled',
                                    animation: 'pulse 1.5s infinite',
                                    animationDelay: `${dot * 0.1}s`,
                                    '@keyframes pulse': {
                                        '0%, 60%, 100%': { opacity: 0.3 },
                                        '30%': { opacity: 1 }
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Card>
            </Box>
        )
    );

    /**
     * Rendu de la zone de saisie
     */
    const renderInput = () => (
        <Box
            sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}
        >
            <InputBase
                value={newMessage}
                onChange={handleChangeMessage}
                onKeyUp={handleSendMessage}
                placeholder="Tapez votre question..."
                multiline
                maxRows={3}
                startAdornment={
                    <IconButton size="small">
                        <Iconify icon="eva:smiling-face-fill" />
                    </IconButton>
                }
                endAdornment={
                    <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={handleAttach}>
                            <Iconify icon="eva:attach-2-fill" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => handleSendMessage()}
                            disabled={!newMessage.trim()}
                            sx={{
                                color: newMessage.trim() ? 'primary.main' : 'text.disabled'
                            }}
                        >
                            <Iconify icon="solar:paper-plane-bold" />
                        </IconButton>
                    </Stack>
                }
                sx={{
                    px: 2,
                    py: 1,
                    minHeight: sizes.inputHeight,
                    '& .MuiInputBase-input': {
                        ...sizes.messageFont
                    }
                }}
            />
            <input type="file" ref={fileRef} style={{ display: 'none' }} />
        </Box>
    );

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}
        >
            {/* En-tête */}
            {renderHeader()}

            {/* Zone des messages */}
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                <Scrollbar sx={{ height: '100%' }}>
                    <Box sx={{ py: 2 }}>
                        {messages.map(renderMessage)}
                        {renderTypingIndicator()}
                        <div ref={messagesEndRef} />
                    </Box>
                </Scrollbar>
            </Box>

            {/* Zone de saisie */}
            {renderInput()}
        </Box>
    );
}