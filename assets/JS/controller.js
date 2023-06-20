let appointments = [];

const fields = ["userName", "userLastName", "userEmail", "userPhone", "userID", "userDate", "userHour"];
appointments = JSON.parse(Cookies?.get("appointments") || "[]") || [];

const editData = (field, appointment) => {
    let fieldValue = document.getElementById(field)?.value || "";
    console.log(fieldValue)
    if (fieldValue.length == 0) return null;
    console.log(fieldValue, field)
    appointment[field] = fieldValue;
    document.getElementById(field).value = "";
    return appointment;
}

const handleSubmit = (e) => {
    switch (e.target.id) {
        case "btn_submit":
            e.preventDefault();
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
                Swal.fire(
                    '¡Cita agendada!',
                    'Hemos agendado tu cita satisfactoriamente.',
                    'success'
                )
                appointments.push(appointment);
                Cookies.set('appointments', JSON.stringify(appointments), { expires: 365 });

            }
            break;
        case "editButton":
        case "deleteButton":
            let appointmentDoc = e.target.name;
            let indexOfAppointment = appointments.findIndex(el => el.document == appointmentDoc);
            if (e.target.id == "editButton") {
                window.location = "index.html/#form";
                Object.keys(appointments[indexOfAppointment]).map(key => {
                    document.getElementById(key).value = appointments[indexOfAppointment][key];
                })
            } else {
                appointments.splice(indexOfAppointment, 1);
            }
            break;

        default:
            break;
    }
}

window.addEventListener("click", handleSubmit);

// DRAW LIST OF APPOINBTMENTS

let appointmentsContainer = document.getElementById("appointments-container");

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

const getAppointments = () => {
    let cookieExists = Cookies.get("appointments");
    if (cookieExists) {
        appointments = JSON.parse(cookieExists);
    }
    appointments.map((appointment, i) => {
        let appointmentDiv = document.createElement("div");
        appointmentDiv.setAttribute("id", appointment?.document);
        let names = document.createElement("h1");
        let email = document.createElement("h3");
        let phone = document.createElement("p");
        let details = document.createElement("p");
        let buttonsDiv = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        deleteButton.innerHTML = "Eliminar";
        editButton.setAttribute("id", "editButton")
        deleteButton.setAttribute("id", "deleteButton")
        editButton.setAttribute("name", `${appointment?.document}`);
        deleteButton.setAttribute("name", `${appointment?.document}`);
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        names.textContent = `${appointment?.userName} ${appointment?.userLastName}`;
        email.textContent = `${appointment?.userEmail}`;
        phone.textContent = `${appointment?.userPhone}`;
        details.textContent = `${appointment?.userDate} | ${getHourLabel(appointment?.userHour)}`
        appointmentDiv.appendChild(names);
        appointmentDiv.appendChild(email);
        appointmentDiv.appendChild(phone);
        appointmentDiv.appendChild(details);
        appointmentDiv.appendChild(buttonsDiv);
        return appointmentsContainer?.appendChild(appointmentDiv);
    })
}

getAppointments();
