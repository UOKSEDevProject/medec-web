export const getAge = (birthDate) => {
    if(birthDate){
        return (new Date(Date.now()).getFullYear() - new Date(birthDate).getFullYear());
    }else{
        return (0);
    }
}