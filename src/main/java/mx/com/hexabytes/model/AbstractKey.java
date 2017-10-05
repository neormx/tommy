package mx.com.hexabytes.model;

/**
 * An abstract identifier with name property.
 * @author rherrera
 * @param <C> The type of the code property.
 * @since 1.0
 */
public abstract class AbstractKey<C extends Comparable>
        extends AbstractIdentifier<C> implements Nameable {

    /**
     * Convenient method to append this key name to a string.
     * @param key key instance to append.
     * @param sb string builder.
     * @throws NullPointerException if either {@code key} or {@code sb} are
     * {@code null}.
     */
    public static void appendKeyToString(AbstractKey<?> key, StringBuilder sb) {
        if (key != null) {
            sb.append(key.getName());
            sb.append(' ');
        }
    }

    /**
     * Name of this instance.
     */
    private String name;
    /**
     * Constructs an instance with given information.
     * @param name name of this instace.
     */
    protected AbstractKey(String name) {
        this.name = name;
    }
    /**
     * Constructs a default instance.
     */
    protected AbstractKey() {
        this(null);
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
     * Returns the string representation of this instance.
     * @return empty string if both, name and code properties, are
     * <code>null</code>; "name (code)" pattern otherwise.
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        if (name != null) {
            sb.append(name);
        }
        if (getCode() != null) {
            sb.append(" (");
            sb.append(super.toString());
            sb.append(')');
        }
        return sb.toString();
    }

}