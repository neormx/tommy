package mx.com.hexabytes.resources;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import mx.com.hexabytes.services.GreetingBean;

/**
 *
 * @author rherrera
 */
@Path("greeting")
public class GreetingResource {

    @Inject
    private GreetingBean greeting;

    @GET
    public Response greet() {
        return Response.ok(greeting.getGreeting()).build();
    }

}