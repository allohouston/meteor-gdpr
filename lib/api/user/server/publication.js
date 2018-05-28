import {Meteor} from "meteor/meteor";
import {GDPR} from '../methods.js';

Meteor.publish(GDPR.User.PubNames.userGDPR, function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId}, {
            fields: {'gdpr': 1}
        });
    }
    return this.ready();
});
