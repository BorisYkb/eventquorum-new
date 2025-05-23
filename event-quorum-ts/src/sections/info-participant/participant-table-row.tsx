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
};

export function ParticipantTableRow({ 
    row, 
    selected, 
    onSelectRow, 
    onDeleteRow,
    onAcceptRow,
    onRejectRow 
}: Props) {
    const menuActions = usePopover();
    const confirmDialog = useBoolean();
    const acceptDialog = useBoolean();
    const rejectDialog = useBoolean();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'acceptée':
                return 'success';
            case 'rejetée':
                return 'error';
            case 'en attente':
                return 'warning';
            case 'participé':
                return 'info';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'acceptée':
                return 'Acceptée';
            case 'rejetée':
                return 'Rejetée';
            case 'en attente':
                return 'En attente';
            case 'participé':
                return 'Participé';
            default:
                return status;
        }
    };

    const canModifyStatus = row.statut === 'en attente';

    const renderMenuActions = () => (
        <CustomPopover
            open={menuActions.open}
            anchorEl={menuActions.anchorEl}
            onClose={menuActions.onClose}
            slotProps={{ arrow: { placement: 'right-top' } }}
        >
            <MenuList>
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
            content="Êtes-vous sûr de vouloir supprimer cette demande de participation ?"
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
                        color={getStatusColor(row.statut)}
                    >
                        {getStatusLabel(row.statut)}
                    </Label>
                </TableCell>

                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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