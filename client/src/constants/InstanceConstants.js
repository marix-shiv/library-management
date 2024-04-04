/**
 * InstanceConstants.js
 * 
 * This is a Node.js module that exports an object with constants for the book instance statuses.
 * 
 * The object has properties `A`, `L`, `M`, and `R` which are set to "Available", "Loaned", "Maintenance", and "Reserved" respectively. These constants can be imported and used in other parts of the application where the book instance statuses are needed.
 * 
 * @module constants/InstanceConstants
 */

export const INSTANCE_MAPPING = {
    A: "Available",
    L: "Loaned",
    M: "Maintenance",
    R: "Reserved"
}