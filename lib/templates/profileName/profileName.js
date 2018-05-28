import {Template} from 'meteor/templating';
import {GDPR} from '../../api/user/methods';
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
        showProfile();
    }
});


Template.ProfileName.helpers({
    firstName: function () {
        return GDPR.User.getFirstName();
    },
    lastName : function () {
        return GDPR.User.getLastName();
    },
    picture : function () {
        return GDPR.User.getPicture();
    },
});


Template.ProfileName.onCreated(function () {
    this.subscribe(GDPR.User.PubNames.userGDPR);
    initModal();
});
