<%--
    Document   : forbidden
    Author     : rherrera
--%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="message">
  <tiles:putAttribute name="message.title" value="Resources locked." cascade="true" />
  <tiles:putAttribute name="message.title.text.class" value="text-danger" cascade="true" />
  <tiles:putAttribute name="message.title.icon.class" value="fa-lock" cascade="true" />
  <tiles:putAttribute name="message.content" value="We are sorry, but you do not have access to this resource." cascade="true" />
</tiles:insertDefinition>