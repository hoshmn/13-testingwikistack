// TODO: model sync
var expect = require('chai').expect;
var models = require('../models/');
var Page = models.Page;
var User = models.User;

var CreatingPage = function(title, content, status) {
    return Page.create({
        title: title,
        content: content,
        status: status
    });
};

var TestContent = "TestContent";
var TestStatus = "open";

describe('Page model', function() {
    beforeEach('Sync tables', function(done) {
        Page.sync({force: true})
        .then(function() {
            return User.sync({force: true})
        })
        .then(function() {
            done();
        });
    });

    describe('urlTitle', function() {
        var Test1In = "asdfqwerty1230";
        var Test1Out = "asdfqwerty1230";
        var Test2In = "asdf  abc ab";
        var Test2Out = "asdf_abc_ab";
        var Test3In = "$#a_bc#$";
        var Test3Out = "a_bc";

        var testPage1 = CreatingPage(Test1In, TestContent, TestStatus);
        var testPage2 = CreatingPage(Test2In, TestContent, TestStatus);
        var testPage3 = CreatingPage(Test3In, TestContent, TestStatus);

        before(function(done) {
            Promise.all([
                testPage1,
                testPage2,
                testPage3
            ])
            .then(function(testPages) {
                testPage1 = testPages[0];
                testPage2 = testPages[1];
                testPage3 = testPages[2];
                done();
            });
        });

        it('Test1: urlTitle does not change alphanumeric characters.', function() {
            expect(testPage1.urlTitle).to.equal(Test1Out);
        });
        it('Test2: urlTitle replace multiple spaces with one underscore.', function() {
            expect(testPage2.urlTitle).to.equal(Test2Out);
        });
        it('Test3: urlTitle removes non-alphanumic characters.', function() {
            expect(testPage3.urlTitle).to.equal(Test3Out);
        });
    });

    describe('route', function() {
        var Test1In = "asdfqwerty1230";
        var Test1Out = "/wiki/asdfqwerty1230";
        var Test2In = "asdf  abc ab";
        var Test2Out = "/wiki/asdf_abc_ab";
        var Test3In = "$#a_bc#$";
        var Test3Out = "/wiki/a_bc";

        var testPage1 = CreatingPage(Test1In, TestContent, TestStatus);
        var testPage2 = CreatingPage(Test2In, TestContent, TestStatus);
        var testPage3 = CreatingPage(Test3In, TestContent, TestStatus);

        before(function(done) {
            Promise.all([
                testPage1,
                testPage2,
                testPage3
            ])
            .then(function(testPages) {
                testPage1 = testPages[0];
                testPage2 = testPages[1];
                testPage3 = testPages[2];
                done();
            });
        });

        it('Test1: route does not change alphanumeric characters and prepends /wiki/.', function() {
            expect(testPage1.route).to.equal(Test1Out);
        });
        it('Test2: route replace multiple spaces with one underscore and prepends /wiki/.', function() {
            expect(testPage2.route).to.equal(Test2Out);
        });
        it('Test3: route removes non-alphanumic characters and prepends /wiki/.', function() {
            expect(testPage3.route).to.equal(Test3Out);
        });
    });
});
