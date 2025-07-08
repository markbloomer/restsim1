/**
 * @swagger
 * /api/simulations:
 *   get:
 *     summary: Get all simulations
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of simulations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   owner:
 *                     type: string
 *       401:
 *         description: Missing or invalid token
 */
import { Router } from 'express';
import prisma from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const simulations = await prisma.simulation.findMany({
      include: { owner: true }
    });
    res.json(simulations.map(sim => ({
      id: sim.id,
      name: sim.name,
      owner: sim.owner?.username || 'Unknown'
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch simulations' });
  }
});

export default router;