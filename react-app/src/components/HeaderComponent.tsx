import { Link, NavLink } from "react-router-dom";
import { ILink } from "../interfaces/types";
import { LINK_CLASSES } from "../constants";

export default function HeaderComponent() {
  let links: { [id: string]: ILink } = {
    l1: { text: "Download", classes: LINK_CLASSES, link: "download" },
    l2: { text: "Population frequencies", classes: LINK_CLASSES, link: "plot" },
    l3: { text: "Methodology", classes: LINK_CLASSES, link: "methodology" },
    l4: { text: "Change log", classes: LINK_CLASSES, link: "changelog" },
    l5: { text: "Publications", classes: LINK_CLASSES, link: "publications" },
    l6: { text: "About", classes: LINK_CLASSES, link: "about" },
  };

  return (
    <>
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center">
        <h1 className="text-5xl text-primary-content font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-primary-content text-lg mb-8">
          We're working hard to bring you KIARVA. Stay tuned! The launch is
          planned for August 2024.
        </p>
      </div>
      <div className="bg-gradient-to-b from-primary to-secondary">
        <div className="py-4 lg:px-36 lg:pt-16 max-w-screen-13inch 2xl:mx-auto">
          <div className="navbar text-primary-content">
            <div className="navbar-start 13inch:hidden">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
                >
                  {Object.keys(links).map((key) => (
                    <li key={key}>
                      <NavLink
                        className={links[key].classes}
                        to={links[key].link}
                      >
                        {links[key].text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="navbar-end 13inch:navbar-start">
              <Link to="/">
                <div className="font-bold text-center">
                  <p className="text-2xl">KIARVA</p>
                  <span className="lg:whitespace-nowrap text-xl">
                    KI Adaptive Immune Receptor Gene Variant Atlas
                  </span>
                </div>
              </Link>
            </div>
            <div className="hidden 13inch:flex 13inch:navbar-center">
              <ul className="menu menu-horizontal text-base">
                {Object.keys(links).map((key) => (
                  <li key={key}>
                    <NavLink
                      className={links[key].classes}
                      to={links[key].link}
                    >
                      {links[key].text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
