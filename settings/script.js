/**
 * HRMS Shared State Manager & DOM Utilities
 * Provides unified localStorage mock data and reusable DOM helpers across all pages.
 */

const HRMS_STORE = (function () {
    const STORAGE_KEY = 'HRMS_DATA_V1';

    const defaultData = {
        currentUser: {
            name: 'Admin',
            role: 'Administrator',
            email: 'admin@hrms.com',
            avatar: 'AD'
        },
        settings: {
            companyName: 'PulseHR Tech Solutions',
            hrEmail: 'hr@pulsehr.com',
            phone: '+91 98765 43210',
            address: 'Tech Park, Sector 62, Noida, India',
            currency: '₹',
            theme: 'light',
            emailAlerts: true,
            payrollReminders: true
        },
        employees: [
            {
                id: 'EMP00124',
                code: 'EMP001',
                name: 'Rahul Sharma',
                avatar: 'RS',
                email: 'rahul.sharma@hrms.com',
                phone: '+91 98765 01001',
                department: 'Technology',
                position: 'Software Developer',
                joiningDate: '2026-09-12',
                status: 'Active',
                salary: 75000,
                allowances: 12000,
                deductions: 5500
            },
            {
                id: 'EMP00125',
                code: 'EMP002',
                name: 'Priya Singh',
                avatar: 'PS',
                email: 'priya.singh@hrms.com',
                phone: '+91 98765 01002',
                department: 'Human Resources',
                position: 'HR Manager',
                joiningDate: '2026-09-10',
                status: 'Active',
                salary: 62000,
                allowances: 9500,
                deductions: 4200
            },
            {
                id: 'EMP00126',
                code: 'EMP003',
                name: 'Amit Kumar',
                avatar: 'AK',
                email: 'amit.kumar@hrms.com',
                phone: '+91 98765 01003',
                department: 'Finance',
                position: 'Accountant',
                joiningDate: '2026-09-08',
                status: 'Active',
                salary: 58000,
                allowances: 8000,
                deductions: 3800
            },
            {
                id: 'EMP00127',
                code: 'EMP004',
                name: 'Sneha Kapoor',
                avatar: 'SK',
                email: 'sneha.kapoor@hrms.com',
                phone: '+91 98765 01004',
                department: 'Marketing',
                position: 'Marketing Executive',
                joiningDate: '2026-09-05',
                status: 'Active',
                salary: 55000,
                allowances: 7500,
                deductions: 3200
            },
            {
                id: 'EMP00128',
                code: 'EMP005',
                name: 'Vikram Joshi',
                avatar: 'VJ',
                email: 'vikram.joshi@hrms.com',
                phone: '+91 98765 01005',
                department: 'Operations',
                position: 'Operations Lead',
                joiningDate: '2026-08-20',
                status: 'Active',
                salary: 51000,
                allowances: 6500,
                deductions: 2900
            }
        ],
        attendance: [
            { id: 1, empId: 'EMP00124', name: 'Rahul Sharma', department: 'Technology', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: '9h 00m', status: 'Present', date: '2026-09-21' },
            { id: 2, empId: 'EMP00125', name: 'Priya Singh', department: 'Human Resources', checkIn: '09:05 AM', checkOut: '06:00 PM', hours: '8h 55m', status: 'Present', date: '2026-09-21' },
            { id: 3, empId: 'EMP00126', name: 'Amit Kumar', department: 'Finance', checkIn: '09:45 AM', checkOut: '06:30 PM', hours: '8h 45m', status: 'Late', date: '2026-09-21' },
            { id: 4, empId: 'EMP00127', name: 'Sneha Kapoor', department: 'Marketing', checkIn: '--:--', checkOut: '--:--', hours: '0h 00m', status: 'Absent', date: '2026-09-21' },
            { id: 5, empId: 'EMP00128', name: 'Vikram Joshi', department: 'Operations', checkIn: '09:10 AM', checkOut: '06:10 PM', hours: '9h 00m', status: 'Present', date: '2026-09-21' }
        ],
        leaves: [
            { id: 'LV001', empId: 'EMP00124', name: 'Rahul Sharma', avatar: 'RS', department: 'Technology', leaveType: 'Casual Leave', from: '2026-09-22', to: '2026-09-23', days: 2, reason: 'Personal work', status: 'Pending' },
            { id: 'LV002', empId: 'EMP00125', name: 'Priya Singh', avatar: 'PS', department: 'Human Resources', leaveType: 'Sick Leave', from: '2026-09-20', to: '2026-09-21', days: 2, reason: 'Viral Fever', status: 'Approved' },
            { id: 'LV003', empId: 'EMP00126', name: 'Amit Kumar', avatar: 'AK', department: 'Finance', leaveType: 'Earned Leave', from: '2026-09-28', to: '2026-09-30', days: 3, reason: 'Family travel', status: 'Pending' },
            { id: 'LV004', empId: 'EMP00127', name: 'Sneha Kapoor', avatar: 'SK', department: 'Marketing', leaveType: 'Emergency Leave', from: '2026-09-15', to: '2026-09-15', days: 1, reason: 'Medical checkup', status: 'Rejected' },
            { id: 'LV005', empId: 'EMP00128', name: 'Vikram Joshi', avatar: 'VJ', department: 'Operations', leaveType: 'Casual Leave', from: '2026-09-25', to: '2026-09-26', days: 2, reason: 'Relocation', status: 'Approved' }
        ],
        payroll: [
            { empId: 'EMP00124', name: 'Rahul Sharma', avatar: 'RS', department: 'Technology', basic: 75000, allowances: 12000, deductions: 5500, net: 81500, status: 'Processed', month: 'September 2026' },
            { empId: 'EMP00125', name: 'Priya Singh', avatar: 'PS', department: 'Human Resources', basic: 62000, allowances: 9500, deductions: 4200, net: 67300, status: 'Processed', month: 'September 2026' },
            { empId: 'EMP00126', name: 'Amit Kumar', avatar: 'AK', department: 'Finance', basic: 58000, allowances: 8000, deductions: 3800, net: 62200, status: 'Pending', month: 'September 2026' },
            { empId: 'EMP00127', name: 'Sneha Kapoor', avatar: 'SK', department: 'Marketing', basic: 55000, allowances: 7500, deductions: 3200, net: 59300, status: 'Processed', month: 'September 2026' },
            { empId: 'EMP00128', name: 'Vikram Joshi', avatar: 'VJ', department: 'Operations', basic: 51000, allowances: 6500, deductions: 2900, net: 54600, status: 'Pending', month: 'September 2026' }
        ]
    };

    function loadData() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            saveData(defaultData);
            return defaultData;
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            saveData(defaultData);
            return defaultData;
        }
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    return {
        getData: loadData,
        saveData: saveData,

        // Employees
        getEmployees: function () {
            return loadData().employees;
        },
        addEmployee: function (emp) {
            const data = loadData();
            data.employees.unshift(emp);
            // Also add payroll entry
            data.payroll.unshift({
                empId: emp.id,
                name: emp.name,
                avatar: emp.avatar || emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
                department: emp.department,
                basic: Number(emp.salary) || 50000,
                allowances: 8000,
                deductions: 3500,
                net: (Number(emp.salary) || 50000) + 8000 - 3500,
                status: 'Pending',
                month: 'September 2026'
            });
            // Also add attendance entry
            data.attendance.unshift({
                id: Date.now(),
                empId: emp.id,
                name: emp.name,
                department: emp.department,
                checkIn: '09:00 AM',
                checkOut: '--:--',
                hours: 'In Progress',
                status: 'Present',
                date: new Date().toISOString().split('T')[0]
            });
            saveData(data);
            return emp;
        },
        deleteEmployee: function (id) {
            const data = loadData();
            data.employees = data.employees.filter(e => e.id !== id && e.code !== id);
            data.payroll = data.payroll.filter(p => p.empId !== id);
            data.attendance = data.attendance.filter(a => a.empId !== id);
            saveData(data);
        },

        // Attendance
        getAttendance: function () {
            return loadData().attendance;
        },
        markAttendance: function (empId, status, checkIn, checkOut) {
            const data = loadData();
            const rec = data.attendance.find(a => a.empId === empId);
            if (rec) {
                rec.status = status;
                rec.checkIn = checkIn || rec.checkIn;
                rec.checkOut = checkOut || rec.checkOut;
            } else {
                const emp = data.employees.find(e => e.id === empId || e.code === empId);
                data.attendance.push({
                    id: Date.now(),
                    empId: empId,
                    name: emp ? emp.name : 'Employee',
                    department: emp ? emp.department : 'General',
                    checkIn: checkIn || '09:00 AM',
                    checkOut: checkOut || '06:00 PM',
                    hours: status === 'Absent' ? '0h 00m' : '8h 00m',
                    status: status,
                    date: new Date().toISOString().split('T')[0]
                });
            }
            saveData(data);
        },

        // Leaves
        getLeaves: function () {
            return loadData().leaves;
        },
        applyLeave: function (leave) {
            const data = loadData();
            data.leaves.unshift(leave);
            saveData(data);
            return leave;
        },
        updateLeaveStatus: function (id, status) {
            const data = loadData();
            const l = data.leaves.find(item => item.id === id);
            if (l) {
                l.status = status;
                saveData(data);
            }
        },

        // Payroll
        getPayroll: function () {
            return loadData().payroll;
        },
        processPayroll: function (empId) {
            const data = loadData();
            const p = data.payroll.find(item => item.empId === empId);
            if (p) {
                p.status = 'Processed';
                saveData(data);
            }
        },
        processAllPayroll: function () {
            const data = loadData();
            data.payroll.forEach(item => {
                item.status = 'Processed';
            });
            saveData(data);
        },

        // Settings
        getSettings: function () {
            return loadData().settings;
        },
        saveSettings: function (newSettings) {
            const data = loadData();
            data.settings = Object.assign(data.settings, newSettings);
            saveData(data);
        }
    };
})();

