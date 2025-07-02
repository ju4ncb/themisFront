import { Facebook, Instagram, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import ContactInfo from "../../components/ContactInfo";
import logo from "../../assets/themis-logo-white.png";
import { useState } from "react";
import "./contact.scss";

const Contact = () => {
  type ResponseStatus = "idle" | "sending" | "success" | "error";
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>("idle");
  const onSubmit = async (data: any) => {
    try {
      setResponseStatus("sending");
      const response = await fetch("https://formspree.io/f/mwpbywpd", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          message: data.message,
        }),
      });
      if (response.ok) {
        setResponseStatus("success");
      } else {
        setResponseStatus("error");
      }
    } catch (error) {
      setResponseStatus("error");
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="contact-container">
        <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
          <h2>Contáctanos</h2>
          <div className="form-input-container">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {typeof errors.email?.message === "string" && (
              <span>{errors.email.message}</span>
            )}
          </div>
          <div className="form-input-container">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              {...register("message", {
                required: "El mensaje es obligatorio",
              })}
              rows={4}
            />
            {typeof errors.message?.message === "string" && (
              <span>{errors.message.message}</span>
            )}
          </div>
          {responseStatus === "sending" && <div className="form-loading" />}
          {responseStatus === "success" && (
            <div className="form-success-message">
              ¡Mensaje enviado correctamente!
            </div>
          )}
          {responseStatus === "error" && (
            <div className="form-error-message">
              Ocurrió un error al enviar el mensaje. Intenta nuevamente.
            </div>
          )}
          <button type="submit">Enviar</button>
        </form>
        <div className="info-container">
          <img src={logo} alt="themis-logo" />
          <div className="info-contact">
            <div className="info">
              <ContactInfo title="Direccion">
                <p>Calle xxxxxx</p>
                <p>Barranquilla,</p>
                <p>Colombia</p>
              </ContactInfo>
              <ContactInfo title="Email">
                <p>xxxx@xxxx.xxx</p>
              </ContactInfo>
              <ContactInfo title="Teléfono">
                <p>(xxx)xxx-xxxx</p>
              </ContactInfo>
            </div>
            <div className="links">
              <div className="social-media">
                <h3>Redes sociales</h3>
                <div className="social-icons">
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <Facebook />
                  </a>
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <Instagram />
                  </a>
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <Twitter />
                  </a>
                </div>
              </div>
              <div className="team">
                <h3>Equipo de desarrollo de themis</h3>
                <ul>
                  <li>David Arroyo</li>
                  <li>Juan Caballero</li>
                  <li>Julio Escobar</li>
                  <li>Juan Montenegro</li>
                  <li>Juan Pérez</li>
                  <li>Andrés Solano</li>
                  <li>Francisco Sosa</li>
                  <li>Kevin Yepez</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="darker-background-half"></div>
    </>
  );
};

export default Contact;
