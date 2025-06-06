import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';
import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/routes/components/router-link';
import { paths } from 'src/routes/paths';
import { IEventTableFilters } from 'src/types/event';
import { IOrganizerTableFilters } from 'src/types/organizer';
import { TypeNewDialog } from './type-new-dialog';

// ----------------------------------------------------------------------

type Props = {
    onResetPage: () => void;
    filters: UseSetStateReturn<IOrganizerTableFilters>;
    options?: {
        roles: string[];
    };
};

export function TypeTableToolbar({ filters, options, onResetPage }: Props) {
    const menuActions = usePopover();
    const typeNewDialog = useBoolean();
    
    const { state: currentFilters, setState: updateFilters } = filters;

    const handleFilterName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onResetPage();
            updateFilters({ name: event.target.value });
        },
        [onResetPage, updateFilters]
    );

    const handleFilterRole = useCallback(
        (event: SelectChangeEvent<string[]>) => {
            const newValue =
                typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

            onResetPage();
            // updateFilters({ role: newValue });
        },
        [onResetPage, updateFilters]
    );

    const renderMenuActions = () => (
        <CustomPopover
            open={menuActions.open}
            anchorEl={menuActions.anchorEl}
            onClose={menuActions.onClose}
            slotProps={{ arrow: { placement: 'right-top' } }}
        >
            <MenuList>
                <MenuItem onClick={() => menuActions.onClose()}>
                    <Iconify icon="solar:export-bold" />
                    Exporter (EXCEL)
                </MenuItem>
            </MenuList>
        </CustomPopover>
    );

    const renderTypeNewDialog = () => (
        <TypeNewDialog
          open={typeNewDialog.value}
          onClose={() => {
            typeNewDialog.onFalse();
          }}
        />
      );

    return (
        <>
            <Box
                sx={{
                    p: 2.5,
                    gap: 2,
                    display: 'flex',
                    pr: { xs: 2.5, md: 1 },
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-end', md: 'center' },
                }}
            >
                {options && <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
                    {/* <InputLabel htmlFor="filter-role-select">Role</InputLabel>
                    <Select
                        multiple
                        value={currentFilters.role}
                        onChange={handleFilterRole}
                        input={<OutlinedInput label="Role" />}
                        renderValue={(selected) => selected.map((value) => value).join(', ')}
                        inputProps={{ id: 'filter-role-select' }}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
                    >
                        {options?.roles.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox
                                    disableRipple
                                    size="small"
                                    checked={currentFilters.role.includes(option)}
                                />
                                {option}
                            </MenuItem>
                        ))}
                    </Select> */}
                </FormControl>}

                <Box
                    sx={{
                        gap: 2,
                        width: 1,
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        fullWidth
                        value={currentFilters.name}
                        onChange={handleFilterName}
                        placeholder="Rechercher..."
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        onClick={typeNewDialog.onTrue}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        sx={{
                            minWidth: { xs: 80, sm: 150, md: 150 }, 
                            minHeight: 50,
                            fontSize: { xs: '0.6rem', sm: '1rem' }, 
                            px: { xs: 1, sm: 3 }, 
                        }}
                    >
                        Ajouter 
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Iconify icon="solar:export-bold" />}
                        sx={{
                            minWidth: { xs: 85, sm: 200, md: 220 }, 
                            minHeight: 50,
                            fontSize: { xs: '0.6rem', sm: '1rem' }, 
                            px: { xs: 1, sm: 2 }, 
                        }}
                    >
                        Exporter (EXCEL)
                    </Button>

                    {/* <IconButton onClick={menuActions.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton> */}
                </Box>
            </Box>

            {renderMenuActions()}
            {renderTypeNewDialog()}
        </>
    );
}
