
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	jqXHR.error(r=>{
		if (r.responseText === "AUTH_ERROR") alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("w.no_auth"));
		else console.log(r);
	})
});

function windowOpen(...args){
   window.open(...args);  
}

function validChk(pObj, pMess, pCheckType, pFocus, pSLen, pELen){
	var rtn = true;
	
	if(pCheckType=="null"){
		if(pObj==null || pObj==""){
			rtn = false;
		}
	}else if(pCheckType=="length"){
		if(pSLen!=undefined && pELen!=undefined){
			if(!(pObj.length>pSLen && pObj.length<pELen)){
  				rtn = false;
  			}
		}else if(pSLen==undefined && pELen!=undefined){
			if(!(pObj.length<pELen && pObj.length>0)){
  				rtn = false;
  			}
		}else if(pSLen!=undefined && pELen==undefined){
			if(!(pObj.length>pSLen)){
  				rtn = false;
  			}
		}
	}
	
	if(!rtn){
		alertify.message('<i class="icon fa fa-warning"></i> '+pMess+'</i>');
	}
	
	if(!rtn){
		if(pFocus!=undefined && pFocus!=null && pFocus!=""){
			$("#"+pFocus).focus();
		}
	}
	return rtn;
}

/**
 *  자동 null, 공백 체크
 * @param {string|HTMLInputElement|HTMLTextAreaElement} pObj id 또는 노드 엘리먼트
 * @param {string | object} pMess 메시지 => string값일 경우 그대로 출력, Object => pMess.name 값이 있으면 체크 항목별 메시지 출력, 없으면 길이(pMess.length), 정규식(pMess.regex), 공백(pMess.null), 타입(pMess.type_[타입])에 따라 출력
 * @param {string|object} pCheckOpt sLen, eLen => 길이 체크 | regexp => 정규식 체크 | type => 타입 체크 (number) | null => 공백 체크
 * @returns 
 */
function validChk2(pObj, pMess,pCheckOpt){
	var rtn = true;
	let targetElem = null;
	if (typeof pObj === 'string') {
		targetElem = document.getElementById(pObj);
	}else{
		targetElem = pObj;
	}
	if (!targetElem instanceof HTMLInputElement && !targetElem instanceof HTMLTextAreaElement) {
		return;
	}

	let multiMess = false;
	//let mess = "입력값이 잘못되었습니다.";
	let mess = getMsgStr("comm.word_18");
	if (typeof pMess === 'string') mess = pMess;
	else if (typeof pMess === 'object' && pMess instanceof Object) multiMess = true;
	
	//정규식
	if (pCheckOpt.hasOwnProperty("regex")){
		if (!pCheckOpt.regex.test(targetElem.value)) {
			rtn = false;
			if (multiMess) mess = `${pMess.regex || ""} [${pMess.name || ""}]`;
		}
	}
	//길이
	if(pCheckOpt.hasOwnProperty("sLen") || pCheckOpt.hasOwnProperty("eLen")){
		const sLen = Number(pCheckOpt.sLen) || 0;
		const eLen = Number(pCheckOpt.eLen) || Number.MAX_SAFE_INTEGER;
		if(!(targetElem.value.length <= eLen && targetElem.value.length >= sLen)){
			rtn = false;
			if (multiMess){
				if (lang_set === 'ko') {
					mess = pMess.name ? `다음 항목은 ${sLen>=1 ? `최소 ${sLen}자 이상` : ''}${eLen < Number.MAX_SAFE_INTEGER ? ` 최대 ${eLen}자 이하` : ''} 입니다.[${pMess.name}]` : pMess.lengthMsg;
				}else{
					mess = pMess.name ? `[${pMess.name}] is  ${sLen>=1 ? `at least ${sLen} digits` : ''}${eLen < Number.MAX_SAFE_INTEGER ? ` and up to ${eLen} digits` : ''}.` : pMess.lengthMsg;
				}
			}
		}
		// if(sLen!=undefined && eLen!=undefined){
		// 	if(!(targetElem.value.length>sLen && targetElem.value.length<eLen)){
		// 		rtn = false;
		// 	}
		// }else if(sLen==undefined && eLen!=undefined){
		// 	if(!(targetElem.value.length<eLen && targetElem.value.length>0)){
		// 		rtn = false;
		// 	}
		// }else if(sLen!=undefined && eLen==undefined){
		// 	if(!(targetElem.value.length>sLen)){
		// 		rtn = false;
		// 	}
		// }
		
	}
	//타입
	if(pCheckOpt.hasOwnProperty("type") && targetElem.value !== ""){
		/** @type {string} */
		const type = pCheckOpt.type.toLowerCase().trim();
		if (type === 'number') {
			const rgx = /^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)\1*$/
			if (!rgx.test(targetElem.value)){
				rtn = false;
				if (multiMess){
					if (lang_set === 'ko') {
						mess = pMess.name ? `다음 항목은 숫자만 입력할 수 있습니다. [${pMess.name}]` : pMess.numberMsg;
					}else{
						mess = pMess.name ? `[${pMess.name}] is only number.` : pMess.numberMsg;
					}
				}
			}
		}
	}
	//공백
	if(pCheckOpt.hasOwnProperty("null") && !targetElem.value && targetElem.value !== 0){
		rtn = false;
		if (multiMess){
			if (lang_set === 'ko') {
				mess = pMess.name ? `다음 항목은 필수값입니다. [${pMess.name}]` : pMess.nullMsg;
			}else{
				mess = pMess.name ? `[${pMess.name}] is required.` : pMess.nullMsg;
			}
		}
	}
	
	if(!rtn){
		alertify.message('<i class="icon fa fa-warning"></i> '+mess+'</i>');
		targetElem.focus()
	}
	return rtn;
}

