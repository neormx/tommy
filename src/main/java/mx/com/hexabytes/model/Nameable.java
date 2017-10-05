package mx.com.hexabytes.model;

/**
 * A nameable object. An object with a <code>name</code> property.
 * @author rherrera
 * @since 1.0
 */
public interface Nameable extends Named {
    /**
     * Sets the name for this instance.
     * @param name the name for this instance.
     */
    void setName(String name);
}