import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const TimeTrialForm = ({ fetchData }) => {
  const validationSchema = Yup.object({
    date: Yup.string().required('Required'),
    track_id: Yup.number().required('Required'),
    character: Yup.string().required('Required'),
    lap1: Yup.string().required('Required'),
    lap2: Yup.string().required('Required'),
    lap3: Yup.string().required('Required'),
    final_time: Yup.string().required('Required'),
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
        minHeight: '100vh',
        padding: 2
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
          <Form style={{ width: '100%', maxWidth: '500px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Field
                name="date"
                as={TextField}
                label="Date"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="date" />}
                error={!!<ErrorMessage name="date" />}
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
              />
              <Field
                name="character"
                as={TextField}
                label="Character"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="character" />}
                error={!!<ErrorMessage name="character" />}
              />
              <Field
                name="lap1"
                as={TextField}
                label="Lap 1"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="lap1" />}
                error={!!<ErrorMessage name="lap1" />}
              />
              <Field
                name="lap2"
                as={TextField}
                label="Lap 2"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="lap2" />}
                error={!!<ErrorMessage name="lap2" />}
              />
              <Field
                name="lap3"
                as={TextField}
                label="Lap 3"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="lap3" />}
                error={!!<ErrorMessage name="lap3" />}
              />
              <Field
                name="final_time"
                as={TextField}
                label="Final Time"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="final_time" />}
                error={!!<ErrorMessage name="final_time" />}
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
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TimeTrialForm;
