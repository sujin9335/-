$(document).ready(function(){
	// 화면 높이 관련
	widthFunctions();
    $(window).resize(function() {
        widthFunctions();
    });
    
  //------------------ 상단 오른쪽 버튼 관련 -------------------
    $('#setup_btn_close').click(function(){
    	$('#setup_btn_close').addClass("dn");
    	$('#setup_btn_close').removeClass("di")
    	$('#setup_btn_open').addClass("di");
    	$('#setup_btn_open').removeClass("dn");
    	$(".back_bg").hide();
    });
    $('#setup_btn_open').click(function(){
    	$('#setup_btn_open').addClass("dn");
    	$('#setup_btn_open').removeClass("di");
    	$('#setup_btn_close').addClass("di");
    	$('#setup_btn_close').removeClass("dn");
    	$(".back_bg").show();
    });
});



function sidePanel(id, type, direct){
	if(type=="o"){
		$("#"+id).show("slide", { direction: direct }, 500);
		$(".back_bg").show();
	}else{
		$("#"+id).hide("slide", { direction: direct }, 500);
		$(".back_bg").hide();
	}

}

function widthFunctions() {
    var winHeight = $(window).height() - 50;
	var winHeight2 = $(window).height() - 250;
	var winHeight3 = $(window).height() - 320;
	var winHeight4 = $(window).height() - 100;
	var winHeight5 = $(window).height() - 525;
	var winHeight6 = $(window).height() - 120;
	
	if (winHeight) {
		$(".ui-layout-container").css("min-height",winHeight);
		$(".pannel_area").css("min-height",winHeight);
		$(".pannel_area2").css("min-height",winHeight2);
//		$(".pannel_area3").css("min-height",winHeight5);
		$(".pannel_box2").css("min-height",winHeight3);
		$(".pannel_box3").css("min-height",$("#setup_popup").height() - 190);
		$(".container-fluid").css("height",winHeight4);
		$(".contents").css("height",winHeight6);
		$(".contents_menu").css("height",winHeight);
		$(".controll_box2").css("height",winHeight2);
		
	}
}

//------------------ 탑메뉴 관련 -------------------
function setMenu(){
	/* pc 메뉴 */
	$(".gnb > li").bind("click mouseover focusin", function(){
		gnbMenu("show");
				
		if($(".con_location li ul").is(":visible"))
		{
			$(".con_location li ul").hide();
			$(".con_location li ul").parent("li").removeClass("on");
		}
	});

	$(".gnb > li").bind("mouseout focusout", function(){
		gnbMenu("hide");
		//for(var i=0; i<$("select").length; i++){
			//$($("select")[i]).removeAttr("disabled");
		//}
		
			
	});
	
	
	
	/* pc navigation */
	$(".con_location li").click(function(){
		$(this).children("ul").slideToggle("fast");
		$(this).siblings("").children("ul").slideUp("fast");	
		$(this).toggleClass("on");
		$(this).siblings("").removeClass("on");

		if ($(".depth02 ul li").length == 0){
			$(".depth02").removeClass("on");
		}
	});	
}

//------------------ 탑메뉴 보이기 -------------------
function gnbMenu(flag){
	var waitForRemoveName = "wait-for-remove";
	var bgMenuHeight = $(".header_box .gnb li ul").height() + 60;
	if (flag == "show")
	{
		// 숨김 요청 제거.
		$(".header_box").removeClass(waitForRemoveName);
		$(".bg_menu").removeClass(waitForRemoveName);

		$(".header_box .gnb li ul").show();
		$(".bg_menu").show();
		$(".bg_menu").css("height",bgMenuHeight);
		
		if($("#settingModeArea").css("display","block")){
			$("#settingModeArea").css("display","none");
		}
		if ($("#grpPop").is(":visible")) {
				//$("#grpPop").hide();
				closeGrp();
		}
		
		
	}else{
		if ( !$(".header_box").hasClass(waitForRemoveName) )
		{
			$(".header_box").addClass(waitForRemoveName);
			$(".bg_menu").addClass(waitForRemoveName);
		}
		setTimeout(
				function(){
					if ( $(".header_box").hasClass(waitForRemoveName) )
					{
						$(".header_box .gnb li ul").hide();
						$(".bg_menu").hide();
					
					}
				}
				, 0
		);
	}
}







