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
