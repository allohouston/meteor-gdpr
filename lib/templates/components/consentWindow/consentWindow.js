import DevUtils from '@jkhong/devutils';
import {Template} from 'meteor/templating';
import {GDPR} from '../../../api/user/methods';
import '../../modal.js';
import '../../utils.js';
import './consentWindow.html';

function isConsentNeeded() {
    const user = Meteor.user();
    if (DevUtils.isNotSet(user)) {
        return false;
    }

    if (DevUtils.isSet(user.gdpr)) {
        GDPR.User.Schemas.Main.validate(user.gdpr);
        return !user.gdpr.consentGranted;
    }
    return true;
}

function getSetting(lg, field) {
    return geti18nSetting('consentWindow', lg, field);
}

Template.ConsentWindow.events({
    'submit form': function (event, template) {
        event.preventDefault();

        GDPR.User.Methods.setConsent.call((err, res) => {
            if (err) {
                // TODO manage action to take
            }
            hideConsent();
        });
    }
});

Template.ConsentWindow.helpers({
    getTitle: function () {
        return getSetting(GDPRconfig.language, 'title');
    },
    getContent: function () {
        return getSetting(GDPRconfig.language, 'content');
    },
    getConfirmationBox: function () {
        return getSetting(GDPRconfig.language, 'confirmationBox');
    },
    getValidationBtn: function () {
        return getSetting(GDPRconfig.language, 'validationBtn');
    }
});


Template.ConsentWindow.onRendered(function () {
    Meteor.setTimeout(function () {
        if (isConsentNeeded()) {
            showConsent();
        }
    }, 0);
});