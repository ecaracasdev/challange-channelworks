import { Schema, model } from 'mongoose';

// Type Definition

export type TYPE_CONFIG = {
    _id?: string;
    logger: {
        enabled: boolean;
        level?: string;
        modules: Array<{
            name: string;
        }>;
    };
};

// End Type
let configSchema: Schema = new Schema({
    logger: {
        enabled: Boolean,
        level: String,
        modules: [{
            name: {
                type: String
            }
        }]
    }
}, {
    versionKey: false,
    collection: 'config'
});

export default model('Config', configSchema);