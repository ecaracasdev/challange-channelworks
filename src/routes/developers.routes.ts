import express from 'express';
import postDeveloper from '../controllers/developers/postDeveloper';
import setDeveloperAsInactive from '../controllers/developers/setDeveloperAsInactive';
import listDevelopers from '../controllers/developers/listDevelopers';
import updateAssetLicense from '../controllers/developers/updateAssetLicense';

const router = express.Router();

// Create a new developer
router.post('/', postDeveloper);

// Set developer as inactive
router.patch('/:id', setDeveloperAsInactive);

// update developer info
router.put('/:id/assets-licenses', updateAssetLicense);

// List all developers
router.get('/', listDevelopers);

export default router;
