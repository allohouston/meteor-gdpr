import {Meteor} from "meteor/meteor";
import {Mixins} from '../mixins';
import {GDPR} from './index';
import '../user/index';

GDPR.Request.Methods = {
    insertData: function (type, message) {
        return {type: type, message: message};
    },
    insert: new ValidatedMethod({
        name: 'GDPR.Request.insert',
        validate: GDPR.Request.Schemas.Insert.validator(),
        mixins: [Mixins.isLoggedIn],
        run(data) {
            data.date = new Date();
            data.requesterEmail = GDPR.User.getEmail();
            GDPR.Request.Coll.insert(data);
        }
    })
};

export {GDPR};