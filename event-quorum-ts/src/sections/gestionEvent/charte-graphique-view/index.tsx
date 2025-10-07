'use client';

import React from 'react';
import { useState } from 'react';

import { Grid2  as Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, CardHeader, Typography, CardContent, InputAdornment, Select, MenuItem } from '@mui/material';

import { fData } from 'src/utils/format-number';

import { Upload } from 'src/components/upload';
import { Form, Field } from 'src/components/hook-form';

import { useCharteGraphiqueView } from './controller';

const CharteGraphiqueView = () => {
  const { isSubmitting, methods, onSubmit, handleRemoveFile, handleRemoveAllFiles, handleRemovePartnerAllFiles, handleRemovePartnerFile} =
    useCharteGraphiqueView();

  const [selectedTemplate, setSelectedTemplate] = useState('');

  return (
    <Card>
      <CardHeader
        title="Charte Graphique de l'évènement"
        subheader="Configurez la charte graphique de votre événement pour une expérience utilisateur cohérente."
      />
      <CardContent>
        <div>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box
              sx={{
                gap: 3,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  mb: 5,
                  pt: 10,
                  pb: 5,
                  px: 3,
                  marginBottom: 3,
                  borderBottom: 'dashed 1px #cccdcf',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-10 size-full">
                  <div className="flex flex-col text-center">
                    <h4>Logo de l&apos;évènement</h4>
                    <Field.UploadLogo
                      name="logo_event"
                      maxSize={3145728}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 3,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.disabled',
                            fontSize: '0.6rem',
                          }}
                        >
                          Formats autorisés *.jpeg, *.jpg, *.png, *.gif
                          <br /> La taille maximale est de {fData(5242880)}
                        </Typography>
                      }
                    />
                  </div>

                  <div className="flex flex-col text-center  ">
                    <h4>Logo des Sponsors</h4>
                    <Field.Upload
                      multiple
                      name="logo_partenaire"
                      onRemove={handleRemovePartnerFile}
                      onRemoveAll={handleRemovePartnerAllFiles}
                      onUpload={() => console.info('ON UPLOAD')}
                    />
                  </div>
                  <Box
                    sx={{
                      mb: 5,
                      pb: 5,
                      marginBottom: 3,
                      // borderBottom: 'dashed 1px #cccdcf',
                    }}
                  >
                    <div className="flex flex-col text-center relative">
                      <h4>Images (page login)</h4>
                      <Field.Upload
                        multiple
                        thumbnail={true}
                        name="slides"
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                        onUpload={() => console.info('ON UPLOAD')}
                      />
                    </div>
                  </Box>

                  
                </div>
              </Box>

              <div className="flex flex-col text-center pb-5 mb-5">
                <h4>Modèle LandingPage</h4>
                <Select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    label="Modele"
                    sx={{ fontSize: '0.8rem' }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.8rem' }}>TEMPLATE 1</MenuItem>
                    <MenuItem value="En cours" sx={{ fontSize: '0.8rem' }}>TEMPLATE 2</MenuItem>
                    <MenuItem value="Non démarrée" sx={{ fontSize: '0.8rem' }}>TEMPLATE 3</MenuItem>
                    <MenuItem value="Terminée" sx={{ fontSize: '0.8rem' }}>TEMPLATE 4</MenuItem>
                  </Select>
                {/* <Field.UploadLogo
                  name="model_landing_page"
                  multiple
                  placeholder="Logo partenaire"
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                        fontSize: '0.6rem',
                      }}
                    >
                      Formats autorisés *.jpeg, *.jpg, *.png, *.gif
                      <br /> La taille maximale est de {fData(5242880)}
                    </Typography>
                  }
                /> */}
              </div>

              <Box
                sx={{
                  pb: 5,
                  marginBottom: 3,
                  borderBottom: 'dashed 1px #cccdcf',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <Field.Text
                    type="number"
                    itemType="number"
                    name="taille_logo_event_login"
                    label="Taille logo event login"
                    slotProps={{
                      input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
                    }}
                  />

                  <Field.Text
                    type="number"
                    itemType="number"
                    name="taille_logo_event_navbar"
                    label="Taille logo event navbar"
                    slotProps={{
                      input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
                    }}
                  />

                  <Field.Text
                    name="taille_logo_event_pdf"
                    label="Taille logo event PDF"
                    type="number"
                    itemType="number"
                    slotProps={{
                      input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
                    }}
                  />

                  <Field.Text
                    name="taille_logo_event_partenaire"
                    label="Taille logo event partner"
                    type="number"
                    itemType="number"
                    slotProps={{
                      input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
                    }}
                  />

                  <Field.Text
                    name="couleur_navbar"
                    label="Couleur navbar"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="couleur_texte"
                    label="Couleur texte"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="ui_style"
                    label="UI style"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="background_color_navbar"
                    label="Background color navbar"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="color_boutons"
                    label="Color boutons"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="color_icons"
                    label="Color icons"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="primary_color_landing_page"
                    label="Primary color landing page"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />

                  <Field.Text
                    name="secondary_color_landing_page"
                    label="Secondary color landing page"
                    type="color"
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                </div>
              </Box>

              

              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Validation..."
              >
                Mettre à jour
              </LoadingButton>
            </Box>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharteGraphiqueView;
