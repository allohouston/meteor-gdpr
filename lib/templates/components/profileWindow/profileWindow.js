import moment from 'moment';
import {Template} from 'meteor/templating';
import {GDPR} from '../../../api/user/methods';
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
        template.showForm.set(true);
    },
});


Template.ProfileWindow.helpers({
    userName: function () {
        return `${GDPR.User.getFirstName()} ${GDPR.User.getLastName()}`;
    },
    showContactForm() {
        return Template.instance().showForm.get();
    },
    getLastConnection() {
        return moment(GDPR.User.getLastLogin()).format(getI18nText("profileWindow", "lastConnectionMomentFormat"));
    },
});

Template.ProfileWindow.onCreated(function () {
    this.showForm = new ReactiveVar(false);

});


