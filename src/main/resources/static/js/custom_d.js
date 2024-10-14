$(document).ready(function(){
	// 화면 높이 관련
	widthFunctions();

    $(window).resize(function() {
        widthFunctions();
    });
    

    //------------------ 상단 왼쪽 버튼 관련 -------------------
    $('#menu_btn_close').click(function(){
    	$('#menu_btn_close').addClass("dn");
    	$('#menu_btn_close').removeClass("di")
    	$('#menu_btn_open').addClass("di");
    	$('#menu_btn_open').removeClass("dn");
    });
    $('#menu_btn_open').click(function(){
    	$('#menu_btn_open').addClass("dn");
    	$('#menu_btn_open').removeClass("di");
    	$('#menu_btn_close').addClass("di");
    	$('#menu_btn_close').removeClass("dn");
    });
    

	//모달 오픈
    $("#myBtn").click(function(){
        $("#myModal").modal();
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
    var winHeight = $(window).height();
	var winHeight2 = $(window).height() - 250;
	var winHeight3 = $(window).height() - 60;
	var winHeight4 = $(window).height() - 100;
	var winHeight5 = $(window).height() - 525;

	if (winHeight) {
		$(".ui-layout-container").css("min-height",winHeight);
		$(".ui-layout-center").css("min-height",winHeight);
		$(".pannel_area").css("min-height",winHeight);
		//$(".pannel_area2").css("min-height",winHeight2);
		$(".left_menu2").css("height",winHeight3);
		$(".wrap").css("height",winHeight);
		$(".contents").css("height",winHeight);
		$(".container-fluid").css("height",winHeight);
		$(".wide_30").css("height",winHeight);
		$(".wide_40").css("height",winHeight);
		$(".event_slider").css("height",winHeight3);
		if($("#out_top_menu").length>0){
			var winWhidth= $("#3d").width();
			$("#out_top_menu").css("width",winWhidth);
		}
		$(".pannel_area3").css("min-height",winHeight5);
		$(".pannel_box2").css("min-height",winHeight3);
		$(".controll_box2").css("height",winHeight2);
		$(".hiegh_max").css("height",winHeight3);
		
	}
}


function setMenu(pId){
	if(pId==2){
		$("#menu01").show("slide", {}, 500);
		$("#menu02").hide("slide", {}, 500);
	}else{
		$("#menu01").hide("slide", {}, 500);
		$("#menu02").show("slide", {}, 500);
	}
}

function openEventSlider() {
	$(".event_slider").show("slide", {direction: "right"}, 500);
}

function closeEventSlider() {
	$(".event_slider").hide("slide", {direction: "right"}, 500);
}


