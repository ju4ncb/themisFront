interface Props {
  title: string;
  children: React.ReactNode;
}

const ContactInfo = ({ title, children }: Props) => (
  <section className="contact">
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
);

export default ContactInfo;
