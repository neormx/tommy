<%--
    Document   : missing
    Author     : rherrera
--%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="message">
  <tiles:putAttribute name="message.title" value="Resource not found." cascade="true" />
  <tiles:putAttribute name="message.title.text.class" value="text-warning" cascade="true" />
  <tiles:putAttribute name="message.title.icon.class" value="fa-exclamation-triangle" cascade="true" />
  <tiles:putAttribute name="message.content" value="We are sorry, but there is no resource at this address." cascade="true" />
</tiles:insertDefinition>