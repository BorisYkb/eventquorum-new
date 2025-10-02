'use client';

import React from 'react';
import { useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import { Box, FormControl, MenuItem } from '@mui/material';
import { InputLabel, Select, Typography } from '@mui/material';

import { Upload } from 'src/components/upload';
import { Field } from 'src/components/hook-form';


export default function EventPasse() {

  const OPTIONS = [
    { value: 'option 1', label: 'Option 1' },
    { value: 'option 2', label: 'Option 2' },
    { value: 'option 3', label: 'Option 3' },
    { value: 'option 4', label: 'Option 4' },
    { value: 'option 5', label: 'Option 5' },
    { value: 'option 6', label: 'Option 6' },
    { value: 'option 7', label: 'Option 7' },
    { value: 'option 8', label: 'Option 8' },
  ];
 
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [showPreview, setShowPreview] = React.useState(true);

  const handleDropMultiFile = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleEventChange = (event: any) => {
    setSelectedEvents(event.target.value);
  };

  return (
    <Box sx={{ mb: 5, display: 'flex', gap: 1, flexDirection: 'column', boxShadow: 3, p: 3, borderRadius: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          mb: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Images des événements passés
      </Typography>

      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            mb: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Evènements Réalisée
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Sélectionnez un ou plusieurs événements déjà réalisés</InputLabel>
          <Select
            multiple
            value={selectedEvents}
            label="Sélectionnez un ou plusieurs événements déjà réalisés"
            onChange={handleEventChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // 👈 hauteur max du menu
                  overflowY: 'auto', // 👈 permet le scroll vertical
                },
              },
            }}
          >
            {OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Upload
        multiple
        thumbnail={showPreview}
        value={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={() => console.info('ON UPLOAD')}
      />
    </Box>
  );
}