<%--
    Document   : login
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<tiles:insertDefinition name="message">
  <tiles:putAttribute name="message.title" value="Login." cascade="true" />
  <tiles:putAttribute name="message.title.text.class" value="text-primary" cascade="true" />
  <tiles:putAttribute name="message.title.icon.class" value="fa-unlock" cascade="true" />
  <tiles:putAttribute name="message.content" cascade="true">
    <div class="container">
      <c:if test="${param.failed}">
        <div class="row"><div class="col-md-6">
          <div class="alert alert-warning">
            <strong>Attention:</strong>
            Username or password invalid.
          </div>
        </div></div>
      </c:if>
      <div class="row"><div class="col-md-3">
        <form name="login" class="login" method="post" action="j_security_check">
          <div class="form-group" ng-class="{'has-error':login.j_username.$invalid}">
            <label class="control-label" for="usr">User</label>
            <input id="usr" type="text" class="form-control appGetFocus"
              name="j_username" placeholder="User" ng-model="user"
              ng-required="true" />
          </div>
          <div class="form-group" ng-class="{'has-error':login.j_password.$invalid}">
            <label class="control-label" for="pwd">Password</label>
            <input id="pwd" type="password" class="form-control" name="j_password"
              placeholder="Password" ng-model="pass" ng-required="true" />
          </div>
          <input type="submit" class="btn btn-default" value="Submit" />
        </form>
      </div></div>
    </div>
  </tiles:putAttribute>
  <tiles:putListAttribute name="scripts">
    <tiles:addAttribute>https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js</tiles:addAttribute>
    <tiles:addAttribute>/js/app.js</tiles:addAttribute>
  </tiles:putListAttribute>
</tiles:insertDefinition>