function nvl(str, def){
	if(str == null || str == undefined || str == ""){
		return def;
	}
	else{
		return str;
	}
}

// function windowOpen(url){
// 	window.open(url);
// }

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function dateFormat(str, len) {
	var rtn = "";
	
	if(str!="" && str!= null){
		if(len == 8) {
			rtn = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2)
		} else if(len == 12) {
			rtn = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2);
		} else if(len == 14) {
			rtn = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2) + ":" + str.substr(12, 2);
		} else {
			rtn = str;
		}
	}
	
	
	return rtn;
}


function isNotValidPassword(passField) {
	if(isEmpty(passField, getMsgStr("s.enter_a_password"))) return true;

	var pattern =/^.*(?=^.{9,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^,./&+-=\?]).*$/g;
	
	if(!(pattern.test($(passField).val()))){
		alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.to_15_digits"));
		$(passField).focus();
		return true;
	}
	
	var chk_eng = $(passField).val().search(/[0-9]/g);
	var chk_num = $(passField).val().search(/[a-zA-Z]/g);
	var chk_var = $(passField).val().search(/[`~!@#$%^&*(),./_+<>?\-={}|\[\]\\:";']/g);

	if(chk_eng < 0 || chk_num < 0 || chk_var < 0){
		alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.to_15_digits"));
		$(passField).focus();
		return true;
	}
		
//	if(isEmpty(confirmField,"<spring:message code='msg.input.password.confirm'/>")) return true;
//	if($(passField).val() != $(confirmField).val()) {
//		alertMsg("","<spring:message code='msg.info.notsame.password'/>\n<spring:message code='msg.input.again'/>");
//		$(confirmField).focus();
//		return true;
//	}
	
	return false;
}

function idValid(pUsrId){
	var regex = /^[a-zA-Z0-9_]{4,20}$/; 
	var result = regex.test(pUsrId);
	if (!result) {
		alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.enter_id_limit"));  
		return false;
	}
	return true;
}


function isEmpty(obj,msg){
	if ( $(obj).val().trim() == '' ){
		obj.focus();
		alertify.message('<i class="icon fa fa-warning"></i> ' + msg);
		return true;
	}

	return false;
}

function checkMailaddress(o, n) {
	o.removeClass( "ui-state-error" );
	var exp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	
	if ( o.val().match(exp) == null ){
		o.addClass( "ui-state-error" );
        o.focus();
        alertify.message('<i class="icon fa fa-warning"></i> ' + n);
        return false;
	}else{
		return true;
	}
}

function checkPhonenumber(o, n) {
	o.removeClass( "ui-state-error" );
	var exp = /^\d{2,3}-\d{3,4}-\d{4}$/;
	
	if ( o.val().match(exp) == null ){
		o.addClass( "ui-state-error" );
		o.focus();
		alertify.message('<i class="icon fa fa-warning"></i> ' + n);
		return false;
	}else{
		return true;
	}
}

function checkLength(ons, n, min, max, whitespace, objChk) {
	if( ons != undefined  ){
		
		var value="";
		
		if(objChk=='S'){
			value=ons;
		}else{
			ons.removeClass( "ui-state-error" );
			value=ons.val();
		}
		
		
		if( whitespace == undefined){
			if(value !=null && value!=""){
				value = value.trim();	
			}
		}
		
		if(max>0){
			if(min>0){
				if(value==null || value=="") {
					alertify.message('<i class="icon fa fa-warning"></i> ' + "["+ n + "] " + getMsgStr("s.please_enter"));
					return false;
				} else {
					if ( stringByteSize(value) > max || stringByteSize(value) < min ) {
						if(objChk!='S'){
							ons.addClass( "ui-state-error" );
							ons.focus();
						}
						alertify.message('<i class="icon fa fa-warning"></i> ' + n + getMsgStr("s.value_is_digits_s") + min + " ~ " + max + getMsgStr("s.value_is_digits_e") );
						return false;
					} else {
						return true;
					}
				}	
			}else{
				if ( stringByteSize(value) > max || stringByteSize(value) < min ) {
					if(objChk!='S'){
						ons.addClass( "ui-state-error" );
						ons.focus();
					}
					alertify.message('<i class="icon fa fa-warning"></i> ' + n + getMsgStr("s.value_is_digits_s") + min + " ~ " + max + getMsgStr("s.value_is_digits_e"));
					return false;
				} else {
					return true;
				}
			}
		}else{
			if(min>0){
				if(value==null || value=="") {
					alertify.message('<i class="icon fa fa-warning"></i> ' + "["+ n + "] <spring:message code='msg.confirm.input.value' />");
					return false;
				} else {
					if ( stringByteSize(value) < min ) {
						if(objChk!='S'){
							ons.addClass( "ui-state-error" );
							ons.focus();
						}
						alertify.message('<i class="icon fa fa-warning"></i> ' + getMsgStr("s.value_is_digits_s")+ min + " ~ " + max + getMsgStr("s.value_is_digits_e") );
						return false;
					} else {
						return true;
					}
				}	
			}else{
				if ( stringByteSize(value) < min ) {
					if(objChk!='S'){
						ons.addClass( "ui-state-error" );
						ons.focus();
					}
					alertMsg("", n + " <spring:message code='msg.info.textbox.head' /> <spring:message code='msg.info.textbox.body' arguments='"+min+"' /> " );
					return false;
				} else {
					return true;
				}
			}
		}
		
		
	}else{
		alertMsg("", "["+ n + "] "+ getMsgStr("s.please_enter"));
		return false;
	}
}

function stringByteSize(str) {
	if (str == null || str == undefined || str.length == 0) {
		return 0;
	}
	var size = 0;

	for (var i = 0; i < str.length; i++) {
		size += charUtf8ByteSize(str.charAt(i));
	}
	return size;
}

function charUtf8ByteSize(ch) {
	if (ch == null || ch.length == 0) {
		return 0;
	}

	var charCode = ch.charCodeAt(0);

	if (charCode <= 0x00007F) {
		return 1;
	} else if (charCode <= 0x0007FF) {
		return 2;
	} else if (charCode <= 0x00FFFF) {
		return 3;
	} else {
		return 4;
	}
}


function chkBoxAll(pId,pName){
	var rtn = false;
	if($('#'+pId).prop('checked')){
		rtn = true;
	}
	
	$('input[name="'+pName+'"]').each(function() {
	    $(this).prop('checked', rtn);
	});
}

function chkBox(pId,pName){
	var rtn = true;
	
	$('input[name="'+pName+'"]').each(function() {
		if(!$(this).prop('checked')){
			rtn = false;
			return false;
		}
	});
	$('#'+pId).prop('checked', rtn);
}

function clickTr(pId,pIdx){
	$('#'+pId+' tbody tr').removeClass('click');
	$('#'+pId+' tbody tr').eq(pIdx).addClass('click');
}

//새로추가된 tr감지 
const tableObserver = new MutationObserver((li,observer)=>{
	// console.log(li);
	const changedTbody = li.filter(item=>item.target.tagName.toLowerCase() === 'tbody').filter(it=>it.addedNodes.length>0);
	let newAddedNodes = [];
	for (const mt of changedTbody) {
		for (const node of mt.addedNodes) {
			if(node.tagName.toLowerCase() === 'tr' && node.classList.contains("clickTr")) newAddedNodes.push(node)
		}
	}
	// clickTr 클래스가 있는 tr에 클릭tr이벤트 적용
	for (const node of newAddedNodes) {
		node.addEventListener('click',clickTrCallback);
	}
})
document.addEventListener('DOMContentLoaded',()=>{
	tableObserver.observe(document,{
		subtree:true,
		childList: true,
	})
})
const clickTrCallback = (e)=>{
	/**@type {HTMLTableRowElement} */
	let tr = e.target;
	let tbody = tr.parentElement;
	if (tbody.tagName.toLowerCase !== "tbody") {
		tr = tbody;
		tbody = tbody.parentElement;
	}
	if (tbody.tagName.toLowerCase() === "tbody") {
		let trs = tbody.querySelectorAll("tr");
		for (const tr of trs) {
			if (tr.classList.contains("click")) tr.classList.remove("click");
		}
		tr.classList.add("click");
	}
}
document.querySelectorAll(".clickTr").forEach(e=>{
	/**@type {HTMLTableRowElement} */
	const el = e.target;
	el.addEventListener('click',clickTrCallback)
})

function always(pVal){
	$.ajax({
		url : data_url+"/api/mode/"+pVal,
		type : "POST",
		dataType : "json",
		contentType:"application/json",
		success: function (result) {
			console.log(result);
		},
		error: function () {
		}
	});
}

// XSS to Tag
function unescapeHtml(str) {
	if (str == null || typeof(str) != "string") {
		return "";
	}
	return str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '\"')
		.replace(/&#40;/g, "(")
		.replace(/&#41;/g, ")")
		.replace(/&#35;/g, "#")
		.replace(/&#39;/g, "\'");
}

// XSS to str
function escapeHtml(str) {
	if (str == null || typeof(str) != "string") {
		return "";
	}
	return str
	.replace(/\</g, "&lt;")
	.replace(/\>/g, "&gt;")
	.replace(/\&/g, "&amp;")
	.replace(/\"/g, "&quot;")
	.replace(/\(/g, "&#40;")
	.replace(/\)/g, "&#41;")
	.replace(/\#/g, "&#35;")
	.replace(/\'/g, "&#39;");
}

// Character(&amp; &lt;....) To Html Tag 
function specialCharToTag(str){
	if (str == null || typeof(str) != "string") {
		return "";
	}
	return str
	.replaceAll("&lt;", "<")
	.replaceAll("&gt;", ">")
	.replaceAll("&amp;lt;", "<")
	.replaceAll("&amp;gt;", ">")
	.replaceAll("&amp;nbsp;", " ")
	.replaceAll("&amp;amp;;", "&")
}

function setZero(val) {
	var convert_val = 0;
	if(val.toString().length == 1) {
		convert_val = ("0"+val);
	} else {
		convert_val = val;
	}
	return convert_val;
}


function linkWindowOpen(url, window_id) {
	var option = "width = 700, height = 600, top = 100, left = 200, location = no"
	/*if(window_id=="방호태세등급변경"){
		option = "width = 1160, height = 724, top = 100, left = 200, location = no"
	}*/
	if(url==null || url=="" || url=="NONE"){
		alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.nonexistent_details"));
	}else{
		window.open(url, window_id, option);
	}
}

function maskingChar(strCar) {
    if (strCar == undefined || strCar === '') {
        return '';
    }
//    var pattern = /.{9}$/; // 정규식
//    return (isNaN(strCar) ? strCar.replace(/(?<=.{0})./gi, "*") : 0);
    return makeid(strCar.length);
}

function makeid(length) {
	if(length == undefined) {
		length = Math.floor(Math.random() * 10);
	}
	
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function rgb2hex(rgb) {
	if (  rgb.search("rgb") == -1 ) {
		return rgb;
	} else {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
	}
}

function timeCharToString(ch) {
	let rtn_ch = ch;
	if(ch.slice(-1) == "s") {
		rtn_ch = ch.replace("s", getMsgStr("w.seconed"));
	} else if(ch.slice(-1) == "m") {
		rtn_ch = ch.replace("m", getMsgStr("single.min"));
	} else if(ch.slice(-1) == "h") {
		rtn_ch = ch.replace("h", getMsgStr("cmcd.time"));
	}
	
	return rtn_ch;
}

function timeCharToNumber(ch) {
	let rtn_time = ch;
	if(ch.indexOf("s") > -1) {
		rtn_time = ch.replace("s","");
	} else if(ch.indexOf("m") > -1) {
		rtn_time = ch.replace("m","");
		rtn_time = (rtn_time * 60);
	} else if(ch.indexOf("h") > -1) {
		rtn_time = ch.replace("h","");
		rtn_time = (rtn_time * 3600);
	}
	
	return rtn_time;
}

function inputOnlyNum() {
	if((event.keyCode<48)||(event.keyCode>57))
		event.returnValue=false;
}

function dateToText(date) {
	var text_date = date;
	if(text_date != undefined && text_date != "" && Object.prototype.toString.call(text_date) === "[object Date]") {
		if(!isNaN(text_date.getTime())) {
			text_date = text_date.getFullYear() + "-" + setZero(text_date.getMonth()+1) + "-" + setZero(text_date.getDate()) + " " + setZero(text_date.getHours()) + ":" + setZero(text_date.getMinutes()) + ":" + setZero(text_date.getSeconds());
		}
	}
	return text_date;
}


function ldapToDate(timeStamp)
{
	return new Date(timeStamp / 1e4 - 1.16444736e13);
}

function dateToldap(date)
{
	var timeStamp = date.getTime() + 1.16444736e13;
	timeStamp *= 1e4;
	return timeStamp;
}

function ldapToText(str)
{
	var date = ldapToDate(str);
	return dateToText(date);
}

/**
 * initCal에서 날짜 유효성 검사 추가(maxdate를 현재날짜로, 시작시간은 종료시간을 maxdate로)
 * @param {string} pId datepicker ID
 * @param {string} btnId button ID
 * @param {string} pType 
 * @param {number} pRange 
 */
function initCal(pId, btnId, pType, pRange){
	let nowDate = new Date();
	let now = dateFormater(nowDate,"-");
	
	let sdt_pId = "";
	let edt_pId = "";
	if (pId.search(/sdt/) > 0) {
		sdt_pId = pId;
		edt_pId = pId.replace("sdt","edt");
	}
	if (pId.search(/edt/) > 0) {
		sdt_pId = pId.replace("edt","sdt");;
		edt_pId = pId
	}
	const date_btns = document.querySelectorAll(`div.btn[onclick^="javascript:setDataCal('${sdt_pId}'"]`)
	$("#"+pId).change(()=>{
		let current_date_btn = "";
		if ($("#" + sdt_pId).val() === dateFormater(claDate("1M"),"-") && $("#" + edt_pId).val() === now) current_date_btn = "1M";
		else if ($("#" + sdt_pId).val() === dateFormater(claDate("3M"),"-") && $("#" + edt_pId).val() === now) current_date_btn = "3M";
		else if ($("#" + sdt_pId).val() === dateFormater(claDate("6M"),"-") && $("#" + edt_pId).val() === now) current_date_btn = "6M";
		$.each(date_btns, function (i, v) { 
			if(v.innerHTML === current_date_btn) {
				if (!v.classList.contains("click")) v.classList.add("click");
			}
			else {
				if (v.classList.contains("click")) v.classList.remove("click");
			}
		});
	})
	$("#"+pId).datepicker({
		showOn: "button",
		
	//	dayNamesMin:['일','월','화','수','목','금','토'],
	//	monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin:[getMsgStr("comm.word_34"),getMsgStr("comm.word_28"),getMsgStr("comm.word_29"),getMsgStr("comm.word_30"),getMsgStr("comm.word_31"),getMsgStr("comm.word_32"),getMsgStr("comm.word_33")],
		monthNamesShort:[getMsgStr("comm.word_35"),getMsgStr("comm.word_36"),getMsgStr("comm.word_37"),getMsgStr("comm.word_38"),getMsgStr("comm.word_39"),getMsgStr("comm.word_40"),getMsgStr("comm.word_41"),getMsgStr("comm.word_42"),getMsgStr("comm.word_43"),getMsgStr("comm.word_44"),getMsgStr("comm.word_45"),getMsgStr("comm.word_46")],
		dateFormat:"yy-mm-dd",
		changeYear:true,
		changeMonth:true,
		showMonthAfterYear:true ,
        yearRange:"-15:+5",
        showAnim: "slideDown",
        autoclose:true,
		todayHighlight:true
	});

	$("#"+btnId).click(function(){
		$("#"+pId).datepicker("show");
	})

	//숫자, "-" 만 입력가능
	document.querySelector("#"+pId).addEventListener('keyup',(event)=>{
		event.target.value= event.target.value.replaceAll(/[^0-9|-]/ig,"")
	})

	if(pType=="S"){
		$("#"+pId).datepicker('setDate', claDate(pRange));
	}else if(pType=="E"){
		$("#"+pId).datepicker('setDate', new Date());
	}

	

	// 시작일자가 죵료일자 넘지 못하게
	if (pId.search(/sdt/) > 0) {
		$("#"+pId).datepicker("option", "maxDate", $("#"+pId.replace("sdt","edt")).val());
		$("#"+pId).datepicker("option", "onClose", function ( selectedDate ) {
			$("#"+pId.replace("sdt","edt")).datepicker( "option", "minDate", selectedDate );
		});
	}
	if (pId.search(/edt/) > 0) {
		$("#"+pId).datepicker("option", "minDate", $("#"+pId.replace("edt","sdt")).val());
		$("#"+pId).datepicker("option", "onClose", function ( selectedDate ) {
			$("#"+pId.replace("edt","sdt")).datepicker( "option", "maxDate", selectedDate );
		});
	}
}

/**
 * 한자리수면 두자릿수로 (1 => 01)
 * @param {number} value 
 * @returns {string}
 */
 function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}
/**
 * yyyy-mm-dd
 * @param {Date} date 
 * @param {string} spliter 구분자
 * @param {boolean} datetime 시간 표시 여부
 * @returns {string}
 */
function dateFormater (date,spliter,datetime,timeSpliter){
	// return date.toISOString().split("T")[0];
	return date.getFullYear() + spliter + leftPad(date.getMonth()+1) + spliter + leftPad(date.getDate()) + (timeSpliter ? " " : "") + (datetime === true ? (leftPad(date.getHours()) + timeSpliter + leftPad(date.getMinutes()) + timeSpliter + leftPad(date.getSeconds())) : "");
}


function setDataCal(pSId, pEId, pNo, pIdx, pClass){
	$("#"+pSId).datepicker('setDate', claDate(pNo));
	$("#"+pEId).datepicker('setDate', new Date());
	$("."+pClass).removeClass("click");
	$("."+pClass).eq(pIdx).addClass("click");
	
	// datepicker 범위 설정
	$("#"+pEId).datepicker( "option", "minDate", $("#"+pSId).val() );
	$("#"+pSId).datepicker( "option", "maxDate", $("#"+pEId).val() );
}

function setTime(pId){
	$("#"+pId+"_hh option").remove();
	for(var i=0;i<24;i++){
		var hhStr = i+"";
		if(hhStr.length==1){
			hhStr = "0"+i;
		}
		var tmp = "<option value='"+hhStr+"'>"+hhStr+"</option>"
		$("#"+pId+"_hh").append(tmp)
	}
	$("#"+pId+"_mm option").remove();
	for(var i=0;i<60;i++){
		var mmStr = i+"";
		if(mmStr.length==1){
			mmStr = "0"+i;
		}
		var tmp = "<option value='"+mmStr+"'>"+mmStr+"</option>"
		$("#"+pId+"_mm").append(tmp)
	}
	
	
}


function claDate(pNo) {
  var d = new Date();
  if(pNo.indexOf("M")>-1){
	  pNo = pNo.replace("M","");
	  var monthOfYear = d.getMonth();
	  d.setMonth(monthOfYear - Number(pNo));
  }else if(pNo.indexOf("D")>-1){
	  pNo = pNo.replace("D","");
	  var dayOfMonth = d.getDate();
	  d.setDate(dayOfMonth - Number(pNo));
  }
  return d;
}



function ipRegChk(val) { 
	var regpet = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	if (regpet.test(val)) { 
		return true; 
	} else {
		alertify.message('<i class="icon fa fa-warning"></i>'+ getMsgStr("s.ipFormat") + '</i>');
		return false; 
	} 
}

function portRegChk(port) { 
	if (!(/^[1-9]\d*$/.test(port) && 1 <= 1 * port && 1 * port <= 65535)){
		alertify.message('<i class="icon fa fa-warning"></i>'+ getMsgStr("s.portFormat") + '</i>');
		return false;
	}
	return true;
}

function scrollTarget(pId){
	  var offset = $("#"+pId).offset(); //해당 위치 반환
	  $(".ui-layout-center").animate({scrollTop: offset.top},700); 
}

function ajaxPost(url, synccheck, params, p_this, postProcess)
{
	var dt = $.ajax({
		url : url,
		type : 'POST',
		async : synccheck,
		dataType : 'json',
		context : p_this,
		contentType:"application/json",
		data : JSON.stringify(params),
//		beforeSend: function (xhr) {
//            xhr.setRequestHeader("X-Data-Format","codvill");
//        },
		headers: {
	        'X-Data-Format':'CODVILL',
			'Api-Key' : 'JV6R2dSGNjPFvWa8zMCnCEs6UmnwYcONthSUqzQ4'
	    },
		success: function (result) {

			if(postProcess != undefined && postProcess != null)
				postProcess(result);
		},
		error: function (result) {
			console.log(result.status);
			$("#overlay").hide();
			if(result.status == 204)
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.beingProcess"));
			else
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
		}
	})
	return dt;
}

function getSagoPop(pCd, pKindCd){
	var url = "";
	if(pKindCd=="I"){
		url = "/rsp/view/inciView";
	}else if(pKindCd=="C"){
		url = "/rsp/view/consultView";
	}else if(pKindCd=="R"){
		url = "/rsp/view/resAnalView";
	}
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", pCd+"_view");
	 
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = "pCd";
	input.value = pCd;
	form.appendChild(input);
	 
	document.body.appendChild(form);
	 
	if( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) ){
		window.open(url, pCd+"_view");
	}else{
		window.open(url, pCd+"_view", "resizable=yes,toolbar=yes,menubar=yes,location=yes");
	}
	 
	form.submit();
	document.body.removeChild(form);
}

function artifact(pCd){
	var url = "/rsp/view/nodeView";
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	form.setAttribute("target", pCd+"_view");
	 
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = "pCd";
	input.value = pCd;
	form.appendChild(input);
	 
	document.body.appendChild(form);
	 
	if( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) ){
		window.open(url, pCd+"_view");
	}else{
		window.open(url, pCd+"_view", "resizable=yes,toolbar=yes,menubar=yes,location=yes");
	}

	form.submit();
	document.body.removeChild(form);				
	 
}

function resetCkEditor(){
	$("#cke_board_content").css("width", "100%");
	 for (var key in CKEDITOR.instances) {
       var instance = CKEDITOR.instances[key];
       instance.setData('');
   	 }
	 $.each($(".cke_toolbox_main"), function(index, value) {
		if($(this).css('display') == 'inline'){
			$(this).css('display', 'none');
			$(this).next().removeClass('.cke_toolbox_collapser');
			$(this).next().addClass('.cke_toolbox_collapser cke_toolbox_collapser_min');					
		}
	});
}

/**
 * CKeditor 모두 ready시 callback 실행
 * @param {CKEDITOR.editor[]} cks ckeditor instance
 * @param {Function} callback 
 * @returns {Promise<void>}
 */
async function onReadyCkEditors(cks,callback) {
	let ready = [];
	for (const ck of cks) {
		await onReadyCkEditor(ck,e=>{
			ready.push(e);
		})
	}
	if (cks.length === ready.length) {
		callback(cks);
		return;
	}else{
		const ori = cks.map(v=>v.id);
		const readyed = ready.map(v=>v.id);
		const errored = ori.filter(v=>!readyed.includes(v));

		console.log("errored editor ids =>",errored)
		callback(cks);
		return;
	}
}
/**
 * CKeditor ready시 callback 실행
 * @param {CKEDITOR.editor} ck ckeditor instance
 * @param {Function} callback 
 * @returns {Promise<CKEDITOR.editor>} 
 */
async function onReadyCkEditor(ck,callback) {
	return new Promise((resolve, reject) => {
		if (ck.status === 'ready') {
			callback(ck);
			resolve(ck);
		}else if (ck.status === 'distoryed'){
			console.error("CKEDITOR is distoryed!");
			resolve(null);
		}else{
			if (!ck) {
				reject("ckeditor instance is null");
			}
			ck.on("instanceReady",e=>{
				callback(ck);
				resolve(ck);
			})
		}
	})
}

function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

function checkOnlyEnNum(str){
	const regex = /^[a-zA-Z0-9]*$/;;
	
	return regex.test(str);
}


function setCookie(name, value, exp) {
	let date = new Date(exp ?? '9999-12-31 09:00:00');
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function getCookie(name) {
	let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;
};

function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

function setTutoPages(e){
	const targets = e;
	const tuto_div = document.querySelector(".tutorialCurtain");
	let target_num = 0;


	if(e == "close"){
		// const tuto_div = document.querySelector(".tutorialCurtain");
		tuto_div.style.display = "none";

		const targets = document.getElementsByClassName("tutorialView");
		if(targets.length > 0) 
			targets[0].classList.remove("tutorialView");
	}else{
		if(tuto_div == null){
			const mainDiv = document.createElement("div");
			mainDiv.style.display = "block";
			mainDiv.style.width = "100%";
			mainDiv.style.height = "100%";
			mainDiv.classList.add("tutorialCurtain");
			mainDiv.innerHTML = "<div id='tutorialCurtain_center' style='text-align:center; transform: translateY(15%);'>" +
									// "<div id='tutoNums' style='position: absolute; z-index: 10; bottom: 150px; left: 0; width: 100%; text-align: center;'></div>" +		
									"<img id='imgTest' src=" +"/img/" + targets[target_num]   + " class='mt5' />" +
								"</div>" +
								"<div class='btn_area mt10' style='position:absolute;padding-right: 20px;padding-bottom: 10px;bottom: 0px; text-align:center'>" +
									// "<div class='checkbox'><input onclick='' id='chk_notToday' name='chk' type='checkbox' value=''><label for='chk_notToday'></label>오늘하루 다시보지않음</div>" +
									`<button type='button' class='btn btn-secondary'  z-index: 50;' onclick="javascript:setTutoPages('close')"><i class='fa fa-close'></i>닫기</button>` +
								"</div> ";					
			document.body.append(mainDiv);
			
			const tuto_img = document.querySelector("#imgTest");
			
			mainDiv.onclick = function(e){
			// if(e.target.classList.contains("tutorialCurtain")){
				// document.getElementById(target_num + "_img").classList.remove("fa-circle");
				// document.getElementById(target_num + "_img").classList.add("fa-circle-o");
				target_num++;
				
				if(target_num == targets.length){
					// targets[target_num - 1].classList.remove("tutorialView");
					target_num = 0;
				} 
				
				// document.getElementById(target_num + "_img").classList.remove("fa-circle-o");
				// document.getElementById(target_num + "_img").classList.add("fa-circle");
				tuto_img.src ="/img/" + targets[target_num];
				// targets[target_num].classList.add("tutorialView");
				// if(target_num > 0)	
					// targets[target_num - 1].classList.remove("tutorialView");
	
			// }
		}
		
		
		
			/*
			for(var i in targets){
				let temp = document.createElement("i");
				temp.classList.add("fa");
				if(i == 0)
					temp.classList.add("fa-circle");
				else
					temp.classList.add("fa-circle-o");
				
				temp.id = i + "_img";
				document.getElementById("tutoNums").append(temp);
			}
			*/
		}
		
		
				
		
	}
}

