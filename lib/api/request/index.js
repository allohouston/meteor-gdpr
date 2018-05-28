import SimpleSchema from 'simpl-schema';
import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {GDPR} from "../index";

function getAllowedValues() {
    return ["CHANGE", "ACCESS", "DELETE"];
}

const schema = new SimpleSchema({
    date: {type: Date},
    requesterEmail: {type: SimpleSchema.RegEx.Email},
    type: {
        type: String,
        allowedValues: getAllowedValues()
    },
    message: {type: String}
});

GDPR.Request = {
    Schemas: {
        Main: schema,
        Insert: schema.pick('type', 'message')
    },
    Coll: new Mongo.Collection(GDPR.getCollectionPrefix() + 'request'),
    PubNames: {},
    getAllowedValues() {
        return getAllowedValues();
    }
};

GDPR.Request.Coll.attachSchema(GDPR.Request.Schemas.Main);

GDPR.Request.Coll.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

export {GDPR};