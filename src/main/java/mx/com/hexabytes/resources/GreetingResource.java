package mx.com.hexabytes.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author rherrera
 */
@Path("greeting")
public class GreetingResource {

    @GET
    public Response greet() {
        return Response.ok("Hello World").build();
    }

}