var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('the + function', function(){
	it('sums numbers', function(){
		var result = 2+2;
		expect(result).to.equal(4);
	});
});

describe('the settimeout function', function(){
	it('delays N ms', function(done){
		var start = new Date();
		setTimeout(function(){
			var timeElapsed = new Date() - start;
			expect(timeElapsed).to.be.within(800,1200);
			done();
		}, 1000);
	});
});

describe('the forEach function', function(){
	it('calls a function on each element in an array', function(){
		var add1 = function(num){
			return num+1;
		};
		var spiedAdd1 = chai.spy(add1);
		var numArray = [0,1,2,3,4];
		numArray.forEach(spiedAdd1);
		expect(spiedAdd1).to.have.been.called.exactly(numArray.length);
	});
});