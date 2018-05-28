import {Template} from 'meteor/templating';
import {GDPR} from '../api/user/methods';
import '../api/request/index.js';

import './modal.js';
import './components/consentWindow/consentWindow.js';
import './components/profileWindow/profileWindow.js';
import './GDPR.html';


Template.GDPR.events({
    'click .js-profileAccess': function (event, template) {
        showProfile();
    }
});


Template.GDPR.helpers({
    getProfileLinkText: function () {
        return `${GDPR.User.getPicture()} ${GDPR.User.getFirstname()} ${GDPR.User.getLastname()}`;
    }
});


Template.GDPR.onCreated(function () {
    this.subscribe(GDPR.User.PubNames.userGDPR);
    initModal();
});
