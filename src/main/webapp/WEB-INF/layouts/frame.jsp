<%--
    Document   : frame
    Author     : rherrera
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="author" content="rherrera">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="<c:url value="/img/favicon.ico" />">
    <tiles:importAttribute name="title" ignore="true" />
    <tiles:importAttribute name="module" ignore="true" />
    <tiles:importAttribute name="styles" ignore="true" />
    <tiles:importAttribute name="scripts" ignore="true" />
    <title><c:out value="${title}">Company</c:out></title>
    <link rel="stylesheet" href="<c:url value="/css/notify.css" />" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <c:forEach var="style" items="${styles}">
      <link rel="stylesheet" href="<c:url value="${style}" />" />
    </c:forEach>
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body ng-app="${module}" ui-i18n="{{'en'}}"
        cg-busy="{promise : busy, message : 'Loading...'}">
    <tiles:insertAttribute name="header" />
    <tiles:insertAttribute name="content" />
    <div class="container">
      <div class="row"><div class="col-md-12">
        <hr /><footer><p>&copy; 2017 Company.</p></footer>
      </div></div>
    </div>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <c:forEach var="script" items="${scripts}">
      <script src="<c:url value="${script}" />"></script>
    </c:forEach>
  </body>
</html>