import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Leaderboard() {
  const { quizId } = useParams();
  const [top, setTop] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/attempts/leaderboard/${quizId}`);
        setTop(res.data.top || []);
      } catch (e) {
        setTop([]);
      }
    })();
  }, [quizId]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Rank</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {top.map((row) => (
            <tr key={row.rank} style={{ borderTop: '1px solid #e5e7eb' }}>
              <td style={{ padding: 8 }}>{row.rank}</td>
              <td style={{ padding: 8 }}>{row.name}</td>
              <td style={{ padding: 8 }}>{row.score}</td>
            </tr>
          ))}
          {top.length === 0 && (
            <tr>
              <td style={{ padding: 8 }} colSpan={3}>No entries yet.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}