import {Meteor} from "meteor/meteor";
import {Email} from 'meteor/email'

import {Mixins} from '../../mixins.js';
import '../index.js';

import '../../user/index.js';

GDPR.Request.Methods = {
    sendRequest: new ValidatedMethod({
        name: 'GDPR.Request.send',
        validate: GDPR.Request.Schemas.Send.validator(),
        mixins: [Mixins.isLoggedIn],
        run(data) {
            data.requesterEmail = GDPR.User.getEmail();
            // send email asking for a request
            Email.send({
                from: GDPR.serverConfig.emailSender,
                to: GDPR.serverConfig.emailTo,
                cc: data.requesterEmail,
                replyTo: data.requesterEmail,
                subject: `GDPR contact about: ${data.type}`,
                text: data.message,
            });
        }
    })
};
