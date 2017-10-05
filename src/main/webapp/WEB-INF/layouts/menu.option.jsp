<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<li id="${param.id}" style="padding-left: ${param.level * 10}px"
  <c:if test="${not empty option.options}">
    data-toggle="collapse" data-target="#${param.id}-options"
  </c:if>
  <c:if test="${empty option.options and module == param.id}">
    class="active"
  </c:if>
  >
  <a
    <c:if test="${empty option.options}">
      href="<c:url value="/modules/${param.id}.do" />"
    </c:if>
    <c:if test="${not empty option.options}">
      href="javascript:void(0)"
    </c:if>
    >
    <i class="fa fa-${option.icon} fa-lg"></i> ${option.name}
    <c:if test="${not empty option.options}">
      <span class="arrow"></span>
    </c:if>
  </a>
</li>
<c:if test="${not empty option.options}">
  <ul id="${param.id}-options" class="sub-menu collapse">
    <c:forEach var="menuOption" items="${option.options}">
      <c:set var="option" scope="request" value="${menuOption}" />
      <jsp:include page="/WEB-INF/layouts/menu.option.jsp">
        <jsp:param name="id" value="${param.id}_${option.code}" />
        <jsp:param name="level" value="${param.level + 1}" />
      </jsp:include>
    </c:forEach>
  </ul>
</c:if>