import {
    validateAddress,
    validateFirstName,
    validateLastName,
    validateFullName,
    validatePhone,
    validateEmail,
    validateMedicalCouncilNumber,
    validateGender,
    validateSpecialization,
    validateTitle,
    validateCountry,
    validateBirtDate,
    validateBloodGroup,
    validateName,
    validateAge,
    validatePassword, validateDisName, validateIName
} from "./clientSideValidation";
import {CHECKOUT_FIELDS} from "../constants/constants";

export const setErrors = (event, errors) => {
    switch (event.target.name) {
        case  CHECKOUT_FIELDS.FIRST_NAME:
            validateFirstName(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.LAST_NAME:
            validateLastName(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.ADDRESS:
            validateAddress(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.PHONE_NUMBER:
            validatePhone(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.Full_Name:
            validateFullName(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.Email:
            validateEmail(event.target.value, errors);
            break;
        case CHECKOUT_FIELDS.MedicalCouncilNumber:
            validateMedicalCouncilNumber(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Gender:
            validateGender(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Specialization:
            validateSpecialization(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Title:
            validateTitle(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Country:
            validateCountry(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Birthdate:
            validateBirtDate(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.BloodGroup:
            validateBloodGroup(event.target.value, errors)
            break;
        case CHECKOUT_FIELDS.Name:
            validateName(event.target.value, errors)
            break;
        case  CHECKOUT_FIELDS.Age:
            validateAge(event.target.value, errors)
        case CHECKOUT_FIELDS.PASSWORD:
            validatePassword(event.target.value,errors)
            break;
        case 'disName':
            validateDisName(event.target.value, errors);
            break;
        case 'iName':
            validateIName(event.target.value, errors);
            break;
    }
    return errors;
}

export const checkForm = (elements) => {
    let allFieldsFilled = true;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].value === "") {
            allFieldsFilled = false;
            break;
        }
    }
    return allFieldsFilled;
}

export const stringFormatter = (str) => {
    const lowerCaseString = str.replace(/\s+/g, ' ').trim().toLowerCase();
    const array = lowerCaseString.split(" ");
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return array.join(" ");
}

export const formatPhoneNumber = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return null;
};

export const convertToNameWithInitials = (str) => {
    const array = stringFormatter(str).split(" ");
    for (let i = 0; i < array.length-1; i++) {
        array[i] = array[i].charAt(0);
    }
    return array.join('.');
}
export const CreateDisplayName = (str) => {
    const array = stringFormatter(str).split(" ");
    return array[0];
}