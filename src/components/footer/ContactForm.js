import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./footer.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await emailjs.send(
        "service_rfakgvn",
        "template_4ytxw1b",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Bbyr-WDgDW4N-fCSU"
      );

      alert("Email sent successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Error sending email:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
