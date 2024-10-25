import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import SignIn from './components/login/SignIn.jsx'; // Adjust the import path as needed
import Home from './pages/Home.jsx'; // Adjust the import path as needed
import Students from './pages/Students.jsx'; // Adjust the import path as needed
import './index.css';
import ProgrammeForm from './pages/ProgrammeForm.jsx';
import CourseForm from './pages/CourseForm.jsx';
import AssessmentPatternForm from './pages/AssessmentPatternForm.jsx';
import QuestionPatternForm from './pages/QuestionPatternForm.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attain-co-po" element={<Students />} />
        <Route path="/add-programme" element={<ProgrammeForm />} />
        <Route path="/add-course" element={<CourseForm />} />
        <Route path="/add-assessment-pattern" element={<AssessmentPatternForm />} />
        <Route path="/add-question-pattern" element={<QuestionPatternForm />} />
      </Routes>
    </Router>
  </StrictMode>
);
