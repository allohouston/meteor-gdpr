import "./consentWindow.html";
import "./consentWindow.less";
import "./consentWindowMobile.less";

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
            GDPR.showConsentWindow.set(false);
            GDPR.afterGivingConsent();
        });
    }
});

Template.ConsentWindow.helpers({});

Template.ConsentWindow.onRendered(function () {
});

Template.ConsentWindow.onCreated(function () {
});

Template.ConsentWindow.onDestroyed(function () {
});