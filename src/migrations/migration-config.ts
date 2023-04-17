/**
 * Can be executed multiple times: SI
 */

import Config from "../models/config";

const init = async (): Promise<{ success: boolean, errorMessage?: string }> => {
    try {
        const count = await Config.countDocuments({});

        if (!count) {
            //Generate config register
            const newConfig = new Config({
                logger: {
                    enabled: true,
                    level: 'info'
                },
            });
            await newConfig.save();
            return {
                success: true
            };
        } else {
            //Do nothing
            return {
                success: true
            };
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: 'Error on generate config register on database'
        };
    }
};

export default {
    init
};