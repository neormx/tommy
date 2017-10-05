package mx.com.hexabytes.rest;

import java.io.IOException;
import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mx.com.hexabytes.services.GreetingBean;

/**
 *
 * @author rherrera
 */
@WebServlet(urlPatterns = "/greeting.do")
public class GreetingServlet extends HttpServlet {

    @Inject
    private GreetingBean greeting;

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        response.getWriter().print(greeting.getGreeting());
    }

}