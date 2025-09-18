import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizCard from '../components/QuizCard';

export default function Dashboard({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createForm, setCreateForm] = useState({ title: '', description: '', durationMinutes: 10 });
  const [bulkJson, setBulkJson] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/quizzes');
        setQuizzes(res.data || []);
      } catch (e) {
        //currently empty
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function createQuiz(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('/quizzes', createForm);
      setQuizzes((prev) => [res.data, ...prev]);
      setSelectedQuizId(res.data._id);
      setMsg('Quiz created. Now upload questions JSON.');
    } catch (e) {
      setMsg(e.response?.data?.message || 'Failed to create quiz');
    }
  }

  async function uploadQuestions(e) {
    e.preventDefault();
    setMsg('');
    try {
      const data = JSON.parse(bulkJson);
      await axios.post(`/quizzes/${selectedQuizId}/questions/bulk`, data);
      setMsg('Questions uploaded successfully');
      setBulkJson('');
    } catch (e) {
      setMsg(e.response?.data?.message || 'Failed to upload questions (ensure valid JSON)');
    }
  }

  return (
    <div>
      <h2>Welcome, {user.name} ({user.role})</h2>

      {user.role === 'admin' && (
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <h3>Create Quiz (admin)</h3>
          <form onSubmit={createQuiz} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
            <input placeholder="Title" value={createForm.title} onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} />
            <input placeholder="Description" value={createForm.description} onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })} />
            <input type="number" placeholder="Duration (minutes)" value={createForm.durationMinutes} onChange={(e) => setCreateForm({ ...createForm, durationMinutes: Number(e.target.value) })} />
            <button type="submit" style={{ background: '#16a34a', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6 }}>Create Quiz</button>
          </form>

          <h3 style={{ marginTop: 24 }}>Bulk Upload Questions (admin)</h3>
          <div style={{ marginBottom: 8 }}>
            <label>
              Target Quiz:
              <select value={selectedQuizId} onChange={(e) => setSelectedQuizId(e.target.value)} style={{ marginLeft: 8 }}>
                <option value="">Select quiz</option>
                {quizzes.map(q => <option key={q._id} value={q._id}>{q.title}</option>)}
              </select>
            </label>
          </div>
          <form onSubmit={uploadQuestions} style={{ display: 'grid', gap: 8, maxWidth: 800 }}>
            <textarea rows={8} placeholder='[{"text":"Q1","options":[{"text":"A"},{"text":"B"}],"correctOptionIndex":0}]' value={bulkJson} onChange={(e) => setBulkJson(e.target.value)} />
            <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 6 }}>Upload</button>
          </form>
          {msg ? <p style={{ color: '#065f46' }}>{msg}</p> : null}
        </div>
      )}

      <h3>Available Quizzes</h3>
      {loading ? <p>Loading...</p> : quizzes.length === 0 ? <p>No quizzes yet.</p> : null}
      <div>
        {quizzes.map((q) => <QuizCard key={q._id} quiz={q} />)}
      </div>
    </div>
  );
}