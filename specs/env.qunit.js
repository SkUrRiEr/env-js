if(!QUnit){
	QUnit = require('specs/qunit').QUnit;
	quit = require('specs/qunit').quit;
}
		
var _count = 1,
    _starttime = new Date().getTime(),
    _endtime,
    _start = QUnit.start,
    _module,
    _test;
//we are breaking becuase our inheritence pattern causes infinite
//recursion somewhere in jsDump;
QUnit.jsDump = {
    parse: function(thing){
        return thing+"";
    }
};
QUnit.moduleStart = function(name, testEnvironment) {
    _module = name;
};
QUnit.testStart = function(name) {
    _test = name;
};
QUnit.log = function(result, message){
    if(console)console.log('['+((!!result)?'PASS':'FAIL')+']('+ 
        (_count++)+'){'+_module+'|'+_test+'} '+message);
};
QUnit.done = function( fail, pass){
    if(console){
        _endtime = new Date().getTime();

		try{ 
		console.log('\n\tPLATFORM: %s', navigator.userAgent); 
		}catch(e){}
        console.log('\t\tRESULTS: ( of '+(pass+fail)+' total tests )');
        console.log('\t\tPASSED: ' +pass);
        console.log('\t\tFAILED: ' +fail);
        console.log('\tCompleted in '+(_endtime-_starttime)+' milliseconds.\n');
		console.log('\n');
    }
    /*if (fail > 0)
        quit(42);*/
};
QUnit.start = function(){
    _start();
}
