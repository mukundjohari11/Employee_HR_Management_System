/**
 * HRMS Settings Controller
 * Handles live dark/light mode toggle via DOM, form state persistence, and policy configuration.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const themeToggle = document.getElementById('themeToggleCheckbox');
    const companyNameInput = document.getElementById('companyName');
    const hrEmailInput = document.getElementById('hrEmail');
    const companyPhoneInput = document.getElementById('companyPhone');
    const currencySelect = document.getElementById('companyCurrency');
    const addressInput = document.getElementById('companyAddress');
    const emailAlertsCheckbox = document.getElementById('emailAlerts');
    const payrollRemindersCheckbox = document.getElementById('payrollReminders');
    const resetBtn = document.getElementById('resetSettingsBtn');

    // 1. Load Settings into Form
    function loadFormValues() {
        const settings = HRMS_STORE.getSettings();

        if (companyNameInput) companyNameInput.value = settings.companyName || 'PulseHR Tech Solutions';
        if (hrEmailInput) hrEmailInput.value = settings.hrEmail || 'hr@pulsehr.com';
        if (companyPhoneInput) companyPhoneInput.value = settings.phone || '+91 98765 43210';
        if (currencySelect) currencySelect.value = settings.currency || '₹';
        if (addressInput) addressInput.value = settings.address || 'Tech Park, Sector 62, Noida, India';

        if (themeToggle) {
            themeToggle.checked = settings.theme === 'dark';
        }

        if (emailAlertsCheckbox) emailAlertsCheckbox.checked = settings.emailAlerts !== false;
        if (payrollRemindersCheckbox) payrollRemindersCheckbox.checked = settings.payrollReminders !== false;
    }

    // 2. Real-time Theme Toggle DOM Handler
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            if (isDark) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            HRMS_STORE.saveSettings({ theme: isDark ? 'dark' : 'light' });
            HRMS_UI.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
        });
    }

    // 3. Save Settings Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const companyName = companyNameInput.value.trim();
            const hrEmail = hrEmailInput.value.trim();

            if (!companyName) {
                HRMS_UI.showToast('Please enter a company name', 'danger');
                companyNameInput.focus();
                return;
            }

            if (!hrEmail || !hrEmail.includes('@')) {
                HRMS_UI.showToast('Please enter a valid HR email address', 'danger');
                hrEmailInput.focus();
                return;
            }

            const updatedSettings = {
                companyName: companyName,
                hrEmail: hrEmail,
                phone: companyPhoneInput.value.trim(),
                currency: currencySelect.value,
                address: addressInput.value.trim(),
                theme: themeToggle.checked ? 'dark' : 'light',
                emailAlerts: emailAlertsCheckbox.checked,
                payrollReminders: payrollRemindersCheckbox.checked
            };

            HRMS_STORE.saveSettings(updatedSettings);
            HRMS_UI.showToast('Organization settings saved successfully!', 'success');
        });
    }

    // 4. Reset Settings
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const defaults = {
                companyName: 'PulseHR Tech Solutions',
                hrEmail: 'hr@pulsehr.com',
                phone: '+91 98765 43210',
                address: 'Tech Park, Sector 62, Noida, India',
                currency: '₹',
                theme: 'light',
                emailAlerts: true,
                payrollReminders: true
            };
            HRMS_STORE.saveSettings(defaults);
            document.body.classList.remove('dark-theme');
            loadFormValues();
            HRMS_UI.showToast('Settings reset to defaults', 'warning');
        });
    }

    // Initialize
    loadFormValues();
});
