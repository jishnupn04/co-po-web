import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const QuestionPatternForm = () => {
    const [assessmentPatternId, setAssessmentPatternId] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [totalQuestions, setTotalQuestions] = useState('');
    const [questionsToAnswer, setQuestionsToAnswer] = useState('');
    const [marksPerQuestion, setMarksPerQuestion] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/create-question-pattern/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                assessment_pattern: assessmentPatternId,
                question_type: questionType,
                total_questions: totalQuestions,
                questions_to_answer: questionsToAnswer,
                marks_per_question: marksPerQuestion,
            }),
        });

        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Create Question Pattern</Typography>
            <TextField
                label="Assessment Pattern ID"
                value={assessmentPatternId}
                onChange={(e) => setAssessmentPatternId(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Question Type"
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Total Questions"
                type="number"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Questions to Answer"
                type="number"
                value={questionsToAnswer}
                onChange={(e) => setQuestionsToAnswer(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Marks per Question"
                type="number"
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(e.target.value)}
                required
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Create Question Pattern</Button>
            {message && <Typography color="error">{message}</Typography>}
        </Box>
    );
};

export default QuestionPatternForm;
