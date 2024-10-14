function getData(pType, tabNm, pTrIdx, pTdIdx){
  var val = "";
  if(pType == "text"){
    val = $("#"+tabNm+" tbody").find("tr_"+pTrIdx).find("td:eq("+pTdIdx+")").text();
  }else if(pType == "val"){
    val = $("#"+tabNm+" tbody").find("tr_"+pTrIdx).find("td:eq("+pTdIdx+")").val();
  }else if(pType == "id"){
    val = $("#"+tabNm+" tbody").find("tr_"+pTrIdx).find("td:eq("+pTdIdx+")").attr("id");
  }
  return val;
}

function addRow(tabId, trData){
  $("#"+tabId+" tbody").append(
    trData
  );
}

function tabClear(tabId){
    $("#"+tabId+" tbody tr").remove();
}

function search(){
  page_current = 1;
  list();
}

function getOrderBy(sOrderColNm){
  page_current = 1;
  if(sOrderColNm == orderColNm){
    if(orderType == "asc"){
      orderType = "desc";
    }else{
      orderType = "asc";
    }
  }
  
  orderColNm = sOrderColNm;
  list();
}

function movePage(pcurrPage, pTotalPage){
  if(pcurrPage==0 || pcurrPage<0){
    alertify.message('<i class="fa fa-warning"></i>' + message_string_arr["s.the_first_page"]);
    return;
  }
  
  if(pcurrPage>pTotalPage){
    alertify.message('<i class="fa fa-warning"></i>' + message_string_arr["s.the_last_page"]);
    return;
  }
  
  page_current = pcurrPage;
  
  list();
}

function movePageUser(pcurrPage, pTotalPage){
	  if(pcurrPage==0 || pcurrPage<0){
		  alertify.message('<i class="fa fa-warning"></i>' + message_string_arr["s.the_first_page"]);
	    return;
	  }
	  
	  if(pcurrPage>pTotalPage){
		    alertify.message('<i class="fa fa-warning"></i>' + message_string_arr["s.the_last_page"]);
	    return;
	  }
	  
	  page_current = pcurrPage;
	  
	  getUser();
	}

function pagingUser(totalCnt, pageSize, curPage, ulId){
	  $("#"+ulId).html("");
	  var totalPage = Math.ceil(totalCnt/pageSize)
	  
	  if(totalPage>0){
	    if(totalPage<11){
	      //prev
	      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageUser("+(Number(curPage)-1)+","+totalPage+")'><i class='fa fa-chevron-left'></i></a></li>";
	      $("#"+ulId).append(html);
	      
	      for(var i=1;i<totalPage+1;i++){
	        var html = "";
	        if(curPage==i){
	          html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageUser("+i+","+totalPage+")'>"+i+"</a></li>";
	        }else{
	          html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageUser("+i+","+totalPage+")'>"+i+"</a></li>";
	        }
	        $("#"+ulId).append(html);
	      }
	      
	      //next
	      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageUser("+(Number(curPage)+1)+","+totalPage+")'><i class='fa fa-chevron-right'></i></a></li>";
	      $("#"+ulId).append(html);
	    }else{
	      var preChar = "";
	      if(String(curPage).substr(String(curPage).length-1, 1)=="0"){
	        preChar = String(curPage-10).slice(0,-1);
	      }else{
	        preChar = String(curPage).slice(0,-1);
	      }
	      
	      //prev
	      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageUser("+1+","+totalPage+")'><i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i></a></li>" +
	                "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageUser("+(((Number(preChar)-1)*10)+1)+","+totalPage+")'><i class='fa fa-chevron-left'></i></a></li>";
	      $("#"+ulId).append(html);
	      
	      for(var i=1;i<11;i++){
	        var html = "";
	        if((Number(preChar)*10+i) < Number(totalPage)+1){
	          if(curPage==(Number(preChar)*10+i)){
	            html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageUser("+(Number(preChar)*10+i)+","+totalPage+")'>"+(Number(preChar)*10+i)+"</a></li>";
	          }else if(i==10){
	            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageUser("+((Number(preChar)+1)*10)+","+totalPage+")'>"+((Number(preChar)+1)*10)+"</a></li>";
	          }else{
	            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageUser("+(Number(preChar)*10+i)+","+totalPage+")'>"+(Number(preChar)*10+i)+"</a></li>";
	          }
	          $("#"+ulId).append(html);
	        }else{
	          break;
	        }
	      }
	      
	      //next
	      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageUser("+(((Number(preChar)+1)*10)+1)+","+totalPage+")'><i class='fa fa-chevron-right'></i></a></li>" +
	                "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageUser("+totalPage+","+totalPage+")'><i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i></a></li>";
	      $("#"+ulId).append(html);
	    }
	  }
	}

