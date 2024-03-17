/**
 * This module exports an object with constants representing the property names of library policies.
 * These constants can be used throughout the application to ensure consistency
 * and avoid errors due to typos or inconsistently formatted policy property names.
 */

module.exports = {
    MAX_RESERVATIONS_PER_USER: 'max_reservations_per_user',
    MAX_LOAN_DURATION: 'max_loan_duration',
    MAX_RENEWALS_PER_BOOK: 'max_renewals_per_book',
    LATE_RETURN_PENALTY_PER_DAY: 'late_return_penalty_per_day',
    MAX_RESERVATION_DURATION: 'max_reservation_duration',
    MAX_ISSUED_BOOKS_PER_USER: 'max_issued_books_per_user',
    MAINTENANCE_DAYS: 'maintenance_days',
    LOST_BOOK_FEE_PERCENTAGE: 'lost_book_fee_percentage',
    MINOR_DAMAGE_FEE_PERCENTAGE: 'minor_damage_fee_percentage',
    MODERATE_DAMAGE_FEE_PERCENTAGE: 'moderate_damage_fee_percentage',
    MAJOR_DAMAGE_FEE_PERCENTAGE: 'major_damage_fee_percentage',
    SEVERE_DAMAGE_FEE_PERCENTAGE: 'severe_damage_fee_percentage',
    PRINTING_FEE_PER_PAGE: 'printing_fee_per_page',
    MAX_PRINT_PAGES_PER_DAY: 'max_print_pages_per_day',
    MEMBERSHIP_FEES: 'membership_fees',
    MEMBERSHIP_DURATION_IN_MONTHS: 'membership_duration_in_months'
};