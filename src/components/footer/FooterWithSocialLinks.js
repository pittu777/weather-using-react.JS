
import { Typography } from "@material-tailwind/react";
import React from "react";
import openLogo from "./images/logo-open.png";
import wind from "./images/wind.png";
import time from "./images/logo-time.png";
import Logo from "./images/logo1.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../../styles/tailwind.css";

const LINKS = [
  {
    title: "Weather",
    items: ["Current Conditions", "Hourly", "Weekly Forecast", "Maps"],
  },
  {
    title: "About Us",
    items: ["Our Team", "Mission", "Contact Us", "Feedback"],
  },
  {
    title: "Resources",
    items: ["Weather Glossary", "FAQs", "Tutorials", "Support"],
  },
];

const LogoCarousel = () => {
  const logos = [openLogo, Logo, wind, time];

  return (
    <div className="relative w-full overflow-hidden h-6">
      <div className="logos-container">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            className="h-6 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

const currentYear = new Date().getFullYear();

export function FooterWithSocialLinks() {
  return (
    <>
      <footer className="relative w-full">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <div className="flex items-center">
              {/* Add social icons here */}

              <Typography variant="h5" className="mb-6">
                <div className="flex gap-4  my-3 ">
                  {/* Use react-icons components */}
                  <a
                    href="https://www.facebook.com/groups/openweathermap/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook className="text-blue-500 " />
                  </a>
                  <a
                    href="https://twitter.com/OpenWeatherMap#:~:text=(%40OpenWeatherMap)%20%2F%20X"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="text-blue-500 " />
                  </a>
                  <a
                    href="https://www.instagram.com/openweathermap/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-blue-500 " />
                  </a>
                  <a
                    href="https://uk.linkedin.com/company/openweathermap#:~:text=About%20us,data%20via%20light%2Dspeed%20APIs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin className="text-blue-500 " />
                  </a>
                </div>
              </Typography>
            </div>
            <div className="grid grid-cols-3 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-medium opacity-40"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href={`/${link.toLowerCase()}`}
                        color="gray"
                        className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
            >
              {/* Add "Powered by" with 4 logos for all devices */}
              Powered by
              <LogoCarousel />
            </Typography>
            <Typography
              variant="small"
              className="mb-4 text-center font-normal text-blue-gray-900"
            >
              &copy; {currentYear}{" "}
              <a href="https://material-tailwind.com/">Weather Forecasting</a>.
              All Rights Reserved.
            </Typography>
            <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
              {/* Social icons remain unchanged */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
