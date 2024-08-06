import { ReactElement } from "react";
import { ILink } from "../interfaces/types";
import { LINK_CLASSES } from "../constants";
import footerBackground from "../assets/images/hedestamFooterImage.png";
import { Link, useLocation } from "react-router-dom";

export default function FooterComponent(): ReactElement {
  let links: { [id: string]: ILink } = {
    l1: {
      text: "Download FASTA files",
      classes: LINK_CLASSES,
      link: "/download",
    },
    l2: {
      text: "Population frequencies",
      classes: LINK_CLASSES,
      link: "/plot",
    },
    l3: { text: "Methodology", classes: LINK_CLASSES, link: "/methodology" },
    l4: { text: "Change log", classes: LINK_CLASSES, link: "/changelog" },
    l5: { text: "Publications", classes: LINK_CLASSES, link: "/publications" },
    l6: { text: "About", classes: LINK_CLASSES, link: "/about" },
  };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="relative bg-primary">
      <img
        className="h-64 w-full object-cover"
        src={footerBackground}
        alt="Footer Background Image"
      />
      <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
      <footer className="absolute inset-0 footer footer-center pt-4 lg:pt-10 px-4 lg:px-36 2xl:max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 z-10">
          <p className="text-primary-content text-base lg:text-lg font-semibold">
            Please visit the other pages of KIARVA
          </p>
          <nav className="grid grid-flow-row grid-cols-2 lg:grid-flow-col gap-2 lg:gap-4">
            {Object.keys(links)
              .filter((key) => links[key].link !== currentPath) // Filter out the current page link
              .map((key) => (
                <Link key={key} to={links[key].link} rel="noopener noreferrer">
                  <div
                    className="text-info-content text-sm lg:text-base flex justify-center items-center h-8 lg:h-10 p-2 lg:px-4 bg-info font-medium opacity-80 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800 hover:opacity-90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {links[key].text}
                  </div>
                </Link>
              ))}
          </nav>
        </div>
        <nav className="justify-self-end">
          <Link to="/privacy" rel="noopener noreferrer">
            <p
              className={`text-info-content text-opacity-80 text-sm ${LINK_CLASSES}`}
            >
              Privacy Policy
            </p>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
