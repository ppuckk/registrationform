// script.js
const form = document.getElementById('regForm');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const sex = document.getElementById('sex');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const address = document.getElementById('address');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual submission
    if(validateInputs()) {
        // If everything is valid, you can submit the form here
        alert("Registration Successful!");
        form.reset();
        resetStyles(); 
    } else {
        // ADD THIS: Shake the card if invalid
        const card = document.querySelector('.glass-container');
        card.classList.add('shake');
        
        // Remove class after animation ends so it can shake again
        setTimeout(() => {
            card.classList.remove('shake');
        }, 300);
    }
});

function validateInputs() {
    let isValid = true;

    // First Name
    if(fname.value.trim() === '') {
        setError(fname, 'First name is required');
        isValid = false;
    } else {
        setSuccess(fname);
    }

    // Last Name
    if(lname.value.trim() === '') {
        setError(lname, 'Last name is required');
        isValid = false;
    } else {
        setSuccess(lname);
    }

    // Sex
    if(sex.value === '') {
        setError(sex, 'Please select your sex');
        isValid = false;
    } else {
        setSuccess(sex);
    }

    // Username
    if(username.value.trim() === '') {
        setError(username, 'Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Phone (Simple Regex for length 10+)
    const phoneVal = phone.value.trim();
    const phoneRegex = /^[0-9+\-\s]{10,}$/;
    if(phoneVal === '') {
        setError(phone, 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phoneVal)) {
        setError(phone, 'Enter a valid phone number');
        isValid = false;
    } else {
        setSuccess(phone);
    }

    // Email
    const emailVal = email.value.trim();
    if(emailVal === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isEmail(emailVal)) {
        setError(email, 'Enter a valid email');
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Date of Birth
    if(dob.value === '') {
        setError(dob, 'Date of birth is required');
        isValid = false;
    } else {
        setSuccess(dob);
    }

    // Address
    if(address.value.trim() === '') {
        setError(address, 'Address is required');
        isValid = false;
    } else {
        setSuccess(address);
    }

    // Password
    const passVal = password.value.trim();
    if(passVal === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if(passVal.length < 8) {
        setError(password, 'Password must be at least 8 chars');
        isValid = false;
    } else {
        setSuccess(password);
    }

    return isValid;
}

// Helper functions to show success/error
function setError(input, message) {
    const inputGroup = input.closest('.input-group');
    const small = inputGroup.querySelector('small');
    
    // Add error message inside small tag
    small.innerText = message;
    
    // CHANGED: Use classList so we don't delete 'full-width'
    inputGroup.classList.add('error');     // Add the error class
    inputGroup.classList.remove('success'); // Remove success class if it was there
}

function setSuccess(input) {
    const inputGroup = input.closest('.input-group');
    
    // CHANGED: Use classList
    inputGroup.classList.add('success');    // Add success class
    inputGroup.classList.remove('error');   // Remove error class
}

function resetStyles() {
    const inputGroups = document.querySelectorAll('.input-group');
    
    inputGroups.forEach(group => {
        // CHANGED: Only remove the validation classes, keep layout classes
        group.classList.remove('error', 'success');
        
        // Optional: clear error messages text if you want
        const small = group.querySelector('small');
        if(small) small.innerText = '';
    });
}

// Simple Email Regex
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