/**
 * 
 * @param {string|HTMLElement} arg 
 * @returns {Object} .ById 또는 .ByName 으로 가져옴
 */
function getForm(arg){
	let targetElem = null;
	if (typeof arg === 'string') {
		targetElem = document.getElementById(arg);
	}else if (arg instanceof HTMLElement){
		targetElem = arg;
	}else{
		return false;
	}

	if (!targetElem) return false;
	let innerInputs = targetElem.querySelectorAll('input, select, textarea');
	let rtn = {
		byId:{},
		byName:{}
	};
	for (const input of innerInputs) {
		if (input.id) {
			rtn.byId[input.id] = input;
		}
		if(input.name){
			if (!rtn.byName) rtn.byName = {};
			if (!rtn.byName[input.name]) {
				rtn.byName[input.name] = [input];
			}else{
				rtn.byName[input.name].push(input);
			}
		}
	}
	return rtn
}
/**
 * 
 * @param {number} bytes 
 * @param {number} decimals 
 * @returns 
 */
function formatBytes(bytes,type = "string", decimals = 2) {
    if (bytes === 0) {
		if (type === 'string') {
			return 0 + ' ' + "Bytes";
		}else if(type === 'object'){
			return {size:0,unit:"Bytes"};
		}
	}

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

	const s = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
	const u = sizes[i]

	if (type === 'string') {
		return s + ' ' + u;
	}else if(type === 'object'){
		return {size:s,unit:u};
	}
}

