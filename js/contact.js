/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            const nameError =
                document.getElementById(
                    "nameError"
                );

            const emailError =
                document.getElementById(
                    "emailError"
                );

            const subjectError =
                document.getElementById(
                    "subjectError"
                );

            const messageError =
                document.getElementById(
                    "messageError"
                );

            const success =
                document.getElementById(
                    "formSuccess"
                );


            /* Clear previous errors */

            nameError.textContent = "";
            emailError.textContent = "";
            subjectError.textContent = "";
            messageError.textContent = "";
            success.textContent = "";


            let valid = true;


            /* NAME */

            if (name === "") {

                nameError.textContent =
                    "Please enter your name.";

                valid = false;

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                emailError.textContent =
                    "Please enter your email.";

                valid = false;

            }

            else if (
                !emailPattern.test(email)
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                valid = false;

            }


            /* SUBJECT */

            if (subject === "") {

                subjectError.textContent =
                    "Please enter a subject.";

                valid = false;

            }


            /* MESSAGE */

            if (message === "") {

                messageError.textContent =
                    "Please enter a message.";

                valid = false;

            }

            else if (message.length < 10) {

                messageError.textContent =
                    "Message should contain at least 10 characters.";

                valid = false;

            }


            /* SUCCESS */

            if (valid) {

                success.textContent =
                    "✅ Your message has been validated successfully!";

                contactForm.reset();

            }

        }
    );

}