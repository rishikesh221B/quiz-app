import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  const card = {
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  };
  const title = { margin: 0 };
  const desc = { margin: 0, color: '#4b5563' };
  const meta = { fontSize: 14, color: '#6b7280' };
  const link = {
    alignSelf: 'flex-start',
    background: '#2563eb',
    color: 'white',
    padding: '8px 12px',
    borderRadius: 6,
    textDecoration: 'none'
  };

  return (
    <div style={card}>
      <h3 style={title}>{quiz.title}</h3>
      {quiz.description ? <p style={desc}>{quiz.description}</p> : null}
      <div style={meta}>Duration: {quiz.durationMinutes} min</div>
      <Link to={`/quiz/${quiz._id}`} style={link}>Start</Link>
    </div>
  );
}