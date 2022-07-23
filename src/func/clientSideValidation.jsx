export function validateFirstName(firstNameValue, errors) {
    if (firstNameValue === '') {
        errors["firstName"] = "Please fill in your first name";
    } else if (typeof firstNameValue !== "undefined") {
        if (!firstNameValue.match(/^[a-zA-Z ]{2,17}$/)) {
            errors["firstName"] = "Please enter a valid name, avoid numbers and special characters";
        } else {
            delete errors.firstName;
        }
    }
}

export function validateLastName(lastNameValue, errors) {
    if (lastNameValue === '') {
        errors["lastName"] = "Please fill in your last name";
    } else if (typeof lastNameValue !== "undefined") {
        if (!lastNameValue.match(/^[a-zA-Z ]{2,17}$/)) {
            errors["lastName"] = "Please enter a valid name, avoid numbers and special characters";
        } else {
            delete errors.lastName;
        }
    }
}

export function validateFullName(fullNameValue, errors) {
    if (fullNameValue === '') {
        errors["fullName"] = "Please fill in your name";
    } else if (typeof fullNameValue !== "undefined") {
        if (!fullNameValue.match(/^[a-zA-Z ]{2,17}$/)) {
            errors["fullName"] = "Please enter a valid name, avoid numbers and special characters";
        } else {
            delete errors.fullName;
        }
    }
}

export function validateAddress(addressValue, errors) {
    if (addressValue === '' || addressValue === undefined) {
        errors["address"] = "Please enter a valid street address";
    } else if (!addressValue.match(/^[a-zA-Z0-9.\/#'":_ -, ]{1,100}$/)) {
        errors["address"] = "Please enter a valid street address";
    } else {
        delete errors.address;
    }
}

export function validatePhone(phoneNumberValue, errors) {
    if (phoneNumberValue === '' || phoneNumberValue === undefined) {
        errors["phoneNumber"] = "Please fill in your phone number";
    } else if (typeof phoneNumberValue !== "undefined") {
        if (!phoneNumberValue.match(/(\d{3} )(\d{3} )(\d{3})$/)) {
            errors["phoneNumber"] = "Phone number should contain only 9 numbers";
        } else {
            delete errors.phoneNumber;
        }
    }
}

export function validateEmail(emailValue, errors) {
    if (emailValue === '') {
        errors["email"] = "Please fill in your email";
    } else if (typeof emailValue !== "undefined") {
        if (!emailValue.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            errors["email"] = "Please enter a valid email";
        } else {
            delete errors.email;
        }
    }
}

export function validateMedicalCouncilNumber(mcValue, errors) {
    if (mcValue === '') {
        errors["medicalCouncilNumber"] = "Please fill in medical council number";
    } else if (typeof mcValue !== "undefined") {
        if (!mcValue.match(/^[a-zA-Z0-9.\/_ - ]{1,100}$/)) {
            errors["medicalCouncilNumber"] = "Please enter a valid medical council number";
        } else {
            delete errors.medicalCouncilNumber;
        }
    }
}

export function validateGender(value, errors) {
    if (value === '') {
        errors["gender"] = "Please select a gender";
    } else {
        delete errors.gender;
    }
}

export function validateSpecialization(value, errors) {
    if (value === '') {
        errors["specialization"] = "Please select a specialization";
    } else {
        delete errors.specialization;
    }
}

export function validateBirtDate(value, errors) {
    if (value === '') {
        errors["birthDate"] = "Please select a birth date";
    } else {
        delete errors.birthDate;
    }
}

export function validateBloodGroup(value, errors) {
    if (value === '') {
        errors["bloodGroup"] = "Please select a blood group";
    } else {
        delete errors.birthDate;
    }
}

export function validateTitle(value, errors) {
    if (value === '') {
        errors["tittle"] = "Please select tittle";
    } else {
        delete errors.tittle;
    }
}

export function validateCountry(value, errors) {
    if (value === '') {
        errors["country"] = "Please select country";
    } else {
        delete errors.country;
    }
}

export function validateName(nameValue, errors) {
    if (nameValue === '' || nameValue === undefined) {
        errors["name"] = "Please fill in patient name";
    } else if (typeof nameValue !== "undefined") {
        if (!nameValue.match(/^[a-zA-Z ]{2,30}$/)) {
            errors["name"] = "Please enter a valid name, avoid numbers and special characters";
        } else {
            delete errors.name;
        }
    }
}

export function validateAge(ageValue, errors) {
    if (ageValue === '' || ageValue === undefined) {
        errors["age"] = "Please fill in patient age";
    } else if (ageValue < 1 || ageValue > 200) {
        errors["age"] = "Age should be between 1 and 200";
    } else {
        delete errors.age;
    }
}

export function validatePassword(passwordValue, errors) {
    if (passwordValue === '') {
        errors["password"] = "Please enter your password";
    } else if (typeof passwordValue !== "undefined") {
        if (!passwordValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!%#*?&]{8,}$/)) {
            errors["password"] = "your password should include Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        } else {
            delete errors.password;
        }
    }
}
export function validatePassword2(passwordValue1, passwordValue2, errors) {
    if (passwordValue1 === '') {
        errors["password2"] = "Please re-enter your password";
    } else if (typeof passwordValue1 !== "undefined") {
        if (passwordValue1!==passwordValue2) {
            errors["password2"] = "password miss match";
        } else {
            delete errors.password2;
        }
    }
}