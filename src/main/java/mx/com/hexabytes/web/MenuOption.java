package mx.com.hexabytes.web;

import java.util.List;
import mx.com.hexabytes.model.AbstractIdentifier;
import mx.com.hexabytes.model.Nameable;

/**
 * A menu option entry.
 * @author rherrera
 * @since 1.0
 */
public class MenuOption extends AbstractIdentifier<String> implements Nameable {
    /**
     * This option code.
     */
    private String code;
    /**
     * This option name.
     */
    private String name;
    /**
     * This option icon.
     */
    private String icon;
    /**
     * This option suboptions.
     */
    private List<MenuOption> options;

    /**
     * Constructs an instance specifing code, name, icon and suboptions.
     * @param code code for this instance.
     * @param name name for this instance.
     * @param icon icon for this instance.
     * @param options suboptions for this instance.
     */
    public MenuOption(String code, String name, String icon,
            List<MenuOption> options) {
        this.code = code;
        this.name = name;
        this.icon = icon;
        this.options = options;
    }

    /**
     * Constructs an instance specifing code, name and icon.
     * @param code code for this instance.
     * @param name name for this instance.
     * @param icon icon for this instance.
     */
    public MenuOption(String code, String name, String icon) {
        this(code, name, icon, null);
    }

    /**
     * Constructs an instance specifing code and name.
     * @param code code for this instance.
     * @param name name for this instance.
     */
    public MenuOption(String code, String name) {
        this(code, name, null, null);
    }

    /**
     * Constructs default instance.
     */
    public MenuOption() {
        super();
    }

    @Override
    public String getCode() {
      return code;
    }

    @Override
    public void setCode(String code) {
      this.code = code;
    }

    @Override
    public String getName() {
      return name;
    }

    @Override
    public void setName(String name) {
      this.name = name;
    }

    /**
     * Gets this option icon reference.
     * @return the icon reference of this option.
     */
    public String getIcon() {
        return icon;
    }

    /**
     * Sets the icon reference of this option.
     * @param icon this option icon reference.
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * Gets the optional suboptions of this option.
     * @return <code>null</code> if this option does not have suboptions, their
     * reference otherwise.
     */
    public List<MenuOption> getOptions() {
        return options;
    }

    /**
     * Sets the optional suboptions of this option.
     * @param options suboptions of this option.
     */
    public void setOptions(List<MenuOption> options) {
        this.options = options;
    }

}