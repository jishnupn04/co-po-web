import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';

const CourseForm = () => {
    const [courseId, setCourseId] = useState('');
    const [name, setName] = useState('');
    const [credits, setCredits] = useState('');
    const [programme, setProgramme] = useState('');
    const [programmes, setProgrammes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProgrammes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/get-programmes/');
                const data = await response.json();
                setProgrammes(data);
            } catch (error) {
                console.error('Error fetching programmes:', error);
            }
        };

        fetchProgrammes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/create-course/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course_id: courseId,
                name: name,
                credits: credits,
                programme: programme,
            }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Create Course</Typography>
            <TextField
                label="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Credits"
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                required
                fullWidth
            />
            <TextField
                select
                label="Programme"
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                required
                fullWidth
            >
                {programmes.map((prog) => (
                    <MenuItem key={prog.id} value={prog.id}>
                        {prog.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">Create Course</Button>
            {message && <Typography color="error">{message}</Typography>}
        </Box>
    );
};

export default CourseForm;
