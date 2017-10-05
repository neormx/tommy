<%--
    Document   : message
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<tiles:importAttribute name="message.title.icon.class" toName="iconClass" ignore="true" />
<tiles:importAttribute name="message.title.text.class" toName="titleClass" ignore="true" />
<div class="jumbotron">
  <div class="container ${titleClass}">
    <h1><i class="fa ${iconClass}" aria-hidden="true"></i>
      <tiles:insertAttribute name="message.title" />
    </h1>
  </div>
</div>
<div class="container">
  <div class="row"><div class="col-md-12">
    <tiles:insertAttribute name="message.content" />
  </div></div>
</div>