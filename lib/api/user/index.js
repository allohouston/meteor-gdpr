import SimpleSchema from 'simpl-schema';
import {Meteor} from "meteor/meteor";
import "../index";
import moment from "moment";

Meteor.users.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

function getUserValue(userFieldName) {
    let ret = Meteor.user();
    const userField = GDPRconfig.user[userFieldName];
    if (!userField) {
        console.warn('GDPRconfig > user', `settings.user.${userFieldName} is missing`);
    }

    let fieldsFallback = "";
    var fields = userField.split(".");
    for (let index in fields) {
        let field = fields[index];
        fieldsFallback += field;
        ret = ret[field];
        if (!ret) {
            console.warn('Users collection', `${fieldsFallback} is missing from current record`);
            break;
        }
        fieldsFallback += '.';
    }
    return ret;
}

GDPR.User = {
    Schemas: {
        Main: new SimpleSchema({
            newLoginDate: {type: Date},
            lastLogin: {type: Date},
            consentGranted: {type: Boolean}
        })
    },
    PubNames: {
        userGDPR: "GDPR.MyUser"
    },
    getLastLogin() {
        if (Meteor.user() && Meteor.user().gdpr) {
            return Meteor.user().gdpr.lastLogin;
        }
    },
    createGDPR() {
        return {
            newLoginDate: moment.utc().toDate(),
            lastLogin: moment.utc().toDate(),
            consentGranted: false
        };
    },
    getEmail() {
        return getUserValue("email");
    },
    getFirstName() {
        return getUserValue('firstName');
    },
    getLastName() {
        return getUserValue('lastName');
    },
    getPicture() {
        return getUserValue('picture');
    }
};
