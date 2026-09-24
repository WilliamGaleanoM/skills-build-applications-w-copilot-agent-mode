import express from 'express';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

export const app = express();
export const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name').sort({ date: -1 }).lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().populate('user', 'name').sort({ points: -1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, title: 1 }).lean());
});