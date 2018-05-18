import { Meteor } from "meteor/meteor";
import { RestrictMixin } from "meteor/ziarno:restrict-mixin";

export const Mixins = {
    isLoggedIn: RestrictMixin.createMixin({
        condition: function (args) {
            return !Meteor.userId();
        },
        error: function (args) {
            return new Meteor.Error("403", `${this.name}.unauthorized : you must be logged in`);
        }
    })
};