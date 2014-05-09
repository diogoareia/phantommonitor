//Usage:phantomjs pagelisten.js <some URL>

var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length === 1) {
    console.log('Usage:phantomjs pagelisten.js <some URL>');
    phantom.exit();
}

address = system.args[1];

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function pageCheck(address){
	t = Date.now();
	var nowDate =  new Date();	
	console.log('Time: ' + nowDate.timeNow());
	
	page.open(address, function (status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			
			var title = page.evaluate(function() {
				return document.title;
			});

			console.log('Page Header: ' + title);
			
			var pagesize = page.content.length;
			console.log('Size: ' + pagesize);
			
			
			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec');
		}
		
		//phantom.exit();
		
	});
}

pageCheck(address);

setInterval(function(){
	pageCheck(address);
}, 300000);
