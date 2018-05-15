import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from "meteor/meteor";

function createMixin (callback) {
    var myMixin = function (methodOptions) {
        const runFunc = methodOptions.run;
        methodOptions.run = function () {
            callback.call(this, ...arguments);
            return runFunc.call(this, ...arguments);
        };
        return methodOptions;
    };
    return myMixin;
}

isAuthenticated = createMixin(function () {
    if (!Meteor.userId()) {
        throw new Meteor.Error("unauthorized", "You must be logged in to access this method.");
    }
});

export const setConsent = new ValidatedMethod({
    name: 'GDPR.setConsent',
    validate () {},
    /*validate: new SimpleSchema({
        consentGranted: {type: Boolean}
    }).validator(),*/
    mixins: [isAuthenticated],
    run () {
        Meteor.users.update(Meteor.userId(), {$set: {'gdpr.consentGranted': true}});
    }
});