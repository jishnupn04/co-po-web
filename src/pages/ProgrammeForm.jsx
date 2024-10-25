import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ProgrammeForm = () => {
    const [programmeId, setProgrammeId] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/create-programme/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                programme_id: programmeId,
                name: name,
            }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Create Programme</Typography>
            <TextField
                label="Programme ID"
                value={programmeId}
                onChange={(e) => setProgrammeId(e.target.value)}
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
            <Button type="submit" variant="contained" color="primary">Create Programme</Button>
            {message && <Typography color="error">{message}</Typography>}
        </Box>
    );
};

export default ProgrammeForm;
