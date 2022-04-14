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

export function validateAddress(addressValue, errors) {
    if (addressValue === '') {
        errors["address"] = "Please enter a valid street address";
    }
    else if (!addressValue.match(/^[a-zA-Z0-9.\/#'":_ -, ]{1,100}$/)) {
        errors["address"] = "Please enter a valid street address";
    }
    else {
        delete errors.address;
    }
}

export function validatePhone(phoneNumberValue, errors) {
    if (phoneNumberValue === '') {
        errors["phoneNumber"] = "Please fill in your phone number";
    } else if (typeof phoneNumberValue !== "undefined") {
        if (!phoneNumberValue.match(/(\d{3} )(\d{3} )(\d{3})$/)) {
            errors["phoneNumber"] = "Phone number should contain only 9 numbers";
        } else {
            delete errors.phoneNumber;
        }
    }
}