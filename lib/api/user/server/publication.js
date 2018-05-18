import { Meteor } from "meteor/meteor";
import { GDPR } from '../methods.js';

Meteor.publish(GDPR.User.PubNames.userGDPR, function () {
    return Meteor.users.find({_id: this.userId}, {
        fields: {'gdpr': 1}
    });
});
