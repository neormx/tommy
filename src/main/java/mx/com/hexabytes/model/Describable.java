package mx.com.hexabytes.model;

/**
 * An object with a <code>description</code> property.
 * @author rherrera
 * @since 1.0
 */
public interface Describable extends Described {
    /**
     * Sets this object's description. 
     * @param description new description for this object. 
     */
    void setDescription(String description);
}