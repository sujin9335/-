'use strict';

	var type_info = {};
	var type_sub_info = {};
	let contentsList = [];
	let contents_type_detail = {};
	var default_color_set =[['#61F3EB','#1EA4FF','#48DAD2','#32B8FF','#20B2AA','#46CCFF','#82F0F0','#80E12A','#5AC8C8','#BCFF66'],['#0A84FF','#32D74B','#5E5CE6','#64D2FF','#BF5AF2','#FF375F','#0D47A1','#00C853','#AA00FF','#D50000'],['#FF9F0A','#FF375F','#FFD60A','#32D74B','#64D2FF','#5E5CE6','#BF5AF2','#FF6D00','#C51162','#2962FF']]
	
	//var default_color1 = ['#0A84FF','#32D74B','#5E5CE6','#64D2FF','#BF5AF2','#FF375F','#0D47A1','#00C853','#AA00FF','#D50000'];
	//var default_color2 = ['#FF9F0A','#FF375F','#FFD60A','#32D74B','#64D2FF','#5E5CE6','#BF5AF2','#FF6D00','#C51162','#2962FF'];

	$(document).ready(function () {
		$("#config_contents_tab").tabs({ activate: function( event, ui ){
			var selectedTab = $("#config_contents_tab").tabs('option', 'active');
			if(selectedTab=="1"){
				
			}else if(selectedTab=="2"){
				
			}
			
		
		}});
		
		
		var type_param = {
			orderBy : {
				"contents_type_kind":"desc"				
			}
		};
		
		var contentsTypeData = setMappingData('/contents/select/type_list', type_param);
		contentsTypeData.success(function (result) {
			var type_obj = {}
			var type_sub_obj = {}
			$.each(result.data, function(index, value) {
				type_obj[value.contents_type] = value.contents_type_val
				if(value.sub_info != null && value.sub_info != undefined && value.sub_info != '') {
					const vv = value.sub_info.includes("NULL") ? value.sub_info.replace("NULL","null") : value.sub_info;
					type_sub_obj[value.contents_type] = vv;
				}
				
				var selectId = ''
				if(value.contents_type_kind == 'etc') {
					selectId = 'none_contents_combo'
				} else {
					selectId = 'sel_contents_type'
				}
				$("#" + selectId).append(
					"<option value='"+value.contents_type+"'>" + (getMsgStr(value.contents_type_nm) == undefined ? value.contents_type_nm : getMsgStr(value.contents_type_nm)) +"</option>"
				)
			});
			type_info = type_obj;
			type_sub_info = type_sub_obj;
			contents_type_detail = {};
			result.data.forEach(({contents_type,...obj})=>{
				contents_type_detail[contents_type] = obj;
			})
			setSelContents();
		});
		
		
		
		
		
		listDynamicApi();
		
		$("#tabColumsSort").sortable();
		
//		$( "#tabColumsSort" ).disableSelection();
		
		$("[name=cont_category_btn]").click(function(e) {
			$("[name=cont_category_btn]").filter(".btn-light").removeClass("btn-light");
			$("[name=cont_category_btn]").addClass("btn-default");
			
			$(e.target).removeClass("btn-default");
			$(e.target).addClass("btn-light");
			
			listContents();
		});
		
		if(location.pathname === '/main/view' && category_obj.data.length < 1) {
			alertify.warning('<i class="icon fa fa-ban"></i> ' +  getMsgStr("s.nonCategory"));
			// $("#chk_edit").trigger("click");
			addCategory();
			return false;
		} else {
		}
		
		$("#link_type").change(function(e) {
			$(".link_contents_area").hide();
			$(".link_url_area").hide();
			
			if($(e.target).val() == "C") {
//				$(".dropdetails").css("height", "175px");
				$(".link_contents_area").show();
			} else if($(e.target).val() == "F" || $(e.target).val() == "U") {
				if($(e.target).val() == "F") {
					$("#link_url").parent().parent().find("label").text("Function");
				} else {
					$("#link_url").parent().parent().find("label").text("URL");
				}
//				$(".dropdetails").css("height", "350px");
				$(".link_url_area").show();
			}
		});
		
		$("#chart_link_type").change(function(e) {
			$(".chart_link_contents_area").hide();
			$(".chart_link_url_area").hide();
			
			if($(e.target).val() == "C") {
				$(".chart_link_contents_area").show();
			} else if($(e.target).val() == "U") {
				$(".chart_link_url_area").show();
			} else {
				
			}
		});
		
//		$("#contents_combo").change(function(e) {
//			console.log($(e.target).val());
//			
//			$("#formAddUpdateM").find("#monitor_title").val($("#contents_combo").find("option:selected").text());
//			
////			if($("#contents_combo").find("option:selected").val() == '-'){
////				console.log("1");
////				$("#formAddUpdateM").find("#monitor_title").val("");
////			}else{
////				console.log("2");
////				$("#formAddUpdateM").find("#monitor_title").val($("#contents_combo").find("option:selected").text());	
////			}
//				
//		});

		
		$("#realtime_chk").click(function(e) {
			if($(e.target).is(":checked")) {
				$("#cycle_set").show();
			} else {
				$("#cycle_set").hide();
			}
		});
		
		$("body").click(function(e) {
			if(!$(e.target).hasClass("link_area") && !$(e.target).hasClass("select2-results") 
					&& !$(e.target).hasClass("select2-results__option") && !$(e.target).hasClass("select2-search__field") && $("#linkPop").is(":visible")) {
				$("#linkPop").hide();
				$(".select2-search__field").parent().parent().parent().remove();
			}
		});
		
		const eln = document.querySelector('body');
		eln.onwheel = (function moo(e) {
			if(!$(e.target).hasClass("link_area") && !$(e.target).hasClass("select2-results") 
					&& !$(e.target).hasClass("select2-results__option") && !$(e.target).hasClass("select2-search__field") && $("#linkPop").is(":visible")) {
				$("#linkPop").hide();
				$(".select2-search__field").parent().parent().parent().remove();
			}
		});
		
		/*tippy('[name=preview_btn]', {
			followCursor: true,
			onShow(instance) {
				const image = new Image();
				image.width = 710;
//				image.height = 400;
				image.style.zIndex = '9999';
				image.style.display = 'block';
				
				var this_api_type = $("[name=api_type_radio]:checked").val();
				var this_contents_type = "";
				
				if(this_api_type == "0" || this_api_type == "1") {
					this_contents_type = $("#sel_contents_type").val();
				} else if(this_api_type == "99") {
					this_contents_type = $("#none_contents_combo").val();
				} else {
					return false;
				}
				
				if(this_contents_type == undefined || this_contents_type == "" || this_contents_type == "-") {
					return false;
				}
				if(this_contents_type == "1") {
					image.src = '/img/preview/01.jpg';
				}
				if(this_contents_type == "2") {
					image.src = '/img/preview/02.jpg';
				}
				if(this_contents_type == "3") {
					image.src = '/img/preview/03.jpg';
				}
				if(this_contents_type == "19") {
					image.src = '/img/preview/table_01.png';
				}
				if(this_contents_type == "18") {
					image.src = '/img/01.jpg';
				}
				if(this_contents_type == "12") {
					image.src = '/img/02.jpg';
				}
				console.log(image)
				instance.setContent(image);
			},
			allowHTML: true
		});*/
		
		/*tippy('[name=preview_btn]', {
			content: document.getElementById('template').innerHTML,
			allowHTML: true,
			placement: "bottom-start",
			onShown (instance) {
				var this_api_type = $("[name=api_type_radio]:checked").val();
				var this_contents_type = "";
				
				if(this_api_type == "0" || this_api_type == "1") {
					this_contents_type = $("#sel_contents_type").val();
				} else if(this_api_type == "99") {
					this_contents_type = $("#none_contents_combo").val();
				} else {
					return false;
				}
				
				var data_val = "";
				var desc_val = "";
				//if(this_contents_type == "1") {
					data_val = '[{col0:"192.168.0.13”,col1:172}<br/>,{col0:"192.168.0.14”,col1:78}…]	';
					desc_val = 'col0~colN 형태로 데이터 생성 <br/>[col형식]<br/>문자(예시-”데이터”)<br/>숫자(예시-33423/쌍따옴표 생략)<br/>국가코드(예시-”CN”)<br/>색상(예시-”#ff0000”)<br/>IP(예시-”127.0.0.1”)';
				//}
				$("#template_data").text(data_val);
				$("#template_desc").html(desc_val);
			}
		});*/
		
		const langPop = document.getElementById("langPop")
		langPop.querySelectorAll("input").forEach(el=>{
			el.oninput = setPopData;
		})

		// 컬럼 팝업 자동 닫기
		document.body.addEventListener('click',(e)=>{
			if (!langPop.contains(e.target) && langPop.style.display !== 'none' && !e.target.classList.contains('input-group-addon') && !e.target.parentElement.classList.contains('input-group-addon')) {
				langPop.style.display = 'none';
			}
		})


		/**
		 * Content Event List
		 * 1. contentsInfoLoaded: (result of '/content/select/get')=>void
		 * 1. contentsLoaded: (content_element_id)=>void
		 * 2. contentsAnimationFinish: (content_element_id)=>void
		 * 3. monitorLoaded: (monitor_arr)->void
		 * 4. allContentsLoaded: ()->void
		 */
		// 컨텐츠 로드 감지

		ContentsEventBus.on("allContentsLoaded",()=>{
			//do-something
			console.log("전체 컨텐츠 로드됨!!!");
		})
		ContentsEventBus.on("allContentsInfoLoaded",()=>{
			//do-something
			console.log("전체 컨텐츠 정보 로드됨!!!");
		})
		ContentsEventBus.on("monitorLoaded",()=>{
			LoadedMonitorCnt++;
		})
		ContentsEventBus.on("contentsInfoLoaded",()=>{
			LoadedContentsInfoCnt++;
			if (LoadedMonitorCnt <= LoadedContentsInfoCnt) {
				ContentsEventBus.dispatch("allContentsInfoLoaded");
			}
		})
		ContentsEventBus.on("contentsLoaded",()=>{
			LoadedContentsCnt++;
			if (LoadedMonitorCnt <= LoadedContentsInfoCnt && LoadedContentsInfoCnt <= LoadedContentsCnt) {
				ContentsEventBus.dispatch("allContentsLoaded");
			}
		})
	});

	async function waitForContentInfo(timeout=5000){
		return new Promise((resolve, reject) => {
			if (LoadedMonitorCnt <= LoadedContentsInfoCnt) {
				resolve();
			}
			ContentsEventBus.on("allContentsInfoLoaded",()=>{
				resolve();
			})
			setTimeout(()=>{
				resolve()
			},timeout)
		})
	}
	async function waitForAllContentLoad(timeout=5000){
		return new Promise((resolve, reject) => {
			if (LoadedMonitorCnt <= LoadedContentsInfoCnt && LoadedContentsInfoCnt <= LoadedContentsCnt) {
				resolve();
			}
			ContentsEventBus.on("allContentsInfoLoaded",()=>{
				resolve();
			})
			setTimeout(()=>{
				resolve()
			},timeout)
		})
	}
	const ContentsEventBus = new EventBus();
	let LoadedContentsInfoCnt = 0;
	let LoadedMonitorCnt = 0;
	let LoadedContentsCnt = 0;
	//hot key setting
	/**
	 * 
	 * @param {KeyboardEvent} event 
	 */
	function editModeHotkey(event) {
		//const editMode = $("#editModeBtn").hasClass("on");
		let editMode = "editModeBtn";
		
		if ($("#"+editMode).hasClass("on")) {
			let triggered = false
			if (event.key.toUpperCase() === "Z" && event.ctrlKey && !event.altKey && !event.shiftKey) {
				monitorUndo();
				triggered = true;
			}else if((event.key.toUpperCase() === "Y" && event.ctrlKey && !event.altKey && !event.shiftKey) || (event.key.toUpperCase() === "Z" && event.ctrlKey && !event.altKey && event.shiftKey)){
				monitorRedo();
				triggered = true;
			}
			if (triggered) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
		
	}
	
	function timePlay(date, s_date) {
		 if( s_date != undefined &&  date != undefined && $("input:radio[name=range_type]:checked").val() == "D"){
			$("#timePlay").removeClass("fa-play-circle");
			$("#timePlay").addClass("fa-pause-circle");
			if(date != undefined) {
				listMonitor(scene_cd, undefined, true);
			}
		}
		else if($("#timePlay").hasClass("fa-pause-circle") || date != undefined) {
			//interval reset :: page
			
			$.each(page_reload_timer, function(index, value) {
				window.clearInterval(value);
			});
			
			page_reload_timer = new Array();
			
			if(date != undefined) {
				getServerTime(date, s_date);
				listMonitor(scene_cd, undefined, true);
			}
			$("#timePlay").removeClass("fa-pause-circle");
			$("#timePlay").addClass("fa-play-circle");
		
			clearWindowTimer();
		}
	
		 else {
			if($("input:radio[name=range_type]:checked").val() == "S"){
				$("#MinusMin_select").val('');
			$('input:radio[name=range_type]:input[value="D"]').prop("checked", true);	// 선택	
			var target = {
				value:"D"
			}
			changeRangeMode(target);
			}
			
			$("#monitor_cycle").trigger("change");
			$("#timePlay").removeClass("fa-play-circle");
			$("#timePlay").addClass("fa-pause-circle");
		}
	}
	
	function changeRangeMode(target) {
		if(target.value == "D") {
			$("#s_date_area").hide();
			$("#range_div").show();
			//$("#datepicker_area .dropdetails").css("height", '170px');
		} else if(target.value == "S") {
			$("#s_date_area").show();
			$("#range_div").hide();
			//$("#datepicker_area .dropdetails").css("height", '220px');
		}
	}
	
	//서브 구성 콘텐츠 combo box data
	var optionContentsData;
	function setSelContents() {
		var selData = "";
		var data = {
			orderBy : {
				"contents_title":"asc"
			}
		};
		selData += "<option value='-'>- Contents Type -</option>";
		var mappingData = setMappingData("/contents/select/list", data);
		mappingData.success(function (result) {
			$.each(result.data, function(key, value){
				var type_nm = $("#modalAddUpdateC").find("[name=contents_type_combo]").find("option[value='"+value.contents_type+"']").text();
				selData +="<option value='"+value.contents_cd+"' type='"+value.contents_type+"' realtime='"+value.realtime_flag+"'>"+value.contents_title+" ("+type_nm+")</option>";
			});
			optionContentsData = selData;
		});
	}
	
	function addFormM() {
		if(scene_cd == "" || scene_cd == undefined) {
			alertify.warning('<i class="icon fa fa-ban"></i>'+  getMsgStr("s.nonCategory"));
			addCategory();
			return false;
		} else {
			resetForm(scene_cd, "A");
			$("#modalAddUpdateM").modal();
			monitorSetMode('S');
			
			configListMonitor();
			$("#contents_combo").empty();
			$("#contents_combo").off("change");			
			$("#contents_combo").append($(optionContentsData));
			$("#contents_combo").select2( {dropdownParent: $("#modalAddUpdateM")} ).on("select2:open", function(e) {});
			
			$("#contents_combo").change(function(e) {
				if($(e.target).find("option:selected").attr("realtime") == "Y") {
					$("#divMonitorSub").hide();
				} else {
					$("#divMonitorSub").show();
				}
										

				if($("#monitor_cd").val() == ""){
					
					if($("#contents_combo").find("option:selected").val() == '-'){
						$("#formAddUpdateM").find("#monitor_title").val("");
					}else{
						$("#formAddUpdateM").find("#monitor_title").val($("#contents_combo").find("option:selected").text());	
					}
					
				}				
			
			});
		}
	}
	
	function configListMonitor(type) {
		const auth = getContentsDashboardAuth();
		if (!auth.edit) return;
		
		var param = {
			map : {
				monitor_scene: {
					type:"E",
					val:scene_cd
				},
				link_info: [
					{"tm_contents":{col:"realtime_flag", where:"contents_cd"}}
				]
			},
			update_flag: true
		}
		
		$("#overlay").show();
		
		$.ajax({
			url: "/monitor/select/list",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				var tab_id = "";
				if(type == undefined || type == "S") {
					tab_id = "tabMonitor";
				} else if(type == "B") {
					tab_id = "tabBatchMonitor";
				}
				tabClear(tab_id);
				resetScroll(tab_id);
				
				if(result.data != undefined && result.data.length > 0) {
					if(type == undefined || type == "S") {
						var first_monitor = '';
						$.each(result.data, function(index, value) {
							
							var trData = "<tr>";
							trData += "<td class='tac'><div class='checkbox mt4'><input onclick='javascript:chkBox(\"chkMonitorAll\", \"chkMonitor\")' id='chk_monitor_"+index+"' name='chkMonitor' type='checkbox' value='"+value.monitor_cd+"'>" +
							"<label for='chk_monitor_"+index+"'></label></div></td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" + nvl(value.monitor_title, "-") + "</td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" + nvl(value.monitor_title_en, "-") + "</td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" +
								$(optionContentsData).filter("[value="+value.contents_cd+"]").text();
							trData += "<div class='fr mr10 icon_none'><i class='icon fa fa-trash fa-lg hover ml5 mr5 fr mt3' onclick='delMonitor(\"" + value.monitor_cd + "\")'></i></div></td>";
							
							addRow(tab_id, trData);
							if(index == 0) {
								first_monitor = value.monitor_cd;
							}
						});
						
//						clickTr(tab_id, 0);
						
//						configGetMonitor(first_monitor);
						resetForm("M","A");
						
					} else if(type == "B") {
						$.each(result.data, function(index, value) {
							var selData = "<select class='form-control'  id='selContentsUpdate_"+add_idx+"' name='selAddContents' style='width:270px;'>"+optionContentsData+"</select>";
							var trData ="<tr>"+
							"<td>"+selData+"</td>"+
							"<td>" +
								"<input class='form-control tal' type='text' name='monitorTitleU' title='Title' value=''>" +
								"<input type='hidden' name='monitorCdU' value='"+value.monitor_cd+"' />"+
							"</td>"+
							"<td><input class='form-control tal' type='text' name='monitorTitleUEn' title='Title("+getMsgStr("w.english")+")' value=''></td>"+
							"<td><input class='form-control tal' type='text' name='monitorTitleUEtc' title='Title("+getMsgStr("message.etc")+")' value=''></td>"+
							"<td><input class='form-control' type='text' name='monitorSubTitleU' title='Sub Title' value=''></td>"+
							"<td><input class='form-control' type='text' name='monitorSubTitleUEn' title='Sub Title("+getMsgStr("w.english")+")' value=''></td>"+
							"<td><input class='form-control' type='text' name='monitorSubTitleUEtc' title='Sub Title("+getMsgStr("message.etc")+")' value=''></td>"+
							"<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delMonitor(\""+value.monitor_cd+"\")'></i></td>"+
							"</tr>";
							addRow(tab_id, trData);
							
							$("#" + tab_id).find("[name=monitorTitleU]:last").val(unescapeHtml(value.monitor_title));
							$("#" + tab_id).find("[name=monitorTitleUEn]:last").val(unescapeHtml(value.monitor_title_en));
							$("#" + tab_id).find("[name=monitorTitleUEtc]:last").val(unescapeHtml(value.monitor_title_etc));
							$("#" + tab_id).find("[name=monitorSubTitleU]:last").val(unescapeHtml(value.monitor_sub_title));
							$("#" + tab_id).find("[name=monitorSubTitleUEn]:last").val(unescapeHtml(value.monitor_sub_title_en));
							$("#" + tab_id).find("[name=monitorSubTitleUEtc]:last").val(unescapeHtml(value.monitor_sub_title_etc));
							
							$("#selContentsUpdate_"+add_idx).val(value.contents_cd);
							add_idx++;
						});
						$("#" + tab_id + " select").select2({dropdownParent: $('#modalAddUpdateM')}).on("select2:open", function(e) {
							setAll2();
						});
							
						
					}
				} else {
					$("#" + tab_id).append("<tr><td colspan='" + $("#" + tab_id + " thead th").length + "' class='tac'>"+getMsgStr("message.no_data")+"</td></tr>");
				}
				setScroll(tab_id);
				$("#overlay").fadeOut();
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
		
	}
	
	function configGetMonitor(pCd, realtime_flag) {
		var param = {
				monitor_cd : pCd
		}
		$("#overlay").show();
		
		if(realtime_flag == "Y") {
			$("#divMonitorSub").hide();
		} else {
			$("#divMonitorSub").show();
		}
		
		$.ajax({
			url: "/monitor/select/get",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {				

				$("#modalAddUpdateM").find("#monitor_cd").val(result.data.monitor_cd);
				$("#modalAddUpdateM").find("#monitor_title").val(result.data.monitor_title);
				$("#modalAddUpdateM").find("#monitor_sub_title").val(result.data.monitor_sub_title);
				$("#modalAddUpdateM").find("#monitor_title_en").val(result.data.monitor_title_en);
				$("#modalAddUpdateM").find("#monitor_sub_title_en").val(result.data.monitor_sub_title_en);
				$("#modalAddUpdateM").find("#monitor_title_etc").val(result.data.monitor_title_etc);
				$("#modalAddUpdateM").find("#monitor_sub_title_etc").val(result.data.monitor_sub_title_etc);
				$("#modalAddUpdateM").find("#contents_combo").val(result.data.contents_cd);
				$("#modalAddUpdateM").find("#contents_combo").trigger("change");
				
				if(result.data.header_view_yn == "Y") {
					$("#chk_remove_title").prop("checked", true);
				} else {
					$("#chk_remove_title").prop("checked", false);
				}
				
				if(result.data.monitor_theme == "1") {
					$("#chk_scroll").prop("checked", true);
				} else {
					$("#chk_scroll").prop("checked", false);
				}
				if(result.data.monitor_alert_yn === "Y") {
					$("#chk_alert").prop("checked", true);
				} else {
					$("#chk_alert").prop("checked", false);
				}
				
				tabClear("tabMonitorSub");
				
				if(result.data_sub != undefined && result.data_sub.length > 0) {
					$.each(result.data_sub, function(index, value) {
						addMonitorSub("tabMonitorSub", value);
					});
				}
				$("#overlay").fadeOut();
			},
			error: function (e) {
				console.log(e)
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.configuration_registration_failed"));
			}	
		});
		$('#accordion').accordion({ active: 1});
	}
	
	var monitor_sub_idx = 0;
	function addMonitorSub(tab_id, sub_info) {
		if($("#"+tab_id+" tbody tr:eq(0) td").length == 1) {
			tabClear(tab_id)
		}
		var selData = "<select style='width:50%;' id='selAddContents_"+monitor_sub_idx+"' name='selAddContents' idx='"+monitor_sub_idx+"'>"+optionContentsData+"</select>";
		
		var trData ="<tr>";
		trData += "<td>"+selData+"</td>";
		// trData += "<td><input class='form-control' type='text' name='ex_monitor_title_en'  title='Title("+getMsgStr("w.english")+")' value=''></td>";
		// trData += "<td><input class='form-control' type='text' name='ex_monitor_sub_title_en' title='Sub Title("+getMsgStr("w.english")+")' value=''></td>";
		if(tab_id != "tabBatchMonitor") {
			trData += "<td><input type='hidden' name='ex_monitor_title_data'><div class='input-group'><input class='form-control tal' type='text' name='ex_monitor_title_view' title='Title' value='' readonly><button type='button' class='input-group-addon' onclick='openLangPop(event)'><i class='fa fa-edit'></i></button></div></td>";
			trData += "<td><input type='hidden' name='ex_monitor_sub_title_data'><div class='input-group'><input class='form-control tal' type='text' name='ex_monitor_sub_title_view' title='Sub Title' value='' readonly><button type='button' class='input-group-addon' onclick='openLangPop(event)'><i class='fa fa-edit'></i></button></div></td>";
			trData += "<td><input type='checkbox' class='checkbox_onoff' id='ex_chk_remove_title_"+monitor_sub_idx+"' name='ex_chk_remove_title' onclick=''><label for='ex_chk_remove_title_"+monitor_sub_idx+"' class='switch mt5 ml10 hover'></label></td>";
			trData += "<td><input type='checkbox' class='checkbox_onoff' id='ex_chk_scroll_"+monitor_sub_idx+"' name='ex_chk_scroll' onclick=''><label for='ex_chk_scroll_"+monitor_sub_idx+"' class='switch mt5 ml10 hover'></label></td>";
		}else{
			trData += "<td><input class='form-control' type='text' name='monitorTitleU'  title='Title' value=''></td>";
			trData += "<td><input class='form-control' type='text' name='monitorTitleUEn'  title='Title("+getMsgStr("w.english")+")' value=''></td>";
			trData += "<td><input class='form-control' type='text' name='monitorTitleUEtc'  title='Title("+getMsgStr("message.etc")+")' value=''></td>";
			trData += "<td><input class='form-control' type='text' name='monitorSubTitleU' title='Sub Title' value=''></td>";
			trData += "<td><input class='form-control' type='text' name='monitorSubTitleUEn' title='Sub Title("+getMsgStr("w.english")+")' value=''></td>";
			trData += "<td><input class='form-control' type='text' name='monitorSubTitleUEtc' title='Sub Title("+getMsgStr("message.etc")+")' value=''></td>";
		}
		trData += "<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>";
		trData += "</tr>";
		
		resetScroll(tab_id);
		addRow(tab_id, trData);
		setScroll(tab_id);
		
		monitor_sub_idx++;
		
		$("#"+tab_id+" select:last").select2({dropdownParent: $('#modalAddUpdateM')});
		
		if(sub_info != undefined) {
			const monitor_title_data = {
				ko:sub_info.monitor_title || "",
				en:sub_info.monitor_title_en || "",
				etc:sub_info.monitor_title_etc || ""
			}
			const monitor_sub_title_data = {
				ko:sub_info.monitor_sub_title || "",
				en:sub_info.monitor_sub_title_en || "",
				etc:sub_info.monitor_sub_title_etc || ""
			}
			var sub_row = $("#tabMonitorSub tbody tr:last");
			sub_row.find("select").val(sub_info.contents_cd);
			sub_row.find("select").trigger("change");
			sub_row.find("[name=ex_monitor_title_data]").val(JSON.stringify(monitor_title_data));
			sub_row.find("[name=ex_monitor_sub_title_data]").val(JSON.stringify(monitor_sub_title_data));
			sub_row.find("[name=ex_monitor_title_view]").val(monitor_title_data[lang_set]);
			sub_row.find("[name=ex_monitor_sub_title_view]").val(monitor_sub_title_data[lang_set]);
			// sub_row.find("[name=ex_monitor_title]").val(sub_info.monitor_title);
			// sub_row.find("[name=ex_monitor_title_en]").val(sub_info.monitor_title_en);
			// sub_row.find("[name=ex_monitor_sub_title]").val(sub_info.monitor_sub_title);
			// sub_row.find("[name=ex_monitor_sub_title_en]").val(sub_info.monitor_sub_title_en);
			if(sub_info.header_view_yn == "Y") {
				sub_row.find("[name=ex_chk_remove_title]").prop("checked", true);
			}
			if(sub_info.monitor_theme == "1") {
				sub_row.find("[name=ex_chk_scroll]").prop("checked", true);
			}
		}
		
		$("#"+tab_id+" select:last").change(function(e) {
			if($(e.target).find("option:selected").attr("realtime") == "Y") {
				$(e.target).val("-");
				$(e.target).trigger("change");
				alertify.warning('<i class="icon fa fa-ban"></i> '+ getMsgStr("s.realTcontents"));
				return false;
			}
		});
	}
	
	function addNupdateM() {
		var this_form = $("#modalAddUpdateM");
		
		var keyData = {
				monitor_cd : this_form.find("#monitor_cd").val()
		}
		var map = new Object();			
		
		var data = {
				monitor_title: this_form.find("#monitor_title").val(),
				monitor_sub_title: this_form.find("#monitor_sub_title").val(),
				monitor_title_en: this_form.find("#monitor_title_en").val(),
				monitor_sub_title_en: this_form.find("#monitor_sub_title_en").val(),
				monitor_title_etc: this_form.find("#monitor_title_etc").val(),
				monitor_sub_title_etc: this_form.find("#monitor_sub_title_etc").val(),
				header_view_yn: (this_form.find("#chk_remove_title").is(":checked") ? "Y":"N"),
				monitor_theme: (this_form.find("#chk_scroll").is(":checked") ? "1":"0"),
				monitor_alert_yn: (this_form.find("#chk_alert").is(":checked") ? "Y":"N"),
				contents_cd: this_form.find("#contents_combo").val(),
				monitor_scene: scene_cd,
				user_cd: user_cd
		}
		
		if(data.contents_cd == undefined || data.contents_cd == "-") {
			alertify.message('<i class="icon fa fa-ban"></i> '+ getMsgStr("s.select_contents"));
			return false;
		}
		
		var sub_map = [];
		var sub_contents_flag = false;
		var sub_contents_title = "";
		
		if($("#tabMonitorSub tbody tr").length > 0) {
			var sub_obj = {};
			$.each($("#tabMonitorSub tbody tr"), function(index, value) {
				if($(value).find("select").val() == undefined || $(value).find("select").val() == "-") {
					sub_contents_flag = true;
					return false;
				}
				
				if($(value).find("[name=ex_monitor_title_data]").val() == ""){
					sub_contents_flag = true;
					sub_contents_title="title"
					return false;	
				}else if($(value).find("[name=ex_monitor_sub_title_data]").val() == ""){
					sub_contents_flag = true;
					sub_contents_title="sub_title"
					return false;
				}
				
				const monitor_title_data = JSON.parse($(value).find("[name=ex_monitor_title_data]").val());
				const monitor_sub_title_data = JSON.parse($(value).find("[name=ex_monitor_sub_title_data]").val());
				
				sub_obj = {
						contents_cd: $(value).find("select").val(),
						monitor_title: monitor_title_data.ko,
						monitor_sub_title: monitor_sub_title_data.ko,
						monitor_title_en: monitor_title_data.en,
						monitor_sub_title_en: monitor_sub_title_data.en,
						monitor_title_etc: monitor_title_data.etc,
						monitor_sub_title_etc: monitor_sub_title_data.etc,
						// monitor_title: $(value).find("[name=ex_monitor_title]").val(),
						// monitor_sub_title: $(value).find("[name=ex_monitor_sub_title]").val(),
						// monitor_title_en: $(value).find("[name=ex_monitor_title_en]").val(),
						// monitor_sub_title_en: $(value).find("[name=ex_monitor_sub_title_en]").val(),
						header_view_yn: ($(value).find("[name=ex_chk_remove_title]").is(":checked") ? "Y" : "N"),
						monitor_theme: ($(value).find("[name=ex_chk_scroll]").is(":checked") ? "1" : "0"),
						// monitor_alert_yn: ($(value).find("[name=chk_alert]").is(":checked") ? "Y":"N"),
						monitor_scene: scene_cd,
						user_cd: user_cd
				};
				sub_map.push(sub_obj);
			});
		}
		
		if(sub_contents_flag) {
			if(sub_contents_title == "title"){
				alertify.message('<i class="icon fa fa-ban"></i> 서브 콘텐츠 타이틀을 입력해주세요' );
			}else if(sub_contents_title == "sub_title"){
				alertify.message('<i class="icon fa fa-ban"></i> 서브 콘텐츠 서브 타이틀을 입력해주세요' );
			}else{
				alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.select_subContents"));
			}
			
			return false;
		}
		
		var url = "";
		if(keyData.monitor_cd == undefined || keyData.monitor_cd == "") {
			url = "/monitor/insert";
			
			data.monitor_width = '300',
			data.monitor_height = '200',
			data.monitor_x = 130+($("#tabMonitor tbody tr").length*10),
			data.monitor_y = 15+($("#tabMonitor tbody tr").length*10)
		} else {
			url = "/monitor/update";
		}
		
		var param = {
				map : data,
				keyMap : keyData,
				subMap : sub_map
		}
		
		$("#overlay").show();
		
		$.ajax({
			url: url,
			type : "POST",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				if(result == 1) {
					alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.contents_configuration_modified"));
				} else {
					alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.contents_configuration_registered"));
				}
				
				configListMonitor();
				listMonitor(scene_cd);
				resetForm(scene_cd, "A");
				$("#overlay").fadeOut();
			},
			error: function (e) {
				console.log(e)
				
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.configuration_registration_failed"));
			}	
		});
	}
	
	function delMonitor(pCd) {
		alertify.confirm(getMsgStr("message.are_you_delete"))
		.set("title","<i class='icon fa fa-warning'></i> "+getMsgStr("w.warning"))
		.set('labels', {ok:getMsgStr("w.confirm"), cancel:getMsgStr("w.cancle")})
		.set('onok', function(closeEvent) {
			var param = {};
			var monitor_cd_arr = [];
			if(pCd == undefined){
				$('input[name="chkMonitor"]').each(function() {
					if($(this).prop('checked')){
						monitor_cd_arr.push($(this).val());
					}
				});
			}else{
				monitor_cd_arr.push(pCd);
			}
			param.monitor_cd_arr = monitor_cd_arr;
			
			if(monitor_cd_arr.length == 0){
				alertify.message('<i class="icon fa fa-warning"></i> ' + getMsgStr("s.configuration_to_delete"));
				alertify.confirm().close(); 
				return false;
			}
			
			$("#overlay").show();
			$.ajax({
				url : "/monitor/delete",
				type : "POST",
				dataType : "json",
				data:JSON.stringify(param),
				contentType:"application/json",
				success: function (result) {
					alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.contents_configuration_deleted"));
					if($("#size_box").is(":visible")) {
						$("#size_box").hide();
					}
					
					if($("#range_box").is(":visible")){
						resetSelected();
					}
					
//					for(var nIndexConf = 0; nIndexConf < monitor_cd_arr.length; nIndexConf++){
//						$("#contents_canvas").find("[monitor_cd="+monitor_cd_arr[nIndexConf]+"]").remove();
//					}
					
//					$("#contents_canvas").find("[monitor_cd="+pCd+"]").remove();
					configListMonitor();
					listMonitor(scene_cd);					
					$("#overlay").fadeOut();
				},
				error: function () {
					$("#overlay").fadeOut()
					alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.of_content_failed"));
				}
			});
		} ); 
	}
	
	function monitorSetMode(type) {
		var this_area = "";
		var hide_area = "";

		configListMonitor(type);
		
		if(type == 'S') {
			this_area = "singleMonitorArea";
			hide_area = "batchMonitorArea";
		} else if(type == 'B') {
			this_area = "batchMonitorArea";
			hide_area = "singleMonitorArea";
		}
		$("#" + hide_area).hide();
		$("#" + this_area).show();
//		$("#" + this_area).RisingSun({
//			timer:0,duration:500,wipe:"LR",ease:"easeInOutCubic",replay:true
//		});
//		$("#singleMonitorArea").removeAttr("style");
		
	}
	
	function listDynamicApi() { 
		var data = {
			orderBy : {
				"api_id":"asc"
			}
		};
		var mappingData = setMappingData("/dynamic_api/select/list", data);
		mappingData.success(function (result) {
			if(result.data != undefined && result.data.length > 0) {
				$("#dynamic_api_combo").off("change");
				$("#dynamic_api_combo").empty();
				$("#dynamic_api_combo").append("<option value='-'> - "+ getMsgStr("s.select_api") + "- </option>");
				$.each(result.data, function(index, value) {
					$("#dynamic_api_combo").append("<option value='"+value.api_id+"' api_type='"+value.api_type+"'>"+value.api_nm+"</option>");
				});
				
				$("#dynamic_api_combo").change(function(e) {
					
				});
			}
		});
	}
	
	function changeContentsType(pVal, subType) {
		//초기화
		resetForm("C");
		$("#sel_default_color").val("0").trigger("change");
		
		var c_sub_type = type_sub_info[pVal];
		
		$("#div_ext_set").hide();
		$("#div_ext_set .form-setup").empty();
		
		if(c_sub_type != undefined && c_sub_type != null && c_sub_type != '') {
			c_sub_type = unescapeHtml(c_sub_type)
			var sub_obj = JSON.parse(c_sub_type)
			var selectedTheme = '';
			var selectedType = '';
			if(subType != undefined && subType != null) {
				selectedTheme = subType.split('_')[0];
				selectedType = subType.split('_')[1];
			}
						
			if(sub_obj && sub_obj.theme) {
				$("#div_ext_set").show();
				$.each(sub_obj.theme, function(index, value) {
					$("#div_ext_set #sub_theme_area").append(
						'<div class="radio mt10 ml10 mr20">' + 
							'<input type="radio" id="theme_radio_'+index+'" name="theme_radio" value="'+index+'" '+(index == 0 ? "checked"  : "")+'>' +
							'<label for="theme_radio_'+index+'">'+value+'</label>' +
						'</div>'
					);
				});
				if(selectedTheme != '') {
					$("[name=theme_radio]").eq(selectedTheme).trigger("click")
				}
			}
			
			if(sub_obj && sub_obj.type) {
				$("#div_ext_set").show();
				$.each(sub_obj.type, function(index, value) {
					$("#div_ext_set #sub_type_area").append(
						'<div class="radio mt10 ml10 mr20">' + 
							'<input type="radio" id="type_radio_'+index+'" name="type_radio" value="'+index+'" '+(index == 0 ? "checked"  : "")+'>' +
							'<label for="type_radio_'+index+'">'+value+'</label>' +
						'</div>'
					);
				});
				if(selectedType != '') {
					$("[name=type_radio]").eq(selectedType).trigger("click")
				}
			}
		}
		
		if(pVal==12 || pVal==18 || pVal == 19 || pVal==23) {
			if(pVal == 19) {
				$("#div_img_set").show();
			} else {
				$("#div_img_set").hide();
			}
		} else {
			$("#div_table_set").hide();
			$("#div_chart_set").hide();
			$("#div_label_set").hide();
			$("#realtime_set").hide();
			$("#div_link_set").hide();
			
			if(pVal == 1 || pVal == 2 || pVal == 3 || pVal == 25 || pVal == 28 || pVal == 29 || pVal == 35 || pVal == 40) {
				$("#div_table_set").show();
				$("#realtime_set").show();
				$("#div_link_set").show();
			} else if(pVal == 4 || pVal == 5 || pVal == 6 || pVal == 7 || pVal == 8 || pVal == 14 || pVal == 16 || pVal == 21 || pVal == 22 || pVal == 31 || pVal == 32 ) {
				$("#div_chart_set").show();
				$("#realtime_set").show();
				$("#div_link_set").show();

				if (pVal === 7) {
					$("#pie_chart_set_area").show();
					subType && $("#pie_chart_display_type").val(subType);
				}
				else $("#pie_chart_set_area").hide();
//			} else if(pVal == 9 || pVal == 10 || pVal == 11 || pVal == 13 || pVal == 15 || pVal == 17 || pVal == 20 || pVal == 24 || pVal == 26 || pVal == 27) {
//			} else if(pVal == 17) {
//				$("#div_label_set").show();
//				$("#realtime_set").show();
			} else if (pVal == 36) {
				$("#realtime_set").show();
			}
		}
		
	}
	
	function changeContentsTypeP(this_contents_type){
		var data_val = "";
		var desc_val = "";
		$(".preview_popup").css("display","");
		if(this_contents_type == ""||this_contents_type == undefined) {
			$(".preview_popup").css("display","none");
			return false;
		}else if(this_contents_type == "1"||this_contents_type == "2"||this_contents_type == "3") {
			data_val = '[{col0:"192.168.0.13”,col1:172}<br/>,{col0:"192.168.0.14”,col1:78}…]	';
			desc_val = unescapeHtml(getMsgStr("contents.word_59"));
			
		}else if(this_contents_type == "25") {
			data_val = '[{col0:"US",col1:"미국,col2:237},<br/>{col0:"FR",col1:"프랑스,col2:179},<br/>{col0:"IR",col1:"이란,col2:145}…]	';
			//desc_val = 'col0 : 국가 코드<br/>col1 : 국가명<br/>col2 : 건수<span>(예시-33423/쌍따옴표 생략)</span>';
			desc_val = unescapeHtml(getMsgStr("contents.word_60"));
			
		}else if(this_contents_type == "28") {
			data_val = '[{col0:"이메일 공격",col1:"해킹메일을 발송하여…"},<br/>{col0:"악성코드감염",col2:홈페이지를 악용한…”},<br/>{col0:"시스템 침투",col1:"기관의 시스템 취약점을…”}…]';
			//desc_val = 'col0 : 타이틀 <br/>col1 : 내용';
			desc_val = unescapeHtml(getMsgStr("contents.word_61"));
		}else if(this_contents_type == "29") {
			data_val = '[<br/>{col0:”해킹메일1”},<br/>{col0:”해킹메일2”},<br/>{col0:”해킹메일3”},<br/>…]';
			//desc_val = 'col0 : 내용';
			desc_val = unescapeHtml(getMsgStr("contents.word_62"));
		}else if(this_contents_type == "17") {
			data_val = '[{"col0":30}]';
			//desc_val = 'col0 : 퍼센트 <span>(예시-0~100사이/쌍따옴표 생략)</span>';
			desc_val = unescapeHtml(getMsgStr("contents.word_63"));
			
		}else if(this_contents_type == "9"||this_contents_type == "10") {
			data_val = '[<br/>{col0:"공격IP탐지수",col1:23},<br/>{col0:"경보수",col1:568}<br/>…]';
			//desc_val = 'col0 : 타이틀 <br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span>';
			desc_val = unescapeHtml(getMsgStr("contents.word_64"));
			
		}else if(this_contents_type == "11") {
			data_val = '[<br/>{col0:"공격IP탐지수(개)",col1:489,col2:-4},<br/>{col0:"공격 트래픽량(Mbps)",col1:5261,col2:2327}<br/>…]';
			//desc_val = 'col0 : 타이틀<br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span><br/>col2 : 등락건수<span>(예시-33423/쌍따옴표 생략, 음수가능)</span><br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_65"));
			
		}else if(this_contents_type == "15") {
			data_val = '[<br/>{col0:"국내 탐지 건수",col1:363}<br/>]';
			//desc_val = 'col0 : 타이틀<br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span>';
			desc_val = unescapeHtml(getMsgStr("contents.word_60"));
			
		}else if(this_contents_type == "20") {
			
			data_val = '[<br/>{col0: ”GPS”,col1:936,col2:11},<br/>{col0: “Mbps”,col1:936,col2:-11}<br/>…]';
			//desc_val = 'col0 : 타이틀 <br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span><br/>col2 : 등락건수<span>(예시-33423/쌍따옴표 생략, 음수가능)</span>';
			desc_val = unescapeHtml(getMsgStr("contents.word_65"));
		}else if(this_contents_type == "26") {
			
			
			data_val = '[{col0:”CHINA”, <br/>col1:23, <br/>col2:1896, <br/>col3:”피해기관”, <br/>col4:”경보발생”}]';
			//desc_val = 'col0 : 헤더 타이틀 <br/>col1 : 건수1<span>(예시-33423/쌍따옴표 생략)</span><br/>col2 : 건수2<span>(예시-33423/쌍따옴표 생략)</span><br/>col3 : 타이틀1 <br/>col4 : 타이틀2<br/><br/>단일 JSON 오브젝트 데이터만 허용';
			desc_val = unescapeHtml(getMsgStr("contents.word_66"));
		}else if(this_contents_type == "27") {
			
			data_val = '[{col0:”탐지수”, col1:568},<br/>{col0:”경보수”, col1:223}…]';
			//desc_val = 'col0 : 타이틀 <br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span><br/>col2 : 건수2<span>(예시-33423/쌍따옴표 생략)</span><br/>col3 : 타이틀1<br/>col4 : 타이틀2<br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_67"));
			
		}else if(this_contents_type == "30") {
			
			
			data_val = '[<br/>{col0:”금일 공유 건수”, col1:1170, col2:” 금일 공유 건수”, col3:1012},<br/>{col0:”국내 탐지 건수”, col1:936, col2:”국내 탐지 건수”, col3:936}<br/>…]';
			//desc_val = 'col0 : 타이틀1 <br/>col1 : 건수1<span>(예시-33423/쌍따옴표 생략)</span><br/>col2 : 타이틀2 <br/>col3 : 건수2<span>(예시-33423/쌍따옴표 생략)</span><br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_68"));
		}else if(this_contents_type == "13") {
			
			
			data_val = '[{col0:"금일 공유 건수",col1:1170},<br/>{col0:"업체수",col1:1012}…]';
			//desc_val = 'col0 : 타이틀 <br/>col1 : 건수<span>(예시-33423/쌍따옴표 생략)</span><br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_64"));
		}else if(this_contents_type == "24") {
			
			
			data_val = '[{col0:"2"}]';
			//desc_val = 'col0 : 경보단계<span>(1:정상, 2:관심, 3:주의, 4:경계, 5:심각)</span> ';
			desc_val = unescapeHtml(getMsgStr("contents.word_69"));
			
		}else if(this_contents_type == "4"||this_contents_type == "5") {
			data_val = '{<br/>“timesArr”:["17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00"], <br/>“data”:<br/>[<br/>{"color":"","values":[{"x":0,"y":142},{"x":1,"y":142},{"x":2,"y":186},{"x":3,"y":182},{"x":4,"y":196},{"x":5,"y":189},{"x":6,"y":189},{"x":7,"y":226},{"x":8,"y":188},{"x":9,"y":187},{"x":10,"y":195},{"x":11,"y":194},{"x":12,"y":181}],"key":"INBOUND BPS(Mbps)"},<br/> {"color":"","values :[{"x":0,"y":312},{"x":1,"y":212},{"x":2,"y":216},{"x":3,"y":212},{"x":4,"y":136},{"x":5,"y":118},{"x":6,"y":129},{"x":7,"y":122},{"x":8,"y":58},{"x":9,"y":38},{"x":10,"y":79},{"x":11,"y":194},{"x":12,"y":218}],"key":"INBOUND PPS(Kpps)"} <br/>…]<br/>}';
			//desc_val = 'timesArr: 시간 Array<br/>data : chart data Json Array';
			desc_val = unescapeHtml(getMsgStr("contents.word_70"));	
			
		}else if(this_contents_type == "6"||this_contents_type == "8") {
			data_val = '{<br/>“timesArr”:["04-01", "04-02", "04-03", "04-04", "04-05", "04-06", "04-07"], <br/>“data”:<br/>[<br/>{"values":[{"x":0,"y":142},{"x":1,"y":186},{"x":2,"y":182},{"x":3,"y":196},{"x":4,"y":119},{"x":5,"y":189},{"x":6,"y":226}],"key":"유포지"},<br/>{"values":[{"x":0,"y":11},{"x":1,"y":283},{"x":2,"y":42},{"x":3,"y":36},{"x":4,"y":182},{"x":5,"y":136},{"x":6,"y":119},{"x":7,"y":19}],"key":"경유지"}<br/>…]<br/>}<br/>';
			//desc_val = 'timesArr: 시간 Array <br/>data : chart data Json Array<br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_70"));
			
		}else if(this_contents_type == "7") {
			data_val = '[<br/>{"col0":"Canon","col1":11.3},<br/>{"col0":"PanasonicHD","col1":14.5},<br/>{"col0":"Defeway","col1":17.7}<br/>…]';
			desc_val = 'chart data Json Array ';
			
		}else if(this_contents_type == "14") {
			data_val = '[<br/>{"id": "0","parent": "","name": "The World","value":"15"}, <br/>{"id": "1","parent": "0","name": "Asia","value":"3"},<br/>{"id": "1_1","parent": "1","name": "China","value":"1"},<br/>{"id": "1_2","parent": "1","name": "Korea","value":"1"}, <br/>{"id": "2","parent": "0","name": "Africa","value":"3"}, <br/>{"id": "3","parent": "0","name": "America","value":"3"}, <br/>{"id": "4","parent": "0","name": "Europe","value":"3"}, <br/>{"id": "5","parent": "0","name": "Oceanic","value":"3"}<br/>…]';
			desc_val = 'chart data Json Array ';
			
		}else if(this_contents_type == "16") {
			data_val = '{<br/>“categories”:["a.dns.kr","b.dns.kr","c.dns.kr","d.dns.kr","e.dns.kr","f.dns.kr"], <br/>“data”:<br/>[<br/>{"name":"600 msec","data":[10,5,65,0,0,0],"pointPlacement":"on"},<br/>{"name":"500 msec","data":[20,15,75,10,0,0],"pointPlacement":"on"}, <br/>{"name": "400 msec","data":[30,25,85,20,0,0],"pointPlacement":"on"}, <br/>{"name":"300 msec","data":[40,35,95,30,10,20],"pointPlacement":"on"},<br/>{"name":"200 msec","data": [50,45,105,40,20,30],"pointPlacement":"on"},<br/>{"name":"100 msec","data":[60,55,115,50,30,40],"pointPlacement":"on"}<br/>…]<br/>}';
			//desc_val = 'labels : 구간 Array<br/>data : chart data Json Array';
			desc_val = unescapeHtml(getMsgStr("contents.word_71"));
			
		}else if(this_contents_type == "21") {
			data_val = '{<br/>“timesArr”:["17:00","17:05","17:10","17:15","17:20","17:25","17:30","17:35","17:40","17:45","17:50","17:55","18:00"];<br/>”data”:[<br/>{"color":"#156a71","values":[{"x":0,"y":3},{"x":1,"y":3},{"x":2,"y":2},{"x":3,"y":1},{"x":4,"y":1},{"x":5,"y":1},{"x":6,"y":2},{"x":7,"y":3},{"x":8,"y":2},{"x":9,"y":0},{"x":10,"y":3},{"x":11,"y":2},{"x":12,"y":1}],"key":"방호태세등급변경"},<br/>{"color":"#ff0000","values":[{"x":0,"y":1},{"x":1,"y":2},{"x":2,"y":0},{"x":3,"y":2},{"x":4,"y":1},{"x":5,"y":1},{"x":6,"y":2},{"x":7,"y":1},{"x":8,"y":1},{"x":9,"y":2},{"x":10,"y":0},{"x":11,"y":1},{"x":12,"y":1}],"key":"방호태세조치건수"},<br/>{"color":"#156a71","values":[{"x":0,"y":3},{"x":1,"y":1},{"x":2,"y":0},{"x":3,"y":0},{"x":4,"y":0},{"x":5,"y":1},{"x":6,"y":1},{"x":7,"y":2},{"x":8,"y":1},{"x":9,"y":1},{"x":10,"y":2},{"x":11,"y":2},{"x":12,"y":0}],"key":"상황일지"},<br/>{"color":"#ff0000","values":[{"x":0,"y":4},{"x":1,"y":3},{"x":2,"y":0},{"x":3,"y":0},{"x":4,"y":2},{"x":5,"y":2},{"x":6,"y":2},{"x":7,"y":0},{"x":8,"y":1},{"x":9,"y":2},{"x":10,"y":1},{"x":11,"y":1},{"x":12,"y":0}],"key":"공지사항"},<br/>{"color":"#156a71","values":[{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":2},{"x":3,"y":1},{"x":4,"y":2},{"x":5,"y":2},{"x":6,"y":2},{"x":7,"y":0},{"x":8,"y":2},{"x":9,"y":1},{"x":10,"y":2},{"x":11,"y":3},{"x":12,"y":2}],"key":"미션진행율"},<br/>{"color":"#ff0000","values":[{"x":0,"y":2},{"x":1,"y":1},{"x":2,"y":1},{"x":3,"y":2},{"x":4,"y":0},{"x":5,"y":3},{"x":6,"y":3},{"x":7,"y":0},{"x":8,"y":3},{"x":9,"y":2},{"x":10,"y":2},{"x":11,"y":4},{"x":12,"y":1}],"key":"평가점수"}<br/>];<br/>}';
			//desc_val = 'timesArr: 구간 Array<br/>data : chart data Json Array<span>(값 범위는 0~4)</span><br/>';
			desc_val = unescapeHtml(getMsgStr("contents.word_72"));
		
		}else if(this_contents_type == "22") {
			data_val = '[{<br/>{"col0":"Angel", " col1":11}, {"col0":"Babal", "col1":32}, {<br/>{"col0":"Consol", "col1":45}, {"col0":"Depth", "col1":17}, {<br/>{"col0":"Earth", "col1":65}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
		
		}else if(this_contents_type == "31") {
			data_val = '[{<br/>{\"categories\":[\"Today\",\"Weeks\",\"Older\"],\"data\": [{\"name\": [\"A\",\"B\"], \"value\": [60.0,50.0]},{\"name\": [\"C\",\"D\"], \"value\": [40.0,30.0]},{\"name\": [\"E\",\"F\"], \"value\": [40.0,30.0]}]}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
			
		}else if(this_contents_type == "32") {
			data_val = '[{<br/>{[{\"name\": \"악성코드\",\"weight\": 12},{\"name\": \"트로이목마\",\"weight\": 8},{\"name\": \"개인정보\",\"weight\": 3},{\"name\": \"애드웨어\",\"weight\": 7},{\"name\": \"위협대응\",\"weight\": 7},{\"name\": \"시스템침투\",\"weight\": 5},{\"name\": \"매크로\",\"weight\": 2},{\"name\": \"보안\",\"weight\": 5},{\"name\": \"기타\",\"weight\": 2},{\"name\": \"랜섬웨어\",\"weight\": 9},{\"name\": \"클라우드\",\"weight\": 5},{\"name\": \"침입차단\",\"weigt\": 3},{\"name\": \"스마트폰\",\"weigt\": 4}]}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
		}else if(this_contents_type == "33") {
			
			data_val = '[{<br/>{"col0":"Persistence", " col1":18}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
		}else if(this_contents_type == "34") {
			
			data_val = '[{<br/>{\"col0\":\"Command and Control\",\"col1\":18,\"col2\":1}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
			
		}else if(this_contents_type == "35") {
			data_val = '[{<br/>{\"col0\":\"2021/11/12\",\"col1\":\"6 평 컨테이너 살던 노인, 2000억원대 땅부자였다.\",\"col2\":\"<font color="yellow">권고뉴스</font>\",\"col3\":\"A-뉴스\"}, {\"col0\":\"2021/11/12\",\"col1\":\"에스엠 홍콩 자회사, 이수만 일가에 지분 몰아주다\",\"col2\":\"<font color="yellow">권고뉴스</font\",\"col3\":\"A-뉴스\"}, {\"col0\":\"2021/11/12\",\"col1\":\"제2 테슬라 리비안 이틀간 57% 폭등…38세 CEO 2.6조 대박\",\"col2\":\"<font color="yellow">권고뉴스</font\",\"col3\":\"A-뉴스\"}, {\"col0\":\"2021/11/12\",\"col1\":\"코로나19 국민성금 노린 재향군인회의 불법계약\",\"col2\":\"<font color="white">보안뉴스</font>\",\"col3\":\"A-뉴스\"}{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
			
		}else if(this_contents_type == "36") {
			data_val = '[{<br/>[{\"col0\":\"탐지\",\"col1\":\"LAYER_ATTACKTYPESTATUS_KOREA\"},{\"col0\":\"분석\",\"col1\":\"LAYER_ANALYSYS\"},{\"col0\":\"대응\",\"col1\":\"LAYER_ATTACKACTION\"},{\"col0\":\"공유·협력\",\"col1\":\"LAYER_SHARE_WORD\"}]{<br/>…]{<br/>';
			desc_val = 'chart data Json Array';
			
		}else if(this_contents_type == "40") {
			data_val = '[{col0:"192.168.0.13”,col1:172}<br/>,{col0:"192.168.0.14”,col1:78}…]	';
			//desc_val = 'col0~colN 형태로 데이터 생성 <br/>[col형식]<br/>문자(예시-”데이터”)<br/>숫자(예시-33423/쌍따옴표 생략)<br/>국가코드(예시-”CN”)<br/>색상(예시-”#ff0000”)<br/>IP(예시-”127.0.0.1”)';
			desc_val = unescapeHtml(getMsgStr("contents.word_59"));
			
		}else if(this_contents_type == "41") {
			data_val = '[{col0:"2"}]';
			//desc_val = 'col0 : 경보단계<span>(1:정상, 2:관심, 3:주의, 4:경계, 5:심각)</span> ';
			desc_val = unescapeHtml(getMsgStr("contents.word_69"));
		}			
		
		var template_img = "/img/preview/"+this_contents_type+".jpg";
		
//		$("#template_data pre").remove();
//		$("#template_desc pre").remove();
		//console.log(unescapeHtml(desc_val));
		$("#template_img").prop("src", template_img);
		$("#template_data").html(data_val);
		$("#template_desc").html(unescapeHtml(desc_val));
	}
	
	
	var add_color = ["#61f3eb"];
	
	var colorOption ={
			showPalette: true,
			palette: [
				default_color
			],
			allowEmpty: true,
			preferredFormat: "hex",
			showInput: true,
			maxSelectionSize: 6
	}
	
	function addFormC(c_cd,c_title) {
		
		setAll2();
		resetForm("C","A");
		$("#contents_cd").val("")
		
		$("#contents_color").empty();
				
		$.each(color_arr, function(index, value) {
			$("#contents_color").append("<input type='text' id='color_" + index + "' value='"+value+"'>");
			colorOption.color = value;
			$("#contents_color input[type=text]:last").spectrum(colorOption);
		});
		$("#contents_color .sp-replacer").css("margin", "0 15px 0px 0");
		
		$("[name=cont_category_btn]").filter(".btn-light").removeClass("btn-light");
		$("[name=cont_category_btn]").addClass("btn-default");
		$("[name=cont_category_btn][value=all]").removeClass("btn-default");
		$("[name=cont_category_btn][value=all]").addClass("btn-light");
		
		listContents(c_cd,c_title);
		$("#modalAddUpdateC").modal();	   
		$("#dynamic_api_combo").off("change");			
		$("#dynamic_api_combo").select2( {dropdownParent: $("#modalAddUpdateC")} ).on("select2:open", function(e) {});
		
		// $("#dynamic_api_combo").change(function(e) {
		// 	if($("#dynamic_api_combo").find("option:selected").val() == '-'){
		// 		$("#formAddUpdateC").find("#contents_title").val("");
		// 	}else{
		// 		$("#formAddUpdateC").find("#contents_title").val($("#dynamic_api_combo").find("option:selected").text());	
		// 	}
		// });	
		
	}


	function changeApiType(this_val) {
		$("#contents_api").prop('disabled', false);
		$("#contents_api").val("");
		$("#dynamic_api_combo").prop('disabled', false);
		$("#dynamic_api_combo").val("-").trigger("change");
		
		$("#sel_contents_type").prop('disabled', true);
		$("#sel_contents_type").val("").trigger("change");
		
		$("[name=btn_api_check]").removeClass('badge-light-success');
		$("[name=btn_api_check]").addClass('badge-light-danger');
		$("[name=btn_api_check]").text(getMsgStr("c_form.word_56"));
//		$("[name=btn_api_param]").prop('disabled', false);
		
		$("#div_contents_api_set").hide();
		$("#div_dynamic_api_set").hide();
		$("#div_api_set").hide();
		$("#div_none_api_set").hide();
		$("#div_data_config_set").hide();
		$("#config_contents_tab li").eq(1).show();
		
		tabClear("tabColums");
		resetScroll("tabColums");
		tabClear("tabParams");
		resetScroll("tabParams");
		$("#api_param_list").val("");
		
		// contents api type : text api, dynamic api
		if(this_val == "0" || this_val == "1") {
			$("#div_api_set").show();
			$("#div_data_config_set").show();
			if(this_val == "0") {
				$("#div_contents_api_set").show();
			} else {
				$("#div_dynamic_api_set").show();
			}
		}
		// contents api type : none api
		if(this_val == "99") {
			$("#div_none_api_set").show();
			$("#config_contents_tab li").eq(1).hide();
		}
		
		if($(".api_param_pop").is(":visible")) {
			$(".api_param_pop").hide();
		}
	}
	
	function controllApiParamPop(pId) {
		
		if($("#"+pId).is(":visible")) {
			$("#"+pId).hide();
		} else {
			$("#"+pId).show();
		}
	}
		
	
	function getApiInfo() {
						
		var api_info_info = $("#dynamic_api_combo option:selected").val();
		
		if($("#apiInfoPop").is(":visible")) {
			$("#apiInfoPop").hide();
		} else {
			$("#apiInfoPop").show();
		}
				
		$.ajax({
			url: data_url+"/api/id/"+api_info_info,
			type :"POST",
			dataType:"json",
			contentType:"application/json",
			success: function (result) {
				
				if(result==null || result.length==0){
					$("#api_url").val(data_url+"/api/id/"+api_info_info);
					$("#api_data").val(getMsgStr("message.no_data") + getMsgStr("comm.word_2"));
				}else{
					$("#api_url").val(data_url+"/api/id/"+api_info_info);
					$("#api_data").val(JSON.stringify(result));
				}
			},
			error: function (e) {
				var c = e.getResponseHeader("Content-Type");
				$("#overlay").hide();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
				console.log(e);
			}
		});
		

	}
	
	function addParamRow() {
		var trData = "<tr class='ui-state-default'>"+
		"<td><input class='form-control tal' type='text' name='param_key' title='Key'></td>"+
		"<td><input class='form-control tal' type='text' name='param_val' title='Value'></td>"+
		"<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
		"</tr>";
		resetScroll("tabParams");
		addRow("tabParams", trData);
		setScroll("tabParams");
	}
	
	function setApiParam() {
		controllApiParamPop();
		
		var param_arr = [];
		var param_obj = {};
		$.each($("#tabParams tbody tr"), function(key, value) {
			var param_key = $(value).find("[name=param_key]").val();
			var param_val = $(value).find("[name=param_val]").val();
			
			if(param_key != "" && param_val != "") {
				param_obj = {};
				param_obj.key = param_key;
				param_obj.val = param_val;
				param_arr.push(param_obj);
			} else {
				$(value).find(".fa-times").trigger("click");
				return true;
			}
		});
		$("#api_param_list").val(JSON.stringify(param_arr));
	}
	
		function controllApiCheck(tag_id, val_tag) {
		var this_btn = $("#" + tag_id);
		
		$("#sel_contents_type").val("");
		$("#sel_contents_type").trigger("change");
		
		if(this_btn.hasClass("badge-light-success")) {
			$("#"+val_tag).prop('disabled', false);
			$("#sel_contents_type").prop('disabled', true);
//			$("[name=btn_api_param]").prop('disabled', false);
			
			this_btn.removeClass('badge-light-success');
			this_btn.addClass('badge-light-danger');
			this_btn.text(getMsgStr("c_form.word_56"));
			
			
		} else {
			$("#"+val_tag).prop('disabled', true);
//			$("[name=btn_api_param]").prop('disabled', true);
			$("#sel_contents_type").prop('disabled', false);
			this_btn.removeClass('badge-light-danger');
			this_btn.addClass('badge-light-success');
			this_btn.text(getMsgStr("c_form.word_76"));
		}
	}
	
	function checkAPI(tag_id, val_tag) {
		var api_val = $("#" + val_tag).val();
		
		if($("[name=api_type_radio]:checked").val() == "1") {
			//dynamic API checkAPi
			if(api_val == "-") {
				alertify.error(getMsgStr("s.select_dynamicApi"));
				$("#" + val_tag).focus();
				return false;
			} else {
				api_val = (data_url + "/api/id/" + api_val);
			}
		} else {
			//customizing API checkAPi
			if(api_val == "") {
				alertify.error(getMsgStr("s.enter_contents_api"));
				$("#" +val_tag).focus();
				return false;
			} else {
				if($("#apiServerCombo").val() != 1) {
					api_val = (data_url + api_val);
				}
			}
		}
		
		if($("#" + tag_id).hasClass("badge-light-success")) {
			controllApiCheck(tag_id, val_tag);
		} else {
			var mappingData = setMappingData(api_val, undefined);
			mappingData.success(function (result) {
				if(result.length > 0 || (result.data != undefined && result.data.length > 0)) {
					controllApiCheck(tag_id, val_tag);
				} else {
					alertify.error(getMsgStr("s.data_is_retrieved"));
				}
			});
			mappingData.error(function (result) {
				alertify.error(getMsgStr("s.data_is_retrieved"));
			});
		}
	}
	
	function resetForm(pType, pScope) {

		if(pType=="C"){			
			
			$("#div_table_set").hide();
			$("#div_link_set").hide();
			$("#div_chart_set").hide();
			$("#div_label_set").hide();
			$("#div_img_set").hide();
			$("#link_icon").val("");
			$("#link_value").val("");
			
			
			$("#realtime_set").hide();
			tabClear("tabColums"); 
			tabClear("tabLabels");
			tabClear("tabLinks");
			
			if(pScope=="A") {
				
				$("#config_contents_tab li:eq(0) a").trigger("click");
				$('#formAddUpdateC')[0].reset();
				changeApiType("-");
				$("#sel_contents_type").prop("disabled", true);
				$("#contents_api").prop('disabled', false);
				$("[name=btn_api]").removeClass('badge-light-success');
				$("[name=btn_api]").addClass('badge-light-danger');
				$("[name=btn_api]").text('Check');
				$("#tabContents tbody tr").removeClass("click");
				$("#contents_cd").val("");
				
			}						

			resetColor('C');


		} else {
			
			if(pScope=="A") {
				
				if($("#contents_combo").find("option:selected").val() == '-'){
					$("#formAddUpdateM").find("#monitor_title").val("");
				}else{
					$("#formAddUpdateM").find("#monitor_title").val($("#contents_combo").find("option:selected").text());	
				}
				
				$("#tabMonitor tbody tr").removeClass("click");
				tabClear("tabMonitorSub");
				$("#formAddUpdateM").find("#monitor_cd").val("");
				$("#formAddUpdateM")[0].reset();
				$("#contents_combo").val($("#contents_combo option").eq(0).val());
				$("#contents_combo").trigger("change");
				$.each(color_arr, function(index, value) {
					$("#contents_color").append("<input type='text' id='color_" + value.idx + "' value='"+value.d_color+"'>");
					colorOption.color = value.d_color;
					$("#contents_color input[type=text]:last").spectrum(colorOption);
				});
			}
		}
	}
	
	function setMappingData(pUrl, pParam, apiParam) {
		var param = {};
		
		var api_param = {};
		if($("#api_param_list").val() != "" && $("#api_param_list").val() != '[]') {
			$.each($.parseJSON($("#api_param_list").val()), function(index, value) {
				api_param[value.key] = value.val;
			});
			param = api_param;
		}
		
		
		if($("#timeVal").val() != undefined && $("#timeVal").val() != null) {
			param.stime = $("#timeSVal").val();
			param.time = $("#timeVal").val();
		}
		
		if($("#sel_grp_cd").val() == "") {
			param.grpCd = ss_grp_cd;
		} else {
			param.grpCd = $("#sel_grp_cd").val();
		}
		
		if(pParam != undefined) {
			param.map = pParam
		}
		
		return $.ajax({
			url: pUrl,
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
			},
			error: function (result) {
			}
		});
	}
	
	function delColorsRow(type) { 
		
		
		var div_id = "";
		if(type == "C"){
			
			div_id = "contents_color"
			
		}else{
			
			div_id = "default_color"
			
		}
				
		var color_len = $("#"+div_id).children("input").length;					
		
		if(color_len == 10){
			
			alertify.error(getMsgStr("s.not_delete_color"));
			
			return false;
			
		}
						
		$("#"+div_id).children(" div:last").remove();
		$("#"+div_id+" input:last").remove();
		$("#sel_default_color").val("");							
	}	

	
	function addColorsRow(type) { 
		
		var div_id = "";
		if(type == "C"){
			
			div_id = "contents_color"
			
		}else{
			
			div_id = "default_color"
			
		}
		var color_len = $("#"+div_id).children("input").length;	
		
		if(color_len == 20){
			
			alertify.error(getMsgStr("s.no_add_color"));
			
			return false;
			
		}
		
		$.each(add_color, function(index, value) {				
			$("#"+div_id).append("<input type='text' id='color_" + color_len + "' value='"+value+"'>");
			colorOption.color = value;
			$("#"+div_id+" input[type=text]:last").spectrum(colorOption);
		});
		$("#"+div_id+" .sp-replacer").css("margin", "0 15px 0px 0");
		$("#sel_default_color").val("");
	}	
	
	
	function addColumsRow(tag_id) { 
		var contents_api = "";
		if($("[name=api_type_radio]:checked").val() == "0") {
			contents_api = $("#contents_api").val();
		} else if($("[name=api_type_radio]:checked").val() == "1") {
			contents_api = (data_url + "/api/id/" + $("#dynamic_api_combo").val());
		}
		// if ($("#tabColums tbody tr").length >= $("#maxColum").val()) {
			// alertify.message(`<i class="icon fa fa-warning"></i> 최대 컬럼 수는 ${$("#maxColum").val()}개 입니다.`);
			// return false
		// }
		
		var mappingData = setMappingData(contents_api, undefined);
		mappingData.success(function (data) {
			var trData = "<tr class='ui-state-default'>"+
			"<td><span class='drag_hover'><i class='icon fa fa-ellipsis-v fa-2x ml10 mr5'></i><i class='icon fa fa-ellipsis-v fa-2x'></i></td>"+
			"<td><input type='hidden' name='columNmData'><div class='input-group'><input class='form-control tal' type='text' name='columNm_view' title='Colum Name' readonly><button type='button' class='input-group-addon' onclick='openLangPop(event)'><i class='fa fa-edit'></i></button></div></td>"+
			// "<td><input class='form-control tal' type='text' name='columNmEn' title='Colum Name'></td>"+
			"<td><input class='form-control' type='text' name='columSize' title='Colum Size(%)'></td>"+
			"<td><input class='form-control' type='text' name='columLength' title='Colum length(Number of characters)'></td>"+
			"<td><select class='form-control' name='columFormat' title='Format'><option value='0'>- Format -</option><option value='1'>Number</option><option value='2'>Flag</option><option value='3'>IP</option><option value='4'>Color</option><option value='5'>TimeStamp</option><option value='6'>Image</option><option value='7'>CHIP</option></select></td>"+
			"<td><select class='form-control' name='columData' title='Data Colum'><option value='0'>- Data Colum -</option>";
			
			
			$.each(data[0], function(key, value) {
				trData += "<option value='"+key+"'>"+key+"("+value+")</option>";
			});
			trData +="</select></td>"+
			"<td>" +
			"<button type='button' class='badge ml5 badge-light-danger link_area' onclick='setContentsLink(this);'>"+getMsgStr("menu.config")+"</button>" +
			"<input type='hidden' name='link_info_value' />"+
			"</td>"+
			"<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
			"</tr>";
			resetScroll("tabColums");
			addRow("tabColums", trData);
			setScroll("tabColums");
		});
	}
	
	function addLinkRow() {
		let link_value = $("#link_value").val();
		if(link_value == "") {
			alertify.error(getMsgStr("s.enter_link_url"));
			$("#link_value").focus();
			return false;
		} else {
			let duple_flag = false;
			$.each($("#tabLinks tbody tr"), function(index, value) {
				if($(value).find("[name=linkUrl]").val() == link_value) {
					duple_flag = true;
					return false;
				}
			});
			if(duple_flag) {
				alertify.message('<i class="icon fa fa-warning"></i> ' + getMsgStr("s.dupl_link_url") );
				$("#link_value").focus();
				return false;
			}			
			let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
				if(!regex.test(link_value)) {
					alertify.error(getMsgStr("s.check_link_url"));
					$("#link_value").focus();
					return false;
				}
			resetScroll("tabLinks");
			
			let link_icon = nvl($("#link_icon").val(), "-");
			let link_icon_txt = $("#link_icon option:selected").text();
			if(link_icon == "") {
				link_icon_txt = "";
			}
			
			var trData = "<tr class='ui-state-default'>"+
			"<td width='10%'><input type='hidden' name='linkIcon' value='"+link_icon+"' /><span class='fa'>"+ link_icon_txt + "</span></td>"+
			"<td width='80%'><input class='form-control tal' type='text' placeholder='Link URL' name='linkUrl' title='Link URL' value='" + link_value + "' disabled='true'></td>"+
			"<td width='5%'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
			"</tr>";
			addRow("tabLinks", trData);
			setScroll("tabLinks",600);
			
			$("#link_icon").val("");
			$("#link_value").val("");
		}
	}
	
	function addLabelsRow() {
		var contents_api = $("#contents_api").val();
		if($("[name=btn_api]").hasClass("badge-light-danger")){
			alertify.error(getMsgStr("s.search_the_data"));
			$("#contents_api").focus();
		}else{
			resetScroll("tabLabels");
			var mappingData = setMappingData($("#contents_api").val(), undefined);
			mappingData.success(function (data) {
				var trData = "<tr class='ui-state-default'>"+
				"<td><input type='hidden' name='columNmData'><div class='input-group'><input class='form-control tal' type='text' name='columNm_view' title='Colum Name' readonly><button type='button' class='input-group-addon' onclick='openLangPop(event)'><i class='fa fa-edit'></i></button></div></td>"+
				// "<td><input class='form-control tal' type='text' name='columNmEn' title='Colum Name'></td>"+
				"<td><select class='form-control' name='columData' title='Data Colum'><option value='0'>- Data Colum -</option>";
				$.each(data[0], function(key, value) {
					trData += "<option value='"+key+"'>"+key+"("+value+")</option>";
				});
				trData +="</select></td>"+
				"<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
				"</tr>";
				addRow("tabLabels", trData);
			});
			setScroll("tabLabels",600);
		}
	}
	
	function delColumsRow(obj) {
		let table_id = $(obj).closest("table").parent().closest("table").attr("id");
		if(table_id != undefined) {
			resetScroll(table_id);
		}
		$(obj).closest("tr").remove();
		if(table_id != undefined) {
			setScroll(table_id);
		}
	}
	
	function resetColor(type){
		
		//var div_id = "";
		var div_id = "default_color"
		
		$("#"+div_id).empty();
		
		$.each(default_color_set, function(index, value) {
			if(index == $("#set_default_color").val()){
				$.each(value,function(index2,value2){
					$("#"+div_id).append("<input type='text' id='color_" + index2 + "' value='"+value2+"'>");
					colorOption.color = value2;
					
					$("#"+div_id+" input[type=text]:last").spectrum(colorOption);
					
				});
			}
		});
		
		
			
		$("#"+div_id+" .sp-replacer").css("margin", "0 15px 0px 0");
	
	}
	
	function addNupdateC() {
		var keyData = {
			contents_cd : $("#contents_cd").val()
		}
		
		var contents_type = "";
		var contents_api_type = $("[name=api_type_radio]:checked").val();
		
		if(contents_api_type == "99") {
			contents_type = $("#none_contents_combo").val();
		} else {
			contents_type = $("#sel_contents_type").val();
		}
		var contents_api = "";
		var api_id = "";
		var api_server_type = "";
		
		if(contents_api_type == "0") {
			contents_api = $("#contents_api").val();
			api_server_type = $("#apiServerCombo").val();
		} else if(contents_api_type == "1") {
			contents_api = ("/api/id/" + $("#dynamic_api_combo").val());
			api_id = $("#dynamic_api_combo").val();
		}
		
		if(contents_type == 19) {
			contents_api = $("#img_url").val();
		}
		if(!validChk($("#contents_title").val(), getMsgStr("s.enter_contents_title"), "null", "contents_title")) return false;
		
		if(contents_api_type == undefined) {
			alertify.message(getMsgStr("s.select_api_type"));
			return false;
		}
		
		if(contents_api_type != "99") {
			if(!validChk(contents_api, getMsgStr("s.enter_contents_api"), "null", "contents_api")) return false;
		}
		
		if(contents_type == "") {
			alertify.message(getMsgStr("s.select_contents_type"));
			return false;
		}
		
		var link_info = {};
		if(document.getElementById("div_chart_set").style.display !== 'none' && $("#chart_link_type").val() != "") {
			link_info.type = $("#chart_link_type").val();
			if(link_info.type == "C") {
				link_info.contents_cd = $("#chart_link_contents").val();
			} else {
				link_info.url = $("#chart_link_url").val();
			}
		}
		if(contents_type == 19) {
			link_info.type = "U";
			link_info.url = $("#img_link_url").val();
		}

		var contents_sub_type = '';
		
		if($("[name=theme_radio]").length > 0) {
			contents_sub_type = $("[name=theme_radio]:checked").val();
			contents_sub_type = (contents_sub_type == undefined || contents_sub_type == '' ? '' : contents_sub_type)
		}
		
		if($("[name=type_radio]").length > 0) {
			contents_sub_type += '_' + $("[name=type_radio]:checked").val();
		}

		if (contents_type == 7) { //pie chart
			contents_sub_type = $("#pie_chart_display_type").val();
		}
		
		var data = {
			contents_title: $("#contents_title").val(),
			contents_api: contents_api,
			api_id: api_id,
			api_server_type: api_server_type,
			contents_type: contents_type,
			contents_sub_type: contents_sub_type,
			contents_link: (Object.keys(link_info).length == 0 ? "" : JSON.stringify(link_info)),
			realtime_flag: ($("#realtime_chk").is(":checked") ? "Y":"N"),
			pastdata_flag: ($("#pastdata_chk").is(":checked") ? "Y":"N"),
			rotation_flag: ($("#rotation_chk").is(":checked") ? "Y":"N")
		}
		
		if(data.realtime_flag == "Y") {
			if($("#data_reload_cycle").val() == "") {
				alertify.error(getMsgStr("s.enter_rotation_time"));
				$("#data_reload_cycle").focus();
				return false;
			} else {
				data.data_reload_cycle = $("#data_reload_cycle").val();
			}
		}
		
		var url = "/contents/insert";
		if($("#contents_cd").val()!="") {
			url = "/contents/update";
		}
				
		var api_param_arr = [];
		if($("#api_param_list").val() != "" && $("#api_param_list").val() != '[]') {
			var api_param_obj = {};
			$.each($.parseJSON($("#api_param_list").val()), function(index, value) {
				api_param_obj = {};
				api_param_obj.key = value.key;
				api_param_obj.val = value.val;
				api_param_arr.push(api_param_obj);
			});
		}
		
		var color_arr = [];
		var color_obj = {};
		
		$.each($("#contents_color input[type=text]"), function(index, value) {
			
			color_obj = {};
			color_obj.idx = (index + 1);
			color_obj.color = $(value).val();
			color_arr.push(color_obj);
		});
				
			
		var colum_nm_arr = [];
		var colum_nm_en_arr = [];
		var colum_nm_etc_arr = [];
		var colum_size_arr = [];
		var colum_len_arr = [];
		var colum_format_arr = [];
		var colum_data_arr = [];
		var colum_link_arr = [];
		
		$.each($("input[name=columNmData]"), function(key, value) {
			let columNmData = {
				ko:null,
				en:null,
				etc:null
			}
			try {
				columNmData = JSON.parse($("input[name=columNmData]").eq(key).val());
			} catch (error) {
				
			}
			colum_nm_arr.push(columNmData.ko);
			colum_nm_en_arr.push(columNmData.en);
			colum_nm_etc_arr.push(columNmData.etc);
			colum_size_arr.push($("input[name=columSize]").eq(key).val());
			colum_len_arr.push($("input[name=columLength]").eq(key).val());
			colum_format_arr.push($("select[name=columFormat] option:selected" ).eq(key).val());
			colum_data_arr.push($("select[name=columData] option:selected" ).eq(key).val());
			colum_link_arr.push($("input[name=link_info_value]").eq(key).val());
		});
				
		
		var link_icon_arr = [];
		var link_value_arr = [];
		$.each($("#tabLinks tbody tr"), function(index, value) {
			link_icon_arr.push($(value).find("[name=linkIcon]").val());
			link_value_arr.push($(value).find("[name=linkUrl]").val());
		});
		
		var param = {
				map:data,
				keyMap:keyData,
				api_param_arr: api_param_arr,
				colum_nm_arr: colum_nm_arr,
				colum_nm_en_arr: colum_nm_en_arr,
				colum_nm_etc_arr: colum_nm_etc_arr,
				colum_size_arr: colum_size_arr,
				colum_len_arr: colum_len_arr,
				colum_format_arr: colum_format_arr,
				colum_data_arr: colum_data_arr,
				colum_link_arr: colum_link_arr,
				link_icon_arr: link_icon_arr,
				link_value_arr: link_value_arr,
				colorArr:color_arr
		}
		$("#overlay").show();
		
		$.ajax({
			url: url,
			type : "POST",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {				
				if($("#contents_cd").val()==""){
					alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.the_contents_registered"));
				} else {
					alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.the_contents_modified"));
				}
				
				resetForm("C", "A");
				listContents();
				setSelContents();
				$("#overlay").fadeOut();
			},
			error: function (e) {
				console.log(e)
				
				$("#overlay").fadeOut();
				if($("#contents_cd").val()==""){
					alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.contents_registration_failed"));
				} else {
					alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.to_modify_contents"));
				}
			}	
		});
	}
	
	function addNupdateD() {
		
		var keyData = {
			d_color_cd : $("#set_default_color").val()
		}

		var data = $.extend({}, keyData);
		
		var color_arr = [];
		var color_obj = {};
		
		$.each($("#default_color input[type=text]"), function(index, value) {
			color_obj = {};
			color_obj.idx = (index + 1);
			color_obj.d_color = $(value).val();
			color_arr.push(color_obj);
		});

		var param = {
			
			keyMap:keyData,
			colorArr:color_arr
		}
		
		$("#overlay").show();
				
		 $.ajax({
			url : "/contents/update_color",
			type : "POST",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				
				$('#colorModal').modal('hide');
				alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.the_contents_registered"));
				
				$("#set_default_color").val("0").trigger("change");
				window.color_arr = getDefaultColor();
				
				$("#overlay").fadeOut();
			},
			error: function (e) {
				$("#overlay").fadeOut();
				
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.contents_registration_failed"));
			}
		});

	}
	
	
	function enterkey() {
		if (window.event.keyCode == 13) {
			listContents();
		}
	};
	
	function listContents(c_cd,c_title){
		var data = {
				orderBy : {
					"contents_title":"asc"
				}
		};
		data.contents_title = {
			type:"L",
			val:$("#search_contents").val()
		}
		var category_btn = $("[name=cont_category_btn].btn-light");
		
		if(category_btn.length > 0 && category_btn.val() != "all") {
			var type_arr = [];
			$.each(type_info, function(index, value){
				if(value.indexOf(category_btn.val()) > -1) {
					type_arr.push(index);
				}
			});
			if(type_arr.length > 0) {
				data.contents_type = {
					type:"I",
					val:type_arr
				}
			}
		}
		
		var param = {
			map : data
		}
		
		resetForm('C','A');
		
		$("#overlay").show();
		$.ajax({
			url: "/contents/select/list",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				resetScroll("tabContents");
				tabClear("tabContents"); 
				var getIdx;
				$("#totConCnt").text(getMsgStr("comm.word_3") + ":" + result.total + getMsgStr("particle.cnt"))
				if(result.data.length>0) {
					$.each(result.data, function(index, value) {
						var type_nm = $("#modalAddUpdateC").find("[name=contents_type_combo]").find("option[value='"+value.contents_type+"']").text();
						
						var tmp_tr = "<tr id='tr_" + value.contents_cd + "'>"+
						"<td class='tac'><div class='checkbox mt4'><input onclick='javascript:chkBox(\"chkContentsAll\", \"chkContents\")' id='chk_contents_"+index+"' name='chkContents' type='checkbox' value='"+value.contents_cd+"'><label for='chk_contents_"+index+"'></label></div></td>" +
						"<td class='hover' onclick='javascript:clickTr(\"tabContents\", " + index + ");getContents(\"" + value.contents_cd + "\")'>" + nvl(value.contents_title, "-") + "</td>" +
						"<td class='hover' onclick='javascript:clickTr(\"tabContents\", " + index + ");getContents(\"" + value.contents_cd + "\")'>" + type_nm + "<div class='fr mr10 icon_none'><i class='icon fa fa-trash hover ml5 mr5 fr mt3' onclick='delContents(\"" + value.contents_cd + "\")'></i></td>" +
						"</tr>";
						addRow("tabContents", tmp_tr);
						
						if(value.contents_title == c_title){
							getIdx = index
						}
					});
					
					setScroll("tabContents",495);
				
					
				} else {
					$("#tabContents tbody").append("<tr><td colspan='10' class='tac'>"+getMsgStr("message.no_data")+"</td></tr>");
				}
				
				setTimeout(function() {
					//var offset = $("#tabContents .st-body-table tbody tr:eq("+getIdx+")").offset();
					var position = $("#tabContents .st-body-table tbody tr:eq("+getIdx+")").position();

					if(c_cd != null || c_title != undefined){
						clickTr("tabContents",getIdx);
						$("#tabContents .st-body-scroll").animate({scrollTop : position.top-260}, 900);

						getContents(c_cd);
					}
				}, 200);
			
				
				$("#overlay").fadeOut();
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
		
	}
	
	
	function getContents(pCd) {
		resetForm('C');
		var param = {
			contents_cd : pCd,
			orderBy : {
				"contents_sub_order":"asc"
			}
		}

		$("#overlay").show();
		$.ajax({
			url : "/contents/select/get",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
			
			$("#config_contents_tab li:eq(0) a").trigger("click");								
				
				var contents_cd = result.data.contents_cd;
				var c_type = result.data.contents_type;
				var c_sub_type = result.data.contents_sub_type;
				
				$("#api_info_area").val(result.data.contents_api);
				$("#contents_cd").val(contents_cd);
				$("#contents_title").val(unescapeHtml(result.data.contents_title));
				
				var api_server_type = (result.data.api_server_type == 1 ? 1 : 0)
				$("#apiServerCombo").val(api_server_type)
				
				if(c_type == 12 || c_type == 18 || c_type == 19 || c_type == 23) {
					$("#api_type_radio_99").trigger("click");
					$("#none_contents_combo").val(c_type);
					if(c_type == 19) {
						
						$("#img_url").val(result.data.contents_api);
						let link_obj = null;
						if (result.data.contents_link) {
							link_obj = JSON.parse(unescapeHtml(result.data.contents_link));
						$("#img_link_url").val(link_obj.url);
						}
					}
				} else {
					if(result.data.api_id != null && result.data.api_id != undefined && result.data.api_id != "") {
						$("#api_type_radio_1").trigger("click");
						$("#dynamic_api_combo").val(result.data.api_id).trigger("change");
						controllApiCheck('btn_dynamic_api','dynamic_api_combo');
					} else {
						$("#api_type_radio_0").trigger("click");
						$("#contents_api").val(result.data.contents_api);
						controllApiCheck('btn_api','contents_api');
					}
					$("#sel_contents_type").val(c_type);
				}
				
				changeContentsType(c_type, c_sub_type);
				changeContentsTypeP(c_type);
				
				if(result.data.realtime_flag == "Y") {
					if(!$("#realtime_chk").is(":checked")) {
						$("#realtime_chk").trigger("click");
					}
					$("#data_reload_cycle").val(result.data.data_reload_cycle);
				} else {
					if($("#realtime_chk").is(":checked")) {
						$("#realtime_chk").trigger("click");
					}
					$("#cycle_set").hide();
					$("#data_reload_cycle").val("");
				}
				
				if(result.data.pastdata_flag == "Y") {
					$("#pastdata_chk").prop("checked", true);
				} else {
					$("#pastdata_chk").prop("checked", false);
				}
				
				if(result.data.rotation_flag == "Y") {
					$("#rotation_chk").prop("checked", true);
				} else {
					$("#rotation_chk").prop("checked", false);
				}
				
				if(result.data_param != null && result.data_param != undefined && result.data_param.length > 0) {
					$.each(result.data_param, function(index, value) {
						addParamRow();
						$("#tabParams tbody tr:last").find("[name=param_key]").val(value.key_nm);
						$("#tabParams tbody tr:last").find("[name=param_val]").val(value.val);
					});
				}
				
				if(c_type==1||c_type==2||c_type==3||c_type==9||c_type==10||c_type==11||c_type==13||c_type==15
						||c_type==20||c_type==24||c_type==25||c_type==26||c_type==27||c_type==28||c_type==29||c_type==33||c_type==34||c_type==35||c_type==36||c_type==37||c_type==38||c_type==39||c_type==40||c_type==41){
					if(c_type==1||c_type==2||c_type==3||c_type==25||c_type==28||c_type==29||c_type==35||c_type==40||c_type==50) {
						tabClear("tabColums");
						resetScroll("tabColums");						
						tabClear("tabLinks");
					} else {
						resetScroll("tabLabels");
						tabClear("tabLabels"); 
					}					
					if(result.data_sub.length>0){
						var mappingData = setMappingData((api_server_type == 1 ? '' : data_url) + result.data.contents_api, undefined);
						mappingData.success(function (result2){		
							
							$.each(result.data_sub, function(key2, value2) {		
								const columNmData = {
									ko: value2.contents_sub_nm || "",
									en: value2.contents_sub_nm_en || "",
									etc: value2.contents_sub_nm_etc || ""
								}													
								var trData = "<tr class='ui-state-default'>";
								if(c_type==1||c_type==2||c_type==3||c_type==25||c_type==28||c_type==29||c_type==35||c_type==40) {
									trData +="<td><span class='drag_hover'><i class='icon fa fa-ellipsis-v fa-2x ml10 mr5'></i><i class='icon fa fa-ellipsis-v fa-2x'></i></td>";
								}
								trData +="<td><input type='hidden' name='columNmData' value='"+JSON.stringify(columNmData)+"'><div class='input-group'><input class='form-control tal' type='text' name='columNm_view' title='Colum Name' value='"+ nvl((lang_set === 'ko' ? value2.contents_sub_nm : value2[`contents_sub_nm_${lang_set}`]),"") +"' readonly><button type='button' class='input-group-addon' onclick='openLangPop(event)'><i class='fa fa-edit'></i></button></div></td>";
								// trData +="<td><input class='form-control tal' type='text' name='columNmEn' title='Colum Name("+getMsgStr("w.english")+")' value='"+nvl(value2.contents_sub_nm_en,"")+"'></td>";
								if(c_type==1||c_type==2||c_type==3||c_type==25||c_type==28||c_type==29||c_type==35||c_type==40) {
									trData +="<td><input class='form-control' type='text' name='columSize' title='Colum Size(%)' value='"+nvl(value2.contents_sub_size,"")+"'></td>";
									trData += "<td><input class='form-control' type='text' name='columLength' title='Colum length(Number of characters)' value='"+nvl(value2.contents_sub_length,"")+"'></td>";
									trData += "<td><select class='form-control' name='columFormat' title='Format'><option value='0'>- Format -</option><option value='1'>Number</option><option value='2'>Flag</option><option value='3'>IP</option><option value='4'>Color</option><option value='5'>TimeStamp</option><option value='6'>Image</option><option value='7'>CHIP</option></select></td>";
								}
								trData += "<td><select class='form-control' name='columData' title='Data Colum'><option value='0'>- Data Colum -</option>";
								$.each(result2[0], function(key, value) {									
									var selStr = "";
									if(value2.contents_sub_data==key) {
										selStr = "selected";
									}
									trData += "<option value='"+key+"' "+selStr+">"+key+"("+value+")</option>";
								});
								trData +="</select></td>";
								if(c_type==1||c_type==2||c_type==3||c_type==25||c_type==28||c_type==29||c_type==35||c_type==40) {
									trData +='<td>'+
									'<button type="button" class="badge ml5 badge-light-'+((value2.contents_sub_link != undefined && value2.contents_sub_link != '') ? "success":"danger")+
									' link_area" onclick="setContentsLink(this);">'+getMsgStr("menu.config")+'</button>'+
									'<input type="hidden" name="link_info_value" value="" />'+
									'</td>';
									
								}
								trData +="<td class='tac'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>";
								trData +="</tr>";
								if(c_type==9||c_type==10||c_type==11||c_type==13||c_type==15||c_type==20||c_type==24||c_type==26||c_type==27||c_type==30||c_type==33||c_type==34||c_type==36||c_type==37||c_type==38||c_type==39||c_type==41||c_type==50) {
									addRow("tabLabels", trData);
									setScroll("tabLabels",600);
								} else {
									addRow("tabColums", trData);
									if(value2.contents_sub_link != undefined && value2.contents_sub_link != "") {
										$("[name=link_info_value]:last").val(unescapeHtml(value2.contents_sub_link));
									}
									setScroll("tabColums",600);
								}
								$("select[name=columFormat]:last").val(value2.contents_sub_format);
							});
						});
						
						mappingData.error(function (result) {
							
							$("[name=btn_api_check]").removeClass('badge-light-success');
							$("[name=btn_api_check]").addClass('badge-light-danger');
							$("[name=btn_api_check]").text(getMsgStr("c_form.word_56"));
							
							alertify.error(getMsgStr("s.data_is_retrieved"));
						});
						
					}
				} else {
					$("#chart_link_url").val("");
					$("#chart_link_type").val("");
//					$("#realtime_set").show();
					
					$(".chart_link_contents").empty();
					
					var link_contents = "<select class='form-control' id='chart_link_contents' name='chart_link_contents' style='width:270px;'>"+optionContentsData+"</select>";
					$(".chart_link_contents").append(link_contents);
					
					let link_info = unescapeHtml(result.data.contents_link);
					let link_obj = {};
					if(link_info != undefined && link_info != null && link_info != "") {
						link_obj = $.parseJSON(link_info);
						$("#chart_link_type").val(link_obj.type);
						$("#chart_link_type").trigger("change");
						
						if(link_obj.type == "C") {
							$("#chart_link_contents").val(link_obj.contents_cd);
						} else if(link_obj.type == "U") {
							$("#chart_link_url").val(link_obj.url);
						}
					} else {
						$("#chart_link_type").trigger("change");
					}
					
					$("#chart_link_contents").select2({dropdownParent: $('#modalAddUpdateC')})
					.on('select2:open', function (e) {});

					
					
					
				}
				
				resetScroll("tabLinks");
				
				if(result.data_link != undefined && result.data_link.length > 0) {
					$.each(result.data_link, function(index, value) {
						var link_icon_txt = "-";
						if(value.link_icon != "") {
							link_icon_txt = $("#link_icon option[value="+value.link_icon+"]").text();
						}
						
						var trData = "<tr class='ui-state-default'>"+
						"<td width='10%'><input type='hidden' name='linkIcon' value='"+value.link_icon+"' /><span class='fa'>"+ link_icon_txt + "</span></td>"+
						"<td width='80%'><input class='form-control tal' type='text' placeholder='Link URL' name='linkUrl' title='Link URL' value='" + value.link_value + "' disabled='true'></td>"+
						"<td width='5%'><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
						"</tr>";
						addRow("tabLinks", trData);
						setScroll("tabLinks",600);
					});
				}
				
				let param_color = result.data_color;								
				
				param_color.sort(function(a,b){				
					
					return(a.idx<b.idx) ? -1 : (a.idx>b.idx)? 1:0;
					
				})
												
				$("#contents_color").empty();				
				
				$.each(param_color, function(index, value) {						
					$("#contents_color").append("<input type='text' id='color_" + index + "' value='"+value.color+"'>");
					colorOption.color = value.color;
					$("#contents_color input[type=text]:last").spectrum(colorOption);
				});
				
				$("#sel_default_color").val("");
				$("#contents_color .sp-replacer").css("margin", "0 15px 0px 0");
				$("#overlay").fadeOut();
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}
	
	function linkPopClose() {
		$("#linkPop").hide();
	}
	
	function resetLink() {
		let row_id = $("#link_row_id").val();
		let this_row = $("#tabColums tbody tr").eq(row_id);
		
		this_row.find("[name=link_info_value]").val("");
		this_row.find(".badge-light-success").addClass("badge-light-danger");
		this_row.find(".badge-light-success").removeClass("badge-light-success");
		
		$("#link_url").val("");
		$("#tabColumnLink tbody").empty();
		$("#link_type").val("C");
		$("#link_type").trigger("change");
		$("#link_contents").val("-").trigger("change")
	}
	
	function setLink() {
		let row_id = $("#link_row_id").val();
		let this_row = $("#tabColums tbody tr").eq(row_id);
		if(row_id != undefined) {
			var link_info = {};
			link_info.type = $("#link_type").val();
			if(link_info.type == "C") {
				link_info.contents_cd = $("#link_contents").val();
				if(link_info.contents_cd == "-") {
					alertify.error(getMsgStr("s.select_contents"));
					return false;
				}
			} else if(link_info.type == "F" || link_info.type == "U") {
				let link_url = $("#link_url").val();
				
				this_row.find("[name=link_info_value]").val("");
				this_row.find(".badge-light-success").addClass("badge-light-danger");
				this_row.find(".badge-light-success").removeClass("badge-light-success");
				if(link_url == "") {
					alertify.error(getMsgStr("api.input_url"));
					$("#link_url").focus();
					return false;
				} else {
					if(link_info.type == "U") {
						let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
							if(!regex.test(link_url)) {
								alertify.error(getMsgStr("s.check_url"));
								$("#link_url").focus();
								return false;
							}
					}
				}
				link_info.url = link_url;
				
				let key_flag = false;
				let link_param = [];
				if($("#tabColumnLink tbody tr").length > 0) {
					let link_row = {};
					$.each($("#tabColumnLink tbody tr"), function(inde, value) {
						link_row = {};
						if($(value).find("[name=link_key]").val() == "") {
							key_flag = true;
						}
						link_row.key = $(value).find("[name=link_key]").val();
						link_row.data = $(value).find("[name=linkColumData]").val();
						link_param.push(link_row);
					});
				}
				link_info.link_param = link_param;
				
					
				if(key_flag) {
					alertify.error(getMsgStr("s.check_key_value"));
					return false;
				}
			}
			this_row.find("[name=link_info_value]").val(JSON.stringify(link_info));
			this_row.find(".badge-light-danger").addClass("badge-light-success");
			this_row.find(".badge-light-danger").removeClass("badge-light-danger");
			$("#linkPop").hide();
		}
	}
	
	function setContentsLink(row) {
		$("#link_type").trigger("change");
		
		$(".link_contents_sel").empty();
		$("#tabColumnLink tbody").empty();
		$("#link_url").val("");
		
		var link_contents = "<select class='form-control link_area' id='link_contents' name='link_contents' style='width:270px;'>"+optionContentsData+"</select>";
		$(".link_contents_sel").append(link_contents);
		
		$("#link_row_id").val($(row).parent().parent().index());
		
		let link_info = $(row).parent().parent().find("[name=link_info_value]").val();
		if(link_info != undefined && link_info != "" && link_info != null) {
			let link_obj = $.parseJSON(link_info);
			
			$("#link_type").val(link_obj.type);
			$("#link_type").trigger("change");
			if(link_obj.type == "C") {
				$("#link_contents").val(link_obj.contents_cd);
			} else if(link_obj.type == "U" || link_obj.type == "F") {				
				$("#link_url").val(link_obj.url);
				if(link_obj.link_param.length > 0) {
					
					var contents_api_type = $("[name=api_type_radio]:checked").val();		
					
					var contents_api = "";
					if(contents_api_type == "0") {
						contents_api = $("#contents_api").val();			
					} else if(contents_api_type == "1") {
						contents_api = (data_url+"/api/id/" + $("#dynamic_api_combo").val());			
					}
					
					var mappingData = setMappingData(contents_api, undefined);
					mappingData.success(function (data) {
						var data_col = "";
						data_col += "<select class='form-control' name='linkColumData' title='Data Colum'><option value='0'>-Data-</option>";
						$.each(data[0], function(key, value) {
							data_col += "<option value='"+key+"'>"+key+"("+value+")</option>";
						});
						data_col +="</select>";
						
						$.each(link_obj.link_param, function(index, value) {
							var trData = "<tr class='ui-state-default'>"+
							"<td><input type='text' name='link_key' class='form-control tal' value='"+value.key+"' /></td>"+
							"<td>" + data_col + "</td>"+
							"<td><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
							"</tr>";
							
							addRow("tabColumnLink", trData);
							setScroll("tabColumnLink");
							$("[name=linkColumData]:last").val(value.data);
						});
						$("#tabColumnLink").find("*").addClass("link_area");
					});
				}
			}
		}
		
		$("#link_contents").select2({dropdownParent: $('#linkPop > .dropdetails')}).on('select2:open', function (e) { });
		
		
		
		$("#linkPop").find("*").addClass("link_area");
		
		var div = $("#linkPop");
		div.css({
			position:"absolute",
			top:(event.pageY+13), 
			left: (event.pageX-90)});
		
		div.show();
		
		return false;
	}
	
	function addLinkParam() {
		resetScroll("tabColumnLink");
		var contents_api_type = $("[name=api_type_radio]:checked").val();		
		
		var contents_api = "";
		if(contents_api_type == "0") {
			contents_api = $("#contents_api").val();			
		} else if(contents_api_type == "1") {
			contents_api = (data_url+"/api/id/" + $("#dynamic_api_combo").val());			
		}
				
		var mappingData = setMappingData(contents_api, undefined);
		mappingData.success(function (data) {
			var data_col = "";
			data_col += "<select class='form-control' name='linkColumData' title='Data Colum'><option value='0'>-Data-</option>";
			$.each(data[0], function(key, value) {
				data_col += "<option value='"+key+"'>"+key+"("+value+")</option>";
			});
			data_col +="</select>";
			
			var trData = "<tr class='ui-state-default'>"+
			"<td><input type='text' name='link_key' class='form-control tal' value='' /></td>"+
			"<td>" + data_col + "</td>"+
			"<td><i class='fa fa-times hover' aria-hidden='true' onclick='javascript: delColumsRow(this)'></i></td>"+
			"</tr>";
			
			addRow("tabColumnLink", trData);
			setScroll("tabColumnLink");
			
			$("#tabColumnLink").find("*").addClass("link_area");
		});
	}
	
	function delContents(pCd){
		alertify.confirm(getMsgStr("message.are_you_delete"))
		.set("title","<i class='icon fa fa-warning'></i> "+getMsgStr("w.warning"))
		.set('labels', {ok:getMsgStr("w.confirm"), cancel:getMsgStr("w.cancle")})
		.set('onok', function(closeEvent){ 
			var param = {};
			var contents_cd_arr = [];
			if(pCd==undefined){
				$('input[name="chkContents"]').each(function() {
					if($(this).prop('checked')){
						contents_cd_arr.push($(this).val());
					}
				});
			}else{
				contents_cd_arr.push(pCd);
			}
			param.contents_cd_arr = contents_cd_arr;
			param.del_all = "N";
			if(contents_cd_arr.length==0){
				alertify.message('<i class="icon fa fa-warning"></i> ' + getMsgStr("s.contents_to_delete"));
				alertify.confirm().close(); 
				return false;
			}
			$("#overlay").show();
			$.ajax({
				url : "/contents/delete",
				type : "POST",
				dataType : "json",
				data:JSON.stringify(param),
				contentType:"application/json",
				success: function (result) {
					if(result == 3){
						$("#overlay").fadeOut();
						alertify.confirm("컨텐츠가 구성에 사용중입니다 그래도 삭제하시겠습니까?")
						.set("title","<i class='icon fa fa-warning'></i> " + getMsgStr("w.warning"))
						.set('labels', {ok:getMsgStr("w.confirm"), cancel:getMsgStr("w.cancle")})
						.set('onok', function(closeEvent){ 
						param.del_all = "Y";
							$.ajax({
								url : "/contents/delete",
								type : "POST",
								data:JSON.stringify(param),
								contentType:"application/json",
								success: function (result) {
									resetForm('C','A');
									listContents();
									listMonitor(scene_cd, undefined, undefined, "N");
									alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.the_contents_deleted"));
								},error: function () {
									alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("api.del_api_fail"));
						 		}
							});
						});
								
					$("#overlay").fadeOut();
					}else{
						resetForm('C','A');
						listContents();
						alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.the_contents_deleted"));
						$("#overlay").fadeOut();
						
					}
					
				},
				error: function () {
					$("#overlay").fadeOut()
					alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.of_content_failed"));
				}
			});
		} ); 
	}
	
	var add_idx = 0;
	
	
	function updateMM() {
		if($("#tabBatchMonitor tbody tr td").length == 1) {
			alertify.message('<i class="icon fa fa-warning"></i> '+getMsgStr("s.no_contents_conf"));
			return false;
		}
		
		var data_arr = new Array();
		var data = new Object();
		var keyMap = new Object();
		var map = new Object();
		
		var new_data_obj = {};
		var new_data_arr = [];
		
		var contents_check = false
		
		$.each($("#tabBatchMonitor tbody tr"), function(key, value) {
			data = new Object();
			keyMap = new Object();
			map = new Object();
			keyMap.monitor_cd = $(value).find("[name=monitorCdU]").val();
			
			var contents_cd = $(value).find("[name=selAddContents]").val();
			
			if(contents_cd == undefined || contents_cd == '' || contents_cd == '-') {
				alertify.message('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.select_contents"));
				contents_check = true
				return false;
			}
			if(keyMap.monitor_cd == undefined) {
				new_data_obj = {};
				new_data_obj.monitor_title = $(value).find("[name=monitorTitleU]").val();
				new_data_obj.monitor_title_en = $(value).find("[name=monitorTitleUEn]").val();
				new_data_obj.monitor_sub_title = $(value).find("[name=monitorSubTitleU]").val();
				new_data_obj.monitor_sub_title = $(value).find("[name=monitorSubTitleU]").val();
				new_data_obj.monitor_sub_title_en = $(value).find("[name=monitorSubTitleUEn]").val();
				new_data_obj.contents_cd = contents_cd;
				new_data_obj.contents_cd = contents_cd;
				new_data_obj.monitor_width = '300';
				new_data_obj.monitor_height = '200';
				new_data_obj.monitor_x = 130+((new_data_arr.length == 0 ? 1 : new_data_arr.length)*10);
				new_data_obj.monitor_y = 15+((new_data_arr.length == 0 ? 1 : new_data_arr.length)*10);;
				new_data_arr.push(new_data_obj);
			} else {
				map.monitor_title = $(value).find("[name=monitorTitleU]").val();
				map.monitor_title_en = $(value).find("[name=monitorTitleUEn]").val();
				map.monitor_sub_title = $(value).find("[name=monitorSubTitleU]").val();
				map.monitor_sub_title = $(value).find("[name=monitorSubTitleU]").val();
				map.monitor_sub_title_en = $(value).find("[name=monitorSubTitleUEn]").val();
				map.contents_cd = contents_cd;
				map.contents_cd = contents_cd;
				data.keyMap = keyMap;
				data.map = map;
				data_arr.push(data);
			}
		});
		
		if(contents_check) {
			return false;
		}
		var param = {
			data: data_arr,
			monitor_scene: scene_cd,
			user_cd: user_cd,
			map:new_data_arr
		}
		
		$("#overlay").show();
		
		$.ajax({
			url: "/monitor/updatem",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.contents_configuration_modified"));
				configListMonitor();
				resetForm(scene_cd, "A");
				listMonitor(scene_cd);
				$("#overlay").fadeOut();
			},
			error: function (e) {
				// Handle upload error
				console.log(e)
				
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.configuration_registration_failed"));
			}	
		});
	}
	
	function updateM() {
		var keyMap = {
			monitor_cd : $("#update_monitor_cd").val()
		};
		
		var data_obj = {};
		var data_arr = [];
		var realtime_check = false;
		
		$.each($("#tabContentsUpdate tbody tr"), function(key, value) {
			if($(value).find("[name=selAddContents]").find("option:selected").attr("realtime") == "Y") {
				realtime_check = true;
			}
			data_obj = {};
			data_obj.monitor_title = $(value).find("[name=monitorTitleU]").val();
			data_obj.monitor_title_en = $(value).find("[name=monitorTitleUEn]").val();
			data_obj.monitor_sub_title = $(value).find("[name=monitorSubTitleU]").val();
			data_obj.monitor_sub_title_en = $(value).find("[name=monitorSubTitleUEn]").val();
			data_obj.header_view_yn = $(value).find("[name=chk_update]").is(":checked") ? "Y" : "N";
			data_obj.monitor_theme = $(value).find("[name=chk_theme]").is(":checked") ? "1" : "0";
			data_obj.contents_cd = $(value).find("[name=selAddContents]").val();
			data_arr.push(data_obj);
		});
		if(realtime_check) {
			alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.realTcontents"));
			return false;
		}
		
		var param = {
				keyMap:keyMap,
				data_arr:data_arr
		}
		
		$("#overlay").show();
		
		$.ajax({
			url: "/monitor/update",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.contents_configuration_modified"));
	//						$("#contents_canvas").empty();
	//						$("#chk_edit").prop("checked", false);
				configListMonitor();
				resetForm(scene_cd, "A");
				$("#overlay").fadeOut();
			},
			error: function (e) {
				// Handle upload error
				console.log(e)
				
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.configuration_registration_failed"));
			}	
		});
	}
	
	function deleteSelM() {
		if($("#contents_canvas .effect-7").length == 1) {
			delMonitor($("#contents_canvas .effect-7").attr("monitor_cd"));
		}
	}
	
	function resetFormCategory() {
		clickTr("tabCategory", undefined);
		$("#category_cd").val("");
		$("#category_nm").val("");
		$("#category_scene").val("");
		$("#category_share").val("N");
		$("#category_scene").prop("disabled", false);
	}
	
	function addCategory() {
		$("#category_user_id").val(user_id);
		$("#categoryModal").modal();
		
		$( function() {
			$( "#tabCategorySort" ).sortable({
				revert: true,
				handle: 'span',
				stop: function() {
					updateCategorySort();
				}
			});

		});
		
		resetFormCategory();
		listCategory("N");
	}
	
	function listCategory(clickTr) {
		var data = {
				orderBy : {
					"category_order":"asc",
					"category_nm":"asc"
				}
		};
		data.user_cd = {
				type:"E",
				val:user_cd
		}
		
		var param = {
				map : data
		}
		
		$("#overlay").show();
		$.ajax({
			url: "/monitor/category_list",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {				
				resetScroll("tabCategory");
				tabClear("tabCategory"); 
				if(result.data.length>0){
					$.each(result.data, function(index, value) {
						var tmp_tr = "<tr id='tr_" + value.category_cd + "'>"+
						"<td value='"+value.category_cd+"'><span class='drag_hover'><i class='icon fa fa-ellipsis-v fa-2x ml10 mr5'></i><i class='icon fa fa-ellipsis-v fa-2x'></i></td>"+
						"<td class='tac'><div class='checkbox mt4'><input onclick='javascript:chkBox(\"chkContentsAll\", \"chkCategory\")' id='chk_category_"+index+"' name='chkCategory' type='checkbox' value='"+value.category_cd+"'><label for='chk_category_"+index+"'></label></div></td>" +						
						"<td class='hover' onclick='javascript:clickTr(\"tabCategory\", " + index + ");getCategory(\"" + value.category_cd + "\")'>" + nvl(value.category_nm, "-") + "</td>" +
						"<td class='hover' onclick='javascript:clickTr(\"tabCategory\", " + index + ");getCategory(\"" + value.category_cd + "\")'>" + nvl(value.monitor_scene, "-") + "<div class='fr mr10 icon_none'><i class='icon fa fa-trash hover ml5 mr5 fr mt3' onclick='delCategory(\"" + value.category_cd + "\")'></i></td>" +
						"</tr>";
						addRow("tabCategory", tmp_tr);
					});
					setScroll("tabCategory",600);
				}else{
					$("#tabCategory tbody").append("<tr><td colspan='10' class='tac'>"+getMsgStr("message.no_data")+"</td></tr>");
				}
				
				if(clickTr == undefined){
					setCategory(result);
				}
				
				$("#overlay").fadeOut();
				
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}
	
	function getCategory(pCd){
		var param = {
				category_cd : pCd
		}
		$("#overlay").show();
		$.ajax({
			url: "/monitor/category_get",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				$("#category_cd").val(result.data.category_cd);
				$("#category_nm").val(result.data.category_nm);
				$("#category_scene").val(result.data.monitor_scene);
				$("#category_scene").prop("disabled", true);
				$("#category_user_id").val(result.data.user_cd);
				$("#category_user_id").val(result.data.user_cd);
				$("#category_threeD_cd").val(result.data.threed_cd);
				
				
				var share = "N";
				if(result.data.share_yn=="Y"){
					share = "Y";
				}
				$("#category_share").val(share);
				
				$("#overlay").fadeOut();
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}
	
	function addNupdateCategory() {
		if(!validChk($("#category_nm").val(), getMsgStr("s.enter_category_name"), "null", "category_nm")) return false;
		if(!validChk($("#category_scene").val(), getMsgStr("s.enter_category_code"), "null", "category_scene")) return false;
		if ($("#category_scene").val().includes("!@#$%^&*()") || $("#category_scene").val().startsWith("group_")) {
			alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("code.duple_code"));
			return false;
		}

		let regexp = /[0-9a-zA-Z_]/;
		let category_scene = $("#category_scene").val();
		let reg_flag = false;
		let category_list = category_obj.data;
		
		
		for( var i=0; i < category_scene.length; i++) {
			if(regexp.test(category_scene.charAt(i)) == false ) {
				reg_flag = true;
				break;
			}
		}
		
		if(reg_flag) {
			alertify.message('<i class="icon fa fa-warning"></i>'+getMsgStr("s.category_code_type") + '</i>');
			return false;
		}
		
		var keyData = {
				category_cd : $("#category_cd").val()
		}
		
		var userCd = user_cd;
		if($("#category_cd").val()!=""){
			userCd = $("category_user_id").val();
		}
		
		var data = {
				category_nm: $("#category_nm").val(),
				monitor_scene: $("#category_scene").val(),
				user_cd: userCd,
				share_yn: $("#category_share").val(),
				threed_cd: $("#category_threeD_cd").val()
		}
		
		var url = "/monitor/category_insert";
		if($("#category_cd").val()!="") {
			url = "/monitor/category_update";
		}else{
			if(category_list.filter(val => val.monitor_scene == category_scene).length > 0){
				alertify.message('<i class="icon fa fa-warning"></i>'+getMsgStr("code.duple_code") + '</i>');
				return false; 
			} 
		}
		
		var param = {
				map:data,
				keyMap:keyData
		}
		$("#overlay").show();
		
		$.ajax({
			url: url,
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				if($("#category_cd").val()=="") {
					alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.the_contents_registered"));
				} else {
					alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.the_contents_modified"));
				}
					resetFormCategory();
					listCategory();
				$("#overlay").fadeOut();
			},
			error: function (e) {
				// Handle upload error
				console.log(e)
				$("#overlay").fadeOut();
			}
		});
	}
	
	function delCategory(pCd){
		alertify.confirm(getMsgStr("message.are_you_delete"))
		.set("title","<i class='icon fa fa-warning'></i> "+getMsgStr("w.warning"))
		.set('labels', {ok:getMsgStr("w.confirm"), cancel:getMsgStr("w.cancle")})
		.set('onok', function(closeEvent){ 
			var param = {};
			var category_cd_arr = [];
			if(pCd==undefined){
				$('input[name="chkCategory"]').each(function() {
					if($(this).prop('checked')){
						category_cd_arr.push($(this).val());
					}
				});
			}else{
				category_cd_arr.push(pCd);
			}
			param.category_cd_arr = category_cd_arr;
			
			if(category_cd_arr.length==0){
				alertify.message('<i class="icon fa fa-warning"></i> ' + getMsgStr("s.non_delete_category"));
				alertify.confirm().close(); 
				return false;
			}
						
			$("#overlay").show();
			$.ajax({
				url : "/monitor/category_delete",
				type : "POST",
				dataType : "json",
				data:JSON.stringify(param),
				contentType:"application/json",
				success: function (result) {
					if(result == 500){
						alertify.message('<i class="icon fa fa-warning"></i> 해당카테고리에 구성된 컨텐츠가 존재합니다.');
					}else{
						resetFormCategory();
						listCategory();
						getCategoryMonitor($("#category_area").children().eq(0).val());
						alertify.success('<i class="icon fa fa-check"></i> ' + getMsgStr("s.success_delete_category"));
					}
					
					$("#overlay").fadeOut();
				},
				error: function () {
					$("#overlay").fadeOut()
					alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("s.of_content_failed"));
				}
			});
			
		} ); 
	}
	
	function fullScreenMonitor(monitor_cd) {
	//				var elem = $("#contents_canvas").find("#"+monitor_cd)[0];
	//				console.log(elem)
	//				
	//				if (document.fullscreenEnabled) {
	//					elem.webkitRequestFullscreen();
	//				} else {
	//					console.log('Your browser cannot use fullscreen right now');
	//				}
	//				if (elem.requestFullscreen) {
	//					console.log("aaaa")
	//					elem.requestFullscreen();
	//				} else if (elem.mozRequestFullScreen) { /* Firefox */
	//					console.log("bbbb")
	//					elem.mozRequestFullScreen();
	//				} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
	//					console.log("cccc")
	//					elem.webkitRequestFullscreen();
	//				} else if (elem.msRequestFullscreen) { /* IE/Edge */
	//					console.log("dddd")
	//					elem.msRequestFullscreen();
	//				}
		
		$("#fullScreenModal").modal();
		$("#full_screen_canvas").empty();
		
		listMonitor(scene_cd, monitor_cd);
	}
	
	var monitor_size_info = {};
	
	// listMonitor(scene_cd, undefined, undefined, "N")
	function listMonitor(type, monitor_cd, past_flag, user_yn, threed_cd) {
		
		if(monitor_cd == undefined) {
			$("#contents_canvas").empty();
			//스크롤 초기화
			const div = document.querySelector("body > div.ui-layout-center")
			if (div) div.scrollTo(0,0);

			//undo, redo clear
			monitor_historys.undoList.length = 0;
			monitor_historys.redoList.length = 0;
		}
		
		if($("#category_area").length > 0){
			console.log("카테고리 에어리어 실행1");
			if((threed_cd != "" && threed_cd != 'null' && threed_cd != undefined) || (!$("#category_area button.btn-dark").attr("onclick").split(',')[1].includes('null') && $("#category_area button.btn-dark").attr("onclick").split(',')[1].length > 4))
			{
				console.log("카테고리 에어리어 실행2");
				// $("#contents_canvas").append("<div class='contents' id='3d_content' style='position: absolute; right: 20px; top: 250px; width: 600px; height:600px;'></div>");
				$("#contents_canvas").append("<div class='contents' id='3d_content' style='position: absolute; left: 1220px; top: 180px; width: 800px; height:800px;'></div>");
				contents_3d_korea_bar_init("3d_content");
			}
			
		}
		
		if(past_flag == undefined) {
			clearWindowTimer();
//			if(!$("#timePlay").hasClass("fa-pause-circle")) {
//				$("#timePlay").removeClass("fa-play-circle");
//				$("#timePlay").addClass("fa-pause-circle");
//			}
			
//			if($("#chk_edit").is(":checked")) {
//				$("#chk_edit").prop("checked", false);
//				$(".side_menu2").removeClass("tophover");
//			}
		}
		var param = {
			map : {
				monitor_scene: {
					type:"E",
					val:type
				},
				monitor_cd: {
					type:"E",
					val:monitor_cd
				}
			}
		}
		
		//카테고리 전환시 세션 스토리지 초기화
		let last_scene = sessionStorage.getItem("monitor_scene");
		
		if (last_scene != type) {
			// sessionStorage.clear();
		}
		sessionStorage.setItem("monitor_scene",type);
		
//		if(user_yn==undefined){
//			param.map.user_cd =  {
//				type:"E",
//				val:user_cd
//			}
//		}
				
		scene_cd = type;
		getAllMonitorSet();
		resetSelected();
		setContentsDashboardAuth();
		LoadedContentsInfoCnt = 0;
		LoadedContentsCnt = 0;
		LoadedMonitorCnt = 0;

		console.log("param");
		console.log(param);
		
		$.ajax({
			url: "/monitor/select/list",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				console.log("listMonitor");
				console.log(result);
				
				contentsList = result.data;
				//console.log("=======listMonitor Call!!!=======");
				if($("#size_box").is(":visible")) {
					$("#size_box").hide();
				}
				
				if($("range_box").is(":visible")){
					resetSelected();
				}
								
				if(monitor_cd != undefined) {
					getFullContentsAPI(result.data[0], "fullScreenModal", "full_screen_canvas");
							
				} else {
					clearWindowTimer();
					
					var monitor_obj = {};
					
					$.each(result.data, function(index, value) {
						var monitor_arr = [];
						if(monitor_obj[value.monitor_cd] != undefined) {
							monitor_arr = monitor_obj[value.monitor_cd];
						}
						
						if(typeof pMode != "undefined"){
							if(value.user_cd == user_cd){
								monitor_arr.push(value);
								monitor_obj[value.monitor_cd] = monitor_arr;
							}
						}else{
							monitor_arr.push(value);
							monitor_obj[value.monitor_cd] = monitor_arr;
						}
												
						
						
					});
					
					
					console.log(monitor_obj);
					
					
					$.each(monitor_obj, function(index, value) {		
						ContentsEventBus.dispatch("monitorLoaded",value);				
						if(value.length == 1) {
							getContentsAPI(value[0]);
						} else if(value.length > 1) {
							let this_timer = null;
							var idx = 1;
							getContentsAPI(value[0], true);
							
							this_timer = setInterval(function() {
								if(!$("#timePlay").hasClass("fa-pause-circle")) {
									return false;
								}
								$("#contents_canvas").find("[monitor_cd="+index+"]").remove();
								$.each(value, function(index2, value2) {
									if(value[idx] == undefined) {
										idx = 0;
									}
								});
								var monitor_val = value[idx];
								var monitor_size = monitor_size_info[value[idx].monitor_cd];
								
								if(monitor_size != undefined) {
									monitor_val.monitor_x = monitor_size.x;
									monitor_val.monitor_y = monitor_size.y;
									monitor_val.monitor_width = monitor_size.width;
									monitor_val.monitor_height = monitor_size.height;
								}
								getContentsAPI(value[idx], true);
								idx++;
							}, 7*1000);
							integrate_timer.push(this_timer);
						}
					});
					
				}
			},
			error: function () {
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}
	
	var integrate_timer = [];
	
	function getFullContentsAPI(monitor_info, modal_id, canvas_id) {

		var monitor_title = "";
		var monitor_sub_title = "";
		var pCd = "";	
		
		if(monitor_info != undefined){
			if(lang_set=="ko"){
				monitor_title = nvl(monitor_info.monitor_title, "");
				monitor_sub_title = nvl(monitor_info.monitor_sub_title, "");
			}else if(lang_set=="en"){
				monitor_title = nvl(monitor_info.monitor_title_en, "");
				monitor_sub_title = nvl(monitor_info.monitor_sub_title_en, "");
			}else{
				monitor_title = nvl(monitor_info.monitor_title_etc, "");
				monitor_sub_title = nvl(monitor_info.monitor_sub_title_etc, "");
			}
			pCd = nvl(monitor_info.contents_cd,"");		
		}
		
		$("#"+modal_id).find(".modal-title").html(monitor_title + (monitor_sub_title != "" ? " - "+monitor_sub_title: ""));
		
		
		var param = {
			contents_cd : pCd,
			orderBy : {
				"contents_sub_order":"asc"
			}
		}
		
		$.ajax({
			url : "/contents/select/get",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {	
				var pId = canvas_id;
				var contents_type = result.data.contents_type;
				setTimeout(function() {
					var chart_height = $("#"+modal_id).find(".modal-body").outerHeight();				
				
					if(contents_type == '1' || contents_type == '2' || contents_type == '3'|| contents_type == '35'|| contents_type == '40') {
						if(chart_height == 0) {
							$("#"+pId).css("height", 740);
							$("#"+pId).css("min-height", 740);
						} else {
							$("#"+pId).css("height", chart_height);
							$("#"+pId).css("min-height", chart_height);
						}
						
						$("#"+pId).append("<table class='table table-hover m-0 scrollTable' id='"+pId+"_tab'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table>");
						
						if(contents_type == '3') {
							$("#"+pId+"_tab").addClass("table-striped");
						}else if(contents_type == '35') {
							$("#"+pId+"_tab").remove();
							$("#"+pId).append("<table class='table table-hover m-0 news_table scrollTable' id='"+pId+"_tab'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table>");						
						}
						var sub_data = new Array();
						
						$.each(result.data_sub, function(index, value) {
							
							
							var col_sub_nm = nvl(value.contents_sub_nm,"");
							if(lang_set == "en") {
								col_sub_nm = nvl(value.contents_sub_nm_en,"");
							}
							$("#"+pId).find("table thead tr").append("<th width="+value.contents_sub_size+"%;' class='tal'>"+col_sub_nm+"</th>");
							sub_data.push(value);
						});
						
						$("#"+modal_id).find(".modal-title").prepend("<i class='fa fa-list mr5'></i>");
					} else if(contents_type=='4'||contents_type=='5'||contents_type=='6'||contents_type=='7'||contents_type=='8'||
							contents_type=='14'||contents_type=='16'||contents_type=='21'||contents_type=='22'||contents_type=='31'||contents_type=='32') {
						$("#"+pId).append("<div id='"+pId+"_chart' style='width:100%; min-height:"+(chart_height == 0 ? 740 : chart_height)+"px; max-height:"+(chart_height == 0 ? 740 : chart_height)+"px;'></div>");
					}
					
					let api_url = result.data.contents_api;
					if(monitor_info.api_col != undefined && monitor_info.api_col != "") {
						api_url += ("?"+monitor_info.api_col+"="+monitor_info.api_data);
					}
					api_url = (result.data.api_server_type != 1 ? data_url : '') + api_url;
					
					
					getContentsData(
							api_url, 
							pId, 
							contents_type,
							sub_data,
							"N", true, result.data, false, result.data_color, true
					);
				
				}, 200);
			},
			error: function () {
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}
	
	let data_timer = [];
	
	function getContentsAPI(monitor_info, rotation_flag) {
		var pCd = monitor_info.contents_cd;
		var param = {
			contents_cd : pCd,
			orderBy : {
				"contents_sub_order":"asc"
			}
		}
		$.ajax({
			url : "/contents/select/get",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				console.log("getContentsAPI");				
				console.log(result);				
//				if(result.data.contents_api != undefined) {
				if(result.data != undefined){
					var contents_type = result.data.contents_type;
					var contents_sub_type = result.data.contents_sub_type;
					var contents_label = type_info[contents_type];
					var contents_cd = result.data.contents_cd;
					var contents_title = result.data.contents_title;
					var m_cd = nvl(monitor_info.monitor_cd, "");
					var m_title = nvl(monitor_info.monitor_title,"");
					var m_s_title = nvl(monitor_info.monitor_sub_title,"");
					if(lang_set == "en") {
						m_title = nvl(monitor_info.monitor_title_en,"");
						m_s_title = nvl(monitor_info.monitor_sub_title_en,"");
					}else if(lang_set === 'etc'){
						m_title = nvl(monitor_info.monitor_title_etc,"");
						m_s_title = nvl(monitor_info.monitor_sub_title_etc,"");
					}					
					var m_h = nvl(monitor_info.monitor_height,"");					
					var m_w = nvl(monitor_info.monitor_width,"");
					
					var m_x = nvl(monitor_info.monitor_x,"");
					var m_y = nvl(monitor_info.monitor_y,"");
					var m_header = nvl(monitor_info.header_view_yn,"");
					var m_theme = nvl(monitor_info.monitor_theme,"");
					var themeType = theme;
					// var themeType_d = $("#theme_combo_d").val();
					
					var rotation_flag = false;
					if(result.data.rotation_flag!=null && result.data.rotation_flag=="Y"){
						rotation_flag = true;
					}
					
						
					var pId = (m_cd+"_"+contents_label);
					const content_area = document.getElementById(pId);
					if (content_area !== undefined && content_area !== null) {
						content_area.innerHTML = "";
					}
					
					if(contents_type=="9"||contents_type=="10"||contents_type=="11"||contents_type=="13"||contents_type=="15"||contents_type=="17"
						||contents_type=="20"||contents_type=="26"||contents_type=="27"||contents_type=="28"||contents_type=="29"||contents_type=="33"||contents_type=="34"||contents_type=="36"||contents_type=="37"||contents_type=="38"||contents_type=="39"||contents_type=="50") {						
						//#tagTable
						
						if(contents_label.includes('tag')){
							contents_label = 'tag_label';
							pId = (m_cd+"_"+contents_label);
						}
						
						//#processTable
						if(contents_label.includes('process')){
							contents_label = 'process_label';
							pId = (m_cd+"_"+contents_label);
						}						
						$("#contents_canvas").append(
								"<div class='draggable resizable' monitor_cd='"+m_cd+"' type='"+contents_label+"' style='top:"+m_x+"px;left:"+m_y+"px;z-index:10100;height:"+m_h+"px;width:"+Number(m_w+24)+"px;display:none;'>"+
								"<div id='"+pId+"'></div>"+
								"</div>"
						);
						
						
					} else if (contents_type == "24"){
						$("#contents_canvas").append(
								"<div class='draggable resizable' monitor_cd='"+m_cd+"' type='"+contents_label+"' style='top:"+m_x+"px;left:"+m_y+"px;z-index:10100;height:"+m_h+"px;width:"+m_w+"px;display:none;'>"+
								"<div id='"+pId+"'></div>"+
						
						
								'<div class="right_top">' +
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
								"</div>"+

								"</div>"
						
						);
					}else if(contents_type == "12" || contents_type == "18" || contents_type == "23") {
						if(contents_type == "23") {
							$("#contents_canvas").append(
							"<div class='draggable resizable "+(contents_type=="18"?"title_lg":"")+"' monitor_cd='"+m_cd+"' type='"+contents_label+"' style='top:"+m_x+"px;left:"+m_y+"px;z-index:10100;width:"+m_w+"px;height:"+m_h+"px;'>"+
							"<div class='content_title' style='position: absolute; overflow: hidden;z-index:10100;width:"+m_w+"px;'>" +
							"<span></span><span></span><span></span><span></span>" +
							m_title + (m_s_title != "" ? "<span>"+m_s_title + "</span>" : "") +
							"</div>"+
							"<div class='col-12'>"+
							'<div class="right_top" style="z-index:10101">' +
							"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
							"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
							"</div>"+
							"<div class='row'></div>" +
							"</div></div>" 
							)
						} else {
							if(contents_type=="18"){
								$("#contents_canvas").append(
										"<div class='draggable resizable title_lg' monitor_cd='"+m_cd+"' type='"+contents_label+"' style='top:"+m_x+"px;left:"+m_y+"px;z-index:10100;width:"+m_w+"px;max-height:73px;display:none;'>"+
										"<div class='card-box' id='"+pId+"'><div class='tit_area header-title'><h2 class='tit_name'><div class='fl'>"+m_title+(m_s_title != "" ? " - "+m_s_title : "")+"</div><span class='sub_tit'></span><span class='re'></span></h2></div></div>"+
										"</div>"
								);
							}else{
								$("#contents_canvas").append(
										"<div class='draggable resizable' monitor_cd='"+m_cd+"' type='"+contents_label+"' style='top:"+m_x+"px;left:"+m_y+"px;z-index:10100;width:"+m_w+"px;max-height:73px;display:none;'>"+
										"<div class='card-box' id='"+pId+"'><h4 class='header-title_dash hover'><div class='head_tit_name'>"+m_title+(m_s_title != "" ? " - "+m_s_title : "")+"</div></h4></div>"+
										"</div>"
								);
							}
						}
					}else {		
						if(contents_type == "30"){
							$("#contents_canvas").append(
									"<div class='draggable dash_padding resizable' type='"+contents_label+"' monitor_cd='"+m_cd+"' style='width:"+m_w+"px;height:"+m_h+"px;top:"+m_x+"px;left:"+m_y+"px;z-index:10100;display:none;'>"+
									"<div id='"+pId+"'></div>"+
									"</div>"
							);							
						}else{
							$("#contents_canvas").append(
									"<div class='draggable dash_padding resizable ui-widget-content' type='"+contents_label+"' monitor_cd='"+m_cd+"' style='width:"+m_w+"px;height:"+m_h+"px;top:"+m_x+"px;left:"+m_y+"px;z-index:10100;display:none;'>"+
									"<div class='card-box' id='"+pId+"' style='width:"+m_w+"px;height:"+m_h+"px;'></div>"+
									"</div>"
							);							
						}
						
					}

					const monitorEl = document.querySelector(`#contents_canvas div.draggable.resizable[monitor_cd="${m_cd}"]`);
					monitorEl.monitorData={...monitor_info};
					
					if(m_header!="Y"&&contents_type!="9"&&contents_type!="10"&&contents_type!="11"&&contents_type!="12"
						&&contents_type!="13"&&contents_type!="15"&&contents_type!="17"&&contents_type!="18"&&contents_type!="20"&&contents_type!="23"&&contents_type!="26"
						&&contents_type!="27"&&contents_type!="28"&&contents_type!="29"&&contents_type!="30"&&contents_type!="33"&&contents_type!="34"&&contents_type!="36"&&contents_type!="37"&&contents_type!="38"&&contents_type!="39"&&contents_type!="40"&&contents_type!="50") {
						$("#"+pId).append("<h4 class='header-title_dash hover'><div class='head_tit_name'>"+(m_title == "" ? "&nbsp" : m_title)+(m_s_title != "" ? "<span>"+m_s_title+"</span>" : "")+"</div><div class='head_tit_right'></div></h4>");
						if(contents_type =="25"){
						// $("#"+pId).find(".header-title_dash").prepend(							
						$("#"+pId).find(".con_box_content").prepend(							
								"<div class='right_top'>"+
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
								"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
								"</div>"
						);
						}else{
						// $("#"+pId).find(".header-title_dash").prepend(							
						$("#"+pId).find(".dash_line_area").prepend(							
								"<div class='right_top'>"+
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
								"<i class='fa fa-window-restore' aria-hidden='true' onclick='javascript:fullScreenMonitor(\""+m_cd+"\")'></i>"+
								"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
								"</div>"
						);
						}
						
					}
					
					if(contents_type == "40"){					
						$("#"+pId).append("<h4 class='header-title_dash hover dash_light_tit'><div class='tal mt20 mt20'>"+m_title+"</div></h4>");						
					}

					if (monitor_info.monitor_alert_yn === 'Y') {
						document.getElementById(pId).setAttribute("alert","true");
					}
					
					if(result.data_link != undefined && result.data_link.length > 0) {
						$.each(result.data_link, function(index, value) {
							let icon_css = value.link_icon;
							if(value.link_icon == null || value.link_icon == "" || value.link_icon == undefined) {
								icon_css = "fa-square-o";
							}							
							$("#"+pId).find(".header-title_dash .right_top").prepend("<i class='fa "+icon_css+"' aria-hidden='true' onclick='javascript:linkWindowOpen(\""+value.link_value+"\",\""+(pId+"_"+index)+"\")'></i>")
						});
					}
					var sub_data = new Array();
					if(contents_type == '1' || contents_type == '2' || contents_type == '3' || contents_type == '35' || contents_type == '40') {
						
						var dark = "";
						const mElem = document.getElementById(pId);
						const header = mElem.querySelector('.header-title_dash')
						
						
						const head_height_margin = header ? window.getComputedStyle(header).padding.replace(/[^-\d\.]/g, '') : 0;
						const card_box = mElem.querySelector('.dash_padding .card-box');
						
						const dash_height_margin = card_box ? window.getComputedStyle(card_box).padding.replace(/[^-\d\.]/g, '') : 0;

						//const header_title_height = mElem.querySelector('.header-title_dash')
						
						let header_height = 20 + Number(head_height_margin*2) + Number(dash_height_margin*2);
						//setTimeout(() => {
						//const header_height = 40 + Number(head_height_margin*2) + Number(dash_height_margin*2);
							if(header !=null){
								header_height = Number(header.clientHeight) + Number(head_height_margin*2) + Number(dash_height_margin*2);
							}	
						
						const dash_line_area =  mElem.querySelector('.dash_line_area');
						const dash_line_area_height =  dash_line_area ? window.getComputedStyle(dash_line_area).padding.replace(/[^-\d\.]/g, '') : 0;
						
						// 타이틀 제거시 오류 발생
						// var head_height_margin = $('.header-title_dash').css('padding').replace(/[^-\d\.]/g, '');
						// var dash_height_margin = $('.dash_padding .card-box').css('padding').replace(/[^-\d\.]/g, '');
						// var head_height = $('.header-title_dash').css('height').replace(/[^-\d\.]/g, '');
						// var head_name_height = $('.head_tit_name').css('height').replace(/[^-\d\.]/g, '');
						
						var c_height = parseInt(m_h-header_height);
						
						if(css_file == "style_d_cyber.css"){
							c_height = c_height-15;
						}
							
						if(contents_type=='1'){		
							dark = " table-dark ";
											
								$("#"+pId).append(
									
									"<div class='dash_line_area'"+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+
									"<div class='right_top'>"+
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-window-restore' aria-hidden='true' onclick='javascript:fullScreenMonitor(\""+m_cd+"\")'></i>"+
									"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+

									"<div class='animation dash_line_p' "+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+									
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>" +
									"</div>"+
									"<table class='table table-hover table-line-none margin_table' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table></div>");
								
								
						}
						
						if(contents_type=='2') {
							//$("#"+pId).append("<table class='table table-hover table-line-none "+dark+"' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table>");
							$("#"+pId).append("<div class='dash_line_area'"+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+
									"<div class='right_top'>"+
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-window-restore' aria-hidden='true' onclick='javascript:fullScreenMonitor(\""+m_cd+"\")'></i>"+
									"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									
									"<div class='animation dash_line_p' "+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+	
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"</div>"+
									"<table class='table table-hover table-line-none' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table></div>");
							$("#"+pId+"_tab").addClass("table-striped");
							$("#"+pId+"_tab").removeClass("table-dark");
							$("#"+pId+"_tab").addClass("left_line");
						}
						if(contents_type=='3') {
							//$("#"+pId).append("<table class='table table-hover table-line-none "+dark+"' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table>");
							
							  		$("#"+pId).append("<div class='dash_line_area'"+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+
									"<div class='right_top'>"+
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-window-restore' aria-hidden='true' onclick='javascript:fullScreenMonitor(\""+m_cd+"\")'></i>"+
									"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"<div class='animation dash_line_p' "+
									((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+	
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"</div>"+
									"<table class='table table-hover table-line-none' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-light'><tr></tr></thead><tbody></tbody></table></div>");
							$("#"+pId+"_tab").removeClass("table-striped");
							$("#"+pId+"_tab").addClass("left_line");
							$("#"+pId+"_tab thead").removeClass("thead-light");
							//$("#"+pId+"_tab thead").addClass("thead-dark");
							  

						}
						if(contents_type=='35') {														
							
							dark = " table-dark ";
							$("#"+pId).append(

								"<div class='right_top'>"+
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i></div>"+

								"<table class='table m-0 news_table table-hover "+dark+"' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-dark'><tr></tr></thead><tbody></tbody></table>");
						}
						if(contents_type=='40') {														
							
							dark = " table-dark ";
							$("#"+pId).append("<div class='dash_light'><table class='table m-0 table-hover "+dark+"' id='"+pId+"_tab' scroll_opt='"+m_theme+"'><thead class='thead-dark'><tr></tr></thead><tbody></tbody></table></div>");
						}											
						
						$.each(result.data_sub, function(index, value) {
							var col_size = nvl(value.contents_sub_size, "");
							var col_sub_nm = nvl(value.contents_sub_nm,"");
							if(lang_set == "en") {
								col_sub_nm = nvl(value.contents_sub_nm_en,"");
							}
							$("#"+pId).find("table thead tr").append("<th width="+col_size+"%;' class='tal'>"+col_sub_nm+"</th>");
							sub_data.push(value);
						});
						
							//}, 200);
					} else if(contents_type=='4'||contents_type=='5'||contents_type=='6'||contents_type=='7'||
							contents_type=='8'||contents_type=='14'||contents_type=='16'||contents_type=='21'||contents_type=='22'||contents_type=='31'||contents_type=='32') {
						

						const mElem = document.getElementById(pId);
						const header = mElem.querySelector('.header-title_dash')
						const head_height_margin = header ? window.getComputedStyle(header).padding.replace(/[^-\d\.]/g, '') : 0;
						const card_box = mElem.querySelector('.dash_padding .card-box');
						const dash_height_margin = card_box ? window.getComputedStyle(card_box).padding.replace(/[^-\d\.]/g, '') : 0;
						
						let header_height = 20 + Number(head_height_margin*2) + Number(dash_height_margin*2);
						//const header_height = 40 + Number(head_height_margin*2) + Number(dash_height_margin*2);
						
						setTimeout(() => {
							if(header !=null){
								header_height = Number(header.clientHeight) + Number(head_height_margin*2) + Number(dash_height_margin*2);
							}	
						
						// var c_height = parseInt(m_h-header_height);
						var c_height = m_h;
						if (m_header !== 'Y') {
							c_height = parseInt(m_h-header_height);
						}
						
						if(css_file == "style_d_cyber.css"){
							c_height = c_height-15;
						}
						
						$("#"+pId).append(
							"<div class='dash_line_area'"+
							((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+
							'<div class="right_top">' +
							"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
							"<i class='fa fa-window-restore' aria-hidden='true' onclick='javascript:fullScreenMonitor(\""+m_cd+"\")'></i>"+
							"<i class='fa fa-close' style='display:none;' onclick='javascript:delMonitor(\""+m_cd+"\")'></i></div>"+
								
								"<div class='animation dash_line_p' "+
								((themeType == "cyber") ? "style='height:"+c_height+"px;'>" : ">")+
								"<span></span>"+
								"<span></span>"+
								"<span></span>"+
								"<span></span>"+
								"</div>"+
								"<div id='"+pId+"_chart' style='width:"+(m_w-60)+"px;height:"+c_height+"px;' class='margin_chart'></div>");
								
						
						}, 200);
											
						
						// var head_height_margin = $('.header-title_dash').css('padding').replace(/[^-\d\.]/g, '');
						// var dash_height_margin = $('.dash_padding .card-box').css('padding').replace(/[^-\d\.]/g, '');
						// var head_height = $('.header-title_dash').css('height').replace(/[^-\d\.]/g, '');
						// var head_name_height = $('.head_tit_name').css('height').replace(/[^-\d\.]/g, '');
						
						// var header_height = 40 + parseInt(head_height_margin*2) + parseInt(dash_height_margin*2);
							
						//$("#"+pId).append("<div id='"+pId+"_chart' style='width:"+(m_w-20)+"px;height:"+(m_h-85)+"px;'></div>");
					} else if(contents_type=="9"||contents_type=="10"||contents_type=="11"||contents_type=="13"||contents_type=="15"||contents_type=="17"||contents_type=="20"||contents_type=="30"||contents_type=="33"||contents_type=="34"||contents_type=="36"||contents_type=="37"||contents_type=="38"||contents_type=="39"||contents_type=="50") {			

						if(contents_type == "15") {
							$("#"+pId).append(
								
									/*"<div id='"+pId+"_label' class='table_count_box_area3 "+
									((contents_sub_type == 1) ? ' bul' : '') + 
									"' style='width:"+(m_w)+"px;'>" +*/
									
									"<div id='"+pId+"_label' class='table_count_box_area3 "+
									((contents_sub_type == 1) ? ' bul' : '') + 
									"'>" +
									
									"<div class='animation2 dash_line_p' " +
									((themeType == "cyber") ? "style='width:"+(m_w)+"px;height:"+(m_h)+"px;'>" : ">")+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"</div>"+
									"<div class='col-12'>"+
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"<div class='row'></div>" +
									"</div></div>" 
							);
							//console.log(m_w);
							
							//$("#"+pId).css("width", Number(m_w+28)+"px");
							
							
						} else if(contents_type == "11") {
							
							$("#"+pId).append(
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"<div id='"+pId+"_label' style='width:"+(m_w)+"px; height:"+(m_h)+"px;'  class='table_count_box_area'>" +									
									"<div class='animation_label dash_line_label'>" +
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"</div>"+
									"</div>");								
							//$("#"+pId).append("<div id='"+pId+"_label' style='width:"+(m_w)+"px;' class='table_count_box_area'></div>");
						}else if(contents_type == "50"){
							//uplus 컨텐츠 추가			
							$("#"+pId).append(
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"<div id='"+pId+"_label' style='width:"+(m_w)+"px; height:"+(m_h)+"px; min-width:520px;' class='table_count_box_area'>" +									
									"<div class='animation_label dash_line_label'>" +
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"<span></span>"+
									"</div>"+
									"</div>");								
							//$("#"+pId).append("<div id='"+pId+"_label' style='width:"+(m_w)+"px;' class='table_count_box_area'></div>");
						} else if(contents_type == "13") {							
							$("#"+pId).append(
									"<div id='"+pId+"_label' style='width:"+(m_w)+"px; height:"+(m_h)+"px;'>" +
									'<div class="count_box3'+(contents_sub_type == 1 ? ' bul' : '')+'">'+
									'<div class="animation2 dash_line_p">' +
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									"</div>"+
									'<div class="row">'+
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									'<div class="left_box"><h3 class="wh"></h3><label class="wh" id="cnt_left_'+pId+'"></label></div>'+
									'<div class="right_box"></div></div></div>'
							);
						} else if(contents_type == "17") {
							$("#"+pId).append(
									"<div class='"+pId+"_circle' style='width:"+(m_w)+"px;height:"+(m_h)+"px;'>" +
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"</div>"
							);
						} else if(contents_type == "20") {
							
							$("#"+pId).append(
								"<div class='table_count_box_area2"+
								((contents_sub_type == 2 || contents_sub_type == 3) ? ' bul' : '') + 
								((contents_sub_type == 1 || contents_sub_type == 3) ? ' two' : '') + 
								"' style='width:"+(m_w)+"px;'>"+
								'<div class="animation2 dash_line_p">' +
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
								'<div class="col-12">'+
								'<div class="right_top">' +
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
								"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
								"</div>"+
								'<div class="row">'+
								'</div></div></div>'
							);
						} else if(contents_type == "30") {
							$("#"+pId).append(
							"<div class='count_box" + 
									((contents_sub_type == 2 || contents_sub_type == 3) ? ' bul' : '') + 
									((contents_sub_type == 1 || contents_sub_type == 3) ? ' two' : '') + 
									"' style='width:"+(m_w)+"px;'>"+
								'<div class="col-12">'+
								'<div class="animation2 dash_line_p">' +
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
									'<div class="row">'+
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									'</div>'+
								'</div>'+
							'</div>'
							);
						} else if(contents_type == "33") {
							$("#"+pId).append(																	  
									"<div id='"+pId+"_label' style='width:"+(m_w)+"px; height:"+(m_h)+"px;'>" +
									'<div class="count_box6'+(contents_sub_type == 1 ? ' bul' : '')+'">'+
									'<div class="animation2 dash_line_p">' +
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<div class="row">'+
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									'<div class="left_box"><h3 class="wh"></h3><label class="wh" id="cnt_left_'+pId+'">0</label></div>'+
									'</div></div></div>'
							);
						}else if(contents_type == "34"){ 
							var info_class = "";

							$("#"+pId).append("<div id='"+pId+"_label' style='width:"+(m_w)+"px;'>" +
									'<div class="s_info_area'+info_class+' bl"><div class="info_box'+info_class+'">' +
									'<div class="animation dash_line_p">' +
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<h2 class="wh"></h2>' +
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									'</div></div></div>');
						}else if(contents_type == "36"||contents_type == "37"||contents_type == "38"){ 
							$("#"+pId).append("<div id='"+pId+"_label' style='width: 500px;display: inline-block;'>" +
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
							"</div>");
							
							if(contents_type == "36"){
								
								$("#"+pId+"_label").append(
										"<div class='process_area' style='float: left;margin: 5px 10px;'>"+
										"<div class='content_name' id='contain_name_"+pId+"' style='position: relative;left: 16px;text-align: left;'>"+m_title+"</div>"+
										"<div class='row'>"+
										//'<div class="right_top">' +
										//"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
										//"</div>"+
										 "<div class='col-12 pr0 pl0' id='containRow_"+pId+"'>" +
										"</div></div></div>"											
								)								
								
							}else if(contents_type == "37"){
																
								$("#"+pId+"_label").append(
									"<div class='example_area' id='example_area_tit' style='float: left;margin: 18px 10px;'>"+
										"<div class='content_name' style='position: relative;left: 16px;text-align: left;'>"+m_title+									  
										"</div>"+
										"<div class='row' id='contain_name_2_"+pId+"'>"+
										//'<div class="right_top">' +
										//"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
										//"</div>"+
									"</div></div>"
										
								);
								
							}
							
																							
						}else if(contents_type == "39"){ 
							
							$("#"+pId).append("<div id='"+pId+"_label' style='width: 350px;'>" +
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									"</div>");
										
																							
						}else {
							var info_class = "";
							if(contents_type == "10") {
								info_class = "2"
							}
							$("#"+pId).append("<div id='"+pId+"_label' style='width:"+(m_w)+"px;'>" +
									'<div class="info_area'+info_class+' bl"><div class="info_box'+info_class+'">' +
									'<div class="animation_label dash_line_label">' +
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+				
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
									'<h2 class="wh">'+m_title+(m_s_title != "" ? "<span>"+m_s_title + "</span>" : "")+'</h2>' +
							'</div></div></div>');
						}
						setAll("N",contents_type,pId);												
					} else if(contents_type == "12" || contents_type == "18" || contents_type == "23") {
						//none contents
					} else if(contents_type == "19") {		
						let link_obj = null;
						
						if(result.data.contents_link != undefined && result.data.contents_link != "" && result.data.contents_link != null) {
							link_obj = JSON.parse(unescapeHtml(result.data.contents_link));
						}					
						$("#"+pId).append(
								"<div class='img_cover'"+ (link_obj ? ` onclick='location.href="${link_obj.url}"` : '') +"' style='width:"+(m_w-20)+"px;height:"+(m_h)+"px;"+(link_obj ? " cursor:pointer;":'')+"'>" +
								"<img src='"+(result.data.contents_api)+"' style='width:"+(m_w-20)+"px;height:"+(m_h-15)+"px;' />"+
								"</div>"
						);
					} else if(contents_type == "25") {
						$("#"+pId).append(
							
								"<div class='con_box_content'>" + 
								"<div class='right_top'>"+
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i></div>"+
								"<div class='table_count_box_area'>" +
								'<div class="animation_label dash_line_label">' +
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
								'<span></span>'+
								"<div class='col-12'></div></div></div>")
						//$("#"+pId).append("<div class='con_box_content'><div class='table_count_box_area'><div class='col-12'></div></div></div>")
					} else if(contents_type == "26") {
						$("#"+pId).append(
							'<div class="info_country" style="width:'+(m_w)+'px;height:'+(m_h)+'px;">'+
							'<div class="right_top">' +
							"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
							"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
							"</div>"+
							'</div>'
						);
					} else if(contents_type == "27") {
						$("#"+pId).append(
						'<div class="attack_area" style="width:'+(m_w)+'px;height:'+(m_h)+'px;">' + 
						'<div class="row">' +
							'<div class="col-12 pr0 pl0">' +
							'<div class="right_top">' +
							"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
							"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
							"</div>"+
							'</div>' +
						'</div>' +
						'</div>'
						);
					} else if(contents_type == "28") {
						$("#"+pId).append(
							"<div class='content_name mb20' style='width:"+(m_w)+"px;'>" + m_title + "</div>" +
							"<div class='process_area' style='width:"+(m_w)+"px;height:"+(m_h)+"px;'>" +
							'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
								"<div class='row'>" +
									"<div class='col-12 pr0 pl0'>" +
									"</div>" +
								"</div>" +
							"</div>"
						);
					} else if(contents_type == "29") {
						$("#"+pId).append(
							"<div class='info_box_area'>" +
							"<ul>" +
								"<li>" +
									"<div class='info_left_top' style='width:"+(m_w)+"px;'>" +
										"<div class='info_tit_left'><span class='red'></span></div>" +
										"<div class='info_tit'>" + m_title + "</div>" +
										"<div class='info_tit_right'></div>" +
									"</div>" +
									"<div class='info_left_bottom' style='width:"+(m_w)+"px;'>" +
									'<div class="right_top">' +
									"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_cd+"\", \""+contents_title+"\",\""+m_cd+"\",event)'></i>"+
									"<i class='fa fa-close' onclick='javascript:delMonitor(\""+m_cd+"\")'></i>"+
									"</div>"+
										"<div class='info_left_list'>" +
											"<ul>" +
											"</ul>" +
										"</div>" +
										"<div class='info_bottom_left'></div>" +
										"<div class='info_bottom_line'></div>" +
										"<div class='info_bottom_right'></div>" +
									"</div>" +
								"</li>" +
							"</ul>" +
							"</div>"
						);
					}else if(contents_type == "40") {
						$("#"+pId).append("<div class='con_box_content dash_table mt20 mb20'><div class='table-responsive card-box'><div class='col-12'></div></div></div>")
					}
					
					let this_timer = null;
					var contents_api = (result.data.api_server_type != 1 ? data_url : '') + result.data.contents_api;
					ContentsEventBus.dispatch("contentsInfoLoaded",result)
					if(result.data.realtime_flag == "Y") {
						if(result.data.data_reload_cycle == null || result.data.data_reload_cycle == undefined || result.data.data_reload_cycle == "") {
	//						return true;
						} else {
							// 메인뷰- 주기 pause상태일땐 실시간 x
							if($("#timePlay").hasClass("fa-play-circle")){
								$.each(line_reload_timer, function(index, value) {
									window.clearInterval(value);
								});						
							}else{
								this_timer = setInterval(function() {
								$.each(line_reload_timer, function(index, value) {
									window.clearInterval(value);
								});
								line_reload_timer = new Array();
								
								getContentsData(
										// result.data.contents_api, 
										contents_api, 
										pId, 
										contents_type,
										sub_data,
										"N", rotation_flag, result.data,false,result.data_color
								);								
								}, (result.data.data_reload_cycle)*1000);
								
								data_timer.push(this_timer);							
							}	
						}
					}
					
					if(contents_type != "12" && contents_type != "18" && contents_type != "19" && contents_type != "23") {
						result.data_color.sort(function(a,b){
							if(a.idx < b.idx) 
								return -1;
							if(a.idx > b.idx)
								return 1; 
						});
						
						if(contents_type == "4" || contents_type == "5" || contents_type == "6" || contents_type == "7" || contents_type == "8" || contents_type == "14" || contents_type == "16" || contents_type == "21" || contents_type == "22" || contents_type == "31" || contents_type == "32" || contents_type == "43"){
		                     setTimeout(() => {                        
		                        getContentsData(
		                           contents_api, 
		                           pId, 
		                           contents_type,
		                           sub_data,
		                           "N", rotation_flag, result.data, true,result.data_color 
		                        );
		                     }, 200);                                          
	                 	 }else{
		                     getContentsData(
		                           contents_api, 
		                           pId, 
		                           contents_type,
		                           sub_data,
		                           "N", rotation_flag, result.data, true,result.data_color 
		                        );                     
	                  	}
							
						
						
						
						
					} else {	
						
						setAll("N",contents_type,pId);
					}
					
					setOption();
					document.getElementById("contents_canvas").dispatchEvent(new CustomEvent("contents_module_loaded"))
//					updateLock(true);
					runEffect(pId);
//				}
				}
			},
			error: function () {
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
			
	}
	
	function getLinkData(contents_cd, col, col_data) {
		var monitor_info = {};
		monitor_info.contents_cd = contents_cd;
		monitor_info.api_col = col;
		monitor_info.api_data = col_data;
		
		$("#linkModal").modal();
		$("#link_canvas").empty();
		getFullContentsAPI(monitor_info, "linkModal", "link_canvas");
	}
	
	function getContentsData(pUrl, pId, pType, sub_data, full_flag, rotation_flag, contents_info, create_flag, create_color, export_btn) {
		var param = {
		}
		
		var api_param = {
			api_id:contents_info.api_id
		}
		//api_param 값이 있을때는 db에서 stime, time값을 가져옴
		var api_stime="";
		var api_time="";
		
		
		$.ajax({
			url: "/dynamic_api/select/get",
			type :"POST",
			dataType:"json",
			async:false,
			data:JSON.stringify(api_param),
			contentType:"application/json",			
			success: function (result) {	
					$.each(result.data_param.data, function(index,value){
						if((value.api_id == contents_info.api_id) && (value.val!='')){
							if(value.key_nm == "stime"){
								api_stime = value.val
							}else if(value.key_nm == "time"){
								api_time = value.val
							}
						}
					});
				}
			});
		
		
		if(api_stime == "" && api_time == ""){
			if($("#timeVal").val()!=undefined && $("#timeVal").val()!=null ){
				param.stime = $("#timeSVal").val();
				param.time = $("#timeVal").val();
			}
		}else{
				param.stime = api_stime;
				param.time = api_time;
		}
		
		if($("#sel_grp_cd").val()==""){
			param.grpCd = ss_grp_cd;
		}else{
			param.grpCd = $("#sel_grp_cd").val();
		}
		param.realtime_flag = contents_info.realtime_flag;
		
		
		return $.ajax({
			url: pUrl,
			type :"POST",
			dataType:"json",
			async: false,
			data:JSON.stringify(param),
			contentType:"application/json",			
			success: function (result) {	
				
				if(pType == '1' || pType == '2' || pType == '3' || pType == '35' || pType == '40') {
					var scroll_opt = $("#"+pId+"_tab").attr("scroll_opt");
					if(scroll_opt == 1) {
						// resetScroll(pId+"_tab");
					}
					tabClear(pId+"_tab");
					$.each(result, function(index, value) {
						$("#"+pId+"_tab tbody").append("<tr></tr>");
						var td_idx = 0;
						$.each(sub_data, function(sub_idx, sub_val) {
							var customize_tag = "";
							var customize_data = value[sub_val.contents_sub_data];
							if($("#changeSecuMode").hasClass('on') && sub_val.contents_sub_format != "2") {
								customize_data = maskingChar(value[sub_val.contents_sub_data]);
							}
							var cnt_tag = "";
							var td_css = pId+"_"+index+"_"+td_idx;
							var col_size = nvl(sub_val.contents_sub_size, "");
							var link_tag = "";
							
							if(sub_val.contents_sub_link != null && sub_val.contents_sub_link != "" && sub_val.contents_sub_link != undefined) {
								let link_info = unescapeHtml(sub_val.contents_sub_link);
								let link_obj = $.parseJSON(link_info);
								
								if(link_obj.type == "C") {
									link_tag = 'javascript: getLinkData(\"'+link_obj.contents_cd+'\",\"'+sub_val.contents_sub_data+'\",\"'+customize_data+'\")';
								} else if(link_obj.type == "U") {
									let link_url = link_obj.url;
									let link_param = "";
									
									if(link_obj.link_param != undefined && link_obj.link_param != "" && link_obj.link_param.length > 0) {
										$.each(link_obj.link_param, function(i, v) {
											link_param += (v.key+"="+value[v.data]+"&");
										});
									}
									link_tag = 'javascript: linkWindowOpen(\"'+(link_url+"?"+link_param)+'\",\"'+pId+'\")';
								} else if(link_obj.type == "F") {
									let link_param = "";
									if(link_obj.link_param != undefined && link_obj.link_param != "" && link_obj.link_param.length > 0) {
										$.each(link_obj.link_param, function(i, v) {
											link_param += ('\"'+value[v.data]+'\",');
										});
										link_param = link_param.slice(0, -1);
									}

									var link_url = (link_obj.url).replace(/\(/g, "").replace(/\)/g, "");
									if(link_param != "")
										link_tag = 'javascript: ' + link_url+'('+link_param.replace(/\(/g, "").replace(/\)/g, "")+')';
									else
										link_tag = 'javascript: ' + link_url+'(' + JSON.stringify(value).replace(/\(/g, "").replace(/\)/g, "") + ')';
								}
							}
							
							if(sub_val.contents_sub_format == "0") {//none
								if(sub_val.contents_sub_length != undefined && sub_val.contents_sub_length != "") {
									if(!isNaN(sub_val.contents_sub_length) && sub_val.contents_sub_length > 0) {
										if(customize_data!=null){
											customize_data = customize_data.substr(0, sub_val.contents_sub_length);
											if(sub_val.contents_sub_length < value[sub_val.contents_sub_data].length) {
												customize_data += "...";
											}		
										}else{
											customize_data = "-";
										}
										
									}
								}
								if(customize_data == undefined){
									customize_data = "-";
								}
										
								customize_tag = "<td width='"+col_size+"%'>"+
								"<div class='"+td_css+"' data-in-effect='fadeInUp'>"+customize_data+"</div>"+
								"</td>";
								cnt_tag = "";
							} else if(sub_val.contents_sub_format == "1") {//Number
								if(isNaN(value[sub_val.contents_sub_data])) {
									customize_tag = "<td width='"+col_size+"%'>"+
									"<div class='"+td_css+"' data-in-effect='fadeInUp'>"+customize_data+"</div>"+
									"</td>";
									cnt_tag = "";
								} else {
									customize_tag = "<td width='"+col_size+"%'><div id='"+td_css+"_cnt'></div></td>";
									cnt_tag = (td_css+"_cnt");
								}
							} else if(sub_val.contents_sub_format == "2") { //flag
								if(customize_data == "" || customize_data == "-") {
									customize_tag = "<td width='"+col_size+"%' class='"+td_css+"' data-in-effect='fadeInUp' >"+customize_data+"</td>";
								} else {
									customize_tag = "<td width='"+col_size+"%' >"+'<img src="/img/flags/'+customize_data+'.png" alt="'+customize_data+'"/>'+"</td>";
								}
								cnt_tag = "";
							} else if(sub_val.contents_sub_format == "3") {//Ip
								if(customize_data == undefined){
									customize_data = "-";
								}
								customize_tag = "<td width='"+col_size+"%' >"+
								"<div class='"+td_css+"' data-in-effect='fadeInUp'>"+customize_data+"</div>"+
								"</td>";
								cnt_tag = "";
							} else if(sub_val.contents_sub_format == "4") {//Color
								if(customize_data == undefined){
									customize_data = "-";
								}
								customize_tag = "<td style='background:"+customize_data+"' width='"+col_size+"%' ></td>";
								cnt_tag = "";
							}else if(sub_val.contents_sub_format == "5") { //TimeStamp to Date
								customize_tag = "<td width='"+col_size+"%'>"+
								"<div class='"+td_css+"' data-in-effect='fadeInUp'>"+ ldapToText(customize_data) +"</div>"+
								"</td>";
								cnt_tag = "";
							}else if(sub_val.contents_sub_format == "6") { //image								
								if(customize_data == "" || customize_data == "-" || customize_data == undefined ) {																		
									customize_tag = "<td width='"+col_size+"%' class='"+td_css+"' data-in-effect='fadeInUp' > - </td>";
								} else {																		
									customize_tag = "<td width='"+col_size+"%' >"+'<img src="'+pro_url+'/img/contents/'+customize_data+'.png" alt="'+customize_data+'"/>'+"</td>";
								}
								cnt_tag = "";
							}else if(sub_val.contents_sub_format == "7") { //Chip	
								var tactics = nvl(customize_data, "-");
								if(tactics == undefined){
									tactics = "-";
								}						

								if(customize_data == "" || customize_data == "-" || customize_data == undefined ) {																		
									customize_tag = "<td width='"+col_size+"%' class='btn badge-light-success btn-xs' data-in-effect='fadeInUp' > - </td>";
								} else {		
									tactics = tactics.split(',');
									
									customize_tag = "<td width='"+col_size+"%' >";
									for(var nIndexTactic = 0; nIndexTactic < tactics.length; nIndexTactic++)
									{
										if(nIndexTactic != 0)
										customize_tag += "<br>";
										customize_tag += "<div class='btn badge-light-success btn-xs'>" + tactics[nIndexTactic] + "</div>";
									}
									customize_tag += "</td>";
								}
								cnt_tag = "";
							}
							
							
							if(pType == '35'){
								customize_tag = unescapeHtml(customize_tag);
							}
							$("#"+pId+"_tab tbody tr").last().append(customize_tag);
							if(link_tag != "") {
								$("#"+pId+"_tab tbody tr").last().find("td").last().attr("onclick", link_tag);
								$("#"+pId+"_tab tbody tr").last().find("td").last().addClass("hover");
							}
							
							if(create_flag) {
								if($("."+td_css).length != undefined && create_flag) {
									//$("."+td_css).textillate({ initialDelay: 1000, in: { delay: 5, shuffle: true } });
								}
								td_idx++;
								
								setTimeout(function() {
									if(cnt_tag != "") {
										animateValue(cnt_tag, 0, customize_data, 1000);
									}
								}, 2000);
							} else {
								td_idx++;
								if(cnt_tag != "") {
									$("#"+cnt_tag).text($.number(customize_data))
								}
							}
						});
					});
					if(scroll_opt == 1) {
						// setScrollC(pId+"_tab", true);
						setScrollC2(pId+'_tab');
					}
					setAll(full_flag,pType,pId);
					
				} else if(pType == "4" || pType == "5" || pType == "6" || pType == "8" || pType == "21" ) {
					var dataset = new Array();
					var data_obj = new Object();
					var series = new Array();
					var series_arr = new Array();
					var gline = "";
					
					let link_info = "";
					let link_obj = "";
					
					if(contents_info.contents_link != undefined && contents_info.contents_link != "" && contents_info.contents_link != null) {
						link_info = unescapeHtml(contents_info.contents_link);
						link_obj = $.parseJSON(link_info);
					}
					
					$.each(result.data, function(index, value) {
						data_obj = new Object();
						data_obj.name = value.key;
						if($("#changeSecuMode").hasClass('on')) {
							data_obj.name = maskingChar(value.key);
						}
						
						data_obj.color = nvl(value.color, '');
						data_obj.pastdata_flag = contents_info.pastdata_flag;
						if(link_obj != "") {
							data_obj.link_type = link_obj.type;
							data_obj.link_contents = link_obj.contents_cd;
							data_obj.link_url = link_obj.url;
						}
						
						series_arr = new Array();
						$.each(value.values, function(sub_idx, sub_val) {
							series = new Array();
							series.push(sub_val.x);
							series.push(sub_val.y);
							series.push(sub_val.id);
							series_arr.push(series);
						});
						data_obj.data = series_arr;
						dataset.push(data_obj);
						
						gline = value.gline;
					});
								
					setAll(full_flag,pType,pId);
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), result.timesArr, dataset, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				}else if(pType == "31") {
					let categories = result.categories;				
					
					if($("#changeSecuMode").hasClass('on')) {
						categories = new Array();
						$.each(result.categories, function(index, value) {
							categories.push(maskingChar(value));
						});
					}
									
					setAll(full_flag,pType,pId);
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), categories, result.data, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				}else if(pType == "32") {
					
					let categories = result.categories;				
					
					if($("#changeSecuMode").hasClass('on')) {
						categories = new Array();
						$.each(result.categories, function(index, value) {
							categories.push(maskingChar(value));
						});
					}
										 
					if(result.data == undefined){
						var result= {
								data : result
						}		
					}

					setAll(full_flag,pType,pId);
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), categories, result, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				} else if(pType == "7"||pType == "22" ) {
					var dataset = new Array();
					var data_obj = new Object();
					
					$.each(result, function(index, value) {
						data_obj = new Object();
						data_obj.name = value.col0;
						if($("#changeSecuMode").hasClass('on')) {
							data_obj.name = maskingChar(value.col0);
						}
						
						data_obj.y = value.col1;
						dataset.push(data_obj);
					});
					setAll(full_flag,pType,pId);
					
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), "", dataset, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				} else if(pType == "16") {
					
					let categories = result.categories;
					
					if($("#changeSecuMode").hasClass('on')) {
						categories = new Array();
						$.each(result.categories, function(index, value) {
							categories.push(maskingChar(value));
						});
					}
					setAll(full_flag,pType,pId);
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), categories, result.data, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				} else if(pType == "14") {
					setAll(full_flag,pType,pId);
					createChart(pId+"_chart", type_info[pType].replace("_chart",""), "", result, rotation_flag, gline, contents_info, create_flag,create_color, export_btn);
				} else if(pType == "9" || pType == "10" || pType == "11" || pType == "13" || pType == "15" || pType == "20" || pType == "30"|| pType == "33"|| pType == "34"|| pType == "36"|| pType == "37"|| pType == "38"|| pType == "39" || pType == "50") {
					if(pType == "9" || pType == "10") {
						$("#"+pId+" h2").empty();
					} else if(pType == "11") {
						$("#"+pId+"_label").empty();
					} else if(pType == "50") {
						$("#"+pId+"_label").empty();
					}else if(pType == "13") {
						$("#"+pId).find(".left_box").find("h3").empty();
						$("#"+pId).find(".right_box").empty();
					} else if(pType == "15") {
						$("#"+pId+"_label .row").empty();
					} else if(pType == "20") {
						$("#"+pId+" .table_count_box_area2 table").empty();
					} else if (pType == '36') {
						$("#containRow_"+pId).empty();
					}
					
					
					$.each(result, function(index, value) {
						var this_title = value.col0;
						if($("#changeSecuMode").hasClass('on')) {
							this_title = maskingChar(value.col0);
						}
						var cnt_id = pId + "_" + index;
						
						if(pType == "11" || pType == "20" || pType == "50") {
							
							var increase_tag = "";
							var increase_val = Math.abs(value.col2);
							if(value.col2 > 0) {
								if(pType == "50"){
								increase_tag = 									
									"<td class='re table_count_updown'><i class='fa fa-caret-up'></i>"+
									(!isNaN(increase_val) ? $.number(increase_val) : increase_val)+
									"</td></tr>";
								}else{
								increase_tag = 									
									"<tr><td colspan='2' class='re table_count_updown'><i class='fa fa-caret-up'></i>"+
									(!isNaN(increase_val) ? $.number(increase_val) : increase_val)+
									"</td></tr>";
								}
								
									
							} else if(value.col2 < 0){
								
								if(pType == "50"){
								increase_tag = 									
									increase_tag = 
									"<td class='gr table_count_updown'><i class='fa fa-caret-down'></i>"+
									(!isNaN(increase_val) ? $.number(increase_val) : increase_val)+
									"</td></tr>";
								}else{
									increase_tag = 
										"<tr><td colspan='2' class='gr table_count_updown'><i class='fa fa-caret-down'></i>"+
										(!isNaN(increase_val) ? $.number(increase_val) : increase_val)+
										"</td></tr>";
								}
							} else {
								if(pType == "50"){
									increase_tag = "<td class='gr table_count_updown'><i class='fa fa-minus'></i></td></tr>";
								}else{
									increase_tag = "<tr><td colspan='2' class='gr table_count_updown'><i class='fa fa-minus'></i></td></tr>";
								
								}
								
								
							}
	//									if(!isNaN(increase_val)) {
	//										animateValue(cnt_tag, 0, customize_data, 3000);
	//									}
							if(pType == "20") {
								
								var this_tag = "table_count_box2 left_box";
								if(!Number.isInteger(index/2)) {
									this_tag = "table_count_box2 right_box";
								} else {
									if(index > 0) {
										$("#"+pId).append("<div class='count_box_under'><div class='col-12'><div class='row'></div></div></div>");
									}
								}
								
								
								$("#"+pId+" .table_count_box_area2:last .row").append(
										"<table class='"+this_tag+"'>"+
										"<tr>"+
										"<td class='wh table_count_num' id='"+cnt_id+"'>&nbsp;</td>"+
										"<td  class='bl table_count_tit right'>"+this_title+"</td>"+
										"</tr>"+
										"<tr>"+
										increase_tag+
										"</tr>"+
										"</table>"
								);
								
							} else {
								var lineStyle = "";
								if(pType == "11" || pType == "50") {
									if(index==0) { lineStyle += "top_line"; }
									if(index==result.length-1){ lineStyle += " bottom_line"; }
								}
								
								if(pType == "11"){
									$("#"+pId+"_label").append(
										"<div class='col-12'><div class='row "+lineStyle+"'>" +
										"<table class='table_count_box'>" +
										"<tr><td colspan='2' class='bl table_count_tit'>"+this_title+"</td></tr>" +
										"<tr><td colspan='2' class='wh table_count_num' id='"+cnt_id+"'>&nbsp;</td></tr>" +
										increase_tag +
										"</table></div></div>"
									);
								}else{
									$("#"+pId+"_label").append(
										"<div class='col-12'><div class='row "+lineStyle+"'>" +
										"<table class='table_count_box'>" +
										"<tr><td colspan='2' class='bl table_count_tit'>"+this_title+"</td></tr>" +
										"<tr><td class='wh table_count_num' id='"+cnt_id+"'>&nbsp;</td>" +
										increase_tag +
										"</table></div></div>"
									);
								}
								

								
							}
							if(!isNaN(value.col1) && create_flag) {
								setTimeout(function() {
									animateValue(cnt_id, 0, value.col1, 2000);
								}, 2000);
							} else {
								$("#"+cnt_id).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
							}						
						} else if(pType == "13") {
							var color_arr = ["red","orange","yellow","green"];
							if(index < 5) {
								if(index == 0) {
									$("#"+pId).find(".left_box").find("h3").html(this_title);
									if(!isNaN(value.col1) && create_flag) {
										setTimeout(function() {
											animateValue("cnt_left_"+pId, 0, value.col1, 2000);
										}, 2000);
									} else {
										$("#cnt_left_"+pId).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
									}
								} else {
									$("#"+pId).find(".right_box").append('<div class="'+color_arr[index-1]+'"><h3 class="wh">'+this_title+'</h3><label id="cnt_'+pId+'_'+index+'"></label></div>');
									
									if(!isNaN(value.col1) && create_flag) {
										setTimeout(function() {
											animateValue("cnt_"+pId+"_"+index, 0, value.col1, 2000);
										}, 2000);
									} else {
										$("#cnt_"+pId+"_"+index).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
									}
								}
							}
						}else if(pType == "33") {
							if(index < 5) {
								if(index == 0) {
									$("#"+pId).find(".left_box").find("h3").html(this_title);
									if(!isNaN(value.col1) && create_flag) {
										setTimeout(function() {
											animateValue("cnt_left_"+pId, 0, value.col1, 2000);
										}, 2000);
									} else {
										$("#cnt_left_"+pId).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
									}
								}
							}
						}else if(pType == "34") {
							var img_temp ="";
							if(value.type == undefined){										
								img_temp = "1"
							}else{										
								img_temp = value.type;
							}
							$("#"+pId+" h2").append(							
									"<div class='info_box_txt_tit'> <img src="+pro_url+"/img/contents/"+img_temp+".png width='12px' />"+this_title+"</div>"+
									"<h3 class='wh box_text'><span class='left'><img src="+pro_url+"/img/contents/"+img_temp+".png width='46px' /></span>  " +
									"<span class='right' id='cnt_"+pId+"_"+index+"'></span></h3><br/>"
							);
							if(!isNaN(value.col1) && create_flag) {
								setTimeout(function() {
									animateValue("cnt_"+pId+"_"+index, 0, value.col1, 2000);
								}, 2000);
							} else {
								$("#cnt_"+pId+"_"+index).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
							}
						}else if(pType == "36") {														
							
							var thisSubType = contents_info.contents_sub_type;
							
							var thisTheme = 0;
							if(thisSubType != undefined && thisSubType != null) {
								thisTheme = thisSubType.split("_")[0];
							}
							var labelType ="";
							var labelClass = "box_data";
		
							if(thisTheme == 0 ){
								
								$("#contain_name_"+pId).text("STEP");								
								labelType = "Step";									

									$("#containRow_"+pId).append(																				
									 		"<div class='process_box row mt15' onclick='javascript:mainView.changeLayer(\""+value.col1+"\");'>"+
												"<div class='process_con col-8'>"+
													"<h3 class='mb0 mt10'>"+value.col0+"</h3>"+
												"</div>"+
												"<div class='process_bar col-1'></div>"+
												"<div class='process_step col-2'>"+
													"<span>"+labelType+"</span>"+
													"<h1>"+(index+1)+"</h1>"+
												"</div>"+												
											"</div>"
									);

								
							}else if(thisTheme == 1){					
								
								labelType = "Case";
								
								$("#containRow_"+pId).append(																				
								 		"<div class='process_box box_data row mt15'>"+
											"<div class='process_con col-8'>"+
												"<h3 class='mb0 mt20'>"+value.col0+"</h3>"+
											"</div>"+
											"<div class='process_bar col-1'></div>"+
											"<div class='process_step col-2'>"+
												"<span>"+labelType+"</span>"+
												"<h1>"+$.number(value.col1)+"</h1>"+
											"</div>"+											
										"</div>"
								);
							}
										
						}else if(pType == "37") {
														
							$("#contain_name_2_"+pId).append(
																		
										"<div class='col-6 pr0 mt10'>"+
											"<div class='box_content hover' style='height: 150px;padding: 40px 15px;'>"+
												"<span class='tac font-20' >"+value.col0+" <br /> "+$.number(value.col1)+getMsgStr("w.cases") + "</span>"+
											"</div>"+
										"</div>"
							
							);																				
									
									
						}else if(pType == "38") {
							$("#"+pId+"_label").append(
									
								"<div class='par_area2' style='height: 750px;float: left;'>"+
									"<table>"+
										"<tr>"+
											"<td></td>"+
											"<td class='top_par_line2'></td>"+
										"</tr>"+
										"<tr>"+
											"<td></td>"+
											"<td class='par_line2'></td>"+
										"</tr>"+
										"<tr>"+
											"<td class='middle_par_line2' colspan='2'></td>"+
										"</tr>"+
										"<tr>"+
											"<td></td>"+
											"<td class='par_line2'></td>"+
										"</tr>"+
										"<tr>"+
											"<td></td>"+
											"<td class='bottom_par_line2'></td>"+
										"</tr>"+
									"</table>"+
								"</div>"+ 
								"<div class='menu_box_area' style='float: left;margin: 45px 10px;'>"+
									"<div class='row'>"+
										"<div class='col-12 pr0 mt20'>"+
											"<div class='box_content hover' style='height: 190px;padding: 15px'>"+
												"<h1 class='tac'>01</h1>"+
												"<span class='tac'>"+value.col0+"</span>"+
											"</div>"+
										"</div>"+
										"<div class='col-12 pr0 mt20'>"+
											"<div class='box_content hover' style='height: 190px;padding: 15px'>"+
												"<h1 class='tac'>02</h1>"+
												"<span class='tac'>"+value.col1+"</span>"+
											"</div>"+
										"</div>"+
										"<div class='col-12 pr0 mt20'>"+
											"<div class='box_content hover' style='height: 190px;padding: 15px'>"+
												"<h1 class='tac'>03</h1>"+
												"<span class='tac'>"+value.col2+"</span>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"	
							
							);														
									
									
						}else if(pType == "39") {
							$("#"+pId+"_label").append(
									"<div class='box_content attack_board'>"+
										"<div class='img_per'>"+
											"<div class='pie_ba'>"+
												"<div class='pie_chart' id='"+pId+"pie_chart_"+index+"'>"+
													"<div class='center'>"+
														"<span></span>"+
													"</div>"+
												"</div>"+
											"</div>"+
										"</div>"+
										"<ul>"+
											"<li class='board_num'>"+value.col1+"</li>"+
											"<li class='board_text'>"+value.col2+"</li>"+
										"</ul>"+
									"</div>"					  
								);
							
							draw(value.col0, "1",pId+"pie_chart_"+index, '#00a1ff4d', '#00619a4d');
								
							} else if(pType == "15") {
							$("#"+pId+"_label .row:last").append(
									"<table class='table_count_box3'>" +
									"<tr>" +
									"<td class='wh left_box'>"+this_title+"</td>" +
									"<td class='wh right_box' id='cnt_"+pId+"'>&nbsp;</td>" +
									"</tr>" +
							"</table>");
							if(!isNaN(value.col1) && create_flag) {
								setTimeout(function() {
									animateValue("cnt_"+pId, 0, value.col1, 2000);
								}, 2000);
							} else {
								$("#cnt_"+pId).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
							}
						} else if(pType == "30") {
							var sec_title = value.col2;
							$("#"+pId+" .row:last").append(
									'<div class="left_box">'+
									'<h3 class="wh">' + this_title + '</h3>'+
									"<label class='wh' id='cnt_"+pId+'_'+index+"_1'>&nbsp;</label>" +
									'</div>'+
									'<div class="right_box">'+
									'<h3 class="wh">' + sec_title + '</h3>'+
									"<label class='wh' id='cnt_"+pId+'_'+index+"_2'>&nbsp;</label>" +
								'</div>');
							if(!isNaN(value.col1) && create_flag) {
								setTimeout(function() {
									animateValue("cnt_"+pId+'_'+index+'_1', 0, value.col1, 2000);
								}, 2000);
							} else {
								$("#cnt_"+pId+'_'+index).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
							}
							if(!isNaN(value.col3) && create_flag) {
								setTimeout(function() {
									animateValue("cnt_"+pId+'_'+index+'_2', 0, value.col3, 2000);
								}, 2000);
							} else {
								$("#cnt_"+pId+'_'+index+'_2').html((!isNaN(value.col1) ? $.number(value.col3) : value.col3));
							}
						} else {
							$("#"+pId+" h2").append(
									"<h3 class='wh box_text'><span class='left'>"+this_title+"</span>  " +
									"<span class='bl right' id='cnt_"+pId+"_"+index+"'></span></h3><br/>"
							);
							if(!isNaN(value.col1) && create_flag) {
								setTimeout(function() {
									animateValue("cnt_"+pId+"_"+index, 0, value.col1, 2000);
								}, 2000);
							} else {
								$("#cnt_"+pId+"_"+index).html((!isNaN(value.col1) ? $.number(value.col1) : value.col1));
							}
						}
					});
					setAll(full_flag,pType,pId);
				} else if(pType == "17") {
					var score = 0;					
					if(result.length > 0) {
						score = (result[0].col0 != undefined && result[0].col0 != null ? result[0].col0 : 0)
					}
					score = result[0].col0;
					var thisSubType = contents_info.contents_sub_type;
					
					var thisTheme = 0;
					var thisType = 0;
					if(thisSubType != undefined && thisSubType != null) {
						thisTheme = thisSubType.split("_")[0];
						thisType = thisSubType.split("_")[1];
					}
					var themeCss = 'pie_ba'
					if(thisTheme == 1) {
						themeCss = 'pie_ba2'
					} else if(thisTheme == 2) {
						themeCss = 'pie_ba4'
					}
					
					var sColor = '#00a1ff4d';
					var eColor = '#00619a4d';
					
					if(thisType == 1) {
						sColor = '#3da2004d';
						eColor = '#1a67204d';
					} else if(thisType == 2) {
						sColor = '#e09a3e4d';
						eColor = '#7c580c4d';
					}
					
					if(thisTheme == 0 || thisTheme == 1 || thisTheme == 2) {
						$("."+pId+"_circle").append(
								"<div class='"+themeCss+"' style='zoom:1.5; margin: 20px auto;'>" +
								"<div class='pie_chart' id='"+pId+"_circle'>" +
								(thisTheme == 2 ? '<div class="pie_circle"></div>' : '') +
								"<div class='center'><span></span></div>"+
								"</div>" +
								"</div>"
						)
						drawCircle(score, ((Number(thisTheme) + 1) == 3 ? 1 : (Number(thisTheme) + 1)), pId+"_circle", sColor, eColor);
						
					} else if(thisTheme == 3) {
						$("."+pId+"_circle").append(
						'<div class="bar_ba">'+
							"<div class='bar_chart' id='"+pId+"_circle'>"+
							'<div class="bar_circle"></div>'+
							'<span>'+score+'%</span>'+
							'</div>'+
						'</div>'
						)
						drawCircle(score, Number(thisTheme), pId+"_circle", sColor, eColor);
					}
				} else if(pType == "24") {
					
					var step_num = "";
										
					if(result[0] == null){						
						step_num = 1;						
					}else{						
						step_num = result[0].col0;						
					}
					
					var step = '';
					if(step_num == 1) {
						step = 'one'
					} else if(step_num == 2) {
						step = 'two'
					} else if(step_num == 3) {
						step = 'three'
					} else if(step_num == 4) {
						step = 'four'
					} else if(step_num == 5) {
						step = 'five'
					}
					
					var hh = $("#"+pId).parent().css('height');
					// if(hh=="0px"){
					if(Number(hh.replace("px",'')) <= 12){ // 로딩이 느려 헤더가 먼저 표시될 경우 12px로 잡혀서 정상적으로 표시되지 않음
						hh = $("#"+pId).parent().parent().css('height');
					}
					
					$("#"+pId).append(
					"<div class='circle_area_02  step_"+step+"' style='width:"+hh+";height:"+hh+";'>" +
						"<div class='circle_line'>" +
							"<div class='dotted_one'><span></span></div>" +
							"<div class='dotted_two'><span></span></div>" +
							"<div class='dotted_three'><span></span></div>" +
							"<div class='dotted_four'><span></span></div>" +
							"<div class='dotted_five'><span></span></div>" +
							"<div class='circle_in'>" +
								"<h1></h1>" +
							"</div>" +
							"<div class='cube'><div class='cube_in'></div></div>" +
						"</div>" +
					"</div>"
					);
				} else if(pType == "25") {
					$.each(result, function(index, value) {
						$("#" + pId + " .col-12").append(
							"<table class='table_count_box col-2'>" +
								"<tbody>" +
									"<tr>" +
										"<td colspan='2' class='wh table_count_tit'>" +
											"<img src=/img/flags/"+nvl(value.col0,"-")+".png width='18px' style='vertical-align: middle' >"+											
											nvl(value.col1) +
										"</td>" +
									"</tr>" +
										"<tr>" +
										"<td colspan='2' class='bl table_count_num'>"+nvl(value.col2,0)+" <span>"+getMsgStr('w.cases')+"</span></td>" +
									"</tr>" +
								"</tbody>" +
							"</table>"
						);
					});
				} else if(pType == "26") {
					$.each(result, function(index, value) {
						$("#" + pId + " .info_country").append(
							'<ul>' +
								'<li class="info_country_name"><span></span>' + value.col0 + '</li>' +
								'<li class="info_country_organ">'+value.col3+' : ' + value.col1 +  getMsgStr('particle.cnt')+ '</li>' +
								'<li class="info_country_warning">'+value.col4+': ' + value.col2 + getMsgStr('w.cases') + '</li>' +
							'</ul>'
						);
					});
				} else if(pType == "27") {
					$.each(result, function(index, value) {
						$("#" + pId + " .attack_area .col-12").append(
							'<table class="attack_box" style="width:100%;">' +
								'<thead>' +
									'<tr>' +
										'<th class="line_top"></th><th></th><th class="line_top"></th>' +
									'</tr>' +
									'<tr>' +
										'<th></th><th></th><th></th>' +
									'</tr>' +
								'</thead>' +
								'<tbody>' +
									'<tr>' +
									'<td>' +
										'<div class="attack_name">' +
											'<p></p>' +
											'<h3>' + value.col0 + '</h3>' +
										'</div>' +
									'</td>' +
									'<td width="5px"></td>' +
									'<td>' +
										'<div class="attack_count">' +
											'<p>case</p>' +
											'<h3>' + value.col1 + '</h3>' +
										'</div>' +
									'</td>' +
									'</tr>' +
								'</tbody>' +
							'</table>'
						);
					});
				} else if(pType == "28") {
					$.each(result, function(index, value) {
						$("#" + pId + " .row .col-12").append(
						"<div class='process_box row mt15'>" +
							"<div class='process_con col-7'>" +
								"<h4>" + value.col0 + "</h4>" +
								"<p>" + value.col1 + "</p>" +
							"</div>" +
							"<div class='process_bar col-2'></div>" +
							"<div class='process_step col-2'>" +
								"<span>Step</span>" +
								"<h1>"+(index+1)+"</h1>" +
								"</div>" +
								"<div class='process_bar col-1'>" +
								"<div class='process_bar_line'></div>" +
							"</div>" +
						"</div>"
						);
					});
				} else if(pType == "29") {
					$.each(result, function(index, value) {
						$("#" + pId + " .info_left_list ul").append("<li>" + value.col0 + "</li>");
					});
				}else if(pType == "41") {
					
					var thisSubType = contents_info.contents_sub_type;
					
					var thisTheme = 0;
					if(thisSubType != undefined && thisSubType != null) {
						thisTheme = thisSubType.split("_")[0];
					}

					var step_num = "";
					
					if(result[0] == null){						
						step_num = 1;						
					}else{						
						step_num = result[0].col0;						
					}										

					var step = '';
					if(step_num == 1) {
						step = 'one'
					} else if(step_num == 2) {
						step = 'two'
					} else if(step_num == 3) {
						step = 'three'
					} else if(step_num == 4) {
						step = 'four'
					} else if(step_num == 5) {
						step = 'five'
					}
					
					var ww = $("#"+pId).parent().css('width');
					
					$("#"+pId).append(
										'<div class="right_top" style="z-index:10101">' +
								"<i class='fa fa-cog' onclick='javascript:setContentsDetail(\""+contents_info.contents_cd+"\", \""+contents_info.contents_title+"\",\""+$($("#"+pId).parent()).attr("monitor_cd")+"\",event)'></i>"+
								"<i class='fa fa-close' onclick='javascript:delMonitor(\""+contents_info.contents_cd+"\")'></i>"+
								"</div>"+
						"<img src=/img/warning/"+thisTheme+"/"+step+".png style=width:"+ww+">"
					
					
					
					);
				}
				
				//컨텐츠 값 변경시 알림
				const content_div = document.getElementById(pId);
				if (!!content_div) {
					checkAlert(content_div,result,pId,pType);
				}

				if(full_flag != 'Y') {
					setTimeout(() => {
						updateLock(true);
					}, 100);
				}
				ContentsEventBus.dispatch("contentsLoaded",pId)
				setTimeout(()=>{
					ContentsEventBus.dispatch("contentsAnimationFinish",pId)
				},4000)
			},
			error: function (result) {
			}
		});
	}
	/**
	 * 
	 * @param {HTMLDivElement} content_div 컨텐츠 영역
	 * @param {object} content_data 컨텐츠 데이터
	 * @param {string} pId 모니터 아이디
	 * @param {string} pType 컨텐츠 타입
	 */
	function checkAlert(content_div,content_data,pId,pType) {
		//시간 설정값 확인
		/** @type {Number} 라벨 알림 설정값 | Default: 10 */
		let settingTime = Number(getCookie('LabelAlert') ?? "10");
		let t = 10*1000;
		if (settingTime > 0) {
			t = settingTime * 1000
		}
		
		//알림 클래스 및 영역 지정
		let alert_divs = [content_div];
		let alert_class = "effect_a2";
		let sub_alert = {
			is_active: false,
			divs: [],
			class: null
		}
		
		/** @type {object} DB에서 새로 받아온 데이터(저장할 데이터) */
		let to_save = {
			data: content_data,
			last_alert: 0
		}
		
		// 커스텀
		if (pType == '33') {
			alert_divs = [alert_divs[0].querySelector(".left_box")];
			alert_class = "effect_a";
		}

		if (content_div.getAttribute("alert") === "true"){
			// 기존에 저장된 데이터 확인
			if (sessionStorage.getItem(pId) !== null) {
				/** @type {object} 마지막으로 저장된 데이터(세션스토리지) */
				let last_saved = JSON.parse(sessionStorage.getItem(pId));
				
				to_save.last_alert = last_saved.last_alert;
				//마지막 알림시간 체크
				const nowMs = Number(new Date());
				/** @type {number} 알림이 시작될때부터 현재까지의 시간(ms) */
				let last_alert_from_now = nowMs - (Number(last_saved.last_alert) || nowMs)
				/** @type {number} 남은 알림 시간(ms) */
				let remain_alert = t - (last_alert_from_now || t);

				//사회보장원 커스텀
				if (site_name == 'ssis') {
					if (pType == '36') {
						/** @type {number} 신규접수 값*/
						let target_value = 0;
						for (const row of to_save.data) {
							if (row.col0 == getMsgStr("contents.word_57")) target_value = Number(row.col1);
						}
						if (target_value != 0) {
							if (settingTime < 0) { //무제한
								label11_custom_alert(content_div,-1)
							}else{
								if (remain_alert > 0) {
									label11_custom_alert(content_div,remain_alert);
								}else{
									if (JSON.stringify(content_data) !== JSON.stringify(last_saved.data)) {
										to_save.last_alert = Number(new Date())
										label11_custom_alert(content_div,t);
									}
								}
							}
						}else{
							//알림 삭제
							let alert_div = content_div.querySelector(".process_box");
							if (alert_div.classList.contains("effect_a2")) alert_div.classList.remove("effect_a2")
							let subalert_divs = document.querySelectorAll(".process_area");
							for (const d of subalert_divs) {
								if (d.classList.contains("effect_a2")) d.classList.remove("effect_a2")
							}
						}
					}else{ //label 11 제외
						if (remain_alert > 0) {
							setAlert(content_div,alert_divs,alert_class,sub_alert,remain_alert)
						}else{
							if (JSON.stringify(content_data) !== JSON.stringify(last_saved.data)) {
								to_save.last_alert = Number(new Date())
								setAlert(content_div,alert_divs,alert_class,sub_alert,t)
							}
						}
					}
					
				}else{ //사회보장원 아닐시
					if (remain_alert > 0) {
						setAlert(content_div,alert_divs,alert_class,sub_alert,remain_alert)
					}else{
						if (JSON.stringify(content_data) !== JSON.stringify(last_saved.data)) {
							to_save.last_alert = Number(new Date())
							setAlert(content_div,alert_divs,alert_class,sub_alert,t)
						}
					}
				}
			}

			// 마지막 데이터 저장
			sessionStorage.setItem(pId,JSON.stringify(to_save));
		}
		


		// if (sessionStorage.getItem(pId) !== null && content_div.getAttribute("alert") === "true"){
		// 	/** @type {object} 마지막으로 저장된 데이터(세션스토리지) */
		// 	let last_saved = JSON.parse(sessionStorage.getItem(pId));
			
		// 	//마지막 알림시간 체크
		// 	to_save.last_alert = last_saved.last_alert;
		// 	/** @type {number} 알림이 시작될때부터 현재까지의 시간(ms) */
		// 	let last_alert_from_now = Number(new Date()) - Number(last_saved.last_alert)
		// 	/** @type {number} 남은 알림 시간(ms) */
		// 	let remain_alert = t - last_alert_from_now;
		// 	//24시간 알림
		// 	// if (pType == '36') {
		// 	// 	remain_alert = 24*60*60*1000 - last_alert_from_now
		// 	// }

		// 	//===========사회보장원===========
		// 	//신규접수 값이 0이면 알림 설정 안함
		// 	/** @type {number} */
		// 	let target_value;
		// 	for (const row of to_save.data) {
		// 		if (row.col0 == "신규접수") target_value = Number(row.col1);
		// 	}
		// 	//===========사회보장원===========
			
		// 	if (settingTime < 0) {
		// 		remain_alert = 1;
		// 	}
			
		// 	//알림시간이 남아있으면 남은 시간만큼 울림
		// 	if (remain_alert > 0) {
		// 		if (settingTime < 0) {
		// 			remain_alert = -1;
		// 		}

		// 		//중간에 값이 바뀌면 시간 추가
		// 		// if (JSON.stringify(content_data) !== JSON.stringify(last_saved.data)) {
		// 		// 	remain_alert += t
		// 		// 	save.last_alert = last_saved.last_alert + remain_alert
		// 		// }

		// 		//24시간 알림
		// 		// if (pType == '36') {
		// 		// 	setAlert_36(content_div,remain_alert)
		// 		// } else {
		// 		// 	setAlert(alert_div,alert_class,sub_alert,remain_alert)
		// 		// }

		// 		//기본
		// 		if (target_value != 0) {
		// 			setAlert(content_div,alert_divs,alert_class,sub_alert,remain_alert)
		// 		}
		// 		// setAlert(content_div,alert_divs,alert_class,sub_alert,remain_alert)
		// 	}else{
		// 		if (JSON.stringify(content_data) !== JSON.stringify(last_saved.data)) {
		// 			to_save.last_alert = Number(new Date())

		// 			//24시간 알림
		// 			// if (pType == '36') {
		// 			// 	setAlert_36(content_div,60*1000)
		// 			// 	// setAlert_36(content_div,24*60*60*1000)
		// 			// } else {
		// 			// 	setAlert(alert_div,alert_class,sub_alert,t)
		// 			// }

		// 			//기본
		// 			if (target_value != 0) {
		// 				setAlert(content_div,alert_divs,alert_class,sub_alert,t)
		// 			}
		// 		}
		// 		// else{
		// 		// 	if (alert_div.classList.contains(alert_class)) alert_div.classList.remove(alert_class);
		// 		// }
		// 	}
		// }
		// if (content_div.getAttribute("alert") === "true"){
		// 	sessionStorage.setItem(pId,JSON.stringify(to_save));
		// }
	}






	
	/**
	 * 
	 * @param {HTMLDivElement[]} content_div 
	 * @param {HTMLDivElement[]} alert_divs 
	 * @param {String} alert_class 
	 * @param {Object} sub_alert_obj 
	 * @param {Number} timeout 
	 */
	function setAlert (content_div,alert_divs,alert_class,sub_alert_obj,timeoutMs){
		if (alert_divs.length < 1){
			return false;
		}
		for (const d of alert_divs) {
			d.classList.add(alert_class);
		}
		if (sub_alert_obj.is_active && sub_alert_obj.divs.length > 0) {
			for (const targetDiv of sub_alert_obj.divs) {
				targetDiv.classList.add(sub_alert_obj.class);
			}
		}
		if (timeoutMs > 0) {
			setTimeout(() => {
				// removeAlert(content_div)
				for (const d of alert_divs) {
					if (d.classList.contains(alert_class)) d.classList.remove(alert_class);
				}
				if (sub_alert_obj.is_active) {
					for (const targetDiv of sub_alert_obj.divs) {
						if (targetDiv.classList.contains(sub_alert_obj.class)) {
							targetDiv.classList.remove(sub_alert_obj.class);
						}
					}
				}
			}, timeoutMs);
		}
	}
	/**
	 * 
	 * @param {HTMLDivElement} content_div 
	 */
	function removeAlert (content_div){
		/** @type {string[]} */
		const alertClasses = ["effect_a","effect_a2"];
		/** @type {HTMLDivElement[]} */
		let activatedAlerts = [];
		
		for (const c of alertClasses) {
			const tempArr = content_div.querySelectorAll("." + c)
			activatedAlerts.push(...tempArr);
		}

		if (activatedAlerts.length < 1) return false;
		
		for (const alertDiv of activatedAlerts) {
			for (const c of alertClasses) {
				if (alertDiv.classList.contains(c)) alertDiv.classList.remove(c);
			}
		}
		
	}
	/**
	 * 
	 * @param {HTMLDivElement} content_div 
	 * @param {String} alert_class 
	 * @param {Object} sub_alert_obj 
	 * @param {Number} timeout 
	 */
	function label11_custom_alert (content_div, timeoutMs){
		const alert_div = content_div.querySelector(".process_box")
		const alert_class = "effect_a"
		const sub_alert = {
			is_active: true,
			divs: document.querySelectorAll('.process_area'),
			class: "effect_a2"
		}
		alert_div.classList.add(alert_class);
		if (sub_alert.is_active) {
			for (const targetDiv of sub_alert.divs) {
				targetDiv.classList.add(sub_alert.class);
			}
		}
		if (timeoutMs > 0) {
			setTimeout(() => {
				if (alert_div.classList.contains(alert_class)) alert_div.classList.remove(alert_class);
				if (sub_alert.is_active) {
					for (const targetDiv of sub_alert.divs) {
						if (targetDiv.classList.contains(sub_alert.class)) {
							targetDiv.classList.remove(sub_alert.class);
						}
					}
				}
			}, timeoutMs);
		}
	}
	
	var circle_timer = new Array();
	
	function updateMonitorStyle(monitor) {
		const isEdit = document.getElementById("editModeBtn").classList.contains("on");
		if(!isEdit) return false;

		/* disable auto save option */
		// check autosave
		// const editAutoSave = JSON.parse(localStorage.getItem("auto-save")) ? true : false;
		const editAutoSave = true;

		// if autosave disabled, do not update monitor style
		if (!editAutoSave) return false;
		var keyData = {
				monitor_cd : monitor.attr("monitor_cd")
		}
		var data = new Object();
		data.monitor_cd = monitor.attr("monitor_cd");
		data.monitor_y = Number(monitor.css("left").replace("px", ""));
		data.monitor_x = Number(monitor.css("top").replace("px", ""));
		data.monitor_width = monitor.outerWidth();
		data.monitor_height = monitor.outerHeight();
		
		var param = {
				map:data,
				keyMap:keyData
		};
	//				$("#overlay").show();
		$.ajax({
			url: "/monitor/updateMonitorStyle",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				$("#size_width").val(monitor.css("width").replace("px", ""));
				$("#size_height").val(monitor.css("height").replace("px", ""));
				$("#size_top").val(monitor.css("top").replace("px", ""));
				$("#size_left").val(monitor.css("left").replace("px", ""));
				monitor_size_info[data.monitor_cd] = {x:data.monitor_x,y:data.monitor_y,width:data.monitor_width,height:data.monitor_height};
	//						$("#overlay").fadeOut();
			},
			error: function (e) {
				console.log(e)
				
				$("#overlay").fadeOut();
				// alertify.error('<i class="icon fa fa-ban"></i> '+getMsgStr("message.network_error"));
			}	
		});
	}
	function setOption() {
		var compute_w;
		var compute_h;
		
		
		/**@type {monitorHistory} */
		let newHistory = {
			scene_cd: scene_cd,
			monitor_cd: null,
			prevData: null,
			currData: null,
			changed: null,
		}
		$(".draggable").draggable({
			containment: 'document',
			opacity: 0.7,
			cursor: "move", 
			snap:false,
			scroll: false,
			start: function( event, ui ) {
				guides = $.map( $( ".draggable" ).not( this ), computeGuidesForElement );
				innerOffsetX = event.originalEvent.offsetX;
				innerOffsetY = event.originalEvent.offsetY;
				//console.log(event.originalEvent.offsetX,event.originalEvent.offsetY);

				//create new history, save orignal style
				const monitor_cd = this.getAttribute("monitor_cd")
				newHistory = {
					scene_cd: scene_cd,
					monitor_cd: monitor_cd,
					prevData: {
						monitor_cd: monitor_cd,
						monitor_y: Number($(this).css("left").replace("px", "")),
						monitor_x: Number($(this).css("top").replace("px", "")),
						monitor_width: $(this).outerWidth(),
						monitor_height: $(this).outerHeight(),
					},
					currData: null,
					changed: null,
				}
			}, 
			drag: function( event, ui ){
					if(event.ctrlKey)
						return false;
					if(selected_div.length > 0)
						return false;
						
					var guideV, guideH, distV = MIN_DISTANCE+1, distH = MIN_DISTANCE+1, offsetV, offsetH; 
					var chosenGuides = { top: { dist: MIN_DISTANCE+1 }, left: { dist: MIN_DISTANCE+1 } }; 
					var $t = $(this); 
					var pos = {
							top: event.originalEvent.pageY - innerOffsetY, 
							left: event.originalEvent.pageX - innerOffsetX 
					}; 
					var w = $t.outerWidth() - 1; 
					var h = $t.outerHeight() - 1; 
					var elemGuides = computeGuidesForElement( null, pos, w, h ); 
					$.each( guides, function( i, guide ) {
						$.each( elemGuides, function( i, elemGuide ){
							if( guide.type == elemGuide.type ){
								var prop = guide.type == "h"? "top":"left"; 
								var d = Math.abs( elemGuide[prop] - guide[prop] ); 
								if( d < chosenGuides[prop].dist ){
									chosenGuides[prop].dist = d; 
									chosenGuides[prop].offset = elemGuide[prop] - pos[prop]; 
									chosenGuides[prop].guide = guide; 
								}
							}
						}); 
					});
					
					if( chosenGuides.top.dist <= MIN_DISTANCE ) {
						$( "#guide-h" ).css( "top", chosenGuides.top.guide.top ).show(); 
						// ui.position.top = chosenGuides.top.guide.top - chosenGuides.top.offset;
					} else {
						$( "#guide-h" ).hide();
						// ui.position.top = pos.top; 
					}
					
					if( chosenGuides.left.dist <= MIN_DISTANCE ) {
						$( "#guide-v" ).css( "left", chosenGuides.left.guide.left ).show(); 
						// ui.position.left = chosenGuides.left.guide.left - chosenGuides.left.offset; 
					} else {
						$( "#guide-v" ).hide();
						// ui.position.left = pos.left;
					}	
				
				
			}, 
			stop: function( event, ui ){
				var finalOffset = $(this).offset();
				var finalxPos = finalOffset.left;
				var finalyPos = finalOffset.top;
				/*
							if(finalxPos<-200){
								finalxPos = 0;
								$(this).offset({left:finalxPos});
							}*/
				
				if(finalyPos<10){
					finalyPos = 10;
					$(this).offset({top:finalyPos});
				}
				$( "#guide-v, #guide-h" ).hide();

				// save changed style
				newHistory.currData = {
					monitor_cd: $(this).attr("monitor_cd"),
					monitor_y: Number($(this).css("left").replace("px", "")),
					monitor_x: Number($(this).css("top").replace("px", "")),
					monitor_width: $(this).outerWidth(),
					monitor_height: $(this).outerHeight(),
				},
				newHistory.changed = "POS"

				// add to history
				monitor_historys.undoList.push(newHistory);

				// update style
				updateMonitorStyle($(this));
			}
		});
		$(".resizable").resizable({
			
			create:function(event,ui){
				
			},
			start: function(){
				//$("[id*='option']")
				
				if(typeof $($(this).children("div")).find("div[class*='count_box']").css("min-width") !="undefined"){
					$(".resizable").resizable( "option", "minWidth", parseInt($($(this).children("div")).find("div[class*='count_box']").css("min-width").split("px")[0])+4);
				}
				
				if(typeof $($(this)).find("div[class*='content_title']").css("min-width") != "undefined"){
					$(".resizable").resizable( "option", "minWidth", parseInt($($(this)).find("div[class*='content_title']").css("min-width").split("px")[0])+4);
					
				}
				
				if(typeof $($(this)).find("div[class*='table_count_box_area']").css("min-width") != "undefined"){
					$(".resizable").resizable( "option", "minWidth", parseInt($($(this)).find("div[class*='table_count_box_area']").css("min-width").split("px")[0])+4);
					
				}
				
				
				
				if(!$(this).attr("type") == "box")
					return;
				compute_w = $(this).outerWidth();
				compute_h = $(this).outerHeight();
				
				
				
				//create new history, save orignal style
				const monitor_cd = this.getAttribute("monitor_cd")
				newHistory = {
					scene_cd: scene_cd,
					monitor_cd: monitor_cd,
					prevData: {
						monitor_cd: monitor_cd,
						monitor_y: Number($(this).css("left").replace("px", "")),
						monitor_x: Number($(this).css("top").replace("px", "")),
						monitor_width: $(this).outerWidth(),
						monitor_height: $(this).outerHeight(),
					},
					currData: null,
					changed: null,
				}
				//$($($(this).children("div")).find("div[class*='count_box']").parent()).css("width",Number($(this).outerWidth()+26)+"px");
			},
		
			stop: function(){
				
				// save changed style
				newHistory.currData = {
					monitor_cd: $(this).attr("monitor_cd"),
					monitor_y: Number($(this).css("left").replace("px", "")),
					monitor_x: Number($(this).css("top").replace("px", "")),
					monitor_width: $(this).outerWidth(),
					monitor_height: $(this).outerHeight(),
				},
				newHistory.changed = "SIZE";
				// add to history
				monitor_historys.undoList.push(newHistory);
			//	$($($(this).children("div")).find("div[class*='count_box']").parent()).css("width",Number($(this).outerWidth()+26)+"px");


				var this_type = $(this).attr("type");
				
				var endW = $(this).outerWidth();
				var endH = $(this).outerHeight();
				var cont_width = endW - compute_w;
				var cont_height = endH - compute_h;
				
				
				
				$(this).find(".card-box").css('height', endH);
				$(this).find(".card-box").css('width', endW);
				
	//						if($(this).find(".card-box").children().length == 0) {
	//							return false;
	//						}
				

				if(this_type == "box"){
						//## multiselect ##
						selected_div.forEach(function(e){

							var div = $("div[monitor_cd='"+ e +"']");
							var box_width = div.outerWidth() + cont_width;
							var box_height = div.outerHeight() + cont_height;
							
							var this_type = div.attr("type");
							var content_width = div.find(".card-box").outerWidth() + cont_width;
							var content_height = div.find(".card-box").outerHeight() + cont_height;
							
							if(box_width < 200 || box_height < 200){
								resetSelected();
								return;
							}
								
								
							div.css("width", box_width);
							div.css("height", box_height);
							
							div.find(".card-box").css('width', box_width);
							div.find(".card-box").css('height', box_height);
							
							var transObj = new Object();
							transObj.div = div;
							transObj.type = "box";
							transObj.typeC = this_type;
							transObj.boxW = box_width;
							transObj.boxH = box_height;
							arrangeTypeC(transObj);
							
							
						//	if(this_type.includes("table")){
						//		resetScroll(div.find("table").eq(0).attr("id"));
						//		setScroll(div.find("table").eq(0).attr("id"), true);
						//	}else if(this_type.includes("label") || this_type.includes("header") || this_type.includes("circle")) {
						//		div.css('width', box_width);
						//		if(this_type.includes("circle")) {
						//			$("."+div.attr("monitor_cd")+"_"+this_type+"_circle").attr("data-size", box_height);
						//		} else {
						//			$("#"+div.attr("monitor_cd")+"_"+this_type).children().css('width', box_width);
						//		}
						//	}else{ 						
							//	var chartConLen = $("#"+div.find(".card-box").attr("id")+"_chart").find(".highcharts-container").length;
								
							//	div.find("#"+div.find(".card-box").attr("id") + "_chart").css('height', box_height -55 );
							//	div.find("#"+div.find(".card-box").attr("id") + "_chart").css('width', box_width);
								
							//	if(chartConLen > 0){
							//		$("#"+div.find(".card-box").attr("id")+"_chart").highcharts().setSize((box_width - 20), (box_height - 85));
							//	}
							// }
							
							updateMonitorStyle(div);
						}); 								
				}else{
					var transObj = new Object();
					transObj.div = $(this);
					transObj.typeC = this_type;
					transObj.endW = endW;
					transObj.endH = endH;
					arrangeTypeC(transObj);
					//console.log(endW);
					
				
				//	if(this_type.indexOf("table") > -1) {
				//		if($(this).find("table").attr("scroll_opt") == 1) {
				//			resetScroll($(this).find("table").eq(0).attr("id"));
				//			setScroll($(this).find("table").eq(0).attr("id"), true);
				//		}
				//	} else if(this_type.indexOf("label") > -1 || this_type.indexOf("header") > -1 || this_type.indexOf("circle") > -1) {
				//		$(this).css('width', endW);
				//		if(this_type.indexOf("circle") > -1) {
				//			$("."+$(this).attr("monitor_cd")+"_"+this_type+"_circle").attr("data-size", endH);
				//		} else {
				//			$("#"+$(this).attr("monitor_cd")+"_"+this_type).children().css('width', endW);
				//		}
				//	} else if(this_type.indexOf("img") > -1) {
				//		$(this).find("img").css("height", endH);
				//		$(this).find("img").css("width", endW);
				//		$(this).find(".img_cover").css("height", endH);
				//		$(this).find(".img_cover").css("width", endW);
				//	} else {
				//		var chartConLen = $("#"+$(this).find(".card-box").attr("id")+"_chart").find(".highcharts-container").length;
						
				//		$(this).find("#"+$(this).find(".card-box").attr("id")+"_chart").css('height', endH-55);
				//		$(this).find("#"+$(this).find(".card-box").attr("id")+"_chart").css('width', endW);
						
				//		if(chartConLen > 0){
				//			$("#"+$(this).find(".card-box").attr("id")+"_chart").highcharts().setSize((endW-20), (endH-85));
				//		}
				//	}
					
					updateMonitorStyle($(this));
				}
				// updateMonitorStyle($(this));
			},
			helper: "ui-resizable-helper",
			minHeight: 10,
			minWidth: 10
		});
		
	}
	
	var MIN_DISTANCE = 10; // minimum distance to "snap" to a guide
	var guides = []; // no guides available ... 
	var innerOffsetX, innerOffsetY; // we'll use those during drag ... 
	
	
	function computeGuidesForElement( elem, pos, w, h ) {
		if( elem != null ){
			var $t = $(elem); 
			pos = $t.offset(); 
			w = $t.outerWidth() - 1; 
			h = $t.outerHeight() - 1; 
		}
		
		return [
			{ type: "h", left: pos.left, top: pos.top }, 
			{ type: "h", left: pos.left, top: pos.top + h }, 
			{ type: "v", left: pos.left, top: pos.top }, 
			{ type: "v", left: pos.left + w, top: pos.top },
			// you can add _any_ other guides here as well 
			// (e.g. a guide 10 pixels to the left of an element)
			{ type: "h", left: pos.left, top: pos.top + h/2 },
			{ type: "v", left: pos.left + w/2, top: pos.top } 
			]; 
	}
	
	function clearWindowTimer() {
		//interval reset :: integrate
		$.each(integrate_timer, function(index, value) {
			window.clearInterval(value);
		});
		integrate_timer = new Array();
		
		//interval reset :: data
		$.each(data_timer, function(index, value) {
			window.clearInterval(value);
		});
		data_timer = new Array();
		
		//interval reset :: circle
		$.each(circle_timer, function(index, value) {
			window.clearInterval(value);
		});
		circle_timer = new Array();
		
		//interval reset :: line chart
		$.each(line_timer, function(index, value) {
			window.clearInterval(value);
		});
		line_timer = new Array();
		
		$.each(line_reload_timer, function(index, value) {
			window.clearInterval(value);
		});
		line_reload_timer = new Array();
	}
	
	function editModeChange() {		
		const editAutoSave = JSON.parse(localStorage.getItem("auto-save")) ? true : false;
		//disable edit mode
		// var themeType = $("#theme_combo").val();
		var editModeBtn_id ="editModeBtn";
		var settingModeArea_id = "settingModeArea";
			
		if($("#"+editModeBtn_id).hasClass("on")) {
			$("#"+editModeBtn_id).removeClass("on");
			// listMonitor(scene_cd);
			//disable hot key
			window.removeEventListener("keyup",editModeHotkey);
			// 전체 구성 스타일 저장
			updateAllMonitorStyle();
			resetSelected();
		}else {
			$("#"+editModeBtn_id).addClass("on");
			// enable hot key
			window.addEventListener("keyup",editModeHotkey);
		}

		if($("#cog_menu_btn").hasClass("on")) {
			$("#cog_menu_btn").removeClass("on");
		}else{
			$("#cog_menu_btn").addClass("on");
		}
		
		if($("#timePlay").hasClass("fa-pause-circle")) {
			$("#timePlay").removeClass("fa-pause-circle");
			$("#timePlay").addClass("fa-play-circle");
		}
			
		$("#"+settingModeArea_id).hide();
		updateLock();
		
		//$($(".draggable").children()).css("width","auto !important");
	}

	/**
	 * 전체 구성 스타일 저장
	 * @returns 
	 */
	function updateAllMonitorStyle() {
		/* disable auto save option */
		// const editAutoSave = JSON.parse(localStorage.getItem("auto-save")) ? true : false;
		const editAutoSave = true;

		if (editAutoSave) return false;

		const contents_canvas = document.getElementById("contents_canvas");
		const monitorDivs = contents_canvas.querySelectorAll(".draggable.resizable")

		let monitorsData = [];
		for (const elem of monitorDivs) {
			const data = {
				monitor_cd: elem.getAttribute("monitor_cd"),
				monitor_x: Number(elem.style.top.replace("px","")),
				monitor_y: Number(elem.style.left.replace("px","")),
				monitor_width: elem.offsetWidth,
				monitor_height: elem.offsetHeight,
			}
			
		}

		var param = {
			monitorArr:monitorsData,
		};
		$("#overlay").show();
		$.ajax({
			url: "/monitor/update/allMonitorStyle",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				listMonitor(scene_cd);
				$("#overlay").fadeOut();
			},
			error: function (e) {
				console.log(e)
				
				$("#overlay").fadeOut();
				alertify.error('<i class="icon fa fa-ban"></i> '+getMsgStr("s.contact_your_administrator"));
			}	
		});
	}
	
	function touringModeChange(fnTouring) {
		if($("#touringModeBtn").hasClass("on")) {
			$("#touringModeBtn").removeClass("on");
		}else{
			$("#touringModeBtn").addClass("on");
		}

		if(rotateMenu != undefined)
		{
			rotateMenu();
		}
		else
		{
			//console.log(":::: do not use mainView.rotateLayer() ::::");
			mainView.rotateLayer();
		}
	}
	
	var categoryTour = null;
	function categoryTouringModeChange(fnTouring) {
		
		if($("#cateTouringModeBtn").hasClass("on")) {			
			$("#cateTouringModeBtn").removeClass("on");
			clearInterval(categoryTour);
			
		}else{
			$("#cateTouringModeBtn").addClass("on");
			
			var categoriesArr =[];
			var idx=0;

			for(var i=0; i< $("#category_area").children().length; i++){
				
				categoriesArr[i] = $("#category_area").children(":eq("+i+")").val();
			}
			
			categoryTour = setInterval(function(){				
				getCategoryMonitor(categoriesArr[idx]);
				idx++
				if(idx == categoriesArr.length){
					idx = 0;
				}			
			}, 30000);
						
		}	
		
	}
	
	var selected_div = [];
	
	function updateLock(load_flag, check_flag) {
		
		var themeType = theme;
		var editModeBtn_id = "editModeBtn";
		 
		const auth =getContentsDashboardAuth();
		if($("#"+editModeBtn_id).hasClass("on")) {
			$("#contents_canvas [head_none=true]").show();

			if (auth.edit) $("#contents_canvas .fa-close").show();
			else $("#contents_canvas .fa-close").hide();
			const monitorElList = document.querySelectorAll("#contents_canvas div.draggable.resizable");
			for (const el of monitorElList) {
				// 편집모드 이동/사이즈조절 권한 확인
				// if (el.monitorData && user_cd && el.monitorData.user_cd === user_cd && auth.move || auth.move) {
				if (auth.move) {
					$(el).draggable("option","disabled", false);
					$(el).resizable("option","disabled", false);
					$(el).addClass("draw-border");
					
					// single select
					$(el).click(function(e) {
						if(e.ctrlKey)
							return;
						if(selected_div.length > 0)
							resetSelected();
							
						$("#contents_canvas .effect-7").removeClass("effect-7");
						$(this).addClass("effect-7");
						
						if(!$("#size_box").is(":visible")) {
							$("#size_box").show();
						}
						$("#size_width").val($(this).css("width").replace("px", ""));
						$("#size_height").val($(this).css("height").replace("px", ""));
						$("#size_top").val($(this).css("top").replace("px", ""));
						$("#size_left").val($(this).css("left").replace("px", ""));
						
					});
					
					//## set Multiple select ##
					$(el).mousedown(function(e){
						if(!e.ctrlKey)
							return false;
							
						// refac1.
						if(selected_div.filter(c => c == $(this).attr("monitor_cd")).length > 0)
							return false;
						
						$(".ghost-select").addClass("ghost-active");
						$(".ghost-select").css({
							'left': $(this).css("left"),
							'top': $(this).css("top")
						});
			
						var initialW = parseInt($(this).css("width"));
						var initialH = parseInt($(this).css("height"));
			
						$(document).bind("mouseup", selectElements);
						// $(document).bind("mousemove", openSelector);
						
						selected_div.push($(this).attr("monitor_cd"));
						if(selected_div.length == 1){
							$(this).addClass("selected_first");
							$("#contents_canvas .draggable").removeClass("effect-7");
							if($("#size_box").is(":visible")) {
								$("#size_box").hide();
							}
						}else{
							$(this).addClass("multi_selected");
						}
						$("#range_box").show();
					});
				}
				else{// 권한 없을 경우 오류메시지
					$(el).draggable("option","disabled", true);
					$(el).resizable("option","disabled", true);

					// 드래그 시 오류메시지 표출
					let lastMsg = null;
					function detectMove(e) {
						const now = new Date().getTime();
						if(!lastMsg || now - lastMsg >= 500) lastMsg = now;
						else if(now - lastMsg < 500 ) return;

						alertify.warning('<i class="icon fa fa-ban"></i> ' +
						getMsgStr("w.no_auth")+`[${getMsgStr("w.edit_mode")}] - ${getMsgStr("w.configuration")} ${getMsgStr("software.move")}`);
					}
					function detectUp(e) {
						window.removeEventListener("mousemove",detectMove);
						window.removeEventListener("mouseup",detectUp)
					}
					el.addEventListener("mousedown",()=>{
						window.addEventListener("mousemove",detectMove)
						window.addEventListener("mouseup",detectUp)
					})
				}
			}

			
			
			$(".side_menu2").addClass("tophover");
			
			$('.container-fluid').mousedown(function(e){
				if(e.target.tagName.includes("BUTTON")){
					return false;
				}else if(e.target.tagName.includes("INPUT")){
					return;
				}
				
				if(!e.ctrlKey){
					resetSelected();
				}
			});
			
			clearWindowTimer();
			getAllMonitorSet();
		} else {
			$("#contents_canvas [head_none=true]").hide();
			$("#contents_canvas").find(".fa-close").hide();
			$(".draggable").draggable("option","disabled", true);
			$(".resizable").resizable("option","disabled", true);
			$(".side_menu2").removeClass("tophover");
			$("#contents_canvas .draggable").removeClass("draw-border");
			$("#contents_canvas .draggable").unbind("click");
			
			if(scene_cd == undefined || scene_cd == "") {
				return false;
			}
			if(load_flag == undefined) {
				if($("#timePlay").hasClass("fa-play-circle")) {
					timePlay();
				}
			}
		}
		
	}

	function isGroupCategory(sceneCdArg=scene_cd) {
		return sceneCdArg.startsWith("group_");
	}
	function isSharedCategory(sceneCdArg=scene_cd) {
		return location.pathname.includes("/main/view") &&
			category_obj &&
			category_obj.data &&
			category_obj.data.length > 0 &&
			!!category_obj.data.find(v=>v.monitor_scene === sceneCdArg && v.share_yn === 'Y' && v.user_cd !== user_cd);
	}
	function getContentsDashboardAuth(sceneCdArg=scene_cd){
		/**
		 * @typedef DashboardAuth
		 * @property {"G"|"P"|"S"} dashboard_type
		 * @property {0|1} dashboard_view
		 * @property {0|1} dashboard_move
		 * @property {0|1} dashboard_edit
		 */

		/** @type {DashboardAuth[]} */
		const authList = authInfo_dashboard;
		const ShareAuth = authList.find(v=>v.dashboard_type === 'S');
		const GroupAuth = authList.find(v=>v.dashboard_type === 'G');
		const ParGroupAuth = authList.find(v=>v.dashboard_type === 'P');
		
		const rtn = {
			view:true,
			move:true,
			edit:true,
		}
		
		if (isSharedCategory(sceneCdArg)) {
			rtn.view = !!ShareAuth.dashboard_view
			rtn.move = !!ShareAuth.dashboard_move
			rtn.edit = !!ShareAuth.dashboard_edit
		}
		else if (isGroupCategory(sceneCdArg)) {
			const gInfo = groupCategories.find(v=>v.monitor_scene === sceneCdArg);
			if (gInfo.parent) {
				rtn.view = !!ParGroupAuth.dashboard_view
				rtn.move = !!ParGroupAuth.dashboard_move
				rtn.edit = !!ParGroupAuth.dashboard_edit
			}
			else {
				rtn.view = !!GroupAuth.dashboard_view
				rtn.move = !!GroupAuth.dashboard_move
				rtn.edit = !!GroupAuth.dashboard_edit
			}
		}
		
		return rtn;
	}

	function setContentsDashboardAuth() {
		const auth = getContentsDashboardAuth();

		/** @type {HTMLLIElement} */
		const monitorSettingBtn = document.querySelector("li[onclick='addFormM()']");
		/** @type {HTMLLIElement} */
		// const editModeBtn = document.querySelector("#editModeBtn");

		if (auth.edit) monitorSettingBtn.style.display = "";
		else monitorSettingBtn.style.display = "none";

		// if (auth.move) editModeBtn.style.display = "";
		// else editModeBtn.style.display = "none";
	}
	
	function runEffect(contents_id) {
		setTimeout(function() {
			$("#" + contents_id).parent().RisingSun({
				timer:0,duration:500,wipe:"LR",ease:"easeInOutCubic",replay:true
			});
		}, 100);
	}
	
	function animateValue(id, start, end, duration) {
		if(isNaN(end)) {
	//					end = Math.floor(Math.random() * 9999) + 1;
			end = 0;
		}
		var obj = document.getElementById(id);
		var range = end - start;
		var minTimer = 50;
		var stepTime = Math.abs(Math.floor(duration / range));
		
		stepTime = Math.max(stepTime, minTimer);
		
		var startTime = new Date().getTime();
		var endTime = startTime + duration;
		var timer;
		
		function run() {
			var now = new Date().getTime();
			var remaining = Math.max((endTime - now) / duration, 0);
			var value = Math.round(end - (remaining * range));
			if(obj != null) {
				obj.innerHTML = $.number(value);
				if (value == end) {
					clearInterval(timer);
				}
			}
		}
		
		timer = setInterval(run, stepTime);
		run();
	}
	
	function updateAllMonitorSet(){
		var data = {};
		
		var monitor_font_size_id = "monitor_font_size";
		var monitor_char_font_size_id = "monitor_char_font_size";
		var monitor_opacity_id = "monitor_opacity";
		var monitor_opacity_label_id = "monitor_opacity_label";
		
		data = {
				user_cd: user_cd,
				monitor_scene : scene_cd,
				monitor_font_size: $("#"+monitor_font_size_id).val(),
				monitor_char_font_size: $("#"+monitor_char_font_size_id).val(),
				monitor_opacity: $("#"+monitor_opacity_id).val(),
				monitor_opacity_label: $("#"+monitor_opacity_label_id).val()				
		}
		
		
		
		var param = {
				map:data,
				user_cd : user_cd,
				monitor_scene : scene_cd
		}
		$("#overlay").show();
		$.ajax({
			url : "/monitor/update/allSet",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				$('#modalAddUpdate').modal('hide');
				listMonitor(scene_cd);
				alertify.success('<i class="icon fa fa-check"></i> '+getMsgStr("s.success_apply"));
				$("#overlay").hide();
			},
			error: function () {
				$("#overlay").hide();
				alertify.error('<i class="icon fa fa-ban"></i> '+getMsgStr("s.fail_apply"));
			}
		});
		
		//Label Alert time set
		// localStorage.setItem('LabelAlert',$("#label_alert_time").val());
		setCookie('LabelAlert',$("#label_alert_time").val());

		/* disable auto save option */
		// localStorage.setItem('auto-save',document.getElementById("edit_auto_save").checked);
		localStorage.setItem('auto-save',true);
	}
	
	
	function getAllMonitorSet() {
		var param = {
			user_cd:user_cd,
			monitor_scene : scene_cd
		}
		var monitor_font_size_id = "monitor_font_size";
		var monitor_char_font_size_id = "monitor_char_font_size";
		var monitor_opacity_id = "monitor_opacity";
		var monitor_opacity_label_id = "monitor_opacity_label";
		
		$("#overlay").show();
		$.ajax({
			url : "/monitor/select/getAllSet",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				
				if(result.data != null) {
					
					$("#"+monitor_font_size_id).val(result.data.monitor_font_size);
					$("#"+monitor_char_font_size_id).val(result.data.monitor_char_font_size);
					$("#"+monitor_opacity_id).val(result.data.monitor_opacity);
					$("#"+monitor_opacity_label_id).val(result.data.monitor_opacity_label);
				
				} else {
					$("#"+monitor_font_size_id).val(18);
					$("#"+monitor_char_font_size_id).val(18);
					$("#"+monitor_opacity_id).val("opacity00");
					$("#"+monitor_opacity_label_id).val("opacity70");
					
				}
				$("#overlay").hide();
			},
			error: function () {
				$("#overlay").hide();
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
		
		const editAutoSave = JSON.parse(localStorage.getItem("auto-save")) ? true : false;

		document.getElementById("edit_auto_save").checked = editAutoSave;
		//get label alert time
		// $("#label_alert_time").val(localStorage.getItem("LabelAlert"));
	}
	
	function setAll(full_flag,pType,pId){
		
		if(full_flag=="Y"){
			chart_font_size = $("#monitor_char_font_size").val()*2;
			
			//var fontSize;
			
			var fontSize = $("#monitor_font_size").val()*2;
				
			
			$("#fullScreenModal .table th").css("font-size",(fontSize-4)+"px");
			$("#fullScreenModal .table td").css("font-size",(fontSize-6)+"px");
			$("#fullScreenModal .table .thead-light th").css("font-size",(fontSize-4)+"px");
		} else {
			
			//var fontSize;
			var fontSize = $("#monitor_font_size").val()*1;
			chart_font_size = $("#monitor_char_font_size").val()*1;	
			
			$(".header-title_dash .head_tit_name").css("font-size",fontSize+"px");
			$(".right_top").css("font-size",(fontSize-1)+"px");
			$(".draggable .table th").css("font-size",(fontSize-4)+"px");
			$(".draggable .table td").css("font-size",(fontSize-6)+"px");
			$(".draggable .table .thead-light th").css("font-size",(fontSize-4)+"px");
			$(".box_text .left").css("font-size",(fontSize-4)+"px");
			$(".box_text .right").css("font-size",(fontSize-2)+"px");
			$(".s_info_area .box_text .right").css("font-size",(fontSize+2)+"px");
			$(".count_box3 .left_box h3").css("font-size",(fontSize+30)+"px");
			$(".count_box3 .left_box label").css("font-size",(fontSize+38)+"px");
			$(".count_box3 .right_box h3").css("font-size",(fontSize-2)+"px");
			$(".count_box3 .right_box label").css("font-size",(fontSize-6)+"px");
			
			$(".count_box .left_box h3").css("font-size",(fontSize)+"px");
			$(".count_box .right_box h3").css("font-size",(fontSize)+"px");
			$(".count_box .left_box label").css("font-size",(fontSize)+"px");
			$(".count_box .right_box label").css("font-size",(fontSize)+"px");
			
			
			//opacity			
				if(pType == "9" || pType == "10" || pType == "11" || pType == "13" || pType == "15" || pType == "20" || pType == "30"|| pType == "33"|| pType == "34"|| pType == "36"|| pType == "37"|| pType == "38"|| pType == "39" || pType == "50"){								
					
					$("#"+pId).parent().addClass($("#monitor_opacity_label").val());
				
				}else{
						setInterval(function() {
						var parent_div = $("#"+pId).parent().parent()[0];
						if(parent_div != undefined){
							parent_div.classList.forEach(function(val, idx){
								if(val.includes("opacity") && val != $("#monitor_opacity").val()){
									$("#"+pId).parent().parent().removeClass(val);
								}
							});
						}
						$("#"+pId).parent().parent().addClass($("#monitor_opacity").val());
					}, 300);
						
					
				}
				
			
			//new
			$(".table_count_box_area .table_count_box .table_count_tit").css("font-size",(fontSize-8)+"px");
			$(".table_count_box_area .table_count_box .table_count_num").css("font-size",(fontSize+5)+"px");
			$(".table_count_box_area .table_count_box .table_count_updown").css("font-size",(fontSize+3)+"px");
			$(".table_count_box_area2 .table_count_box2 .table_count_tit").css("font-size",(fontSize-8)+"px");
			$(".table_count_box_area2 .table_count_box2 .table_count_num").css("font-size",(fontSize+5)+"px");
			$(".table_count_box_area2 .table_count_box2 .table_count_updown").css("font-size",(fontSize+3)+"px");
			$(".table_count_box_area2 .left_box").css("font-size",(fontSize+5)+"px");
			
			$(".draggable .table img").css("width",(fontSize)+"px");
			$(".draggable .table img").css("height",(fontSize)+"px");
			
			$(".draggable .right_top .fa").css("font-size",(fontSize)+"px");
			
			$(".table_count_box_area3 .left_box").css("font-size",(fontSize-2)+"px");
			$(".table_count_box_area3 .right_box").css("font-size",fontSize+"px");
			
			$(".table_count_box_area4 .table_count_box4 .table_count_tit").css("font-size",fontSize+"px");
			$(".table_count_box_area4 .table_count_box4 .table_count_num").css("font-size",(fontSize-2)+"px");
			
			$(".home_info_box table th").css("font-size",(fontSize-36)+"px");
			$(".home_info_box table td").css("font-size",(fontSize-42)+"px");
			
			$(".cont_top_left .cont_top_tit").css("font-size",(fontSize)+"px");
			$(".cont_top_left ul li .cont_top_text").css("font-size",(fontSize-2)+"px");
			$(".cont_top_left ul li .cont_top_num").css("font-size",(fontSize)+"px");
			
			$(".ajs-message").css("font-size",(fontSize-5)+"px");
			 
		}
	}
	  
	function setAll2(){
		if(scene_cd!="M"){
			
			var fontSize = $("#monitor_font_size").val()*1-16;
			
			
			var zoom = 1;
			if(fontSize>0){
				zoom = zoom+(fontSize*0.025);
			}else{
				zoom = zoom+(fontSize*0.025);
			}
//			$("#modalAddUpdateC").css("zoom", zoom);
//			$("#out_east").css("zoom", zoom);
//			if(!$(".select2-container--open").eq(1).is(":visible")) {
//				$(".select2-container--open").eq(1).css("zoom", zoom);
//			}
		}
	}
	
	var color_arr = getDefaultColor("0");
	
	function getDefaultColor(color_cd){
		
		var result_color;
		var data = {
				orderBy : {
	 				"idx":"asc"
	 			},
	 			d_color_cd:{
	 				type:"E",
	 				val: color_cd
	 			},
		};
		
		var param = {
			map : data
		}
		
		
		$.ajax({
			url : "/contents/select/defaultColor",
			type : "POST",
			async: false,
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {								
				
				result_color = result.data;				
				if(color_cd !=""){
					$("#contents_color").empty();
					result_color = result.data;	
					//color_arr = result.data;
					$.each(result_color, function(index, value) {
						$("#contents_color").append("<input type='text' id='color_" + index + "' value='"+value.d_color+"'>");
						colorOption.color = value.d_color;
						$("#contents_color input[type=text]:last").spectrum(colorOption);
					});			
				}				
													
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
		
		$("#contents_color .sp-replacer").css("margin", "0 15px 0px 0");
		return result_color;
		
	}
	
	
		function getDefaultColorD(color_cd){
		var result_color;
		var data = {
				orderBy : {
	 				"idx":"asc"
	 			},
	 			d_color_cd:{
	 				type:"E",
	 				val: color_cd
	 			},
		};
		
		var param = {
			map : data
		}
		
		
		$.ajax({
			url : "/contents/select/defaultColor",
			type : "POST",
			async: false,
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {								
				
				//result_color = result.data;				
				if(color_cd !=""){
					$("#default_color").empty();
					//result_color = result.data;	
					color_arr = result.data;
					$.each(color_arr, function(index, value) {
						
						$("#default_color").append("<input type='text' id='color_" + value.idx + "' value='"+value.d_color+"'>");
						colorOption.color = value.d_color;
						$("#default_color input[type=text]:last").spectrum(colorOption);
					});			
				}				
													
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
		
		//return result_color;
		$("#default_color .sp-replacer").css("margin", "0 15px 0px 0");
	}
	
	
	
	
	function setDefaultColor(){
				
//		let color_arr = getDefaultColor();		
		
		$("#colorModal").modal();
		
		$('#formAddUpdateD')[0].reset();				
		
		$("#default_color").empty();				
					
		$.each(color_arr, function(index, value) {				
			$("#default_color").append("<input type='text' id='color_" + value.idx + "' value='"+value.d_color+"'>");
			colorOption.color = value.d_color;
			$("#default_color input[type=text]:last").spectrum(colorOption);
		});
		
		$("#default_color .sp-replacer").css("margin", "0 15px 0px 0");
		$("#overlay").fadeOut();
		$("#set_default_color").val("0").trigger("change");
		
	}
		
	var keyPressMap = {16: false, 27: false, 37: false, 38: false, 39: false, 40: false};
	
	function keyPressEvent() {
		$(document).keydown(function(e) {
			const keyCode = e.keyCode;
			
			var this_contents = $("#contents_canvas .effect-7");
			var this_val = 0;
			
			if (keyCode in keyPressMap) {
				if(this_contents.length == 0) {
					return true;
				} else {
					keyPressMap[keyCode] = true;
					if(keyPressMap[27]) {
						$("#contents_canvas .effect-7").removeClass("effect-7");
						
						if($("#size_box").is(":visible")) {
							$("#size_box").hide();
						}
						return false;
					}
					if(keyPressMap[37]) {// left key press(minus)
						if(keyPressMap[16]) {// + shift :: width
							this_val = (Number(this_contents.css("width").replace("px",""))-1);
							this_contents.css("width", this_val);
							keyPressResize(this_contents);
						} else {// left
							this_val = (Number(this_contents.css("left").replace("px",""))-1);
							this_contents.css("left", this_val);
						}
					} else if(keyPressMap[38]){// up key press(minus)
						if(keyPressMap[16]) {// + shift :: height
							this_val = (Number(this_contents.css("height").replace("px",""))-1);
							this_contents.css("height", this_val);
							keyPressResize(this_contents);
						} else {// top
							this_val = (Number(this_contents.css("top").replace("px",""))-1);
							this_contents.css("top", this_val);
						}
					} else if(keyPressMap[39]){// right key press(plus)
						if(keyPressMap[16]) {// + shift :: width
							this_val = (Number(this_contents.css("width").replace("px",""))+1);
							this_contents.css("width", this_val);
							keyPressResize(this_contents);
						} else {
							this_val = (Number(this_contents.css("left").replace("px",""))+1);
							this_contents.css("left", this_val);
						}
					} else if(keyPressMap[40]){// down key press(plus)
						if(keyPressMap[16]) {// + shift :: height
							this_val = (Number(this_contents.css("height").replace("px",""))+1);
							this_contents.css("height", this_val);
							keyPressResize(this_contents);
						} else {
							this_val = (Number(this_contents.css("top").replace("px",""))+1);
							this_contents.css("top", this_val);
						}
					}
					updateMonitorStyle(this_contents);
				}
			}
		}).keyup(function(e) {
			if (e.keyCode in keyPressMap) {
				keyPressMap[e.keyCode] = false;
			}
		});
		
		$(".container-fluid").click(function(e) {
			if($(e.target).hasClass("container-fluid") || $(e.target).is("canvas") || e.target.id === "contents_canvas") {
				$("#contents_canvas .effect-7").removeClass("effect-7");
				
				if($("#size_box").is(":visible")) {
					$("#size_box").hide();
				}
			}
		});
	}
	
	function onlyNumber() {
		if((event.keyCode<48)||(event.keyCode>57)) {
			event.returnValue=false;
		} else {
			var this_contents = $("#contents_canvas .effect-7");
			
			this_contents.css("width", Number($("#size_width").val()));
			this_contents.css("height", Number($("#size_height").val()));
			this_contents.css("top", Number($("#size_top").val()));
			this_contents.css("left", Number($("#size_left").val()));
			
			keyPressResize(this_contents);
		}
		$("#size_box input").blur();
		if(this_contents != undefined) {
			updateMonitorStyle(this_contents);
		}
	}
	
	function keyPressResize(this_contents) {
		var this_type = this_contents.attr("type");
		
		var endW = this_contents.outerWidth();
		var endH = this_contents.outerHeight();
		
		this_contents.find(".card-box").css('height', endH);
		this_contents.find(".card-box").css('width', endW);
		
		var transObj = new Object();
		transObj.div = this_contents;
		transObj.typeC = this_type;
		transObj.endW = endW;
		transObj.endH = endH;
		arrangeTypeC(transObj);
		
					
//		if(this_type.indexOf("table") > -1) {
//			if(this_contents.find("table").attr("scroll_opt") == 1) {
//				resetScroll(this_contents.find("table").eq(0).attr("id"));
//				setScroll(this_contents.find("table").eq(0).attr("id"), true);
//			}
//		} else if(this_type.indexOf("label") > -1 || this_type.indexOf("header") > -1 || this_type.indexOf("circle") > -1) {
//			this_contents.css('width', endW);
//			if(this_type.indexOf("circle") > -1) {
//				$("."+this_contents.attr("monitor_cd")+"_"+this_type+"_circle").attr("data-size", endH);
//			} else {
//				$("#"+this_contents.attr("monitor_cd")+"_"+this_type).children().css('width', endW);
//			}
//		} else {
//			this_contents.find("#"+this_contents.find(".card-box").attr("id")+"_chart").css('height', endH-55);
//			this_contents.find("#"+this_contents.find(".card-box").attr("id")+"_chart").css('width', endW);
//			$("#"+this_contents.find(".card-box").attr("id")+"_chart").highcharts().setSize((endW-20), (endH-85));
//		}
		
	}
	
	$(document).ready(function () {
		//------------------Layout 관련 -------------------
		
		$('#fullScreenModal').on('hidden.bs.modal', function () {
			setAll("N")
		});
		keyPressEvent();
	});
	
	function alertDetail(pParam){
		var param = {
		}
		if($("#timeVal").val()!=undefined && $("#timeVal").val()!=null){
			param.time = $("#timeVal").val();
		}
		if($("#sel_grp_cd").val()==""){
			param.grpCd = ss_grp_cd;
		}else{
			param.grpCd = $("#sel_grp_cd").val();
		}
		param.eventId = pParam;
		$("#overlay").show();
		$.ajax({
			url: data_url+"/api/3d/event/list",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				$("#alertModal").modal();
				resetScroll("tabAlert");
				tabClear("tabAlert"); 
				if(result.length>0){
					$.each(result, function(index, value) {
						var chkStr = "checked";
						if(value.lock_cnt>4){
							chkStr = "";
						}
						var tmp_tr = "<tr class='hover' onclick='javascript:alertDetail2(" + JSON.stringify(value) + ")'>"+
						"<td width='5%'>" + (index+1) + "</td>" +
						"<td width='20%'>" + nvl(value.col2, "-") + "</td>" +
						"<td width='35%'>" + nvl(value.col4, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.sip, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.dip, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.sport, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.dport, "-") + "</td>" +
						"</tr>";
						addRow("tabAlert", tmp_tr);
					});
					$('#tabAlert').scrolltable({
						stripe: true,
						oddClass: 'odd',
						maxHeight: 640
					});
				}else{
					$("#tabAlert tbody").append("<tr><td colspan='10' class='tac'>"+ getMsgStr("message.no_data") + "</td></tr>");
				}
				$("#overlay").fadeOut();
			},
			error: function (e) {
				// Handle upload error
				$("#overlay").fadeOut();
				console.log(e)
			}	
		});
		
	}
	
	
	function alertDetailIp(pParam){
		var param = {
		}
		if($("#timeVal").val()!=undefined && $("#timeVal").val()!=null){
			param.time = $("#timeVal").val();
		}
		if($("#sel_grp_cd").val()==""){
			param.grpCd = ss_grp_cd;
		}else{
			param.grpCd = $("#sel_grp_cd").val();
		}
		param.sip = pParam;
		param.dip = pParam;
		$("#overlay").show();
		$.ajax({
			url: data_url+"/api/3d/network/event",
			type : "POST",
			dataType : "json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				$("#alertModal").modal();
				resetScroll("tabAlert");
				tabClear("tabAlert"); 
				if(result.length>0){
					$.each(result, function(index, value) {
						var chkStr = "checked";
						if(value.lock_cnt>4){
							chkStr = "";
						}
						var tmp_tr = "<tr class='hover' onclick='javascript:alertDetail2(" + JSON.stringify(value) + ")'>"+
						"<td width='5%'>" + (index+1) + "</td>" +
						"<td width='20%'>" + nvl(value.event_edt, "-") + "</td>" +
						"<td width='35%'>" + nvl(value.event_nm, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.sip, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.dip, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.sport, "-") + "</td>" +
						"<td width='10%'>" + nvl(value.dport, "-") + "</td>" +
						"</tr>";
						addRow("tabAlert", tmp_tr);
					});
					$('#tabAlert').scrolltable({
						stripe: true,
						oddClass: 'odd',
						maxHeight: 640
					});
				}else{
					$("#tabAlert tbody").append("<tr><td colspan='10' class='tac'>"+getMsgStr("message.no_data") + "</td></tr>");
				}
				$("#overlay").fadeOut();
			},
			error: function (e) {
				// Handle upload error
				$("#overlay").fadeOut();
				console.log(e)
			}	
		});
		
	}
	
	function alertDetail2(data)
	{
		if(data != undefined)
		{
			$(".event_slider_area").empty();
			var html = "";
			for(var key in data)
			{
				if(key == "color" || key == "domain" || key == "latitude" || key == "longitude" || key == "scale" || key == "d_position")
					continue;
				html +=
					'<div class="form-group form-setup row mt3">'
					+ '<label class="col-5 col-form-label">' + (message_string_arr[key] == undefined ? key :  message_string_arr[key]) + '</label>'
					+ '<div class="col-7">'
					+ '<input type="text" class="form-control" value="' + data[key] + '">'
					+ '</div>'
					+ '</div>';
				if(key == "event_id" || key == "set_id" || key == "event_sdt")
					$("#rawEvent" + key).val(data[key]);
			}
			$(".event_slider_area").append(html);
			$("#alertModal").modal('hide');
			openEventSlider();
		}
	}

	function drawCircle(max, type, id, color, color2) {
		var i=1;
		var func1 = setInterval(function(){
			if(i<max){
				colorSet(i, type, id, color, color2);
				i++
			}else{
				clearInterval(func1);
			}
		}, 10);
	}
	
	function draw(max, type, id, color, color2){
		var i=1;
		var func1 = setInterval(function(){
			if(i<max){
				colorSet(i, type, id, color, color2);
				i++
			}else{
				clearInterval(func1);
			}
		}, 10);
	}
	

	function colorSet(i, type, id, color, color2) {
		$("#"+id+" span").text(i+1+"%");
		if(type=="1") {
			$("#"+id).css({"background":"conic-gradient("+color+" 0%, "+color.substr(0,7)+" "+i+"% , "+color2+" "+i+"%, "+color2+" 100%)"});
		} else if(type=="2") {
			$("#"+id).css({"background":"linear-gradient(-90deg, "+color+" 0%, "+color.substr(0,7)+" "+i+"% , "+color2+" "+i+"%, "+color2+" 100%)"});
		} else if(type=="3") {
			$("#"+id).css({"background":"linear-gradient(90deg, "+color+" 0%, "+color2+" "+i+"%)","width":" "+i+"% "});
		}
	}
	
	function setDynamicAPI(){
			
		var apiCd = $("#dynamic_api_combo").find("option:selected").val();
		var idx = $("#dynamic_api_combo option").index( $("#dynamic_api_combo option:selected") );
		
		var data = {
				apiCd : apiCd,
				idx : idx-1				
		}

		localStorage.removeItem("data");
		localStorage.clear();
		
		localStorage.setItem("apiCd",apiCd);
		localStorage.setItem("idx",idx-1);

		var url = "/dynamic_api/view";

		window.open(url);
		
	}

	/**
	 * @typedef {Object} ElemSize
	 * @property {number} width
	 * @property {number} height
	 * @property {number} top
	 * @property {number} bottom
	 * @property {number} left
	 * @property {number} right
	 */

	/**
	 * 
	 * @param {HTMLElement} elem 
	 * @returns {ElemSize}
	 */
	function getElemSize(elem) {
		return {
			width:elem.offsetWidth,
			height:elem.offsetHeight,
			top:elem.offsetTop,
			bottom:elem.offsetTop + elem.offsetHeight,
			left:elem.offsetLeft,
			right:elem.offsetLeft + elem.offsetWidth,
		}
	}
	
	//	## add contents multiselector ##
	function selectElements(e) {
		
	   	var maxX = 0;
	    var minX = 5000;
	    var maxY = 0;
	    var minY = 5000;
	  
	    $("#score>span").text('0');
	    // $(document).unbind("mousemove", openSelector);
	    $(document).unbind("mouseup", selectElements);



		/* big-ghost size calculating start */
		
		//find elements
		const foundedElems = [
			document.querySelector(".draggable.selected_first"),
			...document.querySelectorAll(".draggable.multi_selected")
		]

		// 최상단, 최하단, 최좌측, 최우측 좌표
		let topMostPos = null;
		let bottomMostPos = null;
		let leftMostPos = null;
		let rightMostPos = null;

		/**@type {ElemSize[]} */
		let sizeCalElems = [];

		// get size of each divs
		foundedElems.forEach(elem=>{
			sizeCalElems.push(getElemSize(elem));
		})
		
		sizeCalElems.forEach(v=>{
			if (!topMostPos) topMostPos = v.top;
			else if (topMostPos > v.top) topMostPos = v.top;
			
			if (!bottomMostPos) bottomMostPos = v.bottom;
			else if (bottomMostPos < v.bottom) bottomMostPos = v.bottom;
			
			if (!leftMostPos) leftMostPos = v.left;
			else if (leftMostPos > v.left) leftMostPos = v.left;
			
			if (!rightMostPos) rightMostPos = v.right;
			else if (rightMostPos < v.right) rightMostPos = v.right;
		})

		// calculated big-ghost size
		const calGhostSize = {
			width:rightMostPos - leftMostPos + 40,
			height:bottomMostPos - topMostPos + 20,
			top: topMostPos + 55,
			left: leftMostPos - 20,
		}
		if ($("#big-ghost").length < 1) {
			$("body").append("<div id='big-ghost' type='box' class='big-ghost resizable ui-widget-content ui-draggable ui-draggable-handle ui-resizable draw-border'></div>");
		}
		$("#big-ghost").css(calGhostSize);
		/* big-ghost size calculating end */
		
	    var totalElements = 0;
	    var elementArr = new Array();
	    $(".draggable").each(function () {
			var aElem = $(".ghost-select");
	        var bElem = $(this);
	        var result = doObjectsCollide(aElem, bElem);
	        var index = $(this).index();
			//console.log("in roop!!",result);
	
	        if (result == true) {
	          $("#score>span").text( Number($("#score>span").text())+1 );
	          var aElemPos = aElem.offset();
	                var bElemPos = aElem.offset();
	                var aW = aElem.width();
	                var aH = aElem.height();
	                var bW = bElem.width();
	                var bH = bElem.height();
	
	                var coords = checkMaxMinPos(aElemPos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
	                  maxX = coords.maxX;
	                  minX = coords.minX;
	                  maxY = coords.maxY;
	                  minY = coords.minY;
	                var parent = bElem.parent();
	
	                if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
	                    bElem.css({
	                        'left': parent.css('left'),
	                        'top': parent.css('top')
	                    });
	                }
	          
	            if($('#big-ghost').length < 1)
	            {
	              $("body").append("<div id='big-ghost' type='box' class='big-ghost resizable ui-widget-content ui-draggable ui-draggable-handle ui-resizable draw-border' x='" + Number(minX - 20) + "' y='" + Number(minY - 10) + "'></div>");
	            }else{
	              var ex_maxX = parseInt($("#big-ghost").attr("maxX"));
	              var ex_minX = parseInt($("#big-ghost").attr("minX"));
	              var ex_maxY = parseInt($("#big-ghost").attr("maxY"));
	              var ex_minY = parseInt($("#big-ghost").attr("minY"));
	              
	              if(ex_maxX > maxX)
	                maxX = ex_maxX
	              if(ex_minX < minX)
	                minX = ex_minX
	              if(ex_maxY > maxY)
	                maxY = ex_maxY
	              if(ex_minY < minY)
	                minY = ex_minY
	            }
	          
				
				/* error occured, size is not correct
				$("#big-ghost").css({
					'width': maxX + 40 - minX,
					'height': maxY + 20 - minY,
					'top': minY - 10,
					'left': minX - 20
				});
				 */
	            $("#big-ghost-sub").css({
	                'width': maxX + 30 - minX,
	                'height': maxY + 10 - minY,
	                'top': minY - 20,
	                'left': minX - 30
	            });    
	          $("#big-ghost").attr('maxX', maxX);
	          $("#big-ghost").attr('minX', minX);
	          $("#big-ghost").attr('maxY', maxY);
	          $("#big-ghost").attr('minY', minY);
	        }
	        setOption();
	    });
	
	    // $(".ghost-select").removeClass("ghost-active");
	    // $(".ghost-select").width(0).height(0);

}


 function openSelector(e) {
    var w = Math.abs(initialW - e.pageX);
    var h = Math.abs(initialH - e.pageY);

    $(".ghost-select").css({
        'width': w,
        'height': h
    });
    if (e.pageX <= initialW && e.pageY >= initialH) {
        $(".ghost-select").css({
            'left': e.pageX
        });
    } else if (e.pageY <= initialH && e.pageX >= initialW) {
        $(".ghost-select").css({
            'top': e.pageY
        });
    } else if (e.pageY < initialH && e.pageX < initialW) {
        $(".ghost-select").css({
            'left': e.pageX,
            "top": e.pageY
        });
    }
 }

  
function doObjectsCollide(a, b) { // a and b are your objects
    //console.log(a.offset().top,a.position().top, b.position().top, a.width(),a.height(), b.width(),b.height());
    var aTop = a.offset().top;
    var aLeft = a.offset().left;
    var bTop = b.offset().top;
    var bLeft = b.offset().left;

    // return !(
    //     ((aTop + a.height()) < (bTop)) ||
    //     (aTop > (bTop + b.height())) ||
    //     ((aLeft + a.width()) < bLeft) ||
    //     (aLeft > (bLeft + b.width()))
    // );
	return true;
}  

function checkMaxMinPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
    'use strict';

    if (a.left < b.left) {
        if (a.left < minX) {
            minX = a.left;
        }
    } else {
        if (b.left < minX) {
            minX = b.left;
        }
    }

    if (a.left + aW > b.left + bW) {
        if (a.left > maxX) {
            maxX = a.left + aW;
        }
    } else {
        if (b.left + bW > maxX) {
            maxX = b.left + bW;
        }
    }
    ////////////////////////////////
    if (a.top < b.top) {
        if (a.top < minY) {
            minY = a.top;
        }
    } else {
        if (b.top < minY) {
            minY = b.top;
        }
    }

    if (a.top + aH > b.top + bH) {
        if (a.top > maxY) {
            maxY = a.top + aH;
        }
    } else {
        if (b.top + bH > maxY) {
            maxY = b.top + bH;
        }
    }

    return {
        'maxX': maxX,
        'minX': minX,
        'maxY': maxY,
        'minY': minY
    };
}

function rangeSelected(direction){
	if(selected_div.length == 0)
		return;
	if(isNaN($("#size_range").val())){
		alertify.warning('<i class="icon fa fa-ban"></i>' + getMsgStr("s.enter_number_only"));
		return;
	}
			
	for(var i in selected_div){
		if(i == 0)
			continue;		
			
		var pre_div = $("div[monitor_cd='"+ selected_div[i - 1] +"']");
		var div = $("div[monitor_cd='"+ selected_div[i] +"']");
			
		if(direction == "v"){
			div.css("top", pre_div.offset().top + pre_div.height() + (($("#size_range").val() != "") ? parseInt($("#size_range").val()) : 10));
			div.css("left", pre_div.offset().left);
		}else if(direction == "h"){
			div.css("top", pre_div.offset().top);
			div.css("left", pre_div.offset().left + pre_div.width() + (($("#size_range").val() != "") ? parseInt($("#size_range").val()) : 10));
		}
		updateMonitorStyle(div);
	}
	resetSelected();
}

function resetSelected(){
	$("#big-ghost").remove();
	$(".ui-resizable-helper").hide();
	if(selected_div.length > 0){
		// $("#contents_canvas").find("[monitor_cd="+selected_div[0]+"]").css("background-color", "");
		$(".draggable").css("border", "");
		selected_div.length = 0;
	}
	
	$(".draggable").filter(".selected_first").removeClass("selected_first");
	$(".draggable").filter(".multi_selected").removeClass("multi_selected");
	$("#size_range").val(10);
	$("#range_box").hide();
}

function arrangeTypeC(obj){

	var div = obj.div;
	var this_type = obj.typeC;
	
	/**@type {HTMLDivElement} */
	const mElem = div[0];
	if(obj.type == undefined){
		var endW = obj.endW;
		var endH = obj.endH;
	}else{
		// ## multiSelected ##
		var endW = obj.boxW;
		var endH = obj.boxH;
	}

	if(this_type.indexOf("table") > -1) {
		if(div.find("table").attr("scroll_opt") == 1) {
			
			const header = mElem.querySelector('.header-title_dash')
			const head_height_margin = header ? window.getComputedStyle(header).padding.replace(/[^-\d\.]/g, '') : 0;
			const dCard_box = mElem.querySelector('.dash_padding .card-box');
			const dash_height_margin = dCard_box ? window.getComputedStyle(dCard_box).padding.replace(/[^-\d\.]/g, '') : 0;
			
			const header_height = 40 + Number(head_height_margin*2) + Number(dash_height_margin*2);


			// var head_height_margin = div.find('.header-title_dash').css('padding').replace(/[^-\d\.]/g, '');
			// var dash_height_margin = div.find('.card-box').css('padding').replace(/[^-\d\.]/g, '');
			// var head_height = div.find('.header-title_dash').css('height').replace(/[^-\d\.]/g, '');
			// var header_height = 40 + parseInt(head_height_margin*2) + parseInt(dash_height_margin*2);
			// div.find('.dash_line_area').css("height", endH );
			const dash_line_area = mElem.querySelector('.dash_line_area');
			if (dash_line_area) dash_line_area.style.height = endH - 62;
			// div.find('.dash_line_area').css("height", endH - 62 );
			const tTable = mElem.querySelector('table')
			// div.find('table').css("height", endH );
			if (tTable) {
				setScrollC2(tTable)
				// tTable.style.height = endH;
				// resetScroll(div.find("table").eq(0).attr("id"));
				// setScroll(div.find("table").eq(0).attr("id"), true);
			}
			
		}
	} else if(this_type.indexOf("label") > -1 || this_type.indexOf("header") > -1 || this_type.indexOf("circle") > -1) {
		div.css('width', endW);
		if(this_type.indexOf("circle") > -1) {
			$("."+div.attr("monitor_cd")+"_"+this_type+"_circle").attr("data-size", endH);
		}else if(this_type.indexOf("tag") > -1){
			$("#"+div.attr("monitor_cd")+"_"+this_type).find('li').children().css('width', endW);
		}else {
			$("#"+div.attr("monitor_cd")+"_"+this_type).children().css('width', endW);
		}
	} else if(this_type.indexOf("img") > -1) {
		const img = mElem.querySelector("img")
		if (img) {
			img.style.height = endH;
			img.style.width = endW;
		}
		// div.find("img").css("height", endH);
		// div.find("img").css("width", endW);
		const img_cover = mElem.querySelector('.img_cover')
		if (img_cover) {
			img_cover.style.height = endH;
			img_cover.style.width = endW;
		}
		// div.find(".img_cover").css("height", endH);
		// div.find(".img_cover").css("width", endW);
	} else {
		const card_box = mElem.querySelector('.card-box');
		let card_box_id = "";
		if (card_box) card_box_id = card_box.id;

		const chartWrapperElem = document.getElementById(`${card_box_id}_chart`);
		let chartElems = [];
		if (chartWrapperElem) chartElems = chartWrapperElem.querySelectorAll(".highcharts-container")
		/**@type {Number} */
		let chartConLen = chartElems.length
		// var chartConLen = $("#"+div.find(".card-box").attr("id")+"_chart").find(".highcharts-container").length;
		if (chartWrapperElem) {
			chartWrapperElem.style.height = endH-55;
			chartWrapperElem.style.width = endW;
		}
		// div.find("#"+div.find(".card-box").attr("id")+"_chart").css('height', endH-55);
		// div.find("#"+div.find(".card-box").attr("id")+"_chart").css('width', endW);
		if(chartConLen > 0 && chartWrapperElem){
			$("#"+div.find(".card-box").attr("id")+"_chart").highcharts().setSize((endW-20), (endH-85));
		}
	}	

}

function cloneSelected(){
	if(selected_div.length < 1 )
		alertify.warning('<i class="icon fa fa-ban"></i>' + getMsgStr("s.select_one_more_contents"));
	
	var first_div = $("div[monitor_cd='"+ selected_div[0] +"']");
	for(var i in selected_div){
		if(i == 0)
			continue;
			
		var div = $("div[monitor_cd='"+ selected_div[i] +"']");
		// div.css("top", first_div.offset().top);
		// div.css("left", first_div.offset().left);
		div.css("width", first_div.outerWidth());
		div.css("height", first_div.outerHeight());
		
		div.find(".card-box").css('height', first_div.outerHeight());
		div.find(".card-box").css('width', first_div.outerWidth());
		
		var transObj = new Object();
		transObj.div = div;
		transObj.typeC = div.attr("type");
		transObj.endW = first_div.outerWidth();
		transObj.endH = first_div.outerHeight();
		
		arrangeTypeC(transObj);
		updateMonitorStyle(div);
	}
	resetSelected();
	
}

function updateCategorySort(){
	var param = {};
	var category_cd_Arr = [];
	var id;
	
	$.each($("#tabCategory tbody tr"), function(index, value) {
		category_cd_Arr.push($(value).find("td").eq(0).attr("value"));
	});
	param.category_cd_Arr = category_cd_Arr;
	$("#overlay").show();
	$.ajax({
		url : "/monitor/category_updateSort",
		type : "POST",
		
		data:JSON.stringify(param),
		contentType:"application/json",
		success: function (result) {
			$("#overlay").fadeOut()
			alertify.success('<i class="icon fa fa-check"></i> '+ getMsgStr("s.success_category_order"));
		},
		error: function () {
			$("#overlay").fadeOut()
			alertify.error('<i class="icon fa fa-ban"></i>'+ getMsgStr("s.fail_category_order"));
 		}
	});
}


function setContentsDetail(contents_cd,contents_title, m_cd, event){
	const selectMC_el = document.createElement("div");
	selectMC_el.style.position = "absolute";
	selectMC_el.style.right = "0px";
	selectMC_el.style.zIndex = 10101;
	selectMC_el.style.height = "80px";
	selectMC_el.style.background = "none";
	selectMC_el.style.display = "flex";

	selectMC_el.innerHTML = (getContentsDashboardAuth().edit ? ("<button type='button' class='btn btn-primary waves-effect waves-light' style='height:40px; margin-right:2px;' onclick=Monitor_Modal('"+m_cd+"'); >"+message_string_arr["w.configuration"]+"</button>") : '')+
	"<button type='button' class='btn btn-primary waves-effect waves-light' style='height:40px;' onclick='javascript:addFormC(\""+contents_cd+"\", \""+contents_title+"\")'>"+message_string_arr["contents.word_74"]+"</button>"

	event.target.parentElement.parentElement.prepend(selectMC_el);
	/**
	 * 
	 * @param {PointerEvent} e 
	 */
	function clickbody(e){
		if (!event.target.contains(e.target)){
			selectMC_el.remove();
			document.body.removeEventListener("click",clickbody);
		}
	}
	document.body.addEventListener("click",clickbody);
}
//구성 모달창 띄워주기
	function Monitor_Modal(m_cd) {
		if(scene_cd == "" || scene_cd == undefined) {
			alertify.warning('<i class="icon fa fa-ban"></i>'+  getMsgStr("s.nonCategory"));
			addCategory();
			return false;
		} else {
			resetForm(scene_cd, "A");
			$("#modalAddUpdateM").modal();
			monitorSetMode('S');
			
			configListMonitor();
			$("#contents_combo").empty();
			$("#contents_combo").off("change");			
			$("#contents_combo").append($(optionContentsData));
			$("#contents_combo").select2( {dropdownParent: $("#modalAddUpdateM")} ).on("select2:open", function(e) {});
			
			$("#contents_combo").change(function(e) {
				if($(e.target).find("option:selected").attr("realtime") == "Y") {
					$("#divMonitorSub").hide();
				} else {
					$("#divMonitorSub").show();
				}

				if($("#monitor_cd").val() == ""){
					
					if($("#contents_combo").find("option:selected").val() == '-'){
						$("#formAddUpdateM").find("#monitor_title").val("");
					}else{
						$("#formAddUpdateM").find("#monitor_title").val($("#contents_combo").find("option:selected").text());	
					}
					
				}				
			
			});
		}
		
		Monitor_ModalGet('S',m_cd);	
	}
	

	function Monitor_ModalGet(type,m_cd) {
		const auth = getContentsDashboardAuth();
		if (!auth.edit) return;
		var param = {
			map : {
				monitor_scene: {
					type:"E",
					val:scene_cd
				},
				link_info: [
					{"tm_contents":{col:"realtime_flag", where:"contents_cd"}}
				]
			},
			update_flag: true
		}
		
		$("#overlay").show();
		
		$.ajax({
			url: "/monitor/select/list",
			type :"POST",
			dataType:"json",
			data:JSON.stringify(param),
			contentType:"application/json",
			success: function (result) {
				var tab_id = "";
				if(type == undefined || type == "S") {
					tab_id = "tabMonitor";
				} else if(type == "B") {
					tab_id = "tabBatchMonitor";
				}
				tabClear(tab_id);
				resetScroll(tab_id);
				
				if(result.data != undefined && result.data.length > 0) {
					var getIdx;
					
					if(type == undefined || type == "S") {
						var first_monitor = '';
						$.each(result.data, function(index, value) {
							var trData = "<tr>";
							trData += "<td class='tac'><div class='checkbox mt4'><input onclick='javascript:chkBox(\"chkMonitorAll\", \"chkMonitor\")' id='chk_monitor_"+index+"' name='chkMonitor' type='checkbox' value='"+value.monitor_cd+"'>" +
							"<label for='chk_monitor_"+index+"'></label></div></td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" + nvl(value.monitor_title, "-") + "</td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" + nvl(value.monitor_title_en, "-") + "</td>";
							trData += "<td class='hover' onclick='javascript:clickTr(\"tabMonitor\", " + index + ");configGetMonitor(\"" + value.monitor_cd + "\",\"" + value.realtime_flag + "\")'>" +
							$(optionContentsData).filter("[value="+value.contents_cd+"]").text();
								
							trData += "<div class='fr mr10 icon_none'><i class='icon fa fa-trash fa-lg hover ml5 mr5 fr mt3' onclick='delMonitor(\"" + value.monitor_cd + "\")'></i></div></td>";
							
							addRow(tab_id, trData);
							
							if(index == 0) {
								first_monitor = value.monitor_cd;
							}
							
						if(value.monitor_cd == m_cd){
							getIdx = index;
							
						}	
							
						});
				setTimeout(function() {
				var position = $("#tabMonitor .st-body-table tbody tr:eq("+getIdx+")").position();
					
					clickTr("tabMonitor",getIdx);
					configGetMonitor(m_cd,'N');				
					$("#tabMonitor .st-body-scroll").animate({scrollTop : position.top-260}, 900);
				}, 200);	
						resetForm("M","A");
						
					}
					
				} else {
					$("#" + tab_id).append("<tr><td colspan='" + $("#" + tab_id + " thead th").length + "' class='tac'>"+getMsgStr("message.no_data")+"</td></tr>");
				}
				setScroll(tab_id);
				$("#overlay").fadeOut();
			},
			error: function () {
				$("#overlay").fadeOut()
				alertify.error('<i class="icon fa fa-ban"></i> ' + getMsgStr("message.network_error"));
			}
		});
	}


function getObjIfJson(str) {
	try {
		let json = JSON.parse(str);
		return (typeof json === 'object' ? json : {});
	} catch (error) {
		return {}
	}
}


/**
 * popup id: input name
 */
const popMap = {
	columNmData:{
		pop:"langPop",
		view:"columNm_view"
	},
	ex_monitor_title_data:{
		pop:"langPop",
		view:"ex_monitor_title_view"
	},
	ex_monitor_sub_title_data:{
		pop:"langPop",
		view:"ex_monitor_sub_title_view"
	},
}


/**
 * 
 * @param {PointerEvent} event 
 */
function openLangPop(event) {
	const clickedEl = event.target
	const dataTd = findParent.byTag(clickedEl,'td');
	const dataEl = dataTd.querySelector(`input[type="hidden"]`)
	const popEl = document.getElementById("langPop");
	const popForm = getForm(popEl).byId
	popEl.dataTarget = dataEl;

	for (const el of Object.values(popForm)) {
		el.value = null;
	}

	popEl.style.position ="absolute"
	popEl.style.top = event.pageY + 13 + "px";
	popEl.style.left = event.pageX - 90 + "px";
	popEl.style.display = 'block';
	let data = getObjIfJson(dataEl.value)
	if (data) {
		for (const ent of Object.entries(data)) {
			popForm["pop_"+ent[0]].value = ent[1];
		}
	}
}

/**
 * 
 * @param {InputEvent} event 
 */
function setPopData(event) {
	const thisEl = event.target;
	const thisLang = thisEl.id.slice(4);
	const popEl = findParent.bySelector(thisEl,'.dropdetails.link_area').parentElement
	const dataEl = popEl.dataTarget;

	if (popMap[dataEl.name]) {
		const viewInput = dataEl.parentElement.querySelector(`input[name="${popMap[dataEl.name].view}"]`);
		if (viewInput && thisLang.includes(lang_set)) {
			viewInput.value = thisEl.value;
		}
	}

	if (!dataEl || popEl.style.display === 'none') {
		return;
	}
	let data = getObjIfJson(dataEl.value)

	data[thisLang] = thisEl.value;
	let lang = ['ko','en','etc'];
	for (const l of lang) {
		if (l !== thisLang && data[l] === undefined) {
			data[l] = ""
		}
	}

	dataEl.value = JSON.stringify(data);

}

function setPopData(event) {
	const thisEl = event.target;
	const thisLang = thisEl.id.slice(4);
	const popEl = findParent.bySelector(thisEl,'.dropdetails.link_area').parentElement
	const dataEl = popEl.dataTarget;

	if (popMap[dataEl.name]) {
		const viewInput = dataEl.parentElement.querySelector(`input[name="${popMap[dataEl.name].view}"]`);
		if (viewInput && thisLang.includes(lang_set)) {
			viewInput.value = thisEl.value;
		}
	}

	if (!dataEl || popEl.style.display === 'none') {
		return;
	}
	let data = getObjIfJson(dataEl.value)

	data[thisLang] = thisEl.value;
	let lang = ['ko','en','etc'];
	for (const l of lang) {
		if (l !== thisLang && data[l] === undefined) {
			data[l] = ""
		}
	}

	dataEl.value = JSON.stringify(data);

}

/**
 * @typedef {Object} tm_monitor
 * @property {String} monitor_cd
 * @property {String} monitor_title
 * @property {String} monitor_title_en
 * @property {String} monitor_sub_title
 * @property {String} monitor_sub_title_en
 * @property {String} monitor_scene
 * @property {Number} monitor_x
 * @property {Number} monitor_y
 * @property {Number} monitor_width
 * @property {Number} monitor_height
 * @property {String} header_view_yn
 * @property {String} monitor_theme
 * @property {String} monitor_alert_yn
 * @property {String} contents_cd
 * @property {String} user_cd
 */

/**
 * @typedef {Object} monitorHistory
 * @property {string} monitor_cd
 * @property {tm_monitor} prevData
 * @property {tm_monitor} currData
 * @property {string} scene_cd
 * @property {"SIZE" | "POS"} changed
 */

const monitor_historys = {
	/**@type {monitorHistory[]} */
	undoList:[],
	/**@type {monitorHistory[]} */
	redoList:[],
}

function monitorUndo() {

	/**@type {boolean} */
	let editMode = "editModeBtn";
	
	if (!$("#"+editMode).hasClass("on")) {
		console.warn("Only can undo in edit mode.")
		return false;
	}
	
	if (monitor_historys.undoList.length < 1) {
		console.warn("Undo list is empty.")
		return false;
	}

	// get undoTarget
	const undoTarget = monitor_historys.undoList.splice(-1)[0];
	const contents_canvas = document.getElementById("contents_canvas");

	//find target div
	const monitorDiv = contents_canvas.querySelector(`div.draggable.resizable[monitor_cd="${undoTarget.monitor_cd}"]`);
	if (!monitorDiv) return false;
	
	//set monitor size, pos
	monitorDiv.style.top = undoTarget.prevData.monitor_x + "px";
	monitorDiv.style.left = undoTarget.prevData.monitor_y + "px";
	monitorDiv.style.width = undoTarget.prevData.monitor_width + "px";
	monitorDiv.style.height = undoTarget.prevData.monitor_height + "px";
	updateMonitorStyle($(monitorDiv));

	monitor_historys.redoList.push(undoTarget)
}

function monitorRedo() {
	/**@type {boolean} */
	let editMode = "editModeBtn";
	
	//const editMode = $("#editModeBtn").hasClass("on");
	//const o_editMode = $("#o_editModeBtn").hasClass("on");
	if (!$("#"+editMode).hasClass("on")) {
		//console.warn("Only can redo in edit mode.")
		return false;
	}
	
	if (monitor_historys.redoList.length < 1) {
		//console.warn("Redo list is empty.")
		return false;
	}
	const redoTarget = monitor_historys.redoList.splice(-1)[0];
	const contents_canvas = document.getElementById("contents_canvas");
	//console.log(redoTarget);
	
	const monitorDiv = contents_canvas.querySelector(`div.draggable.resizable[monitor_cd="${redoTarget.monitor_cd}"]`);
	//console.log(monitorDiv);
	if (!monitorDiv) return false;
	
	monitorDiv.style.top = redoTarget.currData.monitor_x + "px";
	monitorDiv.style.left = redoTarget.currData.monitor_y + "px";
	monitorDiv.style.width = redoTarget.currData.monitor_width + "px";
	monitorDiv.style.height = redoTarget.currData.monitor_height + "px";
	updateMonitorStyle($(monitorDiv));
	
	monitor_historys.undoList.push(redoTarget)
}


// 복사 후 캡처
async function copyAndCapture() {
	if (contentsList.length < 1) {
		throw new Error(getMsgStr("main_word_13"))
	}
	$("#overlay").show();
	const contentIframe = document.createElement("iframe");
	contentIframe.width = window.outerWidth;
	contentIframe.height = window.outerHeight;
	contentIframe.style.visibility = "hidden";
	contentIframe.id = "contentIframe";

	const style_css = document.createElement("link");
	style_css.href = "/css/style_white.css";
	style_css.rel="stylesheet";
	style_css.type="text/css";

	const bootstrap = document.createElement("link");
	bootstrap.href = "/plugin/bootstrap-4.3.1/css/bootstrap.css";
	bootstrap.rel="stylesheet";
	bootstrap.type="text/css";

	const fa = document.createElement("link");
	fa.href = "/css/font-awesome.css";
	fa.rel="stylesheet";
	fa.type="text/css";

	const h2c = document.createElement("script");
	h2c.src = "/plugin/html-to-image/dist/html-to-image.js";

	//헤더 설정
	const newHead = document.createElement("head");
	newHead.append(bootstrap);
	newHead.append(fa);
	newHead.append(style_css);
	newHead.append(h2c);

	const newBody = document.createElement("body");
	const copyEls = [];
	for (const contents of contentsList) {
		const contentDiv = document.querySelector(`div[monitor_cd = "\${contents.monitor_cd}"]`);
		const cloneDiv = await contentDiv.cloneNode(true).querySelector("div");
		cloneDiv.id = "monitor_" + contents.monitor_cd;
		newBody.append(cloneDiv);
		copyEls.push(cloneDiv);
	}
	const newHtml = document.createElement("html");
	newHtml.append(newHead,newBody);
	// await contentIframe.append(newHtml);
	//console.log(newHtml);
	//console.log(contentIframe);
	document.body.append(contentIframe);
	contentIframe.contentDocument.body.append(newHtml)

	contentIframe.onload = async ()=>{
		// for (const el of copyEls) {
		// 	const url = await htmlToImage.toPng(el)
		// 	await downloadURI(url,el.id+".png");
		// }
		
		const url = await htmlToImage.toPng(contentIframe)
		await downloadURI(url,"aa"+".png");
		contentIframe.remove();
		$("#overlay").hide();
	}
}

// css 덮어씌우고 캡쳐
async function capture_by_monitor() {

	const now_css =  document.querySelector("link[href^='/css/style']")
	now_css.disabled = true;
	$("#overlay").show();
	const style_css = document.createElement("link");
	style_css.href = "/css/style.css";
	style_css.rel="stylesheet";
	style_css.type="text/css";
	document.body.prepend(style_css);
	
	style_css.onload = async ()=>{
		for (const contents of contentsList) {
			const contentDiv = document.querySelector(`div[monitor_cd = "\${contents.monitor_cd}"] > div`);
			try {
				const url = await htmlToImage.toPng(contentDiv,{
					backgroundColor: window.getComputedStyle(document.body,null).getPropertyValue("background-color"),
					imagePlaceholder: ""
				})
				await downloadURI(url,contents.monitor_cd+".png");
			} catch (error) {
				console.log(error.target);
				console.log(error);
				console.error("Capture Error!!",contents,contentDiv);
			}
		}
		style_css.remove();
		now_css.disabled = false;
		$("#overlay").hide();
	}
}

// 전체 캡쳐
function captureAll() {
	$("#overlay").show();
	const contents_canvas = document.getElementById("contents_canvas");
	const contentParent = document.querySelector(".ui-layout-center");
	const category_area = document.getElementById("category_area");
	let curCate = category_area ? category_area.querySelector(".btn-dark").innerText : scene_cd;
	curCate = curCate.replace("!@#$%^&*()","")
	contents_canvas.style.width = contentParent.scrollWidth + 25 + "px";
	contents_canvas.style.height = contentParent.scrollHeight + "px";
	
	htmlToImage.toPng(contents_canvas,{
		backgroundColor: window.getComputedStyle(document.body,null).getPropertyValue("background-color"),
		imagePlaceholder: ""
	}).then(url=>{
		downloadURI(url,"export_" + curCate +".png");
		contents_canvas.style.width = null;
		contents_canvas.style.height = null;
	}).finally(r=>{
		$("#overlay").hide();
	})

}
function captureAll_SVG() {
	$("#overlay").show();
	const contents_canvas = document.getElementById("contents_canvas");
	const contentParent = document.querySelector(".ui-layout-center");
	const category_area = document.getElementById("category_area");
	let curCate = category_area ? category_area.querySelector(".btn-dark").innerText : scene_cd;
	curCate = curCate.replace("!@#$%^&*()","")
	contents_canvas.style.width = contentParent.scrollWidth + 25 + "px";
	contents_canvas.style.height = contentParent.scrollHeight + "px";
	
	htmlToImage.toSvg(contents_canvas,{
		backgroundColor: window.getComputedStyle(document.body,null).getPropertyValue("background-color"),
		imagePlaceholder: ""
	}).then(url=>{
		downloadURI(url,"export_" + curCate +".svg");
		contents_canvas.style.width = null;
		contents_canvas.style.height = null;
	}).finally(r=>{
		$("#overlay").hide();
	})
}


function generateSelector(context) {
	let index, pathSelector, localName;

	if (context == "null") throw "not an dom reference";
	// call getIndex function
	index = getIndex(context);

	while (context.tagName) {
		// selector path
		pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
		context = context.parentNode;
	}
	// selector path for nth of type
	pathSelector = pathSelector + `:nth-of-type(${index})`;
	return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
	let i = 1;
	let tagName = node.tagName;

	while (node.previousSibling) {
		node = node.previousSibling;
		if (
		node.nodeType === 1 &&
		tagName.toLowerCase() == node.tagName.toLowerCase()
		) {
		i++;
		}
	}
	return i;
}

class ComputedStyle {
	constructor(element){
		this.element = element;
		this.style = "";
	}

	/**
	 * 
	 * @param {HTMLElement} elem 
	 */
	getStyle(elem){
		if (!elem) {
			elem = this.element;
		}
		const style = window.getComputedStyle(elem);
		let styleText = "";
		Object.entries(style).forEach(([key,val])=>{
			if (key && val && !/[0-9]/.test(key)) {
				const text = `${key}:${val};`;
				styleText += text;
			}
		})
		styleText.slice(-1);
		
		let css = `${generateSelector(elem)} {${styleText}}\n`

		this.style += css;

		const children = elem.children;
		if (children.length > 0) {
			return this.loop(elem.children)
		}else{
			return this.style;
		}
	}

	loop(elems){
		for (const el of elems) {
			this.getStyle(el);
		}
	}
}



/**
 * 
 * @param {HTMLElement} oriElem 
 */
function getDocx(oriElem) {

	
	const styleObj = new ComputedStyle(oriElem);
	styleObj.getStyle();
	const css = styleObj.style;
	const styleEl = document.createElement("style");
	styleEl.innerHTML = css;
	const elem = oriElem.cloneNode(true);
	
	elem.querySelectorAll("script").forEach(el=>{
		el.remove();
	})
	elem.querySelectorAll("link").forEach(el=>{
		el.remove();
	})
	elem.querySelectorAll("style").forEach(el=>{
		el.remove();
	})
	elem.prepend(styleEl)

	//console.log("css:",css);
	//console.log("elem:",elem);
	//console.log("elemHTML:",elem.innerHTML);

	const newHtml = document.createElement("html");
	newHtml.append(document.createElement("head").append(document.createElement("title")),elem);
	const htmlBlob = new Blob([newHtml.innerHTML],{type:"text/html"});
	downloadBlob(htmlBlob,"document.html");


	// const docxHTML = `${styleEl.outerHTML}${elem.innerHTML}`;
	const docxBlob = htmlDocx.asBlob(elem.innerHTML);
	downloadBlob(docxBlob,"document.docx");
}


