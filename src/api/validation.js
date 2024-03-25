export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\+\d{1,3}\(\d{1,3}\)\d{7}$/;
    return phoneRegex.test(phone);
};

export const validateName = (name) => {
    const nameRegex = /^[^\d]{1,40}$/;
    return nameRegex.test(name);
};

export const validateConfirmPassword = (confirmPassword, password) => {
    return confirmPassword === password;
}

export const validateForm = (name, email, password, phone) => {
    return validateName(name) && validateEmail(email) && validatePassword(password) && validatePhone(phone);
}