function paging(totalCnt, pageSize, curPage){
  $("#ulPage").html("");
  var totalPage = Math.ceil(totalCnt/pageSize)
  
  if(totalPage>0){
    if(totalPage<11){
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePage("+(Number(curPage)-1)+","+totalPage+")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#ulPage").append(html);
      
      for(var i=1;i<totalPage+1;i++){
        var html = "";
        if(curPage==i){
          html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePage("+i+","+totalPage+")'>"+i+"</a></li>";
        }else{
          html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePage("+i+","+totalPage+")'>"+i+"</a></li>";
        }
        $("#ulPage").append(html);
      }
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePage("+(Number(curPage)+1)+","+totalPage+")'><i class='fa fa-chevron-right'></i></a></li>";
      $("#ulPage").append(html);
    }else{
      //preChar은 1~10 을 0, 11~20 을 1 ... 같이 페이징 처리하는 방법
      var preChar = "";
      if(String(curPage).substr(String(curPage).length-1, 1)=="0"){
        preChar = String(curPage-10).slice(0,-1);
      }else{
        preChar = String(curPage).slice(0,-1);
      }
      
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePage("+1+","+totalPage+")'><i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i></a></li>" +
                "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePage("+(((Number(preChar)-1)*10)+1)+","+totalPage+")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#ulPage").append(html);
      
      for(var i=1;i<11;i++){
        var html = "";
        //최대 페이지(totalPage) 까지만 만드는 조건
        if((Number(preChar)*10+i) < Number(totalPage)+1){
          if(curPage==(Number(preChar)*10+i)){
            html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePage("+(Number(preChar)*10+i)+","+totalPage+")'>"+(Number(preChar)*10+i)+"</a></li>";
          }else if(i==10){
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePage("+((Number(preChar)+1)*10)+","+totalPage+")'>"+((Number(preChar)+1)*10)+"</a></li>";
          }else{
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePage("+(Number(preChar)*10+i)+","+totalPage+")'>"+(Number(preChar)*10+i)+"</a></li>";
          }
          $("#ulPage").append(html);
        }else{
          break;
        }
      }
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePage("+(((Number(preChar)+1)*10)+1)+","+totalPage+")'><i class='fa fa-chevron-right'></i></a></li>" +
                "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePage("+totalPage+","+totalPage+")'><i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i></a></li>";
      $("#ulPage").append(html);
    }
  }
}

//sub
function movePageSub(pcurrPage, pTotalPage, pUlNm){
  if(pcurrPage==0 || pcurrPage<0){
    alertify.message('<i class="fa fa-warning"></i> 첫 페이지 입니다.');
    return;
  }
  
  if(pcurrPage>pTotalPage){
    alertify.message('<i class="fa fa-warning"></i> 마지막 페이지 입니다.');
    return;
  }
  
  if(pUlNm=="ulPage1"){
	  page_current_sub_1 = pcurrPage;
	  listAsset("I");
  }else if(pUlNm=="ulPage2"){
	  page_current_sub_2 = pcurrPage;
	  listAsset("O");
  }
  
  if(pUlNm=="ulPageUser" || pUlNm=="aF-ulPageUser"){
	  page_current_sub = pcurrPage;
	  listUser();
  }
  
  if(pUlNm=="ulPageAsset" || pUlNm=="aF-ulPageUser"){
	  page_current_sub2 = pcurrPage;
	    
	  listAsset();
  }
  
  if(pUlNm=="ulPageCode"){
	  page_current_sub = pcurrPage;
	  listSub();
  }
  
  if(pUlNm=="ulPageRsp"){
	  page_current_sub_1 = pcurrPage;
	  getRTN();
  }

  if(pUlNm=="aF-imagePage"){
	  aF_page_current_image = pcurrPage;
	  aF_listImage();
  }

  if(pUlNm=="mailPaging"){
	  page_current_sub = pcurrPage;
	  listSub();
  }
  
   
}

function pagingSub(totalCnt, pageSize, curPage, ulNm){
  $("#"+ulNm).html("");
  var totalPage = Math.ceil(totalCnt/pageSize)
 
  if(totalPage>0){
    if(totalPage<11){
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageSub("+(Number(curPage)-1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#"+ulNm).append(html);
      
      for(var i=1;i<totalPage+1;i++){
        var html = "";
        if(curPage==i){
          html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageSub("+i+","+totalPage+",\""+ulNm+"\")'>"+i+"</a></li>";
        }else{
          html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageSub("+i+","+totalPage+",\""+ulNm+"\")'>"+i+"</a></li>";
        }
        $("#"+ulNm).append(html);
      }
    
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageSub("+(Number(curPage)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i></a></li>";
      $("#"+ulNm).append(html);
    }else{
      var preChar = "";
      if(String(curPage).substr(String(curPage).length-1, 1)=="0"){
        preChar = String(curPage-10).slice(0,-1);
      }else{
        preChar = String(curPage).slice(0,-1);
      }
      
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageSub("+1+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i></a></li>" +
                "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageSub("+(((Number(preChar)-1)*10)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#"+ulNm).append(html);
      
      for(var i=1;i<11;i++){
        var html = "";
        if((Number(preChar)*10+i) < Number(totalPage)+1){
          if(curPage==(Number(preChar)*10+i)){
            html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageSub("+(Number(preChar)*10+i)+","+totalPage+",\""+ulNm+"\")'>"+(Number(preChar)*10+i)+"</a></li>";
          }else if(i==10){
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageSub("+((Number(preChar)+1)*10)+","+totalPage+",\""+ulNm+"\")'>"+((Number(preChar)+1)*10)+"</a></li>";
          }else{
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageSub("+(Number(preChar)*10+i)+","+totalPage+",\""+ulNm+"\")'>"+(Number(preChar)*10+i)+"</a></li>";
          }
          $("#"+ulNm).append(html);
        }else{
          break;
        }
      }
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageSub("+(((Number(preChar)+1)*10)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i></a></li>" +
                "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageSub("+totalPage+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i></a></li>";
      $("#"+ulNm).append(html);
    }
  }
}

function setScroll(pId, flag, pH){
	
	var pHeight = $('#'+pId).parent().css("height");
	
	if($('#'+pId).parent().css("height")==null || $('#'+pId).parent().css("height")==undefined ){
		pHeight = 0;
	}else{
		pHeight = pHeight.replace("px", "");
	}
	
	
	if(flag != undefined && flag == true) {
//		if(scene_cd!=undefined){
//			if(scene_cd=="M"){
//				pHeight = (pHeight - 90);
//			}else{
//			}
//		}else{
//			pHeight = (pHeight - 90);
//		}		
		pHeight = (pHeight - 86)
	} else {
//		if(typeof(scene_cd)!="undefined" && scene_cd==undefined){
//			pHeight = (pHeight - 40);
//		} else {
//			if(typeof(scene_cd)!="undefined" && scene_cd=="M"){
//				pHeight = (pHeight - 40);
//			}else{
//			}
//		}		
		pHeight = (pHeight - 36);
	}
	
	
	if(pHeight<1){
		pHeight = 100;
	}
	
	if(pH != undefined && pH != "") {
		pHeight = pH;
	}
	
	$('#'+pId).scrolltable({
		stripe: true,
		oddClass: 'odd',
		maxHeight: pHeight
	});
	
	
}

function setScrollC(pId, flag, pH){
	var pHeight = $('#'+pId).parent().css("height");
	
	if($('#'+pId).parent().css("height")==null || $('#'+pId).parent().css("height")==undefined ){
		pHeight = 0;
	}else{
		pHeight = $('#'+pId).parent().parent().parent().css("height").replace("px", "");
	}		
			
	if(flag != undefined && flag == true) {
		pHeight = (pHeight - 86)
	} else {
		pHeight = (pHeight - 36);
	}
	


	
	if(pHeight<1){
		pHeight = 100;
	}
	
	if(pH != undefined && pH != "") {
		pHeight = pH;
	}
	
	// console.log(pId+"/"+pHeight);
//	$('#'+pId).scrolltable({
//		stripe: true,
//		oddClass: 'odd',
//		maxHeight: pHeight
//	});
	$('#'+pId).scrolltable({
		stripe: true,
		oddClass: 'odd',
		maxHeight: pHeight - 62
	});

}

async function waitVisible(elem, timeout=5000) {
  return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      if (elementVisible(elem)) {
        clearInterval(timer);
        timer = null;
        resolve()
      }
    }, 10);
    const tm = timeout || 5000;
    setTimeout(() => {
      if (timer) {
        clearInterval(timer);
        resolve();
      }
    }, tm);
  })
}
function elementVisible(elem) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}

async function setScrollC2(pId) {
  let targetTbl = pId;
  if (typeof pId === 'string') {
    targetTbl = document.getElementById(pId);
  }
  await waitVisible(targetTbl);
  targetTbl.classList.add("scrollTbody");
  const thead = targetTbl.querySelector("thead");
  if (thead) {
    const HeaderHeight = thead.offsetHeight;
    const tbody = targetTbl.querySelector("tbody")
    tbody.style.height = `calc(100% - ${HeaderHeight+32}px)`;
  }
}


function resetScroll(pId){
	if($('#'+pId+" div.st-head").length>0){
		$('#'+pId).scrolltable("destroy");
	}
}

function viewOnOff(key, width)
{
    if($("#" + key).hasClass("click_view_on") == true)
    {
        $("#" + key + " tbody tr").eq(0).css('display', 'table-row');
        $("#" + key).removeClass("click_view_on");
        $("#" + key).addClass("click_view_off");
        $("#" + key).width(width);
    }
    else
    {
        $("#" + key + " tbody tr").eq(0).css('display', 'none');
        $("#" + key).addClass("click_view_on");
        $("#" + key).removeClass("click_view_off");
        $("#" + key).width('');
    }
}

/**
 * 
 * @param {string|HTMLDivElement} arg 페이지네이션 엘리먼트 or id
 */
function getCurrPage(arg) {
  let targetEl = null;

  if (typeof arg === 'string') {
    targetEl = document.getElementById(arg);
  }else if (arg instanceof Object) {
    targetEl = arg;
  }else{
    return console.error(getMsgStr("table.word_1"))
  }

  const cPageEl = targetEl.querySelector('li.active > a');
  if (cPageEl) {
    return cPageEl.innetText || 1;
  }else {
    return 1;
  }
}

function pagingDynamic(totalCnt, pageSize, curPage, ulNm,targetFn){
  $("#"+ulNm).html("");
  var totalPage = Math.ceil(totalCnt/pageSize)
 
  if(totalPage>0){
    if(totalPage<11){
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageDynamic("+(Number(curPage)-1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#"+ulNm).append(html);
      
      for(var i=1;i<totalPage+1;i++){
        var html = "";
        if(curPage==i){
          html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageDynamic("+i+","+totalPage+",\""+ulNm+"\")'>"+i+"</a></li>";
        }else{
          html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageDynamic("+i+","+totalPage+",\""+ulNm+"\")'>"+i+"</a></li>";
        }
        $("#"+ulNm).append(html);
      }
    
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageDynamic("+(Number(curPage)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i></a></li>";
      $("#"+ulNm).append(html);
    }else{
      var preChar = "";
      if(String(curPage).substr(String(curPage).length-1, 1)=="0"){
        preChar = String(curPage-10).slice(0,-1);
      }else{
        preChar = String(curPage).slice(0,-1);
      }
      
      //prev
      var html = "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageDynamic("+1+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i></a></li>" +
                "<li class='paginate_button page-item previous'><a class='page-link' href='javascript:movePageDynamic("+(((Number(preChar)-1)*10)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-left'></i></a></li>";
      $("#"+ulNm).append(html);
      
      for(var i=1;i<11;i++){
        var html = "";
        if((Number(preChar)*10+i) < Number(totalPage)+1){
          if(curPage==(Number(preChar)*10+i)){
            html = "<li class='paginate_button page-item active'><a class='page-link' href='javascript:movePageDynamic("+(Number(preChar)*10+i)+","+totalPage+",\""+ulNm+"\")'>"+(Number(preChar)*10+i)+"</a></li>";
          }else if(i==10){
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageDynamic("+((Number(preChar)+1)*10)+","+totalPage+",\""+ulNm+"\")'>"+((Number(preChar)+1)*10)+"</a></li>";
          }else{
            html = "<li class='paginate_button page-item'><a class='page-link' href='javascript:movePageDynamic("+(Number(preChar)*10+i)+","+totalPage+",\""+ulNm+"\")'>"+(Number(preChar)*10+i)+"</a></li>";
          }
          $("#"+ulNm).append(html);
        }else{
          break;
        }
      }
      
      //next
      var html = "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageDynamic("+(((Number(preChar)+1)*10)+1)+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i></a></li>" +
                "<li class='paginate_button page-item next'><a class='page-link' href='javascript:movePageDynamic("+totalPage+","+totalPage+",\""+ulNm+"\")'><i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i></a></li>";
      $("#"+ulNm).append(html);
    }
  }
}

function movePageDynamic(pcurrPage) {
  if(pcurrPage==0 || pcurrPage<0){
    alertify.message('<i class="fa fa-warning"></i> 첫 페이지 입니다.');
    return;
  }
  
  if(pcurrPage>pTotalPage){
    alertify.message('<i class="fa fa-warning"></i> 마지막 페이지 입니다.');
    return;
  }
}



let CodvillTableInstances = [];


  /**
   * 
   * @param {string|Node} arg 
   * @returns {CodvillTable}
   */
function getTableInstance(arg) {
  if (typeof arg === 'string') {
    const findId = arg.startsWith("#") ? arg.slice(1) : arg;
    const targetInstance = CodvillTableInstances.find((e)=> e.id === findId);
    
    if (targetInstance) {
      if (!targetInstance.elem.isConnected) {
        CodvillTableInstances = CodvillTableInstances.filter((e)=> e.id !== findId)
        throw new Error(getMsgStr("table.word_2"))
      }
      return targetInstance.instance || null
    }
  }else{
    const targetInstance = CodvillTableInstances.find((e)=> e.elem.isEqualNode(arg));
    if (targetInstance) {
      if (!targetInstance.elem.isConnected) {
        CodvillTableInstances = CodvillTableInstances.filter((e)=> !e.elem.isEqualNode(arg))
        throw new Error(getMsgStr("table.word_2"))
      }
      return targetInstance.instance || null
    }
  }
  return console.error(`getMsgStr("table.word_3")[${arg}]`)
}






/*
CodvillTable
header 옵션에서 type:{input:"text"} 와 같이 지정시 input생성 및 값 입력시 getData()로 추출

Options
{
  class: <table>클래스 지정 | 기본값: "table table-dark table-hover m-0 scrollTable"
  header: 테이블 헤더 지정 Array<Object> | Example => [
    {
      name: 헤더명(text | HTML),
      key: 데이터와 매핑시킬 키값(string),
      ?type: 헤더 및 데이터 타입(check | {input:"input 타입",placeholder:"플레이스홀더"} |undefined),
      ?width: 헤더 너비 % (Number),
      ?class: <th> 클래스 지정(string) | 기본값 : "tac"
      ?maxLength: 표시할 최대 길이 지정
    }
  ],
  ?trClass: tbody > tr 클래스 지정(string) | 기본값 : ""
  ?tdClass: <td> 클래스 지정(string) | 기본값 : "tac"
  ?scroll: 스크롤 여부(boolean) | 기본값 : false ,
  ?clickTr: checkBox 영역 제외한 부분 클릭시 실행할 함수 (function)| arg: (event,rowData) | 기본값: undefined,
  ?no_data: 데이터 없을시 표시할 메시지(string) | 기본값: "데이터가 없습니다."
}

Methods

getChecked() => 현재 체크된 row data 리턴(Object)
setData(data) => [data]-Array 설정 및 교체 
getData() => 현재 데이터 가져오기
addRow(data) => 테이블 Row 추가, data는 Object 또는 Object[]
searchRow(query) => query: {type:"E 또는 L",val:"찾을 값"} (commDao와 유사) | query와 일치하는 Row 리스트 리턴
delRow(query) => query: {type:"E 또는 L",val:"찾을 값"} (commDao와 유사) | query와 일치하는 Row 삭제
*/
class CodvillTable{
  /**
   * 
   * @param {String|Element} el 엘리먼트 ID값 또는 Element 객체
   * @param {Array<Object>} tData 데이터 리스트
   * @param {Object} opt 테이블 옵션
   * @returns 
   */
  constructor(el,tData,opt) {
	
    /**@private */
    this.data = [];
    this.eventList = ["data-change","header-change","row-add","row-del"];
    try {
      if (typeof el === 'string') {
        this.target = document.getElementById(el);
      }else if(el instanceof HTMLElement || el instanceof Node || el instanceof Element){
        this.target = el;
      }
      if (!this.target) throw new TypeError(`[${el}] - 해당 Element를 찾을 수 없습니다. 첫번째 파라미터는 Element ID 또는 Element입니다.`)
    } catch (error) {
      return console.error(error)
    }
    if (!(this.target instanceof HTMLTableElement)) console.error(getMsgStr("table.word_4"))
    try {
      if (!Array.isArray(tData)) {
        throw new TypeError(getMsgStr("table.word_5"))
      }
      
      this.data = tData
    } catch (error) {
      return console.error(error)
    }

    if (this.getInstance(this.target)) {
      CodvillTableInstances = CodvillTableInstances.filter(e=>e.id !== this.target.id);
      console.warn(getMsgStr("table.word_6"),this.target);
    }
    this.eventBus = new EventBus();
    //옵션 설정
    this.option = opt

    if (this.option.scroll) {
      resetScroll(this.target.id)
    }
    this.target.innerHTML = "";
    this.uuid = this.genUUID();
    if (!this.target.id) this.target.id = `codTbl_${this.uuid}`



    //클래스 설정(opt.class)
    this.target.classList.remove(...this.target.classList);
    if (opt.class){
      const cl = opt.class.split(" ");
      if(cl.length > 0)this.target.classList.add(...cl);
    }else{
      this.target.classList.add("table","table-dark","table-hover","m-0","scrollTable");
    }

    //헤더 설정 (opt.header)
    this.setHeader(this.option.header)
    this.setData(this.data);

    if (this.option.scroll) {
      setScroll(this.target.id)
    }


    const instanceSave = {
      id:this.target.id,
      elem:this.target,
      instance: this
    }
    CodvillTableInstances.push(instanceSave);
  }

  /**
   * 
   * @param {string|Node} arg ID또는 Element
   * @returns {CodvillTable | null}
   */
  getInstance(arg){
    if (typeof arg === 'string') {
      const findId = arg.startsWith("#") ? arg.slice(1) : arg;
      const targetInstance = CodvillTableInstances.find((e)=> e.id === findId);
      
      if (targetInstance) {
        if (!targetInstance.elem.isConnected) {
          CodvillTableInstances = CodvillTableInstances.filter((e)=> e.id !== findId)
        }
        return targetInstance.instance || null
      }
    }else{
      const targetInstance = CodvillTableInstances.find((e)=> e.elem.isEqualNode(arg));
      if (targetInstance) {
        if (!targetInstance.elem.isConnected) {
          CodvillTableInstances = CodvillTableInstances.filter((e)=> !e.elem.isEqualNode(arg))
        }
        return targetInstance.instance || null
      }
    }
    return null;
  }

  getData(){
    return this.data;
  }

  /**
   * 헤더 설정
   * @param {Array<Object>} headerOpt 헤더 옵션
   */
  setHeader(headerOpt){
    let findThead = this.target.querySelector("thead");
    if (!findThead) {
      const newtheader = document.createElement("thead")
      this.target.append(newtheader)
      findThead = newtheader;
    }
    const theader = findThead
    if(!theader.classList.contains("thead-dark"))theader.classList.add("thead-dark");
    theader.innerHTML = "";
    const tr = document.createElement("tr");
    if(headerOpt){
      const thdata = headerOpt;
      this.header = thdata;
      for (const thd of thdata) {
        const th = document.createElement("th");
        //헤더 너비 설정 (opt.header > ?width)
        if (thd.width) th.width = `${thd.width}%`
        //헤더 클래스 설정 (opt.header > ?class)
        if (thd.class) {
          th.classList.add(...thd.class.split(" "));
        } else {
          th.classList.add("tac");
        }
        if (thd.name instanceof Element) {
          th.append(thd.name.cloneNode(true));
        }else{
          th.innerHTML = thd.name || thd.name === 0 ? thd.name : "";
        }
        //헤더 타입 설정 및 데이터 입력 (opt.header > ?type | opt.header > name) 
        if (thd.type) {
          if (typeof thd.type === 'string') {
            if (thd.type === 'check') {
              th.innerHTML = "";
              const innerdiv = document.createElement("div")
              const chkBox = document.createElement("input");
              const chkLabel = document.createElement("label")
              innerdiv.classList.add("checkbox");
              chkBox.type = "checkbox";
              chkBox.id = `chkAll_${this.uuid}`;
              chkLabel.setAttribute("for",chkBox.id);
              chkBox.onclick = (event)=>{
                const chks = document.getElementsByName(`chk_${this.uuid}`);
                if (chks.length !== this.data.length) {
                  throw new Error(getMsgStr("table.word_7"))
                }
                //전체 체크 감지
                if (event.target.checked) {
                  for (const c of chks) {
                    c.checked = true;
                  }
                  for (const row of this.data) {
                    row.checked = true;
                  }
                }else{
                  for (const c of chks) {
                    c.checked = false;
                  }
                  for (const row of this.data) {
                    row.checked = false;
                  }
                }
              }
              innerdiv.append(chkBox,chkLabel);
              th.append(innerdiv);
            }
          }else{// 커스텀 타입

          }
        }else{ //타입이 없으면
          // if (thd.name === null || thd.name === undefined) {
          //   throw new Error(`[header] 옵션에 [name] 값이 필요합니다. - (${JSON.stringify(thd)})`)
          // }
          // th.innerHTML = thd.name;
        }
        tr.append(th);
      }
    }else{ //if(opt.header)
      console.warn(getMsgStr("table.word_8"))
      this.header = []
      for (const key of Object.keys(this.data[0])) {
        const obj = {
          name: key,
          key: key,
          show: true
        }
        const th = document.createElement("th");
        th.innerHTML = key;
        tr.append(th);
        this.header.push(obj);
      }
    }
    theader.append(tr);
    this.target.append(theader);
  }

  /**
   * 데이터 설정
   * @param {Array<Object>} data 테이블 데이터
   */
  setData(data){
    let findCheckAll = this.target.querySelector('thead input[type="checkbox"]')
    if(findCheckAll) findCheckAll.checked = false;
    let findTbody = this.target.querySelector('tbody')
    if (!findTbody) {
      const newTbody = document.createElement('tbody');
      this.target.append(newTbody)
      findTbody = newTbody;
    }
    /**@type {HTMLTableSectionElement} */
    const this_tbody = findTbody;
    this_tbody.innerHTML = "";
    if (!data || data.length < 1) {
      const newTr = document.createElement("tr");
      if (this.option.trClass) {
        newTr.classList.add(...this.option.trClass.split(" "));
      }
      const newTd = document.createElement("td");
      if (this.option.tdClass) {
        newTd.classList.add(...this.option.tdClass.split(" "));
      }else{
        newTd.classList.add("tac");
      }
      newTd.colSpan = this.header.length;
      newTd.innerText = this.option.no_data ? this.option.no_data : getMsgStr("message.no_data");
      newTr.append(newTd);
      this_tbody.append(newTr);
      this.data = [];
      this.eventBus.dispatch("data-change");
      return
    }
    this.data = data;
    this.eventBus.dispatch("data-change");
    for (const row of data) { //tr 1개씩
      const newTr = document.createElement("tr");
      if (this.option.trClass) {
        newTr.classList.add(...this.option.trClass.split(" "));
      }
      for (const head of this.header) { //td 1개씩
        if(head.show === 'false') continue;
        const newTd = document.createElement("td");

        this.option.tdClass && newTd.classList.add(...this.option.tdClass.split(" "));
        head.tdClass && newTd.classList.add(...head.tdClass.split(" "));
        newTd.classList.length < 1 && newTd.classList.add("tac");

        const key = head.key;
        if (!key) {
          throw new Error(getMsgStr("table.word_9")+`- (${JSON.stringify(head)})`)
        
        }
        const width = head.width;
        if (width) {
          newTd.width = `${width}%`;
        }

        const type = head.type;
        if (type) {
          if (type === 'check') { //체크박스 생성
            const chkUUID = this.genUUID();
            const innerdiv = document.createElement("div");
            innerdiv.classList.add("checkbox");
            const chkBox = document.createElement("input");
            chkBox.type = "checkbox"
            chkBox.id = `chkFor_${chkUUID}`;
            chkBox.name = `chk_${this.uuid}`;
            chkBox.value = row[head.key];
            chkBox.onclick = (event)=>{
              const chks = document.getElementsByName(`chk_${this.uuid}`);
              if (chks.length !== this.data.length) {
                throw new Error(getMsgStr("table.word_7"))
              }
              //전체 체크 감지
              let checked = 0;
              for (const c of chks) {
                if (c.checked) checked++;
              }
              const chkAll = document.getElementById(`chkAll_${this.uuid}`)
              if (checked === chks.length){
                chkAll.checked = true;
              }else{
                chkAll.checked = false;
              }
              if(event.target.checked){
                row.checked = true;
              }else{
                row.checked = false;
              }
            }
            const chkLabel = document.createElement("label");
            chkLabel.setAttribute("for",chkBox.id);
            innerdiv.append(chkBox,chkLabel);
            newTd.append(innerdiv);
          }else if (type.input) {
            const newInput = document.createElement("input");
            const this_type = type.input || "text";
            newInput.type = this_type;
            type.input.class && newInput.classList.add(...type.input.class.split(" "))
            if (this_type === "checkbox") {
              const newLabel = document.createElement("label");
              const newUUID = this.genUUID();
              newLabel.setAttribute("for",newUUID);
              newInput.id = newUUID;
              const newChk = document.createElement("div")
              type.chkDivClass && newChk.classList.add(...type.chkDivClass.split(" "))
              newChk.classList.add("checkbox");
              newInput.checked = row[head.key] ? true : false;
              newChk.append(newInput,newLabel);
              newTd.append(newChk);
              row[head.key] = newInput.checked
            }else if (this_type === 'text') {
              newInput.classList.add("form-control");
              newInput.value = row[head.key];
              if (type.placeholder) newInput.placeholder = type.placeholder;
              newTd.append(newInput);
              row[head.key] = row[head.key]
            }else if (this_type === 'textarea'){
              const newTextArea = document.createElement("textarea");
              newTextArea.classList.add("form-control");
              newTextArea.value = row[head.key]
              newTextArea.cols = type.cols || 3;
              if (type.placeholder) newTextArea.placeholder = type.placeholder;
              newTextArea.onclick = (event) =>{
                event.stopPropagation();
              }
              newTextArea.oninput = (event)=>{
                const this_el = event.target
                row[head.key] = this_el.value;
                this.eventBus.dispatch("data-change");
              }
              newTd.append(newTextArea);
              row[head.key] = row[head.key]
            }
            newInput.onclick = (event) =>{
              event.stopPropagation();
            }
            newInput.oninput = (event)=>{
              const this_el = event.target
              this.eventBus.dispatch("data-change");
              if (this_type === 'checkbox') {
                row[head.key] = this_el.checked ? true : false;
              }else{
                row[head.key] = this_el.value;
              }
              type.oninput && type.oninput(event,row,head);
            }
            
          }else if(type === 'date'){
            const content = String((row[head.key] || row[head.key] === 0) ? row[head.key] : "");
            if (content) {
              newTd.innerHTML = dateFormat(row[head.key],row[head.key].length);
            }else{
              newTd.innerHTML = content;
            }
            this.setClickEvent(newTd,row);
          }
        }else{
          this.setClickEvent(newTd,row);
          let content = row[head.key];
          if (content instanceof Element) {
            newTd.append(content.cloneNode(true));
          }else{
            if ((head.maxLength || head.maxLength === 0) && typeof head.maxLength === 'number' && (content || content === 0) && head.maxLength > 0 && content.length > head.maxLength) {
              content = content.slice(0,head.maxLength) + "..."
            }
            newTd.innerHTML = (content || content === 0) ? content : "";
          }
        }
        newTr.append(newTd);
      }
      this_tbody.append(newTr);
    }
    
  }

  /**
   * 열 추가
   * @param {Object|Object[]} rowData 
   */
  addRow(rowData){
    const temp = [];
    Array.isArray(rowData) ? temp.push(...this.data,...rowData) : temp.push(...this.data,rowData)
    this.setData(temp);
  }

  /**
   * Row 검색
   * @param {Object} query 쿼리 - CommDAO 방식과 동일, type(E,L) - val
   * @returns {Array<Object>} 조건에 맞는 Row Array 리턴
   */
  searchRow(query){
    if (!query instanceof Object || typeof query !== 'object') {
      throw new Error(getMsgStr("table.word_10"))
    }
    let found = [];
    found.push(...this.data);
    for (const ent of Object.entries(query)) {
      const sType = ent[1].type;
      if (sType === 'E') {
        found = found.filter(e=>e[ent[0]] === ent[1].val)
      }else if (sType === 'L') {
        found = found.filter(e=>String(e[ent[0]]).includes(ent[1].val) )
      }else{
        throw new Error(getMsgStr("table.word_11"))
      }
    }
    return found
  }

  /**
   * 조건에 맞는 Row 삭제
   * @param {Object | number} query 쿼리 - CommDAO 방식과 동일, type(E,L) - val
   */
  delRow(query){
    // if (!query instanceof Object || typeof query !== 'object') {
    //   throw new Error("쿼리는 오브젝트 타입입니다.")
    // }
    if (typeof query === 'number') {
      let tempData = [];
      tempData.push(...this.data);
      tempData.splice(query,1);
      this.setData(tempData);
    }else{
      const delList = this.searchRow(query);
      if (delList.length < 1) {
        throw new Error(getMsgStr("table.word_12"))
      }
      let delObj = [];
      for (const r of delList) {
        delObj.push(JSON.stringify(r));
      }
      const tempData = this.data.filter(e=>!delObj.includes(JSON.stringify(e)));
      this.setData(tempData)
    }
  }

  on(key,callback){
    
    if (!this.eventList.includes(key)) {
      throw new Error(key,getMsgStr("table.word_13"))
    }
    this.eventBus.on(key,callback);
  }

  off(key,callback){
    if (!this.eventList.includes(key)) {
      throw new Error(key,getMsgStr("table.word_13"))
    }
    this.eventBus.off(key,callback);
  }

  offAll(key){
    if (!this.eventList.includes(key)) {
      throw new Error(key,getMsgStr("table.word_13"))
    }
    this.eventBus.offAll(key);
  }
  /**
   * 
   * @returns {Object} 체크된 Row Data
   */
  getChecked(){
    return this.data.filter(e=>e.checked===true)
  }

  /**
   * 고유 ID생성용
   * @returns {string} uuid
   */
  genUUID(){
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
  /**
   * 
   * @param {HTMLElement} elem 
   */
  setClickEvent(elem,...callback){
    if (this.option.clickTr) {
      elem.style.cursor = "pointer";
      elem.onclick = (e)=>{
        const thisTr = e.target.parentElement
        const trList = this.target.querySelectorAll("tbody tr");
        for (const tr of trList) {
          if (tr.isSameNode(thisTr)) {
            if(!tr.classList.contains("click")) tr.classList.add("click");
          }else{
            if (tr.classList.contains("click"))tr.classList.remove("click")
          }
        }
        if (typeof this.option.clickTr === 'function') {
          this.option.clickTr(e,...callback);
        }
      }
    }
  }
  destroy() {
    CodvillTableInstances.splice(CodvillTableInstances.findIndex(v=>v.elem.isSameNode(this.target)))
  }
}

function setClickEvent(params) {
  
}

document.addEventListener("DOMContentLoaded",()=>{
  const observer = new MutationObserver((mu,obs)=>{
    for (const m of mu) {
      m.target.querySelector("thead")
    }
  });
  observer.observe(document.body,{
    attributes:true,
    attributeFilter:[
      "data-scrollTbody"
    ]
  })
})