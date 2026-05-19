window.addEventListener("load", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (e) => {

        let errors = false;

        // INPUTS
        const name = document.getElementById("name");
        const lastname = document.getElementById("lastname");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        // MENSAJES
        const nameError = document.getElementById("nameError");
        const lastnameError = document.getElementById("lastnameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        // LIMPIAR ERRORES
        nameError.innerText = "";
        lastnameError.innerText = "";
        emailError.innerText = "";
        passwordError.innerText = "";

        // LIMPIAR ESPACIOS
        const cleanName = name.value.trim();
        const cleanLastname = lastname.value.trim();
        const cleanEmail = email.value.trim();
        const cleanPassword = password.value.trim();

        // VALIDAR NOMBRE
        if(cleanName === ""){
            nameError.innerText = "El nombre es obligatorio";
            errors = true;
        }

        // VALIDAR APELLIDO
        if(cleanLastname === ""){
            lastnameError.innerText = "El apellido es obligatorio";
            errors = true;
        }

        // VALIDAR EMAIL
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(cleanEmail === ""){
            emailError.innerText = "El email es obligatorio";
            errors = true;

        } else if(!emailRegex.test(cleanEmail)){

            emailError.innerText = "Ingresá un email válido";
            errors = true;
        }

        // VALIDAR PASSWORD
        const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if(cleanPassword === ""){

            passwordError.innerText =
            "La contraseña es obligatoria";

            errors = true;

        } else if(!passwordRegex.test(cleanPassword)){

            passwordError.innerText =
            "Debe tener 8 caracteres, letras, números y símbolos";

            errors = true;
        }

        // PALABRAS PROHIBIDAS
        const forbiddenWords = [
            "password",
            "1234",
            "qwerty",
            cleanName.toLowerCase()
        ];

        const passwordLower = cleanPassword.toLowerCase();

        for(let word of forbiddenWords){

            if(passwordLower.includes(word)){

                passwordError.innerText =
                "La contraseña contiene palabras prohibidas";

                errors = true;

                break;
            }
        }

        // PASSWORD != EMAIL
        if(cleanPassword === cleanEmail){

            passwordError.innerText =
            "La contraseña no puede ser igual al email";

            errors = true;
        }

        // EVITAR SUBMIT SIEMPRE
        e.preventDefault();

        if(errors){

            console.log("Formulario con errores");

        } else {

            alert("Registro validado correctamente");
        }

    });

});