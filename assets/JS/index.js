let appointments1 = JSON.parse(Cookies?.get("appointments") || "[]") || [];
let isEditing = false;

const userName=document.getElementById("userName")
const userLastName=document.getElementById("userLastName")
const userEmail=document.getElementById("userEmail")
const userID=document.getElementById("userID")
const userPhone=document.getElementById("userPhone")
const userDate=document.getElementById("userDate")
const userHour=document.getElementById("userHour")
const userService=document.getElementById("userService")

const invalidFeedbackName=document.getElementById("invalidFeedbackName")
const invalidFeedbackLastName=document.getElementById("invalidFeedbackLastName")
const invalidFeedbackEmail=document.getElementById("invalidFeedbackEmail")
const invalidFeedbackID=document.getElementById("invalidFeedbackID")
const invalidFeedbackPhone=document.getElementById("invalidFeedbackPhone")
const invalidFeedbackDate=document.getElementById("invalidFeedbackDate")
const invalidFeedbackHour=document.getElementById("invalidFeedbackHour")
const invalidFeedbackService=document.getElementById("invalidFeedbackService")

if (invalidFeedbackName) {
    invalidFeedbackName.style.display="none"
}
if (invalidFeedbackLastName) {
    invalidFeedbackLastName.style.display="none"
}
if (invalidFeedbackEmail) {
    invalidFeedbackEmail.style.display="none"
}
if (invalidFeedbackID) {
    invalidFeedbackID.style.display="none"
}
if (invalidFeedbackPhone) {
    invalidFeedbackPhone.style.display="none"
}
if (invalidFeedbackDate) {
    invalidFeedbackDate.style.display="none"
}
if (invalidFeedbackHour) {
    invalidFeedbackHour.style.display="none"
}
if (invalidFeedbackService) {
    invalidFeedbackService.style.display="none"
}

const btnSubmit=document.getElementById("btn_submit")
var validName=false
var validLastName=false
var validEmail=false
var validID=false
var validPhone=false
var validDate=false
var validHour=false
var validService=false

var constantValidate

function mostrar() {
    constantValidate=setInterval(()=>{
        if(userName.value.length<10){
            userName.classList.add('is-invalid')
            invalidFeedbackName.style.display="block"
            validName=false
        }
        else{
            userName.classList.remove('is-invalid')
            userName.classList.add('is-valid')
            invalidFeedbackName.style.display="none"
            validName=true
        }
    

        if(userLastName.value.length<10){
            userLastName.classList.add('is-invalid')
            invalidFeedbackLastName.style.display="block"
            validLastName=false
        }
        else{
            userLastName.classList.remove('is-invalid')
            userLastName.classList.add('is-valid')
            invalidFeedbackLastName.style.display="none"
            validLastName=true
        }

        if(userEmail.value.length>1){
            if(userEmail.value.includes("@") && ((userEmail.value.includes(".com") || userEmail.value.includes(".co") || userEmail.value.includes(".net") || userEmail.value.includes(".gg")))){
                userEmail.classList.remove('is-invalid')
                userEmail.classList.add('is-valid')
                invalidFeedbackEmail.style.display="none"
                validEmail=true
            }
            else{
                userEmail.classList.add('is-invalid')
                invalidFeedbackEmail.style.display="block"
                validEmail=false
            }
        }
        else{
            userEmail.classList.add('is-invalid')
            invalidFeedbackEmail.style.display="block"
            validEmail=false
        }
        let indexOfID = appointments1.findIndex(el => el.userID == userID.value);
        if(userID.value.length<5 || (!isEditing && indexOfID !== -1)){
            userID.classList.add('is-invalid')
            invalidFeedbackID.style.display="block"
            validID=false
        }
        else{
            userID.classList.remove('is-invalid')
            userID.classList.add('is-valid')
            invalidFeedbackID.style.display="none"
            validID=true
        }

        if(userPhone.value.length<1){
            userPhone.classList.add('is-invalid')
            invalidFeedbackPhone.style.display="block"
            validPhone=false
        }
        else{
            userPhone.classList.remove('is-invalid')
            userPhone.classList.add('is-valid')
            invalidFeedbackPhone.style.display="none"
            validPhone=true
        }

        if(userDate.value.length<1){
            userDate.classList.add('is-invalid')
            invalidFeedbackDate.style.display="block"
            validDate=false
        }
        else{
            userDate.classList.remove('is-invalid')
            userDate.classList.add('is-valid')
            invalidFeedbackDate.style.display="none"
            validDate=true
        }

        if(userHour.value.length<1){
            userHour.classList.add('is-invalid')
            invalidFeedbackHour.style.display="block"
            validHour=false
        }
        else{
            userHour.classList.remove('is-invalid')
            userDate.classList.add('is-valid')
            invalidFeedbackHour.style.display="none"
            validHour=true
        }

        if(userService.value.length<1){
            userService.classList.add('is-invalid')
            invalidFeedbackService.style.display="block"
            validService=false
        }
        else{
            userService.classList.remove('is-invalid')
            userService.classList.add('is-valid')
            invalidFeedbackService.style.display="none"
            validService=true
        }

    },500)
}


 

btnSubmit?.addEventListener('click',(event)=>{
    
    event.preventDefault()
    mostrar()
    setTimeout(()=>{
        if(validName===true && validLastName===true && validEmail===true && validID===true && validPhone===true && validDate===true && validHour===true && validService===true){
            clearInterval(constantValidate)
            // userName.textContent=""
            // userLastName.textContent=""
            // userEmail.textContent=""
            // userID.textContent=""
            // userPhone.textContent=""
            // userDate.textContent=""
            // userHour.textContent=""
            // userService.textContent=""
            submitCallbackFn();
            if (!isEditing) {
                setTimeout(()=>{
                    window.location = "appointments.html#appointments-container";
                }, 1000)
            }
        }
        else{
            Swal.fire(
                'Campos vacíos o incorrectos',
                'No puedes guardar citas con contenido vacío o erroneo.',
                'error'
            )
            mostrar()
        }
    },1000)
})
