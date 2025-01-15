import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const TimeTrialForm = ({ fetchData }) => {
  const validationSchema = Yup.object({
    date: Yup.date().required('Required'),
    track_id: Yup.number().required('Required'),
    character: Yup.string().required('Required'),
    lap1: Yup.string().matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid format').required('Required'),
    lap2: Yup.string().matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid format').required('Required'),
    lap3: Yup.string().matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid format').required('Required'),
    final_time: Yup.string().matches(/^\d{2}:\d{2}:\d{2}$/, 'Invalid format').required('Required'),
    notes: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post('/time_trials', values)
      .then(() => {
        fetchData();
        resetForm();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#121212', // Dark background
        color: '#ffffff', // Light font color
        '@media (min-width: 600px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          marginBottom: 2,
          '@media (min-width: 600px)': {
            width: '30%',
            marginBottom: 0,
          },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Time Trial Record
        </Typography>
        <Formik
          initialValues={{
            date: '',
            track_id: '',
            character: '',
            lap1: '',
            lap2: '',
            lap3: '',
            final_time: '',
            notes: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Field
                  name="date"
                  as={TextField}
                  label="Date"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="date" />}
                  error={!!<ErrorMessage name="date" />}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ style: { color: '#ffffff' } }} // Light font color for input
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }} // Light border color
                />
                <Field
                  name="track_id"
                  as={TextField}
                  label="Track ID"
                  type="number"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="track_id" />}
                  error={!!<ErrorMessage name="track_id" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="character"
                  as={TextField}
                  label="Character"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="character" />}
                  error={!!<ErrorMessage name="character" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="lap1"
                  as={TextField}
                  label="Lap 1 (MM:SS:SS)"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="lap1" />}
                  error={!!<ErrorMessage name="lap1" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="lap2"
                  as={TextField}
                  label="Lap 2 (MM:SS:SS)"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="lap2" />}
                  error={!!<ErrorMessage name="lap2" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="lap3"
                  as={TextField}
                  label="Lap 3 (MM:SS:SS)"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="lap3" />}
                  error={!!<ErrorMessage name="lap3" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="final_time"
                  as={TextField}
                  label="Final Time (MM:SS:SS)"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="final_time" />}
                  error={!!<ErrorMessage name="final_time" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Field
                  name="notes"
                  as={TextField}
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  helperText={<ErrorMessage name="notes" />}
                  error={!!<ErrorMessage name="notes" />}
                  InputProps={{ style: { color: '#ffffff' } }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      '& fieldset': { borderColor: '#ffffff' },
                      '&.Mui-error fieldset': { borderColor: '#ff1744' } // Custom error color
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#ff1744' // Custom error text color
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  sx={{ backgroundColor: '#1e88e5', color: '#ffffff' }} // Light font color for button
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        sx={{
          width: '100%',
          '@media (min-width: 600px)': {
            width: '65%',
          },
        }}
      >
      </Box>
    </Box>
  );
};

export default TimeTrialForm;
