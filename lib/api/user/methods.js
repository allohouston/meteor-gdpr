import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Mixins} from '../mixins';
import {GDPR} from './index';

function updateField(userId, fieldName, fieldValue) {
    let set = {};
    set[`gdpr.${fieldName}`] = fieldValue;
    Meteor.users.update(userId, {$set: set});
}

GDPR.User.Methods = {
    setLastLogin: new ValidatedMethod({
        name: 'GDPR.User.setLastLogin',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            updateField(this.userId, 'lastLogin', new Date());
        }
    }),
    setConsent: new ValidatedMethod({
        name: 'GDPR.User.setConsent',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            updateField(this.userId, 'consentGranted', true);
        }
    })
};

Accounts.onLogin(function () {
    if (Meteor.isServer) {
        const userId = Meteor.userId();
        var user = Meteor.users.findOne(userId);
        if (user && typeof user.gdpr === "undefined") {
            // first login
            Meteor.users.update(userId, {$set: {'gdpr': GDPR.User.createGDPR()}});
        }
        else {

            // FIXME the onLogin function is called at each page view. the last login date is hence not the good one
            GDPR.User.Methods.setLastLogin.call();
        }
    }
});

export {GDPR};