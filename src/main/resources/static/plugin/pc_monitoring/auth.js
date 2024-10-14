var authTokenService = authTokenService || {};
 
 
(function () {
 
    const mtUrl = 'https://119.196.108.134/Ekransystem'; //TO CHANGE
 
    var self = this;
 
    self.authenticate = function(token){
        return $.ajax( mtUrl + '/Account/ExternalLogin/', {
            method: 'POST',
            headers: {           
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              xhrFields: {
                withCredentials: true
            },
            data: 'token=' + '475d5e44-6373-4cd6-9ae5-a9f019f98a9c'
        });
    }
 
    return self;
}).apply(authTokenService);