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

/**
 * @swagger
 * /api/simulations:
 *   post:
 *     summary: Create a new simulation
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               teams:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     password:
 *                       type: string
 *               restaurantProfile:
 *                 type: string
 *               marketModel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Simulation created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       500:
 *         description: Failed to create simulation
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, teams, restaurantProfile, marketModel } = req.body;
    const ownerId = (req as any).user.userId;

    // Create restaurant and market (mock for now)
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantProfile || 'Default Restaurant',
        background: '',
        balanceSheet: {},
      },
    });
    const market = await prisma.market.create({
      data: {
        customerRevenue: 0,
        inflation: 0,
        depreciation: 0,
        staffTurnover: 0,
        season: '',
        events: {},
      },
    });

    // Create simulation
    const simulation = await prisma.simulation.create({
      data: {
        name,
        ownerId,
        restaurantId: restaurant.id,
        marketId: market.id,
      },
    });

    // Create teams
    for (const team of teams) {
      await prisma.team.create({
        data: {
          name: team.name,
          password: team.password,
          simulationId: simulation.id,
          userId: ownerId, // or assign to different users as needed
        },
      });
    }

    res.status(201).json({ id: simulation.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create simulation' });
  }
});

export default router;