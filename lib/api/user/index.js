import DevUtils from '@jkhong/devutils';
import SimpleSchema from 'simpl-schema';
import DevError from '../../errors/DevError';
import {Meteor} from "meteor/meteor";
import {GDPR} from "../index";

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
    const defVal = null;
    let ret = Meteor.user();

    const userField = DevUtils.getField(GDPRconfig.user, userFieldName, defVal);
    if (defVal === userField) {
        throw new DevError('GDPRconfig > user', `settings.user.${userFieldName} is missing`);
    }

    let fieldsFallback = "";
    userField.split('.').forEach(field => {
        fieldsFallback += field;
        ret = DevUtils.getField(ret, field, defVal);
        if (defVal === ret) {
            throw new DevError('Users collection', `${fieldsFallback} is missing from current record`);
        }
        fieldsFallback += '.';
    });
    return ret;
}

GDPR.User = {
    Schemas: {
        Main: new SimpleSchema({
            lastLogin: {type: Date},
            consentGranted: {type: Boolean}
        })
    },
    PubNames: {
        userGDPR: "YS.GDPR.User"
    },
    getLastLogin() {
        if (Meteor.user() && Meteor.user().gdpr) {
            return Meteor.user().gdpr.lastLogin;
        }
    },
    createGDPR() {
        return {
            lastLogin: new Date(),
            consentGranted: false
        };
    },
    getEmail() {
        return Meteor.user().emails[0].address;
    },
    getFirstname() {
        return getUserValue('firstname');
    },
    getLastname() {
        return getUserValue('lastname');
    },
    getPicture() {
        return getUserValue('picture');
    }
};

export {GDPR};