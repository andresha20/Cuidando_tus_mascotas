let appointments = JSON.parse(Cookies?.get("appointments") || "[]") || [];
let images = ["baño.jpeg", "farma.jpeg", "boquita.jpeg"]

// Highlight active page in menu

const url_arr = document.URL.split('/');
const route = url_arr[url_arr.length - 1];
const routeName = route.split('.');
const activeElement = document.getElementById(routeName?.[0] || ""); 

activeElement?.classList.add('active-menu-item');

// Ends

const fields = ["userName", "userLastName", "userEmail", "userPhone", "userID", "userDate", "userHour", "userService"];

// Check if the user is editing

const queryString = window.location.search;
const urlString = new URLSearchParams(queryString);

window.onload = () => {
    let serviceId = urlString.get("id");
    let targetDiv = document.getElementById("col_1");
    let submitBtn = document.getElementById("btn_submit");
    let userIdInput= document.getElementById("userID");
    if (serviceId) {
        let indexOfAppointment = appointments.findIndex(el => el.userID == serviceId);
        if (indexOfAppointment !== -1) {
            isEditing = true;
            userIdInput.setAttribute("disabled", true);
            let editingText = document.createElement("h4");
            submitBtn.innerHTML= `Editar cita #${serviceId}`;
            editingText.textContent = `Editando documento #${appointments[indexOfAppointment]["userID"]}`;
            editingText.classList.add("text-center", "mt-3")
            targetDiv.appendChild(editingText);
            Object.keys(appointments[indexOfAppointment]).map(key => {
                document.getElementById(key).value = appointments[indexOfAppointment][key];
            })
        }
    } else {
        userIdInput?.removeAttribute("disabled", false);
    }
}

// Edit the object

const editData = (field, appointment) => {
    let fieldValue = document.getElementById(field)?.value || "";
    if (fieldValue.length == 0) return null;
    appointment[field] = fieldValue;
    document.getElementById(field).value = "";
    return appointment;
}

// Trigger after submit

const submitCallbackFn = (e) => {
    let appointment = {};
    let error = false;
    fields.forEach(field => {
        appointment = editData(field, appointment);
        if (!appointment) {
            error = true;
            return false;
        };
    });
    if (error) {
        Swal.fire(
            'Campos vacíos',
            'No puedes guardar citas con contenido vacío.',
            'error'
        )
    } else {
        if (isEditing) {
            Swal.fire(
                `¡Cita con documento ${appointment["userID"]} editada!`,
                'Hemos actualizado tu cita satisfactoriamente.',
                'success'
            )
            let indexOfAppointment = appointments.findIndex(el => el.userID == appointment.userID);
            appointments[indexOfAppointment] = appointment;
            window.location.search = "";
            isEditing = false;
        } else {
            Swal.fire(
                '¡Cita agendada!',
                'Hemos agendado tu cita satisfactoriamente.',
                'success'
            )
            appointments.push(appointment);
        }
        return Cookies.set('appointments', JSON.stringify(appointments), { expires: 365 });
    }
}

// Handle button-press

const handleSubmit = (e) => {
    switch (e.target.id) {
        case "editButton":
        case "deleteButton":
            let serviceId = e.target.name;
            if (e.target.id == "editButton") {
                window.location = `index.html?id=${serviceId}#form`;
            } else {
                Swal.fire({
                    title: '¿Seguro que deseas eliminar esta cita?',
                    text: "Será eliminada de manera permanente.",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminala'
                    }).then(() => {
                        Swal.fire(
                        'Cita eliminada',
                        'Cita eliminada satisfactoriamente.',
                        'success'
                        );
                        let indexOfAppointment = appointments.findIndex(el => el.userID == serviceId);
                        appointments.splice(indexOfAppointment, 1);
                        Cookies.set("appointments", JSON.stringify(appointments), { expires: 365 })
                        getAppointments();
                    }
                )
                
            }
            break;

        default:
            break;
    }
}

