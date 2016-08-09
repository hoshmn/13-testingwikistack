// TODO: model sync
var expect = require('chai').expect;
var models = require('../models/');
var Page = models.Page;
var User = models.User;

describe('Page model'), function() {
    var Test1In = "asdfqwerty1230";
    var Test1Out = "asdfqwerty1230";
    var Test2In = "asdf  abc ab";
    var Test2Out = "asdf_abc_ab";
    var Test3In = "$#a_bc#$";
    var Test3Out = "a_bc";

    before(function(done) {
        Page.create({
            title: Test1In,
            content: 'Test',
            status: 'Test',
            tags: 'Test, Test, Test'
        })
        .then(function(createdPage) {

        });
    });

    describe('urlTitle', function() {


        it('Test1: urlTitle does not change alphanumeric characters.');
        it('Test2: urlTitle replace multiple spaces with one underscore.');
        it('Test3: urlTitle removes non-alphanumic characters.');
        it('urlTitle only has alphanumeric characters.');
    });

    before()

    describe('urlTitle', function() {
        it('route returns a proper route.');
    });

    describe('urlTitle', function() {
        it('renderedContent re')
    });
}

describe()
