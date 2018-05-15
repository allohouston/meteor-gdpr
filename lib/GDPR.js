import DevUtils from '@jkhong/devutils';
import SimpleSchema from 'simpl-schema';
import * as Methods from './methods.js';

const GDPR = {
    Schema: new SimpleSchema({
        consentGranted: {type: Boolean}
    }),

    isConsentNeeded () {
        const user = Meteor.user();
        if (DevUtils.isNotSet(user)) {
            //console.error("please don't call GDPR.isConsentNeeded if the user is not logged");
            return false;
        }

        if (DevUtils.isSet(user.gdpr)) {
            //console.log(user.gdpr);
            this.Schema.validate(user.gdpr);
            return !user.gdpr.consentGranted;
        }
        return true;
    },

    consentGranted () {
        Methods.setConsent.call((err, res) => {
            console.log(err);
            console.log(res);
        });
    }
};

export { GDPR };
