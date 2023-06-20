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

function Validate(){
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()   
            alert("Debes llenar todos los campos correctamente!")
        }
        form.classList.add('was-validated')
        setInterval(()=>{
            form.classList.add('was-validated')
            if (!userName.value) {
                invalidFeedbackName.style.display="block"
                console.log("54") 
            }
            else{
                invalidFeedbackName.style.display="none"
                console.log("53")
            }    
            
            if (!userLastName.value) {
                invalidFeedbackName.style.display="block"
                
            }
            else{
                invalidFeedbackName.style.display="none"
            }
            console.log("55")       
        },2000)
        
      }, false)
    })
  }

Validate()
