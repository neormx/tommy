<%--
    Document   : error
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page isErrorPage="true" import="org.slf4j.Logger, org.slf4j.LoggerFactory" %>
<%!
  private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(Exception.class);
%>
<%
    pageContext.setAttribute("exception", exception);
    LOG.error(exception.getMessage(), exception);
%>
<tiles:insertDefinition name="message">
  <tiles:putAttribute name="message.title" value="An error has occurred." cascade="true" />
  <tiles:putAttribute name="message.title.text.class" value="text-danger" cascade="true" />
  <tiles:putAttribute name="message.title.icon.class" value="fa-exclamation-triangle" cascade="true" />
  <tiles:putAttribute name="message.content" cascade="true">
    <p>We are sorry, but we could not process your request. Please try later.</p>
    <p id="serverException" class="hide">${exception}</p>
  </tiles:putAttribute>
</tiles:insertDefinition>