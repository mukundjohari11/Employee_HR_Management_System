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
