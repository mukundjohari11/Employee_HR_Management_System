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
 * HRMS Employees Controller
 * Manages employee rendering, real-time multi-filter, detail & edit modals, deletion DOM animations, and CSV export.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container tbody');
    const searchInput = document.getElementById('empSearchInput');
    const deptFilter = document.getElementById('empDeptFilter');
    const statusFilter = document.getElementById('empStatusFilter');
    const countText = document.getElementById('empCountText');
    const exportBtn = document.getElementById('exportBtn');

    // Render Employees Table from HRMS_STORE
    function renderTable() {
        const employees = HRMS_STORE.getEmployees();
        tableBody.innerHTML = '';

        if (employees.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 32px; color: #64748b;">
                        <i class="fas fa-users-slash" style="font-size: 28px; margin-bottom: 10px; display: block;"></i>
                        No employees found in directory.
                    </td>
                </tr>
            `;
            if (countText) countText.textContent = '0 employees found';
            return;
        }

        employees.forEach(emp => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', emp.id);
            tr.setAttribute('data-name', emp.name.toLowerCase());
            tr.setAttribute('data-dept', emp.department);
            tr.setAttribute('data-status', emp.status);

            const statusClass = emp.status.toLowerCase().replace(' ', '-');

            tr.innerHTML = `
                <td>
                    <div class="employee">
                        <div class="employee-avatar">${emp.avatar || emp.name.substring(0, 2).toUpperCase()}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <small>${emp.id}</small>
                        </div>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td><small>${emp.email}</small></td>
                <td>${emp.joiningDate}</td>
                <td>
                    <span class="status ${statusClass}">${emp.status}</span>
                </td>
                <td>
                    <div class="row-actions">
                        <button class="btn-icon action-view" title="View Profile" data-id="${emp.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon action-edit" title="Edit Employee" data-id="${emp.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger action-delete" title="Delete" data-id="${emp.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(tr);
        });

        applyFilters();
    }

    // Filter Logic
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const dept = deptFilter ? deptFilter.value : 'All';
        const status = statusFilter ? statusFilter.value : 'All';

        const rows = tableBody.querySelectorAll('tr[data-id]');
        let visibleCount = 0;

        rows.forEach(row => {
            const name = row.getAttribute('data-name') || '';
            const id = (row.getAttribute('data-id') || '').toLowerCase();
            const rowDept = row.getAttribute('data-dept');
            const rowStatus = row.getAttribute('data-status');

            const matchesQuery = !query || name.includes(query) || id.includes(query);
            const matchesDept = dept === 'All' || rowDept === dept;
            const matchesStatus = status === 'All' || rowStatus === status;

            if (matchesQuery && matchesDept && matchesStatus) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        if (countText) {
            countText.textContent = `${visibleCount} employee${visibleCount === 1 ? '' : 's'} found`;
        }
    }

    // Attach Filter Event Listeners
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (deptFilter) deptFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);

    // Event Delegation for Table Actions
    tableBody.addEventListener('click', (e) => {
        const viewBtn = e.target.closest('.action-view');
        const editBtn = e.target.closest('.action-edit');
        const deleteBtn = e.target.closest('.action-delete');

        if (viewBtn) {
            const id = viewBtn.getAttribute('data-id');
            const emp = HRMS_STORE.getEmployees().find(item => item.id === id);
            if (emp) showViewModal(emp);
        } else if (editBtn) {
            const id = editBtn.getAttribute('data-id');
            const emp = HRMS_STORE.getEmployees().find(item => item.id === id);
            if (emp) showEditModal(emp);
        } else if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            const emp = HRMS_STORE.getEmployees().find(item => item.id === id);
            if (emp) confirmDelete(emp);
        }
    });

    // View Profile Modal
    function showViewModal(emp) {
        HRMS_UI.showModal({
            title: `<i class="fas fa-id-badge"></i> Employee Profile`,
            contentHtml: `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="width: 72px; height: 72px; border-radius: 50%; background: #16a34a; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 26px; font-weight: bold; margin-bottom: 10px;">
                        ${emp.avatar || emp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 style="margin-bottom: 4px; color: #1f2937;">${emp.name}</h3>
                    <p style="color: #64748b; font-size: 14px;">${emp.position} &bull; <span style="color: #16a34a; font-weight: 600;">${emp.department}</span></p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 14px; background: #f8fafc; padding: 16px; border-radius: 12px;">
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">EMPLOYEE ID</strong> ${emp.id}</div>
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">STATUS</strong> <span style="color: #16a34a; font-weight: 600;">${emp.status}</span></div>
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">EMAIL</strong> ${emp.email}</div>
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">PHONE</strong> ${emp.phone || '+91 98765 00000'}</div>
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">JOINING DATE</strong> ${emp.joiningDate}</div>
                    <div><strong style="color: #64748b; font-size: 12px; display: block;">BASIC SALARY</strong> ₹${(emp.salary || 65000).toLocaleString('en-IN')}</div>
                </div>
            `,
            footerHtml: `
                <button type="button" class="modal-btn modal-btn-cancel">Close</button>
            `
        });
    }

    // Edit Employee Modal
    function showEditModal(emp) {
        HRMS_UI.showModal({
            title: `<i class="fas fa-user-edit"></i> Edit ${emp.name}`,
            contentHtml: `
                <form id="editEmpForm" style="display: flex; flex-direction: column; gap: 14px;">
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Designation / Position</label>
                        <input type="text" id="editPosition" value="${emp.position}" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Department</label>
                        <select id="editDepartment" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            <option value="Technology" ${emp.department === 'Technology' ? 'selected' : ''}>Technology</option>
                            <option value="Human Resources" ${emp.department === 'Human Resources' ? 'selected' : ''}>Human Resources</option>
                            <option value="Finance" ${emp.department === 'Finance' ? 'selected' : ''}>Finance</option>
                            <option value="Marketing" ${emp.department === 'Marketing' ? 'selected' : ''}>Marketing</option>
                            <option value="Operations" ${emp.department === 'Operations' ? 'selected' : ''}>Operations</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Status</label>
                        <select id="editStatus" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            <option value="Active" ${emp.status === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="On Leave" ${emp.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                            <option value="Inactive" ${emp.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                </form>
            `,
            footerHtml: `
                <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                <button type="button" class="modal-btn modal-btn-primary" id="saveEditBtn">Save Changes</button>
            `
        });

        setTimeout(() => {
            const saveBtn = document.getElementById('saveEditBtn');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const newPosition = document.getElementById('editPosition').value.trim();
                    const newDept = document.getElementById('editDepartment').value;
                    const newStatus = document.getElementById('editStatus').value;

                    if (!newPosition) {
                        HRMS_UI.showToast('Please enter a position', 'danger');
                        return;
                    }

                    // Update in store
                    const data = HRMS_STORE.getData();
                    const target = data.employees.find(e => e.id === emp.id);
                    if (target) {
                        target.position = newPosition;
                        target.department = newDept;
                        target.status = newStatus;
                        HRMS_STORE.saveData(data);
                    }

                    const modal = document.querySelector('.hrms-modal-backdrop');
                    if (modal) modal.classList.remove('active');

                    renderTable();
                    HRMS_UI.showToast(`Updated record for ${emp.name}`, 'success');
                });
            }
        }, 100);
    }

    // Delete Confirmation
    function confirmDelete(emp) {
        HRMS_UI.showModal({
            title: `<i class="fas fa-trash-alt" style="color: #ef4444;"></i> Confirm Deletion`,
            contentHtml: `
                <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                    Are you sure you want to remove <strong>${emp.name}</strong> (${emp.id})? This will also remove associated payroll and attendance records.
                </p>
            `,
            footerHtml: `
                <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                <button type="button" class="modal-btn modal-btn-danger" id="confirmDeleteBtn">Delete Employee</button>
            `
        });

        setTimeout(() => {
            const confirmBtn = document.getElementById('confirmDeleteBtn');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    const row = tableBody.querySelector(`tr[data-id="${emp.id}"]`);
                    if (row) {
                        row.style.transition = 'all 0.4s ease';
                        row.style.opacity = '0';
                        row.style.transform = 'translateX(20px)';
                        setTimeout(() => {
                            HRMS_STORE.deleteEmployee(emp.id);
                            renderTable();
                        }, 350);
                    }

                    const modal = document.querySelector('.hrms-modal-backdrop');
                    if (modal) modal.classList.remove('active');

                    HRMS_UI.showToast(`Removed ${emp.name} from directory`, 'warning');
                });
            }
        }, 100);
    }

    // Export List to CSV via DOM
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const employees = HRMS_STORE.getEmployees();
            let csvContent = 'ID,Name,Department,Position,Email,JoiningDate,Status\n';

            employees.forEach(e => {
                csvContent += `"${e.id}","${e.name}","${e.department}","${e.position}","${e.email}","${e.joiningDate}","${e.status}"\n`;
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `hrms_employees_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            HRMS_UI.showToast('Employee directory exported as CSV', 'success');
        });
    }

    // Initial render
    renderTable();
});
