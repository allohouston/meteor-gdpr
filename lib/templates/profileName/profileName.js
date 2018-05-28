import {Template} from 'meteor/templating';
import '../../api/index.js';
import '../../api/request/index.js';

import './profileName.html';
import './profileName.less';

import '../modal.js';
import '../helpers.js';

// components
import '../components/consentWindow/consentWindow.js';
import '../components/profileWindow/profileWindow.js';
import '../components/contactForm/contactForm.js';


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
});


Template.ProfileName.onCreated(function () {
    console.log(GDPR)
    this.subscribe(GDPR.User.PubNames.userGDPR);

    GDPR.showProfileWindow = new ReactiveVar(false);
});
