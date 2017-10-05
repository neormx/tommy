<%--
    Document   : navbar
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<tiles:importAttribute name="navbar.toogle.left.target" ignore="true" toName="leftToogleTarget" />
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"
              data-toggle="collapse" data-target="#navbar"
              aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <c:if test="${not empty leftToogleTarget}">
        <button type="button" class="navbar-toggle collapsed" style="float:left;left:15px"
                data-toggle="collapse" data-target="${leftToogleTarget}"
                aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </c:if>
      <a class="navbar-brand" href="<c:url value="/modules/menu.do" />">
        <img class="company" src="<c:url value="/img/company.png" />" />
        <span id="company">Company</span>
      </a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <tiles:insertAttribute name="navbar.content" />
    </div>
  </div>
</nav>