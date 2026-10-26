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
 * HRMS Payroll Controller
 * Manages payroll table rendering, multi-filtering, salary calculations, individual & bulk salary processing, and payslip modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container tbody');
    const searchInput = document.getElementById('payrollSearch');
    const monthFilter = document.getElementById('payrollMonthFilter');
    const deptFilter = document.getElementById('payrollDeptFilter');
    const statusFilter = document.getElementById('payrollStatusFilter');
    const openGenerateBtn = document.getElementById('openGenerateModalBtn');

    const totalEl = document.getElementById('totalPayrollAmount');
    const countEl = document.getElementById('payrollEmployeesCount');
    const pendingEl = document.getElementById('payrollPendingCount');
    const processedEl = document.getElementById('payrollProcessedCount');

    // 1. Render Payroll Records
    function renderPayroll() {
        const records = HRMS_STORE.getPayroll();
        tableBody.innerHTML = '';

        if (records.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 28px; color: #64748b;">
                        <i class="fa-solid fa-money-check-dollar" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                        No payroll records found for selected period.
                    </td>
                </tr>
            `;
            updateStats([]);
            return;
        }

        records.forEach(p => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', p.empId);
            tr.setAttribute('data-name', p.name.toLowerCase());
            tr.setAttribute('data-dept', p.department);
            tr.setAttribute('data-status', p.status);
            tr.setAttribute('data-month', p.month || 'September 2026');

            const statusClass = p.status.toLowerCase();
            const avatar = p.avatar || p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            tr.innerHTML = `
                <td>
                    <div class="employee">
                        <div class="avatar">${avatar}</div>
                        <div>
                            <strong>${p.name}</strong>
                            <small>${p.empId}</small>
                        </div>
                    </div>
                </td>
                <td>${p.department}</td>
                <td>₹${(p.basic || 0).toLocaleString('en-IN')}</td>
                <td class="positive">+ ₹${(p.allowances || 0).toLocaleString('en-IN')}</td>
                <td class="negative">- ₹${(p.deductions || 0).toLocaleString('en-IN')}</td>
                <td class="salary"><strong>₹${(p.net || 0).toLocaleString('en-IN')}</strong></td>
                <td>
                    <span class="status ${statusClass}">${p.status}</span>
                </td>
                <td>
                    <div class="actions">
                        <button class="view action-view" title="View Payslip" data-id="${p.empId}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        ${p.status === 'Pending' ? `
                            <button class="process action-process" title="Process Salary" data-id="${p.empId}">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        ` : `
                            <button class="download action-download" title="Download Slip" data-id="${p.empId}">
                                <i class="fa-solid fa-download"></i>
                            </button>
                        `}
                    </div>
                </td>
            `;

            tableBody.appendChild(tr);
        });

        applyFilters();
        updateStats(records);
    }

    // 2. Filters
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const dept = deptFilter ? deptFilter.value : 'All';
        const status = statusFilter ? statusFilter.value : 'All';
        const month = monthFilter ? monthFilter.value : '';

        const rows = tableBody.querySelectorAll('tr[data-id]');

        rows.forEach(row => {
            const name = row.getAttribute('data-name') || '';
            const id = (row.getAttribute('data-id') || '').toLowerCase();
            const rowDept = row.getAttribute('data-dept');
            const rowStatus = row.getAttribute('data-status');
            const rowMonth = row.getAttribute('data-month');

            const matchesQuery = !query || name.includes(query) || id.includes(query);
            const matchesDept = dept === 'All' || rowDept === dept;
            const matchesStatus = status === 'All' || rowStatus === status;
            const matchesMonth = !month || rowMonth === month;

            if (matchesQuery && matchesDept && matchesStatus && matchesMonth) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (deptFilter) deptFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (monthFilter) monthFilter.addEventListener('change', () => {
        HRMS_UI.showToast(`Showing payroll for ${monthFilter.value}`, 'info');
        applyFilters();
    });

    // 3. Dynamic Stats Calculation
    function updateStats(records) {
        let totalSum = 0;
        let count = records.length;
        let pending = 0;
        let processed = 0;

        records.forEach(p => {
            totalSum += Number(p.net) || 0;
            if (p.status === 'Pending') pending++;
            else if (p.status === 'Processed') processed++;
        });

        if (countEl) countEl.textContent = count;
        if (pendingEl) pendingEl.textContent = pending;
        if (processedEl) processedEl.textContent = processed;
        if (totalEl) {
            const inLakhs = (totalSum / 100000).toFixed(1);
            totalEl.textContent = `₹${inLakhs}L`;
        }
    }

    // 4. Action Delegation (Process, View, Download)
    tableBody.addEventListener('click', (e) => {
        const processBtn = e.target.closest('.action-process');
        const viewBtn = e.target.closest('.action-view');
        const downloadBtn = e.target.closest('.action-download');

        if (processBtn) {
            const id = processBtn.getAttribute('data-id');
            HRMS_STORE.processPayroll(id);
            renderPayroll();
            HRMS_UI.showToast(`Salary disbursed for Employee ${id}!`, 'success');
        } else if (downloadBtn) {
            const id = downloadBtn.getAttribute('data-id');
            const p = HRMS_STORE.getPayroll().find(item => item.empId === id);
            HRMS_UI.showToast(`Payslip generated & downloaded for ${p ? p.name : id}`, 'info');
        } else if (viewBtn) {
            const id = viewBtn.getAttribute('data-id');
            const p = HRMS_STORE.getPayroll().find(item => item.empId === id);
            if (p) {
                HRMS_UI.showModal({
                    title: `<i class="fa-solid fa-file-invoice-dollar"></i> Employee Payslip Breakdown`,
                    contentHtml: `
                        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 16px; font-size: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">EMPLOYEE</strong> ${p.name}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">EMPLOYEE ID</strong> ${p.empId}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">DEPARTMENT</strong> ${p.department}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">PAY PERIOD</strong> ${p.month || 'September 2026'}</div>
                        </div>

                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
                            <thead>
                                <tr style="background: #f1f5f9; text-align: left;">
                                    <th style="padding: 10px;">Earnings</th>
                                    <th style="padding: 10px; text-align: right;">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 10px;">Basic Salary</td>
                                    <td style="padding: 10px; text-align: right;">₹${(p.basic || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 10px;">HRA & Allowances</td>
                                    <td style="padding: 10px; text-align: right; color: #16a34a;">+ ₹${(p.allowances || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="padding: 10px;">PF & Tax Deductions</td>
                                    <td style="padding: 10px; text-align: right; color: #ef4444;">- ₹${(p.deductions || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr style="background: #e8f5e9; font-weight: bold;">
                                    <td style="padding: 12px; color: #166534;">Net Salary Payable</td>
                                    <td style="padding: 12px; text-align: right; color: #166534; font-size: 16px;">₹${(p.net || 0).toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <strong style="color: #64748b; font-size: 12px; display: block; margin-bottom: 4px;">STATUS</strong>
                            <span class="status ${p.status.toLowerCase()}">${p.status}</span>
                        </div>
                    `,
                    footerHtml: `
                        <button type="button" class="modal-btn modal-btn-cancel">Close</button>
                        <button type="button" class="modal-btn modal-btn-primary" id="downloadSlipBtn">
                            <i class="fa-solid fa-download"></i> Download PDF Slip
                        </button>
                    `
                });

                setTimeout(() => {
                    const dlBtn = document.getElementById('downloadSlipBtn');
                    if (dlBtn) {
                        dlBtn.addEventListener('click', () => {
                            HRMS_UI.showToast(`Downloading payslip for ${p.name}...`, 'success');
                        });
                    }
                }, 100);
            }
        }
    });

    // 5. Generate / Bulk Process Payroll Modal
    if (openGenerateBtn) {
        openGenerateBtn.addEventListener('click', () => {
            const records = HRMS_STORE.getPayroll();
            const pendingRecords = records.filter(p => p.status === 'Pending');
            const pendingTotal = pendingRecords.reduce((acc, curr) => acc + (Number(curr.net) || 0), 0);

            HRMS_UI.showModal({
                title: `<i class="fa-solid fa-file-invoice-dollar"></i> Generate Monthly Payroll`,
                contentHtml: `
                    <div style="text-align: center; padding: 10px 0 20px;">
                        <p style="color: #64748b; font-size: 14px; margin-bottom: 16px;">
                            You are about to process monthly payroll disbursements for <strong>September 2026</strong>.
                        </p>
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; padding: 20px; display: inline-block; width: 100%;">
                            <span style="color: #166534; font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">TOTAL PENDING DISBURSEMENT</span>
                            <h2 style="color: #15803d; font-size: 28px; margin: 0;">₹${pendingTotal.toLocaleString('en-IN')}</h2>
                            <small style="color: #64748b; margin-top: 4px; display: block;">Across ${pendingRecords.length} pending employee(s)</small>
                        </div>
                    </div>
                `,
                footerHtml: `
                    <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-primary" id="confirmProcessAllBtn" ${pendingRecords.length === 0 ? 'disabled' : ''}>
                        <i class="fa-solid fa-check-double"></i> Process All (${pendingRecords.length})
                    </button>
                `
            });

            setTimeout(() => {
                const processAllBtn = document.getElementById('confirmProcessAllBtn');
                if (processAllBtn) {
                    processAllBtn.addEventListener('click', () => {
                        HRMS_STORE.processAllPayroll();
                        const modal = document.querySelector('.hrms-modal-backdrop');
                        if (modal) modal.classList.remove('active');

                        renderPayroll();
                        HRMS_UI.showToast('All pending payroll processed successfully!', 'success');
                    });
                }
            }, 100);
        });
    }

    // Initial render
    renderPayroll();
});
