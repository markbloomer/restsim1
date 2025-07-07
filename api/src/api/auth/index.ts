import { Router } from 'express';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  // TODO: Implement login logic
  res.json({ message: 'Login endpoint' });
});

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  // TODO: Implement signup logic
  res.json({ message: 'Signup endpoint' });
});

export default router;