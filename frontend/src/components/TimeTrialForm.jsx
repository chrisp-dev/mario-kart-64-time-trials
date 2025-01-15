import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import './TimeTrialForm.css';

const TimeTrialForm = ({ fetchData }) => {
  const validationSchema = Yup.object({
    date: Yup.date().required('Required'),
    track_id: Yup.number().required('Required'),
    character: Yup.string().required('Required'),
    lap1: Yup.string().matches(/^\d{2}:\d{2}\.\d{2}$/, 'Invalid format').required('Required'),
    lap2: Yup.string().matches(/^\d{2}:\d{2}\.\d{2}$/, 'Invalid format').required('Required'),
    lap3: Yup.string().matches(/^\d{2}:\d{2}\.\d{2}$/, 'Invalid format').required('Required'),
    final_time: Yup.string().matches(/^\d{2}:\d{2}\.\d{2}$/, 'Invalid format').required('Required'),
    notes: Yup.string(),
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setErrorMessage('');
    axios.post('/time_trials', values)
      .then(() => {
        fetchData();
        resetForm();
      })
      .catch((error) => {
        setErrorMessage('An error occurred while submitting the form. Please try again.');
        console.error('Error submitting form:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    (<Box className="time-trial-form">
      <Box className="form-container">
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
          validateOnBlur
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Box className="field">
                <Field name="date">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Date"
                      type="datetime-local"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="track_id">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Track ID"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="character">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Character"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="lap1">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Lap 1 (MM:SS.SS)"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="lap2">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Lap 2 (MM:SS.SS)"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="lap3">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Lap 3 (MM:SS.SS)"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="final_time">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Final Time (MM:SS.SS)"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Box className="field">
                <Field name="notes">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Notes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                className="submit-button"
              >
                Submit
              </Button>
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
    </Box>)
  );
};

export default TimeTrialForm;
