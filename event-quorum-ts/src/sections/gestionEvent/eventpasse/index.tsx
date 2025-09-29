'use client';

import React from 'react';
import { useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { Upload } from 'src/components/upload';

export default function EventPasse() {

  const [files, setFiles] = useState<(File | string)[]>([]);
  const [showPreview, setShowPreview] = React.useState(true);
  const handleDropMultiFile = (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
  };
  const handleRemoveFile = (inputFile: File | string) => {
      const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
      setFiles(filesFiltered);
  }
  const handleRemoveAllFiles = () => {
    setFiles([]);
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

