	var mtUrl = "https://5.31/EkranSystem";
	var token = "2168415b-477b-451c-ae75-58fa5cd4ad05";
	
	function authenticate() {
		return $.ajax({
			url: mtUrl +'/Account/ExternalLogin',
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			xhrFields: {
				withCredentials: true
			},
			data: 'token=' + token
		});
	}
	
	function getSessions(ip, from, to)
	{
		return $.ajax({
			url: mtUrl + '/Sessions/ExternalSearch',
			type: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			xhrFields: {
				withCredentials: true
			},
			data: {
				Ip: ip,
				From: from,
				To: to
			}
		});
	}

	function getNearestSession(ip, timestamp) {
		var time = moment(timestamp);
		var from = time.format("YYYY-MM-DD");
		var to = time.add(1, 'd').format("YYYY-MM-DD");
		
		return getSessions(ip, from, to)
			.then(function (data) {
				if (data.data.length === 0) {
					return null;
				}

				var sessions = data.data.map(function (x) { return Object.assign({}, x, { LoginDate: moment(x.LoginDate), LogoutDate: moment(x.LogoutDate) }) });
				var exactMatch = sessions.filter(function (x) { return x.LoginDate >= time && x.LogoutDate <= time; })

				if (exactMatch.length === 1) {
					return exactMatch[0];
				}

				var sessionsSortedByTimeDiffs = sessions
					.map(function (x) {
						return {
							diff: Math.min(Math.abs(time.diff(x.LoginDate)), Math.abs(time.diff(x.LogoutDate))),
							session: x
						}
					})
					.sort(function (a, b) { return (a.diff - b.diff); });

				return sessionsSortedByTimeDiffs[0];
			});
	}
	
	function playSession(id, time) {
		window.open(`${mtUrl}/Player?sessionId=${id}&time=${time}`);
	}
	