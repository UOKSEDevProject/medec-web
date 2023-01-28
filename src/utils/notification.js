import { toast } from 'react-toastify';;

export const notifyMessage = (message,type) => {
  //type info-0, success-1, warn-2, error-3
  let alertTypes = ['info','success','warn','error'];
  let selectedType;

  if(type==1){
    selectedType = alertTypes[1];
  }else if(type==2){
    selectedType = alertTypes[2];
  }else if(type==3){
    selectedType = alertTypes[3];
  }else {
    selectedType = alertTypes[0];
  }

  toast[selectedType](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
