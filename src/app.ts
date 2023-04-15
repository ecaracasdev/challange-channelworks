import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type AssetType = 'laptop' | 'keyboard' | 'mouse' | 'headset';

interface Asset {
  id: string | number;
  brand: string;
  model: string;
  type: AssetType;
}

// Sample data for the assets
const assets: Asset[] = [
  { id: '1', brand: 'Dell', model: 'Latitude 7400', type: 'laptop' },
  { id: '2', brand: 'Logitech', model: 'K840', type: 'keyboard' },
  { id: '3', brand: 'Logitech', model: 'MX Master 3', type: 'mouse' },
  { id: '4', brand: 'Bose', model: 'QuietComfort 35 II', type: 'headset' },
];

interface License {
  id: string | number;
  software: string;
}

// Sample data for the licenses
const licenses: License[] = [
  { id: '1', software: 'amazon' },
  { id: '2', software: 'azure' },
];

interface Developer {
  id: string | number;
  fullname: string;
  active: boolean;
  assets: Asset[];
  licenses: License[];
}

const developers: Developer[] = [];

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const adminUser = {
  username: 'admin',
  password: 'password',
};

interface CustomRequest extends Request {
  user?: {
    iat: string;
    name: string;
  };
}
// Middleware to authenticate user using JWT
const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (typeof decoded === 'string' || typeof decoded === 'undefined') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = { iat: String(decoded.iat), name: decoded.username };
    next();
  });
};

// Login user
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Check if the username and password match the hardcoded credentials
  if (username === adminUser.username && password === adminUser.password) {
    // If the credentials match, create a JWT token with a secret key and set it as a response header
    const token = jwt.sign({ username }, 'secretKey');
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } else {
    // If the credentials don't match, send an error message
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
});

// Get list of current developers
app.get(
  '/developers',
  authenticateUser,
  (req: CustomRequest, res: Response) => {
    developers;
    res.status(200).json({
      developers,
    });
  }
);

// Create a new developer and automatically
app.post('/developers', authenticateUser, (req: Request, res: Response) => {
  const { id, fullname, active, assets = [], licenses = [] } = req.body;
  const developer: Developer = { id, fullname, active, assets, licenses };
  developers.push(developer);
  res.status(201).json({ message: 'Developer added successfully', developer });
});

// Set developer as inactive and remove they licenses and assets
app.patch(
  '/developers/:id',
  authenticateUser,
  (req: Request, res: Response) => {
    const id = req.params.id;
    const index = developers.findIndex((developer) => developer.id === id);
    if (index !== -1) {
      developers[index].active = false;

      // Remove developer's assets and licenses
      developers[index].assets = [];
      developers[index].licenses = [];

      res.json({
        message:
          'Developer set as inactive and their assets and licenses removed',
        developer: developers[index],
      });
    } else {
      res.status(404).json({ error: 'Developer not found' });
    }
  }
);

// Endpoint to update assets and licenses
app.put('/developers/:id/assets-licenses', authenticateUser, (req, res) => {
  const { id } = req.params;
  const { type, operation, value } = req.body;
  const developer = developers.find((d) => d.id === id);

  if (!developer) {
    return res.status(404).json({ message: 'Developer not found' });
  }

  if (type === 'asset') {
    if (operation === 'add') {
      developer.assets.push(value);
    } else if (operation === 'remove') {
      const assetIndex = developer.assets.findIndex((a) => a.id === value);
      if (assetIndex !== -1) {
        developer.assets.splice(assetIndex, 1);
      }
    } else if (operation === 'replace') {
      developer.assets = value;
    }
  } else if (type === 'license') {
    if (operation === 'add') {
      developer.licenses.push(value);
    } else if (operation === 'remove') {
      const licenseIndex = developer.licenses.findIndex((l) => l.id === value);
      if (licenseIndex !== -1) {
        developer.licenses.splice(licenseIndex, 1);
      }
    } else if (operation === 'replace') {
      developer.licenses = value;
    }
  } else {
    return res.status(400).json({ message: 'Invalid type' });
  }

  return res.status(200).json({
    message: `Developer ${type}s updated successfully`,
    developer,
  });
});

// Create a new asset
app.post('/assets', authenticateUser, (req, res) => {
  const { id, brand, model, type }: Asset = req.body;
  const newAsset: Asset = { id, brand, model, type };
  assets.push(newAsset);
  res
    .status(201)
    .json({ message: 'Asset added successfully', asset: newAsset });
});

// Delete an asset by ID
app.delete('/assets/:id', authenticateUser, (req, res) => {
  const { id } = req.params;
  const index = assets.findIndex((asset) => asset.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  assets.splice(index, 1);
  res.json({ message: 'Asset deleted successfully' });
});

// List all assets
app.get('/assets', authenticateUser, (req, res) => {
  res.json({ assets });
});

// Create a new license
app.post('/licenses', authenticateUser, (req, res) => {
  const { id, software }: License = req.body;
  const newLicense: License = { id, software };
  licenses.push(newLicense);
  res
    .status(201)
    .json({ message: 'license added successfully', license: newLicense });
});

// Delete an license by ID
app.delete('/licenses/:id', authenticateUser, (req, res) => {
  const { id } = req.params;
  const index = licenses.findIndex((license) => license.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'license not found' });
  }
  licenses.splice(index, 1);
  res.json({ message: 'license deleted successfully' });
});

// List all licenses
app.get('/licenses', authenticateUser, (req, res) => {
  res.json({ licenses });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const closeServer = () => {
  server.close();
};

export { app, closeServer };
