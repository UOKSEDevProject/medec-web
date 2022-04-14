import {validateAddress, validateFirstName, validateLastName, validatePhone} from "./clientSideValidation";
import {CHECKOUT_FIELDS} from "../../../const/const";

export const setErrors=(event, errors)=> {
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
    }
    return errors;
}

export const checkForm=(elements)=> {
    let allFieldsFilled = true;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].value === "") {
            allFieldsFilled = false;
            break;
        }
    }
    return allFieldsFilled;
}

export const stringFormatter=(str)=>{
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
        return  match[1] + ' ' + match[2] + ' ' + match[3];
    };
    return null;
};