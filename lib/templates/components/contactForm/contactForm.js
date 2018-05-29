import "./contactForm.html";
import "./contactForm.less";


Template.ContactForm.events({
    'submit form': function (event, template) {
        event.preventDefault();

        var data = {
            type: $('#Object').val(),
            message: $('#Message').val(),
        };
        Meteor.call("GDPR.Request.send", data, function (error, result) {
            if (error) {
                console.error(error);
                Bert.alert({
                    title: error.message,
                    message: "",
                    type: 'danger',
                    style: 'growl-top-right',
                });
            } else {
                hideContactForm();

                // reset the form
                $('#Object').val("");
                $('#Message').val("");

                Bert.alert({
                    title: "Email sent",
                    type: 'success',
                    style: 'growl-top-right',
                });
            }
        });
    }
});


Template.ContactForm.helpers({
    getEmail: function () {
        return GDPR.User.getEmail();
    },
    getRequestTypes: function () {
        let arr = [];
        GDPR.Request.getAllowedValues().forEach(function (value) {
            arr.push(
                {
                    value: value,
                    label: getI18nText("contactForm", value),
                });
        });
        return arr;
    },
});


Template.ContactForm.onRendered(function () {
});

Template.ContactForm.onCreated(function () {
});

Template.ContactForm.onDestroyed(function () {
});