function genUUID(){
	let d = new Date().getTime();//Timestamp
	let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16;//random number between 0 and 16
		if(d > 0){//Use timestamp until depleted
			r = (d + r)%16 | 0;
			d = Math.floor(d/16);
		} else {//Use microseconds since page-load if supported
			r = (d2 + r)%16 | 0;
			d2 = Math.floor(d2/16);
		}
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

const findParent = {
	/**
	 * 
	 * @param {HTMLElement} child 자식 Element
	 * @param {String} tag HTML Tag
	 * @returns {HTMLElement} 상위 부모에서 일치하는 첫번째 Element
	 */
	byTag(child,tag){
		const find = child.parentElement
		if (find.tagName.toLowerCase() === tag.toLowerCase()) {
			return find;
		}else{
			return this.byTag(find,tag)
		}
	},
	/**
	 * 
	 * @param {HTMLElement} child 자식 Element
	 * @param {String} selector CSS selector(querySelector)
	 * @returns {HTMLElement} 상위 부모에서 일치하는 첫번째 Element 
	 */
	bySelector(child,selector){
		const par = child.parentElement;
		if (!par) return null;
		const find = par.querySelectorAll(selector);
		if (find.length > 0) {
			for (const fEl of find) {
				if (fEl.contains(child)) {
					return fEl
				}
			}
		}
		return this.bySelector(par,selector);
	}
}

/**
 * 
 * @param {URL|string} uri 
 * @param {string} name 
 */
function downloadURI(uri, name) {
	var link = document.createElement("a");
	if (name) {
		link.download = name;
	}
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	// delete link;
	document.body.removeChild(link);
}
/**
 * @param {Blob} blob
 */
function downloadBlob(blob,name) {
	const url = window.URL.createObjectURL(blob);
	downloadURI(url,name);
	window.URL.revokeObjectURL(url);
}

/**
 * 프로젝트별 설정 로드
 * @param {string} projNm site.name
 * @returns 
 */
async function getProjSetting(projNm) {
	// 기본값 로드
	const default_set = await new Promise((resolve, reject) => {
		fetch("/proj/codvill/setting.json").then(r=>{
			try {
				resolve(r.json())
			} catch (error) {
				resolve(null)
			}
		}).catch(e=>{
			resolve(null)
		})
	})
	if (!default_set) throw new Error("Cannot load default Setting");

	let rtn = default_set;

	// 사이트 설정 로드
	if (projNm !== "codvill") {
		const proj_set = await new Promise((resolve, reject) => {
			fetch(`/proj/${projNm}/setting.json`).then(r=>{
				try {
					r.json().then(rr=>{
						resolve(rr)
					}).catch(e=>{
						resolve(null)
					})
				} catch (error) {
					resolve(null)
				}
			}).catch(e=>{
				resolve(null)
			})
		});
		if (proj_set) rtn = $.extend(true,default_set,proj_set);
	}
	return rtn
}


function common_CommCodeList(comCode_param){
	
	let data = {};
	
	for(let key in comCode_param){
		//if(param_comCode.constructor === Object && Object.keys(param_comCode).length != 0){
			data[key] = comCode_param[key];
		//}
	}
	
	let param  = {
		map:data
	}
	
	//$("#overlay").show();
	return $.ajax({
					url: "/comcode/select/list",
					type :"POST",
					dataType:"json",
					data:JSON.stringify(param),
					async:false,
					contentType:"application/json",
					success: function (result) {
						
						//return_data = result;
						
					},
					error: function (err) {
						alertify.error('<i class="icon fa fa-ban">' + err + '</i> ERROR');
						console.log(err);
					}
				});
				
				
				
		//return return_data;
}

class EventBus {
	constructor() {
		// 이벤트 리스트 초기화
		this.eventObject = {};
	}
	// 이벤트 발행
	dispatch(eventName,...arg) {
		// 현재 이벤트의 모든 콜백함수 호출
		const callbackList = this.eventObject[eventName];

		if (!callbackList) return 

		// 콜백함수 실행
		for (let callback of callbackList) {
			callback(...arg);
		}
	}
	// 이벤트 구독
	on(eventName, callback) {
		// 이벤트 초기화
		if (!this.eventObject[eventName]) {
			this.eventObject[eventName] = [];
		}

		// 구독자가 실행할 콜백함수 저장
		this.eventObject[eventName].push(callback);
	}
	once(eventName, callback) {
		const newCallback = (...arg)=>{
			this.off(eventName,newCallback);
			callback(...arg);
		}
		this.on(eventName,newCallback);
	}

	off(eventName, callback){
		this.eventObject[eventName] = this.eventObject[eventName].filter(r=>r !== callback);
	}

	offAll(eventName){
		this.eventObject[eventName] = [];
	}
}

/**
 * Object to readonly
 * @param {Object} obj 
 */
function objectFreeze(obj) {
	if ( !obj || typeof obj !== 'object') return obj;
	Object.freeze(obj);
	if (Array.isArray(obj)) {
		for (const el of obj) {
			objectFreeze(el);
		}
	}
	else {
		for (const val of Object.values(obj)) {
			if (typeof val === 'object') {
				objectFreeze(val);
			}
		}
	}
	return obj;
}