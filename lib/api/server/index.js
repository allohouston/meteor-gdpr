import '../index.js';
import SimpleSchema from 'simpl-schema';


configSchema = new SimpleSchema({
    emailSender: {type: String, regEx: SimpleSchema.RegEx.Email},
    emailTo: {type: String, regEx: SimpleSchema.RegEx.Email}
});

GDPR.addServerConfig = function (config) {
    try {
        configSchema.validate(config);
    }
    catch (e) {
        console.error('GDPR.addServerConfig()', e.message);
    }

    GDPR.serverConfig = config;
};

