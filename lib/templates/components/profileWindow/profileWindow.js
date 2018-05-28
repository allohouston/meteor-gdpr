import moment from 'moment';
import {Template} from 'meteor/templating';
import '../../../api/index.js';
import '../../modal.js';
import '../../utils.js';
import './profileWindow.html';
import './profileWindow.less';


Template.ProfileWindow.events({
    'click #ProfileWindow': function (event, template) {
        if ($(event.target).parents(".profileWindowContainer").length > 0 || $(event.target).hasClass("profileWindowContainer")) {
            // do not close if clicked inside the container
            return false;
        }
        GDPR.showProfileWindow.set(false);

    },
    'click .js-showContact'(event, template) {
        $('#ContactForm').modal("show");
        // to avoid a blink with the grey background
        Meteor.setTimeout(function () {
            GDPR.showProfileWindow.set(false);
        }, 100)
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

Template.ProfileWindow.onCreated(function () {

});


