function setCookie(name, value, expires, path, domain, secure) {
    console.log('create a new cookie!!!');
    cookieStr = name + "=" + escape(value) + "; ";
	
	if(expires){
        if (expires === 'infinite') {
            cookieStr += "expires=Fri, 31 Dec 9999 23:59:59 GMT;";
        } else {
            expires = setExpires(expires);
		    cookieStr += "expires=" + expires + "; ";
        }
	}
	if(path){
		cookieStr += "path=" + path + "; ";
	}
	// if(domain){
	// 	cookieStr += "domain=" + domain + "; ";
	// }
	if(secure){
		cookieStr += "secure; ";
	}
	
	document.cookie = cookieStr;
}

function getCookie(cookieName){
	cName = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0] == cookieName){
			cName = unescape(NmeVal[1]);
		}
	}
	return cName;
}

/**
 * 
 * @param {number} period
 * @returns {String}
 */
function setExpires(period) {
    var today = new Date();
    var expr = new Date(today.getTime() + period * 24 * 60 * 60 * 1000);
    return expr.toGMTString();
}

function broofa() {
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

$(function() {
    console.log( "The DOM is now loaded and can be manipulated." );
    let userId = getCookie('userId');
    // console.log(`userid: ${userId}`);

    if (!userId) {
        setCookie('userId',broofa(), 'infinite', '/');
        userId = getCookie('userId');
    }

    const variant = getCookie('variant') || '';
    // save experiment data on Server
    $.ajax({
        type: "POST",
        url: '/api/expInfo',
        data: { userId: userId, variant: variant },
        success: function(req, res, data) {
            
            const result = data.responseJSON.data;
            // console.log(`result: ${JSON.stringify(result)}`);
            console.log('result: ' + JSON.stringify(result));
            if (variant === '') {
                console.log('set a new variant cookie!!!');
                setCookie('variant', result.variant, 'infinite', '/');
            }
            let ballColor = 'red-dot';
            if (getCookie('variant') === 'B') {
                ballColor = 'blue-dot';
            }
            $('#ballArea').empty();
            let html = '<span class="' + ballColor + '"></span>'
            
            $('#ballArea').append(html);
        }
    });
});