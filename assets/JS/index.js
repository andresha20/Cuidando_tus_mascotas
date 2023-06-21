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

// const validID=false
// const validPhone=false
// const validDate=false
// const validHour=false
// const validService=false
var constantValidate
function mostrar() {
    constantValidate=setInterval(()=>{
        userName.addEventListener('keyup',(event)=>{
            console.log(event.target.value)
            userName.innerHTML=event.target.vale
        })
        if(userName.value.length<10){
            userName.classList.add('is-invalid')
        }
        else{
            userName.classList.remove('is-invalid')
            userName.classList.add('is-valid')
            validName=true
        }
    
        userLastName.addEventListener('keyup',(event)=>{
            console.log(event.target.value)
            userLastName.innerHTML=event.target.vale
        })
        if(userLastName.value.length<10){
            userLastName.classList.add('is-invalid')
        }
        else{
            userLastName.classList.remove('is-invalid')
            userLastName.classList.add('is-valid')
            validLastName=true
        }

        if(userEmail.value.length>1){
            if(userEmail.value.includes("@") && (userEmail.value.includes(".com") || userEmail.value.includes(".co") || userEmail.value.includes(".net") || userEmail.value.includes(".gg"))){
                console.log("@@")
                userEmail.classList.remove('is-invalid')
                userEmail.classList.add('is-valid')
            }
            else{
                userEmail.classList.add('is-invalid')
            }
        }
        else{
            userEmail.classList.add('is-invalid')
        }
        console.log("a")
    },500)
}


 

btnSubmit.addEventListener('click',(event)=>{
    event.preventDefault()
    if(validName===true && validLastName===true){
        clearInterval(constantValidate)
        return submitCallbackFn(event);
    }
    else{
        alert("Fill correctly all the input!")
        mostrar()
    }
})
