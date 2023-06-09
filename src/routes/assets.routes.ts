import express from 'express';
import listAssets from '../controllers/assets/listAssets';
import postAssets from '../controllers/assets/postAssets';
import deleteAssets from '../controllers/assets/deleteAssets';

const router = express.Router();

// Create a new asset
router.post('/', postAssets);

// Delete an asset by ID
router.delete('/:id', deleteAssets);

// List all assets
router.get('/', listAssets);

export default router;
