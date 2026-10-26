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
