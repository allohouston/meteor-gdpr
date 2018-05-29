import {Template} from 'meteor/templating';
import '../../api/index.js';
import '../../api/request/index.js';

import './profileName.html';
import './profileName.less';

import '../helpers.js';

// components
import '../components/consentWindow/consentWindow.js';
import '../components/profileWindow/profileWindow.js';
import '../components/contactForm/contactForm.js';


let isConsentNeeded = function () {
    const user = Meteor.user();
    if (!user) {
        return false;
    }
    if (user.gdpr) {
        return user.gdpr.consentGranted !== true;
    }
    return true;
};

Template.ProfileName.events({
    'click .js-profileAccess': function (event, template) {
        GDPR.showProfileWindow.set(true);
    }
});


Template.ProfileName.helpers({
    firstName: function () {
        return GDPR.User.getFirstName();
    },
    lastName: function () {
        return GDPR.User.getLastName();
    },
    picture: function () {
        return GDPR.User.getPicture();
    },
    showProfileWindow: function () {
        return GDPR.showProfileWindow.get();
    },
    showConsentWindow: function () {
        return GDPR.showConsentWindow.get();
    },
    showContactForm: function () {
        return GDPR.showContactForm.get();
    },
});


Template.ProfileName.onRendered(function () {
    Meteor.setTimeout(function () {
        if (isConsentNeeded()) {
            GDPR.showConsentWindow.set(true);
        }
    }, 0);
});

Template.ProfileName.onCreated(function () {
    this.subscribe(GDPR.User.PubNames.userGDPR);

    GDPR.showProfileWindow = new ReactiveVar(false);
    GDPR.showConsentWindow = new ReactiveVar(false);
    GDPR.showContactForm = new ReactiveVar(false);
});

Template.ProfileName.onDestroyed(function () {
});
