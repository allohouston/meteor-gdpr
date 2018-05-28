//File name = contactForm
import {GDPR} from '../../../api/user/methods';


// Import html and less files
import './contactForm.html';
import './contactForm.less';


function getFormSetting(lg, field) {
    return geti18nSetting('contactForm', lg, field);
}

Template.ContactForm.events({
    'submit form': function (event, template) {
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


Template.ContactForm.helpers({
    getEmailLabel: function () {
        return getFormSetting(GDPRconfig.language, 'email');
    },
    getEmail: function () {
        return GDPR.User.getEmail();
    },
    getRequestTypes: function () {
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
    getSubject: function () {
        return getFormSetting(GDPRconfig.language, 'subject');
    },
    getComment: function () {
        return getFormSetting(GDPRconfig.language, 'comment');
    },
    getValidationBtn: function () {
        return getFormSetting(GDPRconfig.language, 'validationBtn');
    }
});


Template.ContactForm.onRendered(function () {
    var self = Template.instance();
});


Template.ContactForm.onCreated(function () {
    var self = Template.instance();


});

Template.ContactForm.onDestroyed(function () {

});