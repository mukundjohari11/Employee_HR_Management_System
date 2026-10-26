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
 * HRMS Leave Management Controller
 * Handles live leave requests table, dynamic approve/reject actions, view modal, and "Apply Leave" modal with day calculations.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container tbody');
    const searchInput = document.getElementById('leaveSearch');
    const typeFilter = document.getElementById('leaveTypeFilter');
    const statusFilter = document.getElementById('leaveStatusFilter');
    const dateFilter = document.getElementById('leaveDateFilter');
    const openApplyModalBtn = document.getElementById('openApplyLeaveBtn');

    const totalEl = document.querySelectorAll('.stats .stat-card h2')[0];
    const pendingEl = document.querySelectorAll('.stats .stat-card h2')[1];
    const approvedEl = document.querySelectorAll('.stats .stat-card h2')[2];
    const rejectedEl = document.querySelectorAll('.stats .stat-card h2')[3];

    // 1. Render Leave Requests
    function renderLeaves() {
        const leaves = HRMS_STORE.getLeaves();
        tableBody.innerHTML = '';

        if (leaves.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 28px; color: #64748b;">
                        <i class="fas fa-calendar-check" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                        No leave requests found.
                    </td>
                </tr>
            `;
            updateStats([]);
            return;
        }

        leaves.forEach(l => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', l.id);
            tr.setAttribute('data-name', l.name.toLowerCase());
            tr.setAttribute('data-empid', (l.empId || '').toLowerCase());
            tr.setAttribute('data-type', l.leaveType);
            tr.setAttribute('data-status', l.status);
            tr.setAttribute('data-from', l.from);

            const statusClass = l.status.toLowerCase();
            const avatar = l.avatar || l.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            tr.innerHTML = `
                <td>
                    <div class="employee">
                        <div class="avatar">${avatar}</div>
                        <div>
                            <strong>${l.name}</strong>
                            <small>${l.empId || l.id}</small>
                        </div>
                    </div>
                </td>
                <td>${l.department || 'Technology'}</td>
                <td>${l.leaveType}</td>
                <td>${l.from}</td>
                <td>${l.to}</td>
                <td>${l.days || 1}</td>
                <td><span style="display: inline-block; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${l.reason || 'Personal'}</span></td>
                <td>
                    <span class="status ${statusClass}">${l.status}</span>
                </td>
                <td>
                    <div class="actions">
                        ${l.status === 'Pending' ? `
                            <button class="approve action-approve" title="Approve" data-id="${l.id}">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="reject action-reject" title="Reject" data-id="${l.id}">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        ` : ''}
                        <button class="view action-view" title="View Details" data-id="${l.id}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(tr);
        });

        applyFilters();
        updateStats(leaves);
    }

    // 2. Filters Logic
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const type = typeFilter ? typeFilter.value : 'All';
        const status = statusFilter ? statusFilter.value : 'All';
        const date = dateFilter ? dateFilter.value : '';

        const rows = tableBody.querySelectorAll('tr[data-id]');

        rows.forEach(row => {
            const name = row.getAttribute('data-name') || '';
            const empId = row.getAttribute('data-empid') || '';
            const rowType = row.getAttribute('data-type');
            const rowStatus = row.getAttribute('data-status');
            const rowFrom = row.getAttribute('data-from') || '';

            const matchesQuery = !query || name.includes(query) || empId.includes(query);
            const matchesType = type === 'All' || rowType === type;
            const matchesStatus = status === 'All' || rowStatus === status;
            const matchesDate = !date || rowFrom === date;

            if (matchesQuery && matchesType && matchesStatus && matchesDate) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (dateFilter) dateFilter.addEventListener('change', applyFilters);

    // 3. Update Stat Counters
    function updateStats(leaves) {
        let total = leaves.length;
        let pending = 0;
        let approved = 0;
        let rejected = 0;

        leaves.forEach(l => {
            if (l.status === 'Pending') pending++;
            else if (l.status === 'Approved') approved++;
            else if (l.status === 'Rejected') rejected++;
        });

        if (totalEl) totalEl.textContent = total;
        if (pendingEl) pendingEl.textContent = pending;
        if (approvedEl) approvedEl.textContent = approved;
        if (rejectedEl) rejectedEl.textContent = rejected;
    }

    // 4. Action Delegation (Approve, Reject, View)
    tableBody.addEventListener('click', (e) => {
        const approveBtn = e.target.closest('.action-approve');
        const rejectBtn = e.target.closest('.action-reject');
        const viewBtn = e.target.closest('.action-view');

        if (approveBtn) {
            const id = approveBtn.getAttribute('data-id');
            HRMS_STORE.updateLeaveStatus(id, 'Approved');
            renderLeaves();
            HRMS_UI.showToast(`Leave request #${id} Approved!`, 'success');
        } else if (rejectBtn) {
            const id = rejectBtn.getAttribute('data-id');
            HRMS_STORE.updateLeaveStatus(id, 'Rejected');
            renderLeaves();
            HRMS_UI.showToast(`Leave request #${id} Declined`, 'warning');
        } else if (viewBtn) {
            const id = viewBtn.getAttribute('data-id');
            const leave = HRMS_STORE.getLeaves().find(l => l.id === id);
            if (leave) {
                HRMS_UI.showModal({
                    title: `<i class="fa-solid fa-calendar-days"></i> Leave Application Details`,
                    contentHtml: `
                        <div style="background: #f8fafc; padding: 18px; border-radius: 12px; margin-bottom: 14px; font-size: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">EMPLOYEE</strong> ${leave.name} (${leave.empId || 'EMP001'})</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">DEPARTMENT</strong> ${leave.department || 'Technology'}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">LEAVE TYPE</strong> ${leave.leaveType}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">DURATION</strong> ${leave.days} Day(s)</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">FROM DATE</strong> ${leave.from}</div>
                            <div><strong style="color: #64748b; font-size: 12px; display: block;">TO DATE</strong> ${leave.to}</div>
                        </div>
                        <div style="margin-bottom: 14px;">
                            <strong style="color: #64748b; font-size: 12px; display: block; margin-bottom: 4px;">REASON / COMMENTS</strong>
                            <p style="background: #ffffff; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; font-size: 14px; color: #334155; margin: 0;">
                                ${leave.reason || 'None provided.'}
                            </p>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 12px; display: block; margin-bottom: 4px;">STATUS</strong>
                            <span class="status ${leave.status.toLowerCase()}">${leave.status}</span>
                        </div>
                    `,
                    footerHtml: `
                        <button type="button" class="modal-btn modal-btn-cancel">Close</button>
                    `
                });
            }
        }
    });

    // 5. Apply Leave Modal
    if (openApplyModalBtn) {
        openApplyModalBtn.addEventListener('click', () => {
            const employees = HRMS_STORE.getEmployees();
            const empOptions = employees.map(e => `<option value="${e.id}">${e.name} (${e.id}) - ${e.department}</option>`).join('');

            const todayStr = new Date().toISOString().split('T')[0];

            HRMS_UI.showModal({
                title: `<i class="fa-solid fa-plane-departure"></i> Apply for Leave`,
                contentHtml: `
                    <form id="applyLeaveForm" style="display: flex; flex-direction: column; gap: 14px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Employee</label>
                            <select id="modalLeaveEmp" style="width: 100%; padding: 10px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                                ${empOptions}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Leave Type</label>
                            <select id="modalLeaveType" style="width: 100%; padding: 10px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                            </select>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">From Date</label>
                                <input type="date" id="modalLeaveFrom" value="${todayStr}" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">To Date</label>
                                <input type="date" id="modalLeaveTo" value="${todayStr}" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            </div>
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Reason for Leave</label>
                            <textarea id="modalLeaveReason" rows="3" placeholder="Brief explanation of your leave request..." style="width: 100%; padding: 10px 12px; border: 1px solid #d8e5dc; border-radius: 8px; font-family: inherit; font-size: 14px;"></textarea>
                        </div>
                    </form>
                `,
                footerHtml: `
                    <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-primary" id="submitLeaveBtn">Submit Request</button>
                `
            });

            setTimeout(() => {
                const submitBtn = document.getElementById('submitLeaveBtn');
                if (submitBtn) {
                    submitBtn.addEventListener('click', () => {
                        const empId = document.getElementById('modalLeaveEmp').value;
                        const leaveType = document.getElementById('modalLeaveType').value;
                        const from = document.getElementById('modalLeaveFrom').value;
                        const to = document.getElementById('modalLeaveTo').value;
                        const reason = document.getElementById('modalLeaveReason').value.trim();

                        if (!from || !to) {
                            HRMS_UI.showToast('Please select valid From and To dates', 'danger');
                            return;
                        }

                        // Calculate days
                        const d1 = new Date(from);
                        const d2 = new Date(to);
                        const diffTime = Math.max(0, d2 - d1);
                        const days = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

                        const emp = HRMS_STORE.getEmployees().find(e => e.id === empId);

                        const newLeave = {
                            id: `LV00${HRMS_STORE.getLeaves().length + 1}`,
                            empId: empId,
                            name: emp ? emp.name : 'Employee',
                            avatar: emp ? (emp.avatar || emp.name.substring(0, 2).toUpperCase()) : 'EM',
                            department: emp ? emp.department : 'General',
                            leaveType: leaveType,
                            from: from,
                            to: to,
                            days: days,
                            reason: reason || 'Personal Leave',
                            status: 'Pending'
                        };

                        HRMS_STORE.applyLeave(newLeave);

                        const modal = document.querySelector('.hrms-modal-backdrop');
                        if (modal) modal.classList.remove('active');

                        renderLeaves();
                        HRMS_UI.showToast('Leave request submitted successfully!', 'success');
                    });
                }
            }, 100);
        });
    }

    // Initial render
    renderLeaves();
});
