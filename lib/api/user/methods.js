import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Mixins} from '../mixins';
import {GDPR} from './index';

function updateField(fieldName, fieldValue) {
    let set = {};
    set[`gdpr.${fieldName}`] = fieldValue;
    Meteor.users.update(Meteor.userId(), {$set: set});
}

GDPR.User.Methods = {
    initGDPR: new ValidatedMethod({
        name: 'GDPR.User.initGDPR',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            Meteor.users.update(Meteor.userId(), {$set: {'gdpr': GDPR.User.createGDPR()}});
        }
    }),
    setLastLogin: new ValidatedMethod({
        name: 'GDPR.User.setLastLogin',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            updateField('lastLogin', new Date());
        }
    }),
    setConsent: new ValidatedMethod({
        name: 'GDPR.User.setConsent',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            updateField('consentGranted', true);
        }
    })
};

Accounts.onLogin(function () {
    if (Meteor.isServer) {
        if (typeof Meteor.user().gdpr === "undefined") {
            // first login
            GDPR.User.Methods.initGDPR.call();
        }
        else {
            GDPR.User.Methods.setLastLogin.call();
        }
    }
});

export {GDPR};