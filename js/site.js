$(function() {

    // global var
	var _url = window.location.href;

    // loading跳轉
	if(_url.indexOf("loading.html") >= 0) {
		setTimeout(function () {
			window.location = 'lottery.html';
		}, 3000);
	}
    
});