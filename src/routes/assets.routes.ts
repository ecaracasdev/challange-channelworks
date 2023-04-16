import express from 'express';
import listAssets from '../controllers/assets/listAssets';
import postAssets from '../controllers/assets/postAssets';
import deleteAssets from '../controllers/assets/deleteAssets';

const router = express.Router();

// Create a new asset
/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Creates a new asset
 *     description: Creates a new asset with the specified brand, model, and type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       201:
 *         description: Asset created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssetResponse'
 *       500:
 *         description: Error creating asset
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', postAssets);

// Delete an asset by ID
router.delete('/:id', deleteAssets);

// List all assets
router.get('/', listAssets);

export default router;
