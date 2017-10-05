package mx.com.hexabytes.web;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Manages application main requests.
 * @author rherrera
 * @since 1.0
 */
@Controller
public class MainController {
    /**
     * The path to redirect to when users logout.
     */
    @Value("${core.logout.url}")
    private String logoutRedirect;
    /**
     * Default module to load when users just login.
     */
    @Value("${module.default}")
    private String defaultModule;
    /**
     * This application menu.
     */
    @Resource
    private List<MenuOption> applicationMenu;
    /**
     * Loads a module mapping argument to a tiles view definition.
     * @param request HTTP request.
     * @param module name of the module to be loaded.
     * @return tiles view definition name matching module's name.
     */
    @RequestMapping("/modules/{module}")
    public String loadModule(HttpServletRequest request,
            @PathVariable(name="module") String module) {
        request.setAttribute("menu", applicationMenu);
        request.setAttribute("module", module);
        return module;
    }
    /**
     * Loads this application menu screen along with the default module.
     * @param request HTTP request.
     * @return <code>defaultModule</code> name.
     */
    @RequestMapping("/modules/menu")
    public String menu(HttpServletRequest request) {
        return loadModule(request, defaultModule);
    }
    /**
     * Finishes HTTP session and redirects to whatever URL injected in
     * <code>logoutRedirect</code> property.
     * @param request HTTP servlet request.
     * @param response HTTP servlet response.
     * @return redirect command to <code>logoutRedirect</code> URL.
     */
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request,
            HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setHeader("Cache-Control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        return "redirect:" + logoutRedirect;
    }

}