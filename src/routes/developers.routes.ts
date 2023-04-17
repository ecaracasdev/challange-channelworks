import express from 'express';
import postDeveloper from '../controllers/developers/postDeveloper';
import setDeveloperAsInactive from '../controllers/developers/setDeveloperAsInactive';
import listDevelopers from '../controllers/developers/listDevelopers';
import updateAssetLicense from '../controllers/developers/updateAssetLicense';
import getDevById from '../controllers/developers/getDevById';
import { catcher } from '../core/core';

const router = express.Router();

// List all developers
/**
 * @swagger
 * /developers:
 *   get:
 *     summary: Get all developers with their associated assets and licenses
 *     description: Retrieves all developers with their associated assets and licenses. If no developers exist, the service will return an error response.
 *     responses:
 *       200:
 *         description: List of all developers with their associated assets and licenses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetDevelopersResponse'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', catcher(listDevelopers));

// Get developer by id or get they assets or licenses by query "property"
/**
 * @swagger
 * /developers/{id}:
 *   get:
 *     summary: Get developer by ID
 *     description: Returns a single developer object by ID along with their assets/licenses if specified
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the developer to retrieve
 *         schema:
 *           type: string
 *       - in: query
 *         name: property
 *         required: false
 *         description: Specify either 'assets' or 'licenses' to only retrieve the corresponding data. Leave empty to retrieve the full developer object.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Developer information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperResponse'
 *       400:
 *         description: Invalid parameter or query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Developer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error retrieving developer information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', catcher(getDevById));

// Create a new developer
/**
 * @swagger
 * /developers:
 *   post:
 *     summary: Add a new developer
 *     description: Creates a new developer object in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeveloperModel'
 *     responses:
 *       200:
 *         description: Developer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperModel'
 *       400:
 *         description: Invalid request body or data already exists in the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error adding developer to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', catcher(postDeveloper));

// Set developer as inactive
/**
 * @swagger
 * /developers/{id}:
 *   patch:
 *     summary: Deactivate developer and remove associated assets and licenses
 *     description: Sets a developer as inactive and removes their associated assets and licenses. The developer is specified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the developer to deactivate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Developer deactivated successfully and associated assets and licenses removed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperModel'
 *       400:
 *         description: Invalid asset ID or developer not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error deactivating the developer or removing associated assets and licenses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', catcher(setDeveloperAsInactive));

// update developer info
/**
 * @swagger
 * /developers/{id}/assets-licenses:
 *   patch:
 *     summary: Add or remove assets/licenses from an active developer
 *     description: Adds or removes assets/licenses from an active developer based on the specified operation and value. If the operation is "add", the specified value of assets/licenses will be added to the developer. If the operation is "remove", the specified value of assets/licenses will be removed from the developer. The type parameter specifies whether the request is for an asset or a license. The developer is specified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the developer to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Request body containing the type of operation (add/remove), the type of asset/license to be updated, and the value representing the asset/license.
 *         schema:
 *           $ref: '#/components/schemas/OperationRequestBody'
 *     responses:
 *       200:
 *         description: Assets/licenses added or removed successfully from the developer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeveloperModel'
 *       400:
 *         description: Invalid asset/license ID, active developer not found, asset/license not found, or invalid operation/type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error adding or removing assets/licenses from the developer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/assets-licenses', catcher(updateAssetLicense));

export default router;
