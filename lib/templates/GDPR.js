import { Template } from 'meteor/templating';
import { GDPR } from '../GDPR.js';
import './GDPR.html';

Template.GDPR.onCreated(function () {

    this.subscribe('User.GDPR');
});

Template.GDPR.helpers({
    showConsentWindow () {
        return GDPR.isConsentNeeded();
    }
});

Template.GDPR.events({
    'submit form' (event, template) {
        event.preventDefault();

        console.log(event);
        GDPR.consentGranted();
    }
});