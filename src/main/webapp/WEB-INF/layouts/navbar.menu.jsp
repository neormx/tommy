<%--
    Document   : navbar
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<tiles:importAttribute name="navbar.menu.options" toName="options" ignore="true" />
<ul id="nav-menu" class="nav navbar-nav navbar-right">
  <c:forEach var="option" items="${options}">
    <li><a href="${option.code}">${option.name}</a></li>
  </c:forEach>
  <c:if test="${pageContext.request.userPrincipal != null}">
    <li class="dropdown">
      <a href="javascript:void(0)" class="dropdown-toggle"
         role="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
        <i class="fa fa-user" aria-hidden="true"></i>
        ${pageContext.request.userPrincipal.name}
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <!-- li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
        <li role="separator" class="divider"></li  -->
        <li><a href="<c:url value="/logout.do" />">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            Logout</a>
        </li>
      </ul>
    </li>
  </c:if>
</ul>