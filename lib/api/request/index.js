import SimpleSchema from 'simpl-schema';
import {Meteor} from "meteor/meteor";
import "../index";

function getAllowedValues() {
    return ["access", "change", "delete"];
}

const schema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: getAllowedValues()
    },
    message: {type: String}
});

GDPR.Request = {
    Schemas: {
        Send: schema,
    },
    PubNames: {},
    getAllowedValues() {
        return getAllowedValues();
    }
};

