import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Mixins} from '../mixins';
import moment from "moment";
import'./index';

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
            const userId = this.userId;
            const user = Meteor.users.findOne(userId);

            // make a rotation of dates because the Accounts.onLogin is called on each page view
            if (user.gdpr.newLoginDate) {
                updateField(this.userId, 'lastLogin', user.gdpr.newLoginDate);
            }
            updateField(this.userId, 'newLoginDate', moment.utc().toDate());
        }
    }),
    setConsent: new ValidatedMethod({
        name: 'GDPR.User.setConsent',
        validate() {
        },
        mixins: [Mixins.isLoggedIn],
        run() {
            updateField(this.userId, 'consentGranted', true);
            updateField(this.userId, 'consentGrantedDate', moment.utc().toDate());
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

            // fixed - issue #2 the onLogin function is called at each page view
            // we need a rotation of dates
            GDPR.User.Methods.setLastLogin.call();
        }
    }
});
