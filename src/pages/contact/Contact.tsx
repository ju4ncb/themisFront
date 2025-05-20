import { Facebook, Instagram, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import ContactInfo from "../../components/ContactInfo";

const Contact = () => {
  const onSubmit = (data: any) => {
    // handle form submission here
    console.log(data);
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
          <button type="submit">Enviar</button>
        </form>
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
      <div className="darker-background-half"></div>
    </>
  );
};

export default Contact;
