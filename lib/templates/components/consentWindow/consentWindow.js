import "./consentWindow.html";
import "./consentWindow.less";

let isConsentNeeded = function () {
    const user = Meteor.user();
    if (!user) {
        return false;
    }
    if (user.gdpr) {
        return user.gdpr.consentGranted !== true;
    }
    return true;
};


Template.ConsentWindow.events({
    'submit form': function (event, template) {
        event.preventDefault();

        GDPR.User.Methods.setConsent.call(function (error, result) {
            if (error) {
                console.error(error);
                Bert.alert({
                    title: error.message,
                    message: "",
                    type: 'danger',
                    style: 'growl-top-right',
                });
            }
            hideConsent();
        });
    }
});

Template.ConsentWindow.helpers({});

Template.ConsentWindow.onRendered(function () {
    Meteor.setTimeout(function () {
        if (isConsentNeeded()) {
            showConsent();
        }
    }, 0);
});

Template.ConsentWindow.onCreated(function () {
});

Template.ConsentWindow.onDestroyed(function () {
});