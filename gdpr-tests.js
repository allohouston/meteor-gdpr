// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by gdpr.js.
import { name as packageName } from "meteor/yellowsquare:gdpr";

// Write your tests here!
// Here is an example.
Tinytest.add('gdpr - example', function (test) {
    test.equal(packageName, "gdpr");
});

describe('User consent', function () {
    it('should display use consent requirement if the user has not already consented to', function () {
    });
    it('should display use consent requirement with specific rights if the user has not already consented to and has a special role', function () {
    });
    it('should ask to tick the box on user consent validation', function () {
    });
    it('should register user consent on validation', function () {
    });
});
describe('User data access', function () {
    it('', function () {
    });
});