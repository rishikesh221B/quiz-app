const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedIndex: { type: Number, required: true, min: 0 },
    isCorrect: { type: Boolean, required: true }
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
    startedAt: { type: Date, required: true },
    submittedAt: { type: Date },
    durationSeconds: { type: Number },
    totalQuestions: { type: Number, required: true },
    score: { type: Number, default: 0, min: 0 },
    answers: { type: [answerSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attempt', attemptSchema);
