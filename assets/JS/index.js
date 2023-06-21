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

invalidFeedbackName.style.display="none"
invalidFeedbackLastName.style.display="none"
invalidFeedbackEmail.style.display="none"
invalidFeedbackID.style.display="none"
invalidFeedbackPhone.style.display="none"
invalidFeedbackDate.style.display="none"
invalidFeedbackHour.style.display="none"
invalidFeedbackService.style.display="none"

const btnSubmit=document.getElementById("btn_submit")
let validName=false
let validLastName=false
let validEmail=false
let validID=false
let validPhone=false
let validDate=false
let validHour=false
let validService=false

var constantValidate

function mostrar() {
    constantValidate=setInterval(()=>{
        if(userName.value.length<10){
            userName.classList.add('is-invalid')
            invalidFeedbackName.style.display="block"
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
        }
        else{
            userLastName.classList.remove('is-invalid')
            userLastName.classList.add('is-valid')
            invalidFeedbackLastName.style.display="none"
            validLastName=true
        }

        if(userEmail.value.length>1){
            if(userEmail.value.includes("@") && (userEmail.value.includes(".com") || userEmail.value.includes(".co") || userEmail.value.includes(".net") || userEmail.value.includes(".gg"))){
                userEmail.classList.remove('is-invalid')
                userEmail.classList.add('is-valid')
                invalidFeedbackEmail.style.display="none"
                validEmail=true
            }
            else{
                userEmail.classList.add('is-invalid')
                invalidFeedbackEmail.style.display="block"
            }
        }
        else{
            userEmail.classList.add('is-invalid')
            invalidFeedbackEmail.style.display="block"
        }

        if(userID.value.length<1){
            userID.classList.add('is-invalid')
            invalidFeedbackID.style.display="block"
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
        }
        else{
            userService.classList.remove('is-invalid')
            userService.classList.add('is-valid')
            invalidFeedbackService.style.display="none"
            validService=true
        }

    },500)
}


 

btnSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
   
    
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
        location.reload()
    }
    else{
        alert("Fill correctly all the input!")
        mostrar()
    }
})