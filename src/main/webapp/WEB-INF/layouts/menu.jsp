<%--
    Document   : menu
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<div class="nav-side-menu"><div class="brand">&nbsp;</div>
  <div class="menu-list">
    <ul id="menu-content" class="menu-content collapse out">
      <c:forEach var="menuOption" items="${menu}">
        <c:set var="option" scope="request" value="${menuOption}" />
        <jsp:include page="/WEB-INF/layouts/menu.option.jsp">
          <jsp:param name="id" value="${option.code}" />
          <jsp:param name="level" value="0" />
        </jsp:include>
      </c:forEach>
    </ul>
</div></div>
<div class="sidebar-content">
  <div class="container" ui-view></div>
</div>