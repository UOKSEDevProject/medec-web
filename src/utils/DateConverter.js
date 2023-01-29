export const convertDateObjectToStringDate = (date) => {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    const strDate =  year + '-' + month + '-' + day;

    return (strDate);
}

export const convertStringDateToDateObject = (date) => {
    return new Date(date);
}