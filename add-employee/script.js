/**
 * HRMS Add Employee Controller
 * Handles auto-generated IDs, image upload preview, validation, and saving to store.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addEmployeeForm');
    const photoInput = document.getElementById('photoInput');
    const avatarImg = document.getElementById('avatarImg');
    const defaultAvatarIcon = document.getElementById('defaultAvatarIcon');

    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const empIdInput = document.getElementById('empId');
    const departmentInput = document.getElementById('department');
    const positionInput = document.getElementById('position');
    const joiningDateInput = document.getElementById('joiningDate');
    const salaryInput = document.getElementById('basicSalary');
    const allowancesInput = document.getElementById('allowances');
    const saveBtn = document.getElementById('saveBtn');

    // 1. Generate Next Employee ID
    const employees = HRMS_STORE.getEmployees();
    const nextNum = employees.length + 124;
    if (empIdInput) {
        empIdInput.value = `EMP00${nextNum}`;
    }

    // 2. Default Joining Date to Today
    if (joiningDateInput && !joiningDateInput.value) {
        joiningDateInput.value = new Date().toISOString().split('T')[0];
    }

    // 3. Live Image Upload Preview via FileReader
    if (photoInput) {
        photoInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    avatarImg.src = e.target.result;
                    avatarImg.style.display = 'block';
                    defaultAvatarIcon.style.display = 'none';
                    HRMS_UI.showToast('Profile photo uploaded', 'info');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Live Error Clearance
    [fullNameInput, phoneInput, emailInput, departmentInput, positionInput, joiningDateInput, salaryInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            const errDiv = document.getElementById('err' + input.id.charAt(0).toUpperCase() + input.id.slice(1));
            if (errDiv) errDiv.textContent = '';
        });
    });

    // 5. Form Validation & Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            function setError(input, errDivId, msg) {
                input.classList.add('input-error');
                const errDiv = document.getElementById(errDivId);
                if (errDiv) errDiv.textContent = msg;
                isValid = false;
            }

            // Name
            const name = fullNameInput.value.trim();
            if (!name || name.length < 2) {
                setError(fullNameInput, 'errFullName', 'Please enter a valid full name (min 2 characters).');
            }

            // Phone
            const phone = phoneInput.value.trim();
            if (!phone || phone.replace(/\D/g, '').length < 10) {
                setError(phoneInput, 'errPhone', 'Please enter a valid 10-digit phone number.');
            }

            // Email
            const email = emailInput.value.trim();
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(emailInput, 'errEmail', 'Please enter a valid email address.');
            }

            // Department
            const dept = departmentInput.value;
            if (!dept) {
                setError(departmentInput, 'errDepartment', 'Please select a department.');
            }

            // Position
            const position = positionInput.value.trim();
            if (!position) {
                setError(positionInput, 'errPosition', 'Please enter a job title / designation.');
            }

            // Joining Date
            const joiningDate = joiningDateInput.value;
            if (!joiningDate) {
                setError(joiningDateInput, 'errJoiningDate', 'Please select a joining date.');
            }

            // Salary
            const salary = parseFloat(salaryInput.value);
            if (isNaN(salary) || salary < 10000) {
                setError(salaryInput, 'errSalary', 'Basic salary must be at least ₹10,000.');
            }

            if (!isValid) {
                HRMS_UI.showToast('Please correct the highlighted fields.', 'danger');
                return;
            }

            // Disable button during save
            saveBtn.disabled = true;
            saveBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`;

            // Initials for avatar fallback
            const avatarText = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

            const newEmployee = {
                id: empIdInput.value,
                code: `EMP00${employees.length + 1}`,
                name: name,
                avatar: avatarText,
                email: email,
                phone: phone,
                department: dept,
                position: position,
                joiningDate: joiningDate,
                status: 'Active',
                salary: salary,
                allowances: parseFloat(allowancesInput.value) || 8000,
                deductions: Math.round(salary * 0.08)
            };

            setTimeout(() => {
                HRMS_STORE.addEmployee(newEmployee);
                HRMS_UI.showToast(`Employee ${name} added successfully!`, 'success');

                setTimeout(() => {
                    window.location.href = '../employees/index.html';
                }, 900);
            }, 600);
        });
    }
});
