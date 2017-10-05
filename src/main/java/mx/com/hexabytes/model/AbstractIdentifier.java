package mx.com.hexabytes.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * An object with a <code>code</code> property which identifies unequivocally
 * the instance. This class delegates the behavior of the <code>equals</code>,
 * <code>hashCode</code> and <code>compareTo</code> methods to its
 * <code>code</code> property.
 * @param <C> The type of the code property.
 * @author rherrera
 * @since 1.0
 */
public abstract class AbstractIdentifier<C extends Comparable>
        implements Serializable, Cloneable, Comparable<Object> {
    /**
     * Serialization version id.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Gets this instance's code.
     * @return the code value.
     */
    public abstract C getCode();

    /**
     * Sets this instance's code.
     * @param code the new code value.
     */
    public abstract void setCode(C code);

    /**
     * Gets the hash code of this instance.
     * @return <code>0</code> if the <code>code</code> property is null, its
     * hash code otherwise.
     */
    @Override
    public int hashCode() {
        return Objects.hashCode(getCode());
    }

    /**
     * Determines whether some other object is "equal to" this one.
     * @param obj the reference object to which compare to.
     * @return <code>true</code> if both instances are of the same class and
     * the code property in both are also equals; <code>false</code> otherwise.
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        return Objects.equals(getCode(),((AbstractIdentifier<C>)obj).getCode());
    }

    /**
     * Returns the string representation of the code property.
     * @return the string <code>"null"</code> if the code property is
     * <code>null</code>; its string representation otherwise.
     */
    @Override
    public String toString() {
        return String.valueOf(getCode());
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    /**
     * Compares this instance with other <code>Code</code> for order based on
     * their <code>code</code> properties.
     * @param obj the second intance to compare to.
     * @return a negative integer, zero, or a positive integer as this object
     * is less than, equal to, or greater than the specified object.
     */
    @Override
    public int compareTo(Object obj) {
        C othersCode, thisCode = getCode();
        if (obj == null || !(obj instanceof AbstractIdentifier))
            return 1;
        else {
            othersCode = ((AbstractIdentifier<C>)obj).getCode();
            if (thisCode == null)
                return othersCode == null ? 0 : -1;
            else
                return othersCode == null ? 1 : thisCode.compareTo(othersCode);
        }
    }
}