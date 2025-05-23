import { IParticipantItem } from 'src/types/participant';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
    row: IParticipantItem;
    selected: boolean;
    onSelectRow: () => void;
    onDeleteRow: () => void;
    onAcceptRow?: () => void;
    onRejectRow?: () => void;
    onViewDetails?: () => void;
    activeTab: string;
};

export function ParticipantTableRow({ 
    row, 
    selected, 
    onSelectRow, 
    onDeleteRow,
    onAcceptRow,
    onRejectRow,
    onViewDetails,
    activeTab 
}: Props) {
    const menuActions = usePopover();
    const confirmDialog = useBoolean();
    const acceptDialog = useBoolean();
    const rejectDialog = useBoolean();

    const getStatusColor = (status: string, tab: string) => {
        if (tab === 'demandes') {
            switch (status) {
                case 'acceptée':
                    return 'success';
                case 'rejetée':
                    return 'error';
                case 'en attente':
                    return 'warning';
                default:
                    return 'default';
            }
        } else if (tab === 'participants') {
            switch (status) {
                case 'en présentiel':
                    return 'info';
                case 'en ligne':
                    return 'warning';
                default:
                    return 'default';
            }
        }
        return 'default';
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'acceptée':
                return 'Acceptée';
            case 'rejetée':
                return 'Rejetée';
            case 'en attente':
                return 'En attente';
            case 'en présentiel':
                return 'En présentiel';
            case 'en ligne':
                return 'En ligne';
            default:
                return status;
        }
    };

    const getBooleanLabel = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? 'Oui' : 'Non';
        }
        return value === 'oui' || value === 'Oui' ? 'Oui' : 'Non';
    };

    const getBooleanColor = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? 'success' : 'error';
        }
        return value === 'oui' || value === 'Oui' ? 'success' : 'error';
    };

    const canModifyStatus = activeTab === 'demandes' && row.statut === 'en attente';

    const renderMenuActions = () => (
        <CustomPopover
            open={menuActions.open}
            anchorEl={menuActions.anchorEl}
            onClose={menuActions.onClose}
            slotProps={{ arrow: { placement: 'right-top' } }}
        >
            <MenuList>
                {onViewDetails && (
                    <MenuItem
                        onClick={() => {
                            onViewDetails();
                            menuActions.onClose();
                        }}
                        sx={{ color: 'info.main' }}
                    >
                        <Iconify icon="solar:eye-bold" />
                        Voir détails
                    </MenuItem>
                )}

                {canModifyStatus && onAcceptRow && (
                    <MenuItem
                        onClick={() => {
                            acceptDialog.onTrue();
                            menuActions.onClose();
                        }}
                        sx={{ color: 'success.main' }}
                    >
                        <Iconify icon="solar:check-circle-bold" />
                        Accepter
                    </MenuItem>
                )}

                {canModifyStatus && onRejectRow && (
                    <MenuItem
                        onClick={() => {
                            rejectDialog.onTrue();
                            menuActions.onClose();
                        }}
                        sx={{ color: 'warning.main' }}
                    >
                        <Iconify icon="solar:close-circle-bold" />
                        Rejeter
                    </MenuItem>
                )}

                <MenuItem
                    onClick={() => {
                        confirmDialog.onTrue();
                        menuActions.onClose();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Supprimer
                </MenuItem>
            </MenuList>
        </CustomPopover>
    );

    const renderConfirmDialog = () => (
        <ConfirmDialog
            open={confirmDialog.value}
            onClose={confirmDialog.onFalse}
            title="Supprimer"
            content="Êtes-vous sûr de vouloir supprimer cet élément ?"
            action={
                <Button variant="contained" color="error" onClick={onDeleteRow}>
                    Supprimer
                </Button>
            }
        />
    );

    const renderAcceptDialog = () => (
        <ConfirmDialog
            open={acceptDialog.value}
            onClose={acceptDialog.onFalse}
            title="Accepter la demande"
            content={`Êtes-vous sûr de vouloir accepter la demande de participation de ${row.nom_prenom} ?`}
            action={
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => {
                        onAcceptRow?.();
                        acceptDialog.onFalse();
                    }}
                >
                    Accepter
                </Button>
            }
        />
    );

    const renderRejectDialog = () => (
        <ConfirmDialog
            open={rejectDialog.value}
            onClose={rejectDialog.onFalse}
            title="Rejeter la demande"
            content={`Êtes-vous sûr de vouloir rejeter la demande de participation de ${row.nom_prenom} ?`}
            action={
                <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => {
                        onRejectRow?.();
                        rejectDialog.onFalse();
                    }}
                >
                    Rejeter
                </Button>
            }
        />
    );

    // Rendu conditionnel selon l'onglet actif
    const renderTableCells = () => {
        switch (activeTab) {
            case 'demandes':
                return (
                    <>
                        <TableCell>
                            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                                <Typography variant="subtitle2" noWrap>
                                    {row.nom_prenom}
                                </Typography>
                            </Stack>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="text.secondary">
                                {row.email}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2">
                                {row.telephone}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="text.secondary">
                                {row.date}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Label
                                variant="soft"
                                color={getStatusColor(row.statut, activeTab)}
                            >
                                {getStatusLabel(row.statut)}
                            </Label>
                        </TableCell>
                    </>
                );

            case 'invites':
                return (
                    <>
                        <TableCell>
                            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                                <Typography variant="subtitle2" noWrap>
                                    {row.nom_prenom}
                                </Typography>
                            </Stack>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="text.secondary">
                                {row.email}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2">
                                {row.telephone}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>
                            <Label
                                variant="soft"
                                color={getBooleanColor(row.connecte)}
                            >
                                {getBooleanLabel(row.connecte)}
                            </Label>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>
                            <Label
                                variant="soft"
                                color={getBooleanColor(row.premiere_connexion)}
                            >
                                {getBooleanLabel(row.premiere_connexion)}
                            </Label>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2">
                                {row.activite_selectionnee || '-'}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>
                            <Label
                                variant="soft"
                                color={getBooleanColor(row.achat_effectue)}
                            >
                                {getBooleanLabel(row.achat_effectue)}
                            </Label>
                        </TableCell>
                    </>
                );

            case 'participants':
                return (
                    <>
                        <TableCell>
                            <Typography variant="subtitle2" noWrap>
                                {row.nom || row.nom_prenom?.split(' ')[0]}
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography variant="subtitle2" noWrap>
                                {row.prenom || row.nom_prenom?.split(' ')[1]}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2">
                                {row.telephone}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                            <Typography variant="body2" color="text.secondary">
                                {row.email}
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>
                            <Label
                                variant="soft"
                                color={getBooleanColor(row.connecte)}
                            >
                                {getBooleanLabel(row.connecte)}
                            </Label>
                        </TableCell>

                        <TableCell>
                            <Label
                                variant="soft"
                                color={getStatusColor(row.statut, activeTab)}
                            >
                                {getStatusLabel(row.statut)}
                            </Label>
                        </TableCell>

                        <TableCell sx={{ textAlign: 'center' }}>
                            <IconButton 
                                size="small" 
                                color="info"
                                onClick={() => {/* Logique d'émargement */}}
                            >
                                <Iconify icon="solar:document-text-bold" />
                            </IconButton>
                        </TableCell>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected}
                        onClick={onSelectRow}
                        inputProps={{
                            id: `${row.id}-checkbox`,
                            'aria-label': `${row.id} checkbox`,
                        }}
                    />
                </TableCell>

                {renderTableCells()}

                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Icône œil pour voir les détails */}
                        <Tooltip title="Voir détails" placement="top" arrow>
                            <IconButton
                                color="info"
                                onClick={() => onViewDetails?.()}
                                size="small"
                                sx={{ mr: 0.5 }}
                            >
                                <Iconify icon="solar:eye-bold" />
                            </IconButton>
                        </Tooltip>

                        {/* Actions rapides pour les demandes en attente */}
                        {canModifyStatus && (
                            <>
                                <Tooltip title="Accepter" placement="top" arrow>
                                    <IconButton
                                        color="success"
                                        onClick={() => acceptDialog.onTrue()}
                                        size="small"
                                        sx={{ mr: 0.5 }}
                                    >
                                        <Iconify icon="solar:check-circle-bold" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Rejeter" placement="top" arrow>
                                    <IconButton
                                        color="warning"
                                        onClick={() => rejectDialog.onTrue()}
                                        size="small"
                                        sx={{ mr: 0.5 }}
                                    >
                                        <Iconify icon="solar:close-circle-bold" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}

                        <IconButton
                            color={menuActions.open ? 'inherit' : 'default'}
                            onClick={menuActions.onOpen}
                        >
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>

            {renderMenuActions()}
            {renderConfirmDialog()}
            {renderAcceptDialog()}
            {renderRejectDialog()}
        </>
    );
}