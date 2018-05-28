import moment from 'moment';
import {Template} from 'meteor/templating';
import {GDPR} from '../../../api/user/methods';
import '../../../api/request/methods.js';
import '../../modal.js';
import '../../utils.js';
import './profileWindow.html';

Template.ProfileWindow.onCreated(function () {
    this.showForm = new ReactiveVar(false);
});
Template.ProfileWindow.events({
    'click .js-showContact'(event, template) {
        template.showForm.set(true);
    }
});

function getSetting(lg, field) {
    return geti18nSetting('profileWindow', lg, field);
}

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

function getFormSetting(lg, field) {
    return geti18nSetting('contactForm', lg, field);
}

Template.ContactForm.helpers({
    getEmailLabel() {
        return getFormSetting(GDPRconfig.language, 'email');
    },
    getEmail() {
        return GDPR.User.getEmail();
    },
    getRequestTypes() {
        let arr = [];
        GDPR.Request.getAllowedValues().forEach(function (enumValue) {
            arr.push(
                {
                    value: enumValue,
                    label: getFormSetting(GDPRconfig.language, enumValue.toLowerCase())
                });
        });
        return arr;
    },
    getSubject() {
        return getFormSetting(GDPRconfig.language, 'subject');
    },
    getComment() {
        return getFormSetting(GDPRconfig.language, 'comment');
    },
    getValidationBtn() {
        return getFormSetting(GDPRconfig.language, 'validationBtn');
    }
});

Template.ContactForm.events({
    'submit form'(event, template) {
        event.preventDefault();

        const data = GDPR.Request.Methods.insertData(event.target.object.value, event.target.message.value);
        GDPR.Request.Methods.insert.call(data, function (err, res) {
            if (err) {
                // TODO manage action to take (user msg of err)
            }
            // TODO manage action to take (user msg of success)
        });
    }
});