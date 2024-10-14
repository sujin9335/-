var searchService = searchService || {};
 
(function () {
 
    let mtUrl = 'https://119.196.108.134/'; //TO CHANGE
     
    var self = this;
    self.table = null;
 
    self.search = function(data){
        if ( !self.table ) {
            $('#sessionslist').show();
           self.table = $('#sessionslist').DataTable({
                "proccessing": true,
                "serverSide": true,
                bFilter: false,
                "language": {
                    "infoFiltered": ""
                },
                "ajax": {
                    url: mtUrl + '/sessions/ExternalSearch/',
                    type: 'POST',
                    "data": function ( d ) {
                    return $.extend( {}, d, {
                        "UserName": $('#username').val(),
                        "Ip": $('#ip').val(),
                        "From": $('#from').val(),
                        "To": $('#to').val()
                    })},
                    xhrFields: {
                        withCredentials: true
                    }
                },
                "language": {
                    "search": "",
                    "searchPlaceholder": "Search..."
                },
            "columns": [
                    { "data": "Id", "visible": false},
                    { "data": "UserName" },
                    { "data": "Ip" },
                    { "data": "LoginDate",
                    "render": function (data, type, row, meta) {
						console.log(data)
                        if (data === null) return "";
                        return '<a href="'+mtUrl+'/player?id='+row.Id+'&mode=0" target="_blank">'+moment(data).format('DD/MM/YYYY hh:mm:ss')+'</a>';
                    } }
                ]
            });
    }
    else{
        self.table.ajax.reload();
    }
    }
 
    return self;
 
}).apply(searchService);