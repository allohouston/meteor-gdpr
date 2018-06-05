import moment from "moment";
import "./profileWindow.html";
import "./profileWindow.less";
import "./profileWindowMobile.less";


Template.ProfileWindow.events({
    'click #ProfileWindow': function (event, template) {
        if ($(event.target).parents(".profileWindowContainer").length > 0 || $(event.target).hasClass("profileWindowContainer")) {
            // do not close if clicked inside the container
            return;
        }
        GDPR.showProfileWindow.set(false);

    },
    'click .js-showContact'(event, template) {
        GDPR.showContactWindow.set(true);
        GDPR.showProfileWindow.set(false);
    },
    'click .js-logout': function (event, template) {
        GDPR.logout();
    },
});


Template.ProfileWindow.helpers({
    userName: function () {
        return `${GDPR.User.getFirstName()} ${GDPR.User.getLastName()}`;
    },
    getLastConnection() {
        return moment(GDPR.User.getLastLogin()).format(getI18nText("profileWindow", "lastConnectionMomentFormat"));
    },
});

Template.ProfileWindow.onRendered(function () {
});

Template.ProfileWindow.onCreated(function () {
});

Template.ProfileWindow.onDestroyed(function () {
});