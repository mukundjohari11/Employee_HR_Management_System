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
            email: 'admin@novapeople.com',
            avatar: 'AD'
        },
        settings: {
            companyName: 'NovaPeople HR Solutions',
            hrEmail: 'people@novapeople.com',
            phone: '+91 98123 45670',
            address: 'Business Hub, Sector 18, Noida, India',
            currency: '₹',
            theme: 'light',
            emailAlerts: true,
            payrollReminders: true
        },
        employees: [
            {
                id: 'STAFF00241',
                code: 'STAFF001',
                name: 'Arjun Mehta',
                avatar: 'AM',
                email: 'arjun.mehta@novapeople.com',
                phone: '+91 98123 45001',
                department: 'Engineering',
                position: 'Web Developer',
                joiningDate: '2026-10-12',
                status: 'Active',
                salary: 78000,
                allowances: 13000,
                deductions: 6000
            },
            {
                id: 'STAFF00242',
                code: 'STAFF002',
                name: 'Kavya Verma',
                avatar: 'KV',
                email: 'kavya.verma@novapeople.com',
                phone: '+91 98123 45002',
                department: 'People Operations',
                position: 'People Manager',
                joiningDate: '2026-10-10',
                status: 'Active',
                salary: 64000,
                allowances: 10000,
                deductions: 4500
            },
            {
                id: 'STAFF00243',
                code: 'STAFF003',
                name: 'Rohan Gupta',
                avatar: 'RG',
                email: 'rohan.gupta@novapeople.com',
                phone: '+91 98123 45003',
                department: 'Accounts',
                position: 'Finance Executive',
                joiningDate: '2026-10-08',
                status: 'Active',
                salary: 60000,
                allowances: 8500,
                deductions: 4000
            },
            {
                id: 'STAFF00244',
                code: 'STAFF004',
                name: 'Isha Malhotra',
                avatar: 'IM',
                email: 'isha.malhotra@novapeople.com',
                phone: '+91 98123 45004',
                department: 'Communications',
                position: 'Content Executive',
                joiningDate: '2026-10-05',
                status: 'Active',
                salary: 57000,
                allowances: 8500,
                deductions: 4000
            },
            {
                id: 'STAFF00245',
                code: 'STAFF005',
                name: 'Dev Patel',
                avatar: 'DP',
                email: 'dev.patel@novapeople.com',
                phone: '+91 98123 45005',
                department: 'Administration',
                position: 'Admin Lead',
                joiningDate: '2026-10-20',
                status: 'Active',
                salary: 53000,
                allowances: 7000,
                deductions: 3000
            }
        ],
        attendance: [
            { id: 1, empId: 'STAFF00241', name: 'Arjun Mehta', department: 'Engineering', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: '9h 00m', status: 'Present', date: '2026-10-21' },
            { id: 2, empId: 'STAFF00242', name: 'Kavya Verma', department: 'People Operations', checkIn: '09:05 AM', checkOut: '06:00 PM', hours: '8h 55m', status: 'Present', date: '2026-10-21' },
            { id: 3, empId: 'STAFF00243', name: 'Rohan Gupta', department: 'Accounts', checkIn: '09:45 AM', checkOut: '06:30 PM', hours: '8h 45m', status: 'Late', date: '2026-10-21' },
            { id: 4, empId: 'STAFF00244', name: 'Isha Malhotra', department: 'Communications', checkIn: '--:--', checkOut: '--:--', hours: '0h 00m', status: 'Absent', date: '2026-10-21' },
            { id: 5, empId: 'STAFF00245', name: 'Dev Patel', department: 'Administration', checkIn: '09:10 AM', checkOut: '06:10 PM', hours: '9h 00m', status: 'Present', date: '2026-10-21' }
        ],
        leaves: [
            { id: 'LV101', empId: 'STAFF00241', name: 'Arjun Mehta', avatar: 'AM', department: 'Engineering', leaveType: 'Casual Leave', from: '2026-10-22', to: '2026-10-23', days: 2, reason: 'Personal work', status: 'Pending' },
            { id: 'LV102', empId: 'STAFF00242', name: 'Kavya Verma', avatar: 'KV', department: 'People Operations', leaveType: 'Sick Leave', from: '2026-10-20', to: '2026-10-21', days: 2, reason: 'Viral Fever', status: 'Approved' },
            { id: 'LV103', empId: 'STAFF00243', name: 'Rohan Gupta', avatar: 'RG', department: 'Accounts', leaveType: 'Earned Leave', from: '2026-10-28', to: '2026-10-30', days: 3, reason: 'Family travel', status: 'Pending' },
            { id: 'LV104', empId: 'STAFF00244', name: 'Isha Malhotra', avatar: 'IM', department: 'Communications', leaveType: 'Emergency Leave', from: '2026-10-15', to: '2026-10-15', days: 1, reason: 'Medical checkup', status: 'Rejected' },
            { id: 'LV105', empId: 'STAFF00245', name: 'Dev Patel', avatar: 'DP', department: 'Administration', leaveType: 'Casual Leave', from: '2026-10-25', to: '2026-10-26', days: 2, reason: 'Relocation', status: 'Approved' }
        ],
        payroll: [
            { empId: 'STAFF00241', name: 'Arjun Mehta', avatar: 'AM', department: 'Engineering', basic: 78000, allowances: 13000, deductions: 6000, net: 85000, status: 'Processed', month: 'October 2026' },
            { empId: 'STAFF00242', name: 'Kavya Verma', avatar: 'KV', department: 'People Operations', basic: 64000, allowances: 10000, deductions: 4500, net: 69500, status: 'Processed', month: 'October 2026' },
            { empId: 'STAFF00243', name: 'Rohan Gupta', avatar: 'RG', department: 'Accounts', basic: 60000, allowances: 8500, deductions: 4000, net: 64500, status: 'Pending', month: 'October 2026' },
            { empId: 'STAFF00244', name: 'Isha Malhotra', avatar: 'IM', department: 'Communications', basic: 57000, allowances: 8000, deductions: 3500, net: 61500, status: 'Processed', month: 'October 2026' },
            { empId: 'STAFF00245', name: 'Dev Patel', avatar: 'DP', department: 'Administration', basic: 53000, allowances: 7000, deductions: 3000, net: 57000, status: 'Pending', month: 'October 2026' }
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
                basic: Number(emp.salary) || 52000,
                allowances: 8500,
                deductions: 3500,
                net: (Number(emp.salary) || 52000) + 8500 - 4000,
                status: 'Pending',
                month: 'October 2026'
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

        if (companyNameInput) companyNameInput.value = settings.companyName || 'NovaPeople HR Solutions';
        if (hrEmailInput) hrEmailInput.value = settings.hrEmail || 'people@novapeople.com';
        if (companyPhoneInput) companyPhoneInput.value = settings.phone || '+91 98123 45670';
        if (currencySelect) currencySelect.value = settings.currency || '₹';
        if (addressInput) addressInput.value = settings.address || 'Business Hub, Sector 18, Noida, India';

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
                companyName: 'NovaPeople HR Solutions',
                hrEmail: 'people@novapeople.com',
                phone: '+91 98123 45670',
                address: 'Business Hub, Sector 18, Noida, India',
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
