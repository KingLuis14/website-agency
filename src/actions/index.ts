import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createTransport } from "nodemailer";

const phoneRegex = /^(9\d{2} \d{3} \d{3})$/;

const nameRegex = /^[a-zA-Z\s]+$/;

export const server = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string()
        .regex(nameRegex, "Name must contain only letters and spaces"),
      numero: z
        .string()
        .regex(
          phoneRegex,
          "Invalid phone number! It must start with 9 and be 9 digits long."
        ),
      email: z.string().email(),
    }),
    handler: async ({ email, name, numero }) => {
      // console.log({ email, name, numero });

      // console.log(import.meta.env.EMAIL);

      let transporter = createTransport({
        host: import.meta.env.EMAIL_HOST,
        port: import.meta.env.EMAIL_PORT,
        auth: {
          user: import.meta.env.EMAIL,
          pass: import.meta.env.EMAIL_PASS,
        },
      });

      // Configuración del correo
      let mailToUser = {
        from: import.meta.env.EMAIL, // El remitente
        to: email, // Destinatario
        subject: "Inscripcion Exitosa",
        html: `<h1>Gracias ${name} por inscribirte a nuestro cursos y ser de tu eleccion</h1>`,
      };

      let mailToInstitution = {
        from: import.meta.env.EMAIL, // El remitente
        to: import.meta.env.EMAIL, // Correo de la institución o tu correo
        subject: "Nueva Inscripción de Usuario",
        html: `<h1>Nuevo Registro</h1>
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Número:</b> ${numero}</p>`,
      };



      try {
        // Envía el correo al usuario
        await transporter.sendMail(mailToUser);
        console.log("Correo enviado al usuario");

        // Envía el correo a la institución
        await transporter.sendMail(mailToInstitution);
        console.log("Correo enviado a la institución");

        return { success: true };
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        return { success: false };
      }

      
    },
  }),
};
