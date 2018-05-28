//File name = contactForm
import {GDPR} from '../../../api/user/methods';


// Import html and less files
import './contactForm.html';
import './contactForm.less';


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
    getEmail: function () {
        return GDPR.User.getEmail();
    },
    getRequestTypes: function () {
        let arr = [];
        GDPR.Request.getAllowedValues().forEach(function (enumValue) {
            arr.push(
                {
                    value: enumValue,
                    label: getI18nText("contactForm", enumValue.toLowerCase()),
                });
        });
        return arr;
    },
});


Template.ContactForm.onRendered(function () {
    var self = Template.instance();
});


Template.ContactForm.onCreated(function () {
    var self = Template.instance();


});

Template.ContactForm.onDestroyed(function () {

});