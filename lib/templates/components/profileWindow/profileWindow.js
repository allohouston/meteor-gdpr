import moment from 'moment';
import {Template} from 'meteor/templating';
import {GDPR} from '../../../api/user/methods';
import '../../../api/request/methods.js';
import '../../modal.js';
import '../../utils.js';
import './profileWindow.html';

import "../contactForm/contactForm.js";

function getSetting(lg, field) {
    return geti18nSetting('profileWindow', lg, field);
}


Template.ProfileWindow.events({
    'click .js-showContact'(event, template) {
        template.showForm.set(true);
    }
});


Template.ProfileWindow.helpers({
    showContactForm() {
        return Template.instance().showForm.get();
    },
    getLastConnection() {
        return moment(GDPR.User.getLastLogin()).format('Do MMMM YYYY, HH:mm:ss');
    },
    getTitle() {
        return getSetting(GDPRconfig.language, 'title');
    },
    getYourLastConnection() {
        return getSetting(GDPRconfig.language, 'lastConnection');
    },
    getContactBtn() {
        return getSetting(GDPRconfig.language, 'contactBtn');
    },
    getCloseBtn() {
        return getSetting(GDPRconfig.language, 'closeBtn');
    }
});

Template.ProfileWindow.onCreated(function () {
    this.showForm = new ReactiveVar(false);
});