window.addEventListener("click", handleSubmit);

// DRAW LIST OF APPOINBTMENTS

const getHourLabel = (value) => {
    let label = "7:15 am";
    switch (parseInt(value)) {
        case 2:
            label = "8:15 am";
            break;
        case 3:
            label = "9:15 am";
            break;
        case 4:
            label = "10:15 am";
            break;
        case 5:
            label = "11:15 am";
            break;
        case 6:
            label = "12:15 am";
            break;
        case 7:
            label = "13:15 am";
            break;
            
        default:
            label = "14:15 am";
            break;
    }
    return label;
}

const getServiceLabel = (value) => {
    let label = "Peluquería";
    switch (parseInt(value)) {
        case 2:
            label = "Servicio Farmacéutico";
            break;
        case 3:
            label = "Guardería";
            break;
            
        default:
            break;
    }
    return label;
}

let appointmentsContainer = document.getElementById("appointments-container");

const getAppointments = () => {
    let cookieExists = Cookies.get("appointments");
    if (cookieExists) {
        appointments = JSON.parse(cookieExists);
    }
    if (appointmentsContainer) {
        appointmentsContainer.innerHTML = "";
    } 
    let counter = document.createElement("h2");
    counter.classList.add("mb-4")
    counter.textContent = `${appointments.length} cita(s) agendadas`
    appointmentsContainer?.appendChild(counter);
    if (appointments.length == 0) {
        let text = document.createElement("p");
        text.textContent = "No hay citas agendadas. ¡Sé el/la primer persona en agendar una!"
        let redirectButton = document.createElement("button");
        redirectButton.innerHTML = "Agendar cita";
        redirectButton.onclick = () => window.location = `index.html#form`;
        redirectButton.classList.add("btn", "btn-success", "mt-3")
        appointmentsContainer?.appendChild(text);
        appointmentsContainer?.appendChild(redirectButton);

    }
    appointments.map((appointment, i) => {
        let appointmentDiv = document.createElement("div");
        appointmentDiv.setAttribute("id", appointment?.userID);
        appointmentDiv.classList.add("card", "p-3", "mb-3");
        let row = document.createElement("div");
        row.classList.add("row")
        let col1 = document.createElement("div");
        col1.classList.add("col-12", "col-md-6")
        let col2 = document.createElement("div");
        col2.classList.add("col-12", "col-md-6")
        row.appendChild(col1);
        row.appendChild(col2);
        let names = document.createElement("h2");
        let email = document.createElement("h5");
        let phone = document.createElement("p");
        let details = document.createElement("p");
        let image = document.createElement("img");
        image.src = `./assets/IMG/${images[appointment?.userService - 1]}`
        image.classList.add("w-full", "img-thumbnail");
        let buttonsDiv = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        deleteButton.innerHTML = "Eliminar";
        editButton.classList.add("btn", "btn-primary", "me-2")
        deleteButton.classList.add("btn", "btn-danger")
        editButton.setAttribute("id", "editButton")
        deleteButton.setAttribute("id", "deleteButton")
        editButton.setAttribute("name", `${appointment?.userID}`);
        deleteButton.setAttribute("name", `${appointment?.userID}`);
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        names.textContent = `${appointment?.userName} ${appointment?.userLastName}`;
        email.textContent = `${appointment?.userEmail}`;
        phone.innerHTML = `<b>Celular:</b> ${appointment?.userPhone}`;
        details.innerHTML = `<b>Detalles:</b> ${appointment?.userDate} | ${getHourLabel(appointment?.userHour)} | ${getServiceLabel(appointment?.userService)}`
        col1.appendChild(image);
        col2.appendChild(names);
        col2.appendChild(email);
        col2.appendChild(phone);
        col2.appendChild(details);
        col2.appendChild(buttonsDiv);
        appointmentDiv.appendChild(row);
        return appointmentsContainer?.appendChild(appointmentDiv);
    })
}

getAppointments();
