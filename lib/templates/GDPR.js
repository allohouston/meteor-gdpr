import { Template } from 'meteor/templating';
import { GDPR } from '../api/user/methods';
import '../api/request/index';

import './modal';
import './components/ConsentWindow';
import './components/ProfileWindow';
import './GDPR.html';

Template.GDPR.onCreated(function () {
    this.subscribe(GDPR.User.PubNames.userGDPR);
    initModal();
});

Template.GDPR.helpers({
    getProfileLinkText() {
        return `${GDPR.User.getPicture()} ${GDPR.User.getFirstname()} ${GDPR.User.getLastname()}`;
    }
});

Template.GDPR.events({
    'click .js-profileAccess'(event, template) {
        showProfile();
    }
});
