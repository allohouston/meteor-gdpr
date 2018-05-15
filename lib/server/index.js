import { Meteor } from "meteor/meteor";
import '../methods.js';

Meteor.users.deny({
    insert () { return true; },
    update () { return true; },
    remove () { return true; },
});

Meteor.publish("User.GDPR", function () {
    //console.log("publish");
    return Meteor.users.find({_id: this.userId}, {fields: {'gdpr': 1}});
});
