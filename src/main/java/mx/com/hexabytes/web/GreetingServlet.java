package mx.com.hexabytes.web;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author rherrera
 */
@WebServlet(urlPatterns = "/greeting.do")
public class GreetingServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        response.getWriter().print("Hello World");
    }

}