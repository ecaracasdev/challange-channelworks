import express from 'express';
import listLicenses from '../controllers/licenses/listLicenses';
import postLicenses from '../controllers/licenses/postLicenses';
import deleteLicenses from '../controllers/licenses/deleteLicenses';

const router = express.Router();

// Create a new license
router.post('/', postLicenses);

// Delete an license by ID
router.delete('/:id', deleteLicenses);

// List all Licenses
router.get('/', listLicenses);

export default router;
