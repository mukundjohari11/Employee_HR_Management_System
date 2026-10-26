/**
 * HRMS Attendance Controller
 * Handles live attendance table rendering, status filtering, date switcher, "Mark Attendance" modal, and live stats recalculation.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container tbody');
    const searchInput = document.getElementById('attendanceSearch');
    const statusFilter = document.getElementById('attendanceStatusFilter');
    const dateInput = document.getElementById('attendanceDate');
    const openMarkModalBtn = document.getElementById('openMarkModal');
    const currentDateDisplay = document.getElementById('currentDateDisplay');
    const exportBtn = document.getElementById('exportAttendanceBtn');
    const subtext = document.getElementById('attendanceSubtext');

    // 1. Initialize Date Input with today's date
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.value = today;
        dateInput.addEventListener('change', () => {
            const formatted = new Date(dateInput.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
            if (currentDateDisplay) currentDateDisplay.textContent = formatted;
            if (subtext) subtext.textContent = `Attendance for ${formatted}`;
            renderAttendance();
        });
    }

    // 2. Render Attendance Records
    function renderAttendance() {
        const records = HRMS_STORE.getAttendance();
        tableBody.innerHTML = '';

        if (records.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 28px; color: #64748b;">
                        <i class="fas fa-calendar-xmark" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                        No attendance records found for this date.
                    </td>
                </tr>
            `;
            updateStats([]);
            return;
        }

        records.forEach(rec => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-emp-id', rec.empId);
            tr.setAttribute('data-name', rec.name.toLowerCase());
            tr.setAttribute('data-status', rec.status);

            const statusClass = rec.status.toLowerCase().replace(' ', '-');
            const avatar = rec.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            tr.innerHTML = `
                <td>
                    <div class="employee">
                        <div class="employee-avatar">${avatar}</div>
                        <div>
                            <strong>${rec.name}</strong>
                            <small>${rec.empId}</small>
                        </div>
                    </div>
                </td>
                <td>${rec.department}</td>
                <td>${rec.checkIn || '--:--'}</td>
                <td>${rec.checkOut || '--:--'}</td>
                <td>${rec.hours || '--'}</td>
                <td>
                    <span class="status ${statusClass}" style="cursor: pointer;" title="Click to quick-toggle status" data-id="${rec.empId}">
                        ${rec.status}
                    </span>
                </td>
            `;

            tableBody.appendChild(tr);
        });

        applyFilters();
        updateStats(records);
    }

    // 3. Filter Records
    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const status = statusFilter ? statusFilter.value : 'All';

        const rows = tableBody.querySelectorAll('tr[data-emp-id]');
        let count = 0;

        rows.forEach(row => {
            const name = row.getAttribute('data-name') || '';
            const empId = (row.getAttribute('data-emp-id') || '').toLowerCase();
            const rowStatus = row.getAttribute('data-status');

            const matchesQuery = !query || name.includes(query) || empId.includes(query);
            const matchesStatus = status === 'All' || rowStatus === status;

            if (matchesQuery && matchesStatus) {
                row.style.display = '';
                count++;
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);

    // 4. Update Stat Cards dynamically
    function updateStats(records) {
        let present = 0;
        let absent = 0;
        let late = 0;
        let onLeave = 0;

        records.forEach(r => {
            if (r.status === 'Present') present++;
            else if (r.status === 'Absent') absent++;
            else if (r.status === 'Late') late++;
            else if (r.status === 'On Leave' || r.status === 'Leave') onLeave++;
        });

        const statCards = document.querySelectorAll('.stats .stat-card h2');
        if (statCards.length >= 4) {
            statCards[0].textContent = present;
            statCards[1].textContent = absent;
            statCards[2].textContent = late;
            statCards[3].textContent = onLeave;
        }
    }

    // 5. Quick Status Toggle on Badge Click
    tableBody.addEventListener('click', (e) => {
        const statusBadge = e.target.closest('.status');
        if (statusBadge && statusBadge.getAttribute('data-id')) {
            const empId = statusBadge.getAttribute('data-id');
            const currentStatus = statusBadge.textContent.trim();
            const nextStatus = currentStatus === 'Present' ? 'Absent' : (currentStatus === 'Absent' ? 'Late' : 'Present');

            HRMS_STORE.markAttendance(empId, nextStatus);
            renderAttendance();
            HRMS_UI.showToast(`Updated status to ${nextStatus}`, 'info');
        }
    });

    // 6. Mark Attendance Modal
    if (openMarkModalBtn) {
        openMarkModalBtn.addEventListener('click', () => {
            const employees = HRMS_STORE.getEmployees();
            const options = employees.map(e => `<option value="${e.id}">${e.name} (${e.id}) - ${e.department}</option>`).join('');

            HRMS_UI.showModal({
                title: `<i class="fas fa-clipboard-check"></i> Mark Employee Attendance`,
                contentHtml: `
                    <form id="markAttendanceForm" style="display: flex; flex-direction: column; gap: 14px;">
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Select Employee</label>
                            <select id="modalEmpSelect" style="width: 100%; padding: 10px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                                ${options}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Attendance Status</label>
                            <select id="modalStatusSelect" style="width: 100%; padding: 10px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                                <option value="Present">Present</option>
                                <option value="Late">Late</option>
                                <option value="Absent">Absent</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Check In</label>
                                <input type="time" id="modalCheckIn" value="09:15" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Check Out</label>
                                <input type="time" id="modalCheckOut" value="18:00" style="width: 100%; padding: 8px 12px; border: 1px solid #d8e5dc; border-radius: 8px;">
                            </div>
                        </div>
                    </form>
                `,
                footerHtml: `
                    <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                    <button type="button" class="modal-btn modal-btn-primary" id="saveMarkBtn">Save Attendance</button>
                `
            });

            setTimeout(() => {
                const saveBtn = document.getElementById('saveMarkBtn');
                if (saveBtn) {
                    saveBtn.addEventListener('click', () => {
                        const empId = document.getElementById('modalEmpSelect').value;
                        const status = document.getElementById('modalStatusSelect').value;
                        const checkIn = document.getElementById('modalCheckIn').value;
                        const checkOut = document.getElementById('modalCheckOut').value;

                        HRMS_STORE.markAttendance(empId, status, checkIn, checkOut);

                        const modal = document.querySelector('.hrms-modal-backdrop');
                        if (modal) modal.classList.remove('active');

                        renderAttendance();
                        HRMS_UI.showToast(`Marked ${status} for ${empId}`, 'success');
                    });
                }
            }, 100);
        });
    }

    // 7. Export Attendance Report
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const records = HRMS_STORE.getAttendance();
            let csv = 'Employee ID,Name,Department,CheckIn,CheckOut,Hours,Status,Date\n';
            records.forEach(r => {
                csv += `"${r.empId}","${r.name}","${r.department}","${r.checkIn}","${r.checkOut}","${r.hours}","${r.status}","${r.date || today}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `hrms_attendance_${today}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            HRMS_UI.showToast('Attendance report exported', 'success');
        });
    }

    // Initial load
    renderAttendance();
});
