<%--
    Document   : index
    Author     : rherrera
--%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<tiles:insertDefinition name="message">
  <tiles:putAttribute name="message.title" value="Welcome!" cascade="true" />
  <tiles:putAttribute name="message.title.text.class" value="text-primary" cascade="true" />
  <tiles:putAttribute name="message.title.icon.class" value="fa-universal-access" cascade="true" />
  <tiles:putAttribute name="message.content" cascade="true">
    <div class="container text-center">
      <a class="btn btn-primary btn-lg" href="modules/menu.do" role="button">
        Login
      </a>
    </div><br />
    <div class="container">Hello world!</div>
  </tiles:putAttribute>
</tiles:insertDefinition>