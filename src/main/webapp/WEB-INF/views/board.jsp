<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

        <%@include file="include/link_js.jsp" %>


            <style>
                
                
                

            </style>
            <!-- <link rel="stylesheet" href="/css/main.css"> -->
    </head>

    <body>
        <div class="top_bar">
            <%@include file="include/header.jsp" %>
		</div>
		<div class="ui-layout-center">
            <div class="container-fluid">
                <hr class="top_re">
                    <div class="breadcrumb">
                        <div class="breadcrumb-item">
                            <i class="fa fa-home"></i> /
                        </div> 
                        게시판
                    </div>
                <hr>
                <!-- 검색 -->
                <div class="row">
                    <div class="col-12 mb10">
                        <div class="search-box">
                            <div class="row form_width_80">
                                <div class="col-1 border-right">
                                    <div class="search_title">검색 조건</div>
                                </div>
                                <div class="col-2">
                                    <div>
                                        <select id="searchType" class="form-control">
                                            <option value="board_title">제목</option>
                                            <option value="user_nickname">작성자</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div>
                                        <input id="search" type="text" class="form-control form_round" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-1">
                                    <div class="fr">
                                        <select id="limitPage" class="form-control">
                                            <option value="5">5개씩 보기</option>
                                            <option value="10">10개씩 보기</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <input type="hidden" id="s_group_cd">
                                    
                                    <div>
                                        <button class="btn btn-secondary mr-lg-4 fr" onclick="resetSearch();">
                                            <i class="fa fa-rotate-left"></i> 초기화
                                        </button>
                                        <button class="btn btn-primary ml fr" onclick="list(true);">
                                            <i class="fa fa-search"></i> 검색
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt10">
                    <div class="col">
                        <div class="card-box">
                            <div class="right_top"><i class="fa fa-window-restore"></i></div>
                            <h4 class="header-title"><i class="fa fa-list"></i>게시판 <span class="ml10" id="searchFilter"></span></h4>
                            <div class="mt10 text-left" style="height: 600px;">
                                <table class="scrollTbody table table-dark table-hover" id="tab">
                                    <thead>
                                        <tr>
                                            <th class="tac" width="10%" style="text-align: center">
                                                번호
                                            </th>
                                            <th class="tac" width="30%" style="text-align: center">
                                                제목
                                            </th>
                                            <th class="tac" width="10%" style="text-align: center">
                                                첨부파일
                                            </th>
                                            <th class="tac" width="20%" style="text-align: center">
                                                작성자
                                            </th>
                                            <th class="tac" style="text-align: center">
                                                조회수
                                            </th>
                                            <th class="tac"  style="text-align: center">
                                                날짜
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="scrollable-tbody">
                                        
                                    </tbody>
                                </table>
                                <div class="col-12 tac">
                                    <!-- 페이징 -->
                                    <div id="paging">

                                    </div>
    
    
                                    
                                    <div class="fr">
                                        
                                        <button
                                            data-bs-toggle="modal" data-bs-target="#modalUpsert"
                                            onclick="modalChange('insert')"
                                            class="btn btn-primary mt20" icon="ADD">
                                            <i class="fa fa-plus"></i> 게시글 작성
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>

        
		
        <div id="modalGet" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="full-width-modalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" >
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title" id="full-width-modalLabel">게시글 상세</h4>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="mt10">
                            <div class="item">
                                <input type="hidden" id="getId">
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">제목</label>
                                    <label class="col col-form-label" id="getTitle"></label>
                                </div>
                            
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">내용</label>
                                    <div class="col-sm-9">
                                        <div class="editorDiv" style="height: 300px;"></div>
                                    </div>
                                </div>
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">첨부 파일</label>
                                    <label class="col col-form-label" id="getFiles"></label>
                                </div>
                                
                                
                            </div><!--//item-->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary waves-effect" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary waves-effect waves-light" 
                            data-bs-toggle="modal" data-bs-target="#modalUpsert"
                            onclick="modalChange('update')">수정</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="modalUpsert" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="full-width-modalLabel" aria-hidden="true" >
            <div class="modal-dialog modal-lg modal-dialog-centered" >
                <div class="modal-content" >
                    <div class="modal-header">
                        <h4 class="modal-title" id="usertTitle">게시글 등록</h4>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="mt10">
                            <div class="item">
                                <input type="hidden" id="id">
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">제목</label>
                                    <div class="col-sm-9" id="title">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">내용</label>
                                    <div class="col-sm-9">
                                        <div class="editorDiv" style="height: 300px;"></div>
                                    </div>
                                </div>
                                <div class="form-group form-setup row">
                                    <label class="col-3 col-form-label border-right">첨부 파일</label>
                                    <div class="col-sm-9">
                                        <div class="row">
                                            <div class="col-6 text-center border-right fileList">업로드 된 파일</div>
                                            <div class="col text-center">업로드 할 파일</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 text-center border-right fileList" id="uploadFileList"></div>
                                            <div class="col text-center" id="fileList"></div>
                                        </div>
                                        <div class="row">
                                            <input id="fileInput" type="file" multiple style="display: none;">
                                            <button id="fileBtn" type="button" class="btn btn-info" onclick="fileBtnSelect()">파일 선택</button>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div><!--//item-->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary waves-effect" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary waves-effect waves-light" onclick="upsert()">등록</button>
                    </div>
                </div>
            </div>
        </div>
        

        
        




        <script>

            //현재 페이지
            let pageCurrent = 1;
            //검색 저장
            let searchText = ""; //검색어 (페이지 이동시에 고정된 검색어를 가져와야됨)
            let searchType = ""; //검색어 (페이지 이동시에 고정된 검색어를 가져와야됨)

            //토스트 에디터 (등록, 수정시 내용을 가져올수있음)
            let textEditor = "";
            //파일arr (게시글 등록시 input태그의 선택된 파일을 여기에 넣고 upert() 요청시에 보낸다)
            let fileArr = []; 
            //삭제할파일 arr (modalChange() 에서 수정 모달에서 기존에 있던 파일을 삭제할경우 여기에 넣고 upert() 요청시에 보낸다) 
            let deletedFileIdArr = [];

            // 리스트 요청
            window.onload = function () {
                list(true);
            }

            function list(search) {

                //테이블 초기화
                $("#tab tbody").empty();
                //페이징 초기화
                $("#paging").empty();

                let param = {};

                
                

                //검색으로 리스트 불렀는지 확인
                if(search) {
                    pageCurrent = 1; //검색누를경우 1페이지로 이동
                    searchText = $("#search").val(); //검색어 저장
                    searchType = $("#searchType").val();//검색 타입 저장
                }

                //검색어표시
                if(searchText != "") {
                    let typeText = document.querySelector(`#searchType option[value = "\${ searchType}"]`).innerHTML
                    alert(typeText);
                    document.querySelector("#searchFilter").innerHTML =`검색조건[\${typeText} : \${searchText}]`;
                }else {
                    document.querySelector("#searchFilter").innerHTML ="";
                }

                //몇개씩 볼건지 선택
                const limitPage = $("#limitPage").val();

                param = {
                    offset: limitPage * (pageCurrent - 1), //현재 보고있는 페이지
                    listSize: limitPage, // 가져올 데이터의 개수
                    searchType: searchType,
                    search: searchText
                };

                $.ajax({
                    url: "/board/list",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    success: function (result) {
                        
                        if (result.data.length > 0) {
                            // alert("통신성공");
                            console.log(result);

                            const totalPage = Math.ceil(result.total / limitPage); //보여지는 총페이지
                            paging(pageCurrent, totalPage); //페이징 함수

                            //총 갯수 출력
                            $("#total").text("총:" + result.total + "개")
                            //리스트 출력
                            for (let i = 0; i < result.data.length; i++) {
                                // const index = i + 1 + param.offset;
                                const index = ((pageCurrent - 1) *limitPage) +1 + i; //번호메기기
                                const isFile = result.data[i].file_count > 0 ? '<i class="bi bi-file-arrow-down"></i>' : "-";
                                const list = "<tr>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + index + "</td>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + escapeHtml(result.data[i].board_title) + "</td>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + isFile  + "</td>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + result.data[i].user_nickname + "</td>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + result.data[i].board_view + "</td>" +
                                    "<td class='tac' data-bs-toggle='modal' data-bs-target='#modalGet' onclick='get(\"" + result.data[i].board_id + "\")'>" + result.data[i].board_date + "</td>" +
                                    "</tr>";
                                $("#tab tbody").append(list);
                            }

                        } else {
                            const msg = "<tr>" +
                                "<td colspan='6' style='text-align: center;'>게시글이 존재하지 않습니다</td>" +
                                "</tr>";
                            $("#tab tbody").append(msg);

                        }
                        
                    },
                    error: function (request, status, error) {
                        alert(request.responseText);
                    }
                });

            }

            //페이지 이동(보고싶은 페이지 ,총페이지)
            function changePage(number, totalPage) {
                if (number == 0 || number < 0) {
                    alert("첫번째 페이지입니다");
                    return;
                }

                if (number > totalPage) {
                    alert("마지막 페이지입니다");
                    return;
                }
                $("#search").val(searchText);
                pageCurrent = number;
                list();
            }

            // 5, 10개 씩 보기 변경 
            function changeLimitType() {
                $("#search").val("");
                searchText="";
                pageCurrent = 1;
                list();
            }

            //검색 초기화
            function resetSearch() {
                pageCurrent = 1;
                $("#searchType").prop('selectedIndex', 0);
                $("#limitPage").prop('selectedIndex', 0);
                $("#search").val("");
                searchTypeSelect="";
                searchText="";
                list();
            }

            //상세
            function get(id) {

                let param = {};

                param = {
                    board_id: id
                };

                $.ajax({
                    url: "/board/get",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    success: function (result) {
                        // alert("통신성공");
                        console.log(result);

                        if (result.data) {

                            const id = result.data.board_id;
                            const title = result.data.board_title;
                            const content = result.data.board_content;
                            const view = result.data.board_view+1;
                            const userId = result.data.user_id;
                            const userNickname = result.data.user_nickname;

                            $("#modalGet #getId").val(id);
                            $("#modalGet #getTitle").text(title);
                            $("#modalGet #getView").text(view);
                            $("#modalGet #getUserId").val(userId);
                            $("#modalGet #getNickname").text(userNickname);

                            // 읽기전용 토스트 에디터
                            editorCreate(true, content, 'Get'); //읽기전용, 내용
                            

                            const sessionUserId = "<%= id %>";
                            const sessionAuth = "<%= auth %>";
                            // console.log(userId + " " +sessionUserId);
                            //수정 삭제 관리 .. 관리자는 모두 가능
                            if (userId != sessionUserId && sessionAuth != 0) {
                                $("#modalGet .checkUser").hide();
                            } else {
                                $("#modalGet .checkUser").show();
                            }

                            //파일 리스트
                            $("#modalGet #getFiles").empty(); //초기화
                            $(document).off('click', '.deleteFile'); //남아있는 파일삭제 버튼이벤트 제거
                            $.each(result.files, function (index, value) {
                                const file = "<div class='getFile' data-value='" + value.file_id + "' style='cursor:pointer; display: flex; align-items: center;'>" + 
                                                "<span onclick=\"location.href='/board/fileDown/" + value.file_id +"'\">" + 
                                                value.file_name + "." + value.file_extension + 
                                                "</span>" +
                                                "<button class='deleteFile btn btn-outline-warning' style='display: none;'>삭제</button>" +
                                        "</div>";
                                $("#modalGet #getFiles").append(file);
                            });

                            list();
                        } else {
                            alert("게시글이 존재하지 않습니다");
                        }
                    },
                    error: function (request, status, error) {
                        $("#modalGet").modal('hide');
                        alert(request.responseText);
                    }
                });
            }


            //텍스트 에디터 생성(토스트에디터)
            function editorCreate(isViewer, contentText, seletor) { //읽기전용, 내용, 들어갈곳
                const selectId = "#modal" + seletor; //들어갈곳 Id
                $(selectId +' .editorDiv').empty(); //초기화
                textEditor = new toastui.Editor.factory({
                    el: document.querySelector(selectId +' .editorDiv'), // 에디터를 적용할 요소 (컨테이너)
                    height: '400px',                        // 에디터 영역의 높이 값 (OOOpx || auto)
                    initialEditType: 'wysiwyg',
                    initialValue: contentText,
                    viewer: isViewer,
                    theme: 'dark',
                    customHTMLRenderer: {
                        text(node) {
                        return [
                            {
                            type: 'openTag',
                            tagName: 'span',
                            outerNewLine: true,
                            attributes: { style: 'color: #cacaca; font-size: 14px;' }
                            },
                            { type: 'text', content: node.literal },
                            { type: 'closeTag', tagName: 'span', outerNewLine: true }
                        ];
                        }
                    }
                });
            }
            

            //모달 등록, 수정 양식변경
            function modalChange(type) {

                //초기화
                $("#modalUpsert #id").val(""); //게시판 id
                $("#modalUpsert #title input").val("");
                $("#modalUpsert #files input").val("");
                // $("#modalUpsert #content").empty();
                $("#modalUpsert #uploadFileList").empty();
                $("#modalUpsert #fileList").empty();
                fileArr = [];


                //파일 선택 버튼 이벤트
                $('#fileInput').off('change').on('change', function() {
                    const files = $(this)[0].files;

                    //초기화
                    $('#fileList').empty();
                    //파일 배열에 추가
                    $.each(files, function(index, file) {
                        fileArr.push(file);
                    });
                    //파일 배열 출력
                    fileArrPrint();
                });


                if(type == "insert") {
                    //인서트
                    $("#modalUpsert #usertTitle").text("게시글 등록");

                    $("#modalUpsert .fileList").hide();
                    editorCreate(false, "", "Upsert");
                } else if(type == "update") {
                    //업데이트
                    $("#modalUpsert #usertTitle").text("게시글 수정");
                    //기존 파일 삭제 이벤트
                    deletedFileIdArr = []; //초기화
                    $(document).off('click', '.deleteFile').on('click', '.deleteFile', function() {
                        $(this).closest('div').remove();
                        let fileId = $(this).closest('div').data('value');
                        deletedFileIdArr.push(fileId);
                        console.log(deletedFileIdArr);
                    });

                    $("#modalUpsert .fileList").show();

                    $("#modalUpsert #id").val($("#modalGet #getId").val());
                    $("#modalUpsert #title input").val($("#modalGet #getTitle").text());
                    $("#modalUpsert #uploadFileList").html($("#modalGet #getFiles").html());
                    $(".getFile button").show();
                    const content=$("#modalGet .toastui-editor-contents").html();
                    // console.log(content);
                    editorCreate(false, content, "Upsert");

                }

            }


            //파일버튼 클릭
            function fileBtnSelect() {
                $("#fileInput").click();
            }
            

            //fileArr 출력
            function fileArrPrint() {
                $('#fileList').empty();
                $.each(fileArr, function(index, file) {
                    const fileNameSize = file.name + ' (' + (file.size / 1024).toFixed(2) + ' KB)';
                    const fileDiv = $('<div></div>').text(fileNameSize);
                    
                    // 삭제 버튼 추가
                    const deleteButton = $('<button  class="btn btn-outline-warning"></button>').text('삭제').on('click', function() {
                        // 해당 파일을 배열에서 삭제
                        fileArr.splice(index, 1);
                        // 목록을 다시 출력
                        fileArrPrint();
                    });
                    
                    fileDiv.append(deleteButton);
                    $('#fileList').append(fileDiv);
                });
            }


            //인서트, 업데이트
            function upsert() {
                const sessionUserId = "<%= id %>";
                let url = "";//ajax통신 url

                const formData = new FormData(); //파일 전송시 필요
                let param = {};

                //내용추출
                const boardId = $("#modalUpsert #id").val();
                const title = $("#modalUpsert #title input").val().trim();
                const content = textEditor.getMarkdown();
                // console.log(content);


                //파일 추출
                const maxSize = 100 * 1024 * 1024; // 100MB
                const totalMaxSize = 500 * 1024 * 1024; // 500MB
            
                let totalFileSize = 0;
                //파일 첨부 사이즈 제한
                for (let i = 0; i < fileArr.length; i++) {
                    if (fileArr[i].size > maxSize) {
                        alert("파일 사이즈가 100MB를 초과하는 파일이 포함되어 있습니다.");
                        return; // upsert 함수 전체를 종료
                    }else {
                        totalFileSize += fileArr[i].size;
                        if (totalFileSize > totalMaxSize) {
                            alert("총 파일 사이즈가 500MB를 초과합니다.");
                            return; // upsert 함수 전체를 종료
                        }
                    }
                    formData.append('files', fileArr[i]);
                }
                    

                //유효성 검사
                const bool = confirm("작성 하시겠습니까?");
                if (!bool) {
                    return;
                }
                
                // if (!/^\S{1,100}$/.test(title)) {
                //     alert("제목은 공백 불가, 10글자 까지입니다");
                //     return;
                // }

                if (!/\S{1,4000}/.test(content)) {
                    alert("내용은 공백 불가, 4천자 까지입니다")
                    return;
                }

                
                param = {
                    user_id: sessionUserId,
                    board_title: title,
                    board_content: content
                };

                //boardId 유무로 인서트 업데이트 구분
                if (boardId) {
                    url = "/board/update"
                    param.board_id = boardId;
                    param.file_id = deletedFileIdArr;
                    
                } else {
                    url = "/board/insert"
                }

                formData.append("param", JSON.stringify(param));

                $.ajax({
                    url: url,
                    type: "POST",
                    contentType: false, // FormData를 사용하기 때문에 false로 설정
                    processData: false, // FormData를 직렬화하지 않도록 false로 설정
                    enctype: 'multipart/form-data',
                    data: formData,
                    success: function (result) {
                        console.log(result);
                        // if(result.msg) {
                        //     alert(result.msg);
                        // }
                        $("#modalUpsert").modal('hide');
                        list();
                        
                       
                    },
                    
                    error: function (request, status, error) {
                        $("#modalUpsert").modal('hide');
                        alert(request.responseText);
                        list();
                    }
                });

            }

            //게시글 삭제
            function del() {
                const bool = confirm("삭제 하시겠습니까?");

                if (!bool) {
                    return;
                }
                let param = {};
                //삭제할 파일데이터 추가
                // 모든 .getFile 요소를 선택
                const getFileElements = $('.getFile');

                // data-value 속성을 배열로 저장
                const dataValues = getFileElements.map(function() {
                    return $(this).data('value');
                }).get();

                // console.log(dataValues);
                

                param = {
                    board_id: $("#getId").val(),
                    files: dataValues
                };

                $.ajax({
                    url: "/board/del",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    success: function (result) {
                        console.log(result);
                        $("#modalGet").modal('hide');
                        list();

                    },
                    error: function (error) {
                        alert("서버에러" + error.status + " " + error.responseText);
                        //모든 모달창 닫기
                        $("#modalGet").modal('hide');
                        list();
                    }
                });
            }


        </script>
    </body>

    </html>