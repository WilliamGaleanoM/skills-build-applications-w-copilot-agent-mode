import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC', weeklyGoal: 4 },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', avatar: 'JR', weeklyGoal: 3 },
      { name: 'Sam Okafor', email: 'sam.okafor@example.com', avatar: 'SO', weeklyGoal: 5 },
    ]);

    await Team.create([
      { name: 'Summit Crew', motto: 'Small steps, high peaks.', members: [users[0]._id, users[1]._id] },
      { name: 'Pulse Makers', motto: 'Show up and move.', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 32, calories: 285, date: new Date('2026-09-22') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 45, calories: 340, date: new Date('2026-09-21') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 58, calories: 510, date: new Date('2026-09-23') },
    ]);

    await LeaderboardEntry.create([
      { user: users[2]._id, points: 1280, rank: 1, streak: 12 },
      { user: users[0]._id, points: 1045, rank: 2, streak: 8 },
      { user: users[1]._id, points: 870, rank: 3, streak: 5 },
    ]);

    await Workout.create([
      {
        title: 'Foundation Flow',
        category: 'Full body',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bug'],
      },
      {
        title: 'Tempo Builder',
        category: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Walking cooldown'],
      },
      {
        title: 'Power Circuit',
        category: 'Strength',
        difficulty: 'advanced',
        durationMinutes: 40,
        exercises: ['Kettlebell swings', 'Lunges', 'Renegade rows'],
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
