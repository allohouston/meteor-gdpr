import DevUtils from '@jkhong/devutils';
import { Template } from 'meteor/templating';
import { GDPR } from '../../api/user/methods';
import '../modal';
import '../utils';
import './ConsentWindow.html';

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

Template.ConsentWindow.helpers({
    check() {
        if (isConsentNeeded()) {
            showConsent();
        }
    },
    getTitle() {
        return getSetting(GDPRconfig.language, 'title');
    },
    getContent() {
        return getSetting(GDPRconfig.language, 'content');
    },
    getConfirmationBox() {
        return getSetting(GDPRconfig.language, 'confirmationBox');
    },
    getValidationBtn() {
        return getSetting(GDPRconfig.language, 'validationBtn');
    }
});

Template.ConsentWindow.events({
    'submit form'(event, template) {
        event.preventDefault();

        GDPR.User.Methods.setConsent.call((err, res) => {
            if (err) {
                // TODO manage action to take
            }
            hideConsent();
        });
    }
});