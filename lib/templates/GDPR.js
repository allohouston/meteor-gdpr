import {Template} from 'meteor/templating';
import {GDPR} from '../api/user/methods';
import '../api/request/index.js';

import './modal.js';
import './components/consentWindow/consentWindow.js';
import './components/profileWindow/profileWindow.js';
import './components/contactForm/contactForm.js';
import './GDPR.html';

import './helpers.js';


Template.GDPR.events({
    'click .js-profileAccess': function (event, template) {
        showProfile();
    }
});


Template.GDPR.helpers({
    getProfileLinkText: function () {
        return `${GDPR.User.getPicture()} ${GDPR.User.getFirstName()} ${GDPR.User.getLastName()}`;
    }
});


Template.GDPR.onCreated(function () {
    this.subscribe(GDPR.User.PubNames.userGDPR);
    initModal();
});