// Reusable DOM Helpers
const HRMS_UI = {
    // Show toast message
    showToast: function (message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `hrms-toast toast-${type}`;

        let icon = 'check-circle';
        if (type === 'danger') icon = 'exclamation-circle';
        if (type === 'warning') icon = 'triangle-exclamation';
        if (type === 'info') icon = 'info-circle';

        toast.innerHTML = `
            <i class="fa-solid fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    },

    // Modal Manager
    showModal: function ({ title, contentHtml, footerHtml, onClose }) {
        let backdrop = document.querySelector('.hrms-modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'hrms-modal-backdrop';
            document.body.appendChild(backdrop);
        }

        backdrop.innerHTML = `
            <div class="hrms-modal-card">
                <div class="hrms-modal-header">
                    <h3>${title}</h3>
                    <button class="hrms-modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="hrms-modal-body">
                    ${contentHtml}
                </div>
                ${footerHtml ? `<div class="hrms-modal-footer">${footerHtml}</div>` : ''}
            </div>
        `;

        requestAnimationFrame(() => {
            backdrop.classList.add('active');
        });

        function closeModal() {
            backdrop.classList.remove('active');
            if (typeof onClose === 'function') onClose();
        }

        backdrop.querySelector('.hrms-modal-close').onclick = closeModal;
        backdrop.onclick = function (e) {
            if (e.target === backdrop) closeModal();
        };

        const cancelBtn = backdrop.querySelector('.modal-btn-cancel');
        if (cancelBtn) {
            cancelBtn.onclick = closeModal;
        }

        return { close: closeModal, backdrop: backdrop };
    },

    // Initialize Theme
    initTheme: function () {
        const settings = HRMS_STORE.getSettings();
        if (settings && settings.theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    },

    // Toggle Theme
    toggleTheme: function () {
        const isDark = document.body.classList.toggle('dark-theme');
        HRMS_STORE.saveSettings({ theme: isDark ? 'dark' : 'light' });
        HRMS_UI.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
        return isDark;
    },

    // Attach active state and logout functionality
    initSidebar: function () {
        const currentPath = window.location.pathname.toLowerCase();
        const navLinks = document.querySelectorAll('.nav-item, .menu-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkHref = href.toLowerCase();
            if (currentPath.includes('dashboard') && linkHref.includes('dashboard')) {
                link.classList.add('active');
            } else if (currentPath.includes('add-employee') && linkHref.includes('add-employee')) {
                link.classList.add('active');
            } else if (currentPath.includes('employees') && !currentPath.includes('add-employee') && linkHref.includes('employees')) {
                link.classList.add('active');
            } else if (currentPath.includes('attendance') && linkHref.includes('attendance')) {
                link.classList.add('active');
            } else if (currentPath.includes('leave-management') && linkHref.includes('leave-management')) {
                link.classList.add('active');
            } else if (currentPath.includes('payroll') && linkHref.includes('payroll')) {
                link.classList.add('active');
            } else if (currentPath.includes('settings') && linkHref.includes('settings')) {
                link.classList.add('active');
            }
        });

        // Logout handlers
        const logoutBtns = document.querySelectorAll('.logout');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('HRMS_AUTH_TOKEN');
                HRMS_UI.showToast('Logged out successfully', 'info');
                setTimeout(() => {
                    window.location.href = '../login/index.html';
                }, 600);
            });
        });
    }
};

// Auto-run theme and sidebar on page load
document.addEventListener('DOMContentLoaded', () => {
    HRMS_UI.initTheme();
    HRMS_UI.initSidebar();
});


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
