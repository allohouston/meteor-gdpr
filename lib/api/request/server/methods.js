import {Meteor} from "meteor/meteor";
import {Mixins} from '../mixins';
import {GDPR} from './index';
import '../user/index';

GDPR.Request.Methods = {
    sendRequest: new ValidatedMethod({
        name: 'GDPR.Request.send',
        validate: GDPR.Request.Schemas.Send.validator(),
        mixins: [Mixins.isLoggedIn],
        run(data) {
            data.date = new Date();
            data.requesterEmail = GDPR.User.getEmail();
            // send email asking for a request
        }
    })
};

export {GDPR};