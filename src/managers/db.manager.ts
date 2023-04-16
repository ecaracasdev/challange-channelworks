import mongoose from 'mongoose';

export default class DBManager {
  static async connect(): Promise<void> {
    try {
      const mongoAtlasUri = "mongodb://localhost:27017/eliasapi"
      await mongoose.connect(mongoAtlasUri, {});
      console.log('Connected to MongoDB')
    } catch (err) {
      console.log('Error on MongoDB connection', err);
      throw 'Error on connecting DB';
    }
  }
}
