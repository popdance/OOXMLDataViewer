chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('app.html', {
		'bounds': {
			'width': Math.round(window.screen.availWidth*0.9),
            'height': Math.round(window.screen.availHeight*0.9)
		},
		resizable:true
	});
});
