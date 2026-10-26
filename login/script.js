/**
 * HRMS Login Controller
 * Handles DOM-based form validation, password toggling, mock authentication, and session handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const emailBox = document.getElementById('emailBox');
    const passwordBox = document.getElementById('passwordBox');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const autofillDemo = document.getElementById('autofillDemo');
    const submitBtn = document.getElementById('submitBtn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // 1. Password Visibility Toggle via DOM
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        eyeIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });

    // 2. Demo Autofill Helper
    autofillDemo.addEventListener('click', () => {
        emailInput.value = 'admin@hrms.com';
        passwordInput.value = 'admin123';
        clearErrors();
        HRMS_UI.showToast('Demo credentials filled!', 'info');
    });

    // 3. Clear errors on input
    emailInput.addEventListener('input', () => {
        emailBox.classList.remove('error');
        emailError.textContent = '';
    });

    passwordInput.addEventListener('input', () => {
        passwordBox.classList.remove('error');
        passwordError.textContent = '';
    });

    function clearErrors() {
        emailBox.classList.remove('error');
        passwordBox.classList.remove('error');
        emailError.textContent = '';
        passwordError.textContent = '';
    }

    // 4. Form Submit & Validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Email validation
        if (!email) {
            emailBox.classList.add('error');
            emailError.textContent = 'Please enter your email address.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailBox.classList.add('error');
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Password validation
        if (!password) {
            passwordBox.classList.add('error');
            passwordError.textContent = 'Please enter your password.';
            isValid = false;
        } else if (password.length < 6) {
            passwordBox.classList.add('error');
            passwordError.textContent = 'Password must be at least 6 characters.';
            isValid = false;
        }

        if (!isValid) {
            HRMS_UI.showToast('Please correct the highlighted errors.', 'danger');
            return;
        }

        // Button loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;

        setTimeout(() => {
            // Authentication check (accepts admin@hrms.com / admin123 or any valid format for demonstration)
            if (password === 'admin123' || password.length >= 6) {
                localStorage.setItem('HRMS_AUTH_TOKEN', 'mock-session-token-' + Date.now());
                HRMS_UI.showToast('Login successful! Redirecting to Dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = '../dashboard/index.html';
                }, 800);
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                passwordBox.classList.add('error');
                passwordError.textContent = 'Incorrect password. Try demo: admin123';
                HRMS_UI.showToast('Authentication failed. Check your password.', 'danger');
            }
        }, 600);
    });

    // 5. Forgot Password Dialog
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        HRMS_UI.showModal({
            title: '<i class="fa-solid fa-key"></i> Reset Password',
            contentHtml: `
                <p style="color: #64748b; margin-bottom: 16px; font-size: 14px;">
                    Enter your registered employee email address. We'll send instructions to reset your password.
                </p>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #37483d;">Work Email</label>
                    <input type="email" id="resetEmail" value="${emailInput.value}" placeholder="name@hrms.com" style="width: 100%; padding: 10px 14px; border: 1px solid #d8e5dc; border-radius: 8px; font-size: 14px;">
                </div>
            `,
            footerHtml: `
                <button type="button" class="modal-btn modal-btn-cancel">Cancel</button>
                <button type="button" class="modal-btn modal-btn-primary" id="sendResetBtn">Send Reset Link</button>
            `
        });

        setTimeout(() => {
            const sendBtn = document.getElementById('sendResetBtn');
            if (sendBtn) {
                sendBtn.addEventListener('click', () => {
                    const rEmail = document.getElementById('resetEmail').value.trim();
                    if (!rEmail || !rEmail.includes('@')) {
                        HRMS_UI.showToast('Please enter a valid email address', 'danger');
                        return;
                    }
                    const modal = document.querySelector('.hrms-modal-backdrop');
                    if (modal) modal.classList.remove('active');
                    HRMS_UI.showToast(`Reset link dispatched to ${rEmail}`, 'success');
                });
            }
        }, 100);
    });
});
