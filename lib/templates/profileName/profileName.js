import {Template} from 'meteor/templating';
import '../../api/index.js';
import '../../api/request/index.js';

import './profileName.html';
import './profileName.less';

import '../helpers.js';

// components
import '../components/consentWindow/consentWindow.js';
import '../components/profileWindow/profileWindow.js';
import '../components/contactWindow/contactWindow.js';


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
    showContactWindow: function () {
        return GDPR.showContactWindow.get();
    },
});


Template.ProfileName.onRendered(function () {
    var self = this;
    self.autorun(function () {
        // trigger
        self.subsready.get();
        // action
        Tracker.nonreactive(function () {
            Meteor.setTimeout(function () {
                if (isConsentNeeded()) {
                    GDPR.showConsentWindow.set(true);
                }
            }, 0);
        })
    })
});

Template.ProfileName.onCreated(function () {
    var self = this;
    self.subscribe(GDPR.User.PubNames.userGDPR);

    GDPR.showProfileWindow = new ReactiveVar(false);
    GDPR.showConsentWindow = new ReactiveVar(false);
    GDPR.showContactWindow = new ReactiveVar(false);

    self.subsready = new ReactiveVar(false);
    self.autorun(function () {
        if (self.subscriptionsReady()) {
            self.subsready.set(true);
        } else {
            self.subsready.set(false);
        }
    })

});

Template.ProfileName.onDestroyed(function () {
});
