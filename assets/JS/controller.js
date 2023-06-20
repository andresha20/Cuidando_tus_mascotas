let Cookies = window.Cookies;
console.log(Cookies)
let appointments = [];

if (Cookies.get("appointments")) {
    appointments = Cookies.get("appointments");
}

const fields = ["userName", "userLastName", "userEmail", "userPhone", "userID", "date", "hour"];
appointments = JSON.parse(Cookies?.get("appointments") || "[]") || [];

const editData = (field, appointment) => {
    let fieldValue = document.getElementById(field)?.value || "";
    appointment[field] = fieldValue;
    document.getElementById(field).value = "";
    return appointment;
}

const handleSubmit = (e) => {
    switch (e.target.id) {
        case "btn_submit":
            let appointment = {};
            fields.forEach(field => {
                appointment = editData(field, appointment);
            });
            appointments.push(appointment);
            Cookies.set('appointments', JSON.stringify(appointments), { expires: 365 });
            break;
        case "editButton":
        case "deleteButton":
            let appointmentDoc = e.target.name;
            let indexOfAppointment = appointments.findIndex(el => el.document == appointmentDoc);
            if (e.target.id == "editButton") {
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

const getAppointments = () => {
    let cookieExists = Cookies.get("appointments");
    console.log(cookieExists)
    return false;
    if (cookieExists) {
        appointments = JSON.parse(cookieExists);
    }
    appointments.map((appointment, i) => {
        let appointmentDiv = document.createElement("div");
        appointment.setAttribute("id", appointment.document);
        let names = document.createElement("h1");
        let email = document.createElement("h3");
        let phone = document.createElement("p");
        let details = document.createElement("p");
        let buttonsDiv = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        editButton.setAttribute("id", "editButton")
        deleteButton.setAttribute("id", "deleteButton")
        editButton.setAttribute("name", `${appointment.document}`);
        deleteButton.setAttribute("name", `${appointment.document}`);
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        names.textContent = `${appointment.userName} ${appointment.userLastName}`;
        email.textContent = `${appointment.userEmail}`;
        phone.textContent = `${appointment.userPhone}`;
        details.textContent = `${appointment.date} | ${appointment.hour}`
        appointment.appendChild(names);
        appointment.appendChild(email);
        appointment.appendChild(phone);
        appointment.appendChild(details);
        appointment.appendChild(buttonsDiv);
        return appointmentsContainer.appendChild(appointmentDiv);
    })
}

getAppointments();
