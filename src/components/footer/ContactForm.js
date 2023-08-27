import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./footer.css";
import loading from "./images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

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
      setIsSending(true);
      await emailjs.send(
        "service_rfakgvn",
        "template_gzd9e1p",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Bbyr-WDgDW4N-fCSU"
      );

      toast.success("Email sent successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Error sending email");
    }finally{
      setIsSending(false);
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
        <button type="submit" disabled={isSending}>
          {isSending ?(
            <img src={loading} alt="loading..." className="loading-gif" />
          ):(
            "send"
          )}
        </button>
        <ToastContainer />
        
      </form>
    </div>
  );
};

export default ContactForm;
