import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AssessmentPatternForm = () => {
    const [courseId, setCourseId] = useState('');
    const [assessmentType, setAssessmentType] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/create-assessment-pattern/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course: courseId,
                assessment_type: assessmentType,
                total_marks: totalMarks,
            }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Create Assessment Pattern</Typography>
            <TextField
                label="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Assessment Type"
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Total Marks"
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                required
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Create Assessment Pattern</Button>
            {message && <Typography color="error">{message}</Typography>}
        </Box>
    );
};

export default AssessmentPatternForm;
