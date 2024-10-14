<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.Map" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- user_id=33, user_login_id=sj, user_name=김수진, user_mail=su@d.com, user_tel=010-1234-1234, user_auth=0, user_use=n, user_lock_cnt=0 -->
<%
  Map<String, Object> userInfo = (Map<String, Object>)session.getAttribute("userInfo");

  String id = "";
  String name = "";
  int auth = 0;

  if(userInfo != null) {
    id = userInfo.get("user_id").toString();
    name = userInfo.get("user_name").toString();
    auth = Integer.parseInt(userInfo.get("user_auth").toString());
  }

  request.setAttribute("id", id);
  request.setAttribute("name", name);
  request.setAttribute("auth", auth);


%>

<div class="header_wrap">
	<div class="top_logo">Home</div>
	<!-- header_box -->
		<div class="header_box">
			<div class="header_inbox">
        <!-- 메뉴접속 -->
				<div class="header_con">
					<ul id="main_menu" class="gnb">
						<li>
							<a href="${pageContext.request.contextPath}/board/"  id="menu_board" class="nav-link px-2"><span>게시판</span></a>
							
						</li>
						<li>
							<a href="${pageContext.request.contextPath}/user/"  id="menu_board" class="nav-link px-2"><span>유저관리</span></a>
							
						</li>
						<li>
							<a href="${pageContext.request.contextPath}/group/"  id="menu_board" class="nav-link px-2"><span>그룹관리</span></a>
							
						</li>
					</ul>
				</div>
        <!-- 설정 -->
        <div class="side_menu">
          <div class="dropdown_menu cog_area" style="width: 350px; ">
            
            <ul class="cog_box">
              <li onclick="addFormM()">
                <p class="img_02"></p>
                <p>구성</p>
              </li>
              <li onclick="addFormC()">
                <p class="img_03"></p>
                <p>콘텐츠</p>
              </li>
              <li onclick="addCategory()">
                <p class="img_04"></p>
                <p>카테고리</p>
              </li>
              <li class="on" onclick="javascript:editModeStatus()">
                <p class="img_05"></p>
                <p>편집모드</p>
              </li>
            </ul>

            
            <div class="btn_area mt10 mb20">
              <button type="button" class="btn btn-secondary fr" onclick="showUserMenu();"><i class="fa fa-close"></i> 닫기</button>
            </div>
          </div>
          <ul>
            <li class="cog_menu" onclick="showUserMenu();"><i class="fa fa-cog"></i></li>
            <li onclick="location.href='${pageContext.request.contextPath}/logout/'"><i class="fa fa-power-off"></i></li>
            
          </ul>
        </div>

			</div>
		</div>
	<!-- // header_box -->
	<div class="bg_menu"></div>

</div>

  
<script>
  function showUserMenu() {
    $('.dropdown_menu').toggle();
  }

    
</script>