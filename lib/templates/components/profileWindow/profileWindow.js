import moment from 'moment';
import {Template} from 'meteor/templating';
import {GDPR} from '../../../api/user/methods';
import '../../modal.js';
import '../../utils.js';
import './profileWindow.html';



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
});

Template.ProfileWindow.onCreated(function () {
    this.showForm = new ReactiveVar(false);
});


