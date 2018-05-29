import "./contactWindow.html";
import "./contactWindow.less";


Template.ContactWindow.events({
    'click #ContactWindow': function (event, template) {
        if ($(event.target).parents(".contactWindowContainer").length > 0 || $(event.target).hasClass("contactWindowContainer")) {
            // do not close if clicked inside the container
            return;
        }
        GDPR.showContactWindow.set(false);

    },
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
                GDPR.showContactWindow.set(false);

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


Template.ContactWindow.helpers({
    getEmail: function () {
        return GDPR.User.getEmail();
    },
    getRequestTypes: function () {
        let arr = [];
        GDPR.Request.getAllowedValues().forEach(function (value) {
            arr.push(
                {
                    value: value,
                    label: getI18nText("contactWindow", value),
                });
        });
        return arr;
    },
});


Template.ContactWindow.onRendered(function () {
});

Template.ContactWindow.onCreated(function () {
});

Template.ContactWindow.onDestroyed(function () {
});