package mx.com.hexabytes.model;

/**
 * An activable object. An object with an <code>active</code> property.
 * @author rherrera
 * @since 1.0
 */
public interface Activable {
    /**
     * Determines whether this instance is active.
     * @return <code>true</code> if this instance is active; <code>false</code>
     * otherwise.
     */
    boolean isActive();

    /**
     * Sets the active status of this instance.
     * @param active current active status.
     */
    void setActive(boolean active);
}