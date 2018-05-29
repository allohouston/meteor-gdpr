import {Template} from 'meteor/templating';
import '../../../api/index.js';
import '../../modal.js';
import '../../utils.js';
import './consentWindow.html';
import './consentWindow.less';

function isConsentNeeded() {
    const user = Meteor.user();
    if (!user) {
        return false;
    }
    if (user.gdpr) {
        return user.gdpr.consentGranted !== true;
    }
    return true;
}


Template.ConsentWindow.events({
    'submit form': function (event, template) {
        event.preventDefault();

        GDPR.User.Methods.setConsent.call(function (err, res) {
            if (err) {
                // TODO manage action to take
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