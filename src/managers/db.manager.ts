import mongoose from 'mongoose';
import AssetModel, { IAsset} from '../models/assets';
import DeveloperModel, { IDeveloper } from '../models/developers';
import LicenseModel, { ILicense } from '../models/licenses';

export default class DBManager {
  static async connect(): Promise<void> {
    try {
      const mongoAtlasUri: string =
        process.env.MONGO_URI || 'mongodb://localhost:27017/eliasapi';
      await mongoose.connect(mongoAtlasUri, {});
      await DBManager.populateDatabase();
      console.log(`Connected to MongoDB ${process.env.MONGO_URI} `);
    } catch (err) {
      console.log('Error on MongoDB connection', err);
      throw 'Error on connecting DB';
    }
  }

  private static async populateDatabase(): Promise<void> {
    // Check if the collections are empty
    const [assetCount, licenseCount, developerCount] = await Promise.all([
      AssetModel.countDocuments(),
      LicenseModel.countDocuments(),
      DeveloperModel.countDocuments(),
    ]);

    // If any of the collections are not empty, don't create new data
    if (assetCount > 0 || licenseCount > 0 || developerCount > 0) {
      console.log('Collections are not empty. Skipping data creation.');
      return;
    }

    // Create some assets
    const assets: IAsset[] = [
      new AssetModel({
        brand: 'Dell',
        model: 'Latitude E7470',
        type: 'laptop',
      }),
      new AssetModel({ brand: 'Logitech', model: 'K120', type: 'keyboard' }),
      new AssetModel({ brand: 'Logitech', model: 'M100', type: 'mouse' }),
      new AssetModel({ brand: 'Logitech', model: 'H111', type: 'headset' }),
      new AssetModel({ brand: 'Dell', model: 'P2217H', type: 'monitor' }),
    ];

    // Create some licenses
    const licenses: ILicense[] = [
      new LicenseModel({ software: 'Visual Studio Code' }),
      new LicenseModel({ software: 'WebStorm' }),
      new LicenseModel({ software: 'Adobe Photoshop' }),
      new LicenseModel({ software: 'Microsoft Office' }),
      new LicenseModel({ software: 'Windows 10 Pro' }),
    ];

    // Create some developers
    const developers: IDeveloper[] = [
      new DeveloperModel({ fullname: 'John Doe', active: true }),
      new DeveloperModel({ fullname: 'Jane Doe', active: false }),
    ];

    // Save the assets, licenses, and developers
    try {
      await Promise.all([
        ...assets.map((asset: IAsset) => asset.save()),
        ...licenses.map((license: ILicense) => license.save()),
        ...developers.map((developer: IDeveloper) => developer.save()),
      ]);
      console.log(
        `Created ${
          assets.length + licenses.length + developers.length
        } documents in the database.`
      );
    } catch (error) {
      console.error('Error populating the database:', error);
    }

    // Associate assets and licenses with developers
    const [john, jane] = await DeveloperModel.find();
    john.assets = [assets[0].id, assets[2].id, assets[3].id];
    john.licenses = [licenses[0].id, licenses[3].id];
    jane.assets = [assets[1].id, assets[4].id];
    jane.licenses = [licenses[1].id];
    try {
      await Promise.all([john.save(), jane.save()]);
      console.log('Associated documents in the database.');
    } catch (error) {
      console.error('Error updating the documents:', error);
    }
  }
}
