const successMsg = document.querySelector('#success_msg');
const failureMsg = document.querySelector('#failure_msg');
const form = document.querySelector('#form');
const formTitle = document.querySelector('#form_title');
const submitBtn = document.querySelector('#submit_btn');
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#tel');
const emailInput = document.querySelector('#E-mail');
const message = document.querySelector('#message');

submitBtn.addEventListener('click',()=>{
  if((nameInput.value!="")&&(phoneInput.value!="")&&(emailInput.value!="")&&(message.value!="")){
    form.innerHTML = "";
    form.style.border = "none";
    formTitle.textContent = "";
    successMsg.textContent = "Thank you, we will reach out to you soon!";
    successMsg.style.marginTop = "4rem";
    successMsg.style.marginBottom = "4rem";
  }
  else if((nameInput.value="")){
    failureMsg.textContent = "Please fill in your name!"
  }
  else if((phoneInput.value="")){
    failureMsg.textContent = "Please fill in your phone number!"
  }
  else if((emailInput.value="")){
    failureMsg.textContent = "Please fill in your email!"
  }
  else if((message.value="")){
    failureMsg.textContent = "Please fill in the message!"
  }
  
})