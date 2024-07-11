import { Link, NavLink } from 'react-router-dom';
import { ILink } from '../interfaces/types';
import { LINK_CLASSES } from '../constants';

export default function HeaderComponent() {
    
    let links: { [id: string] : ILink; } = {
        'l1': { text: 'Download Fasta Files', classes: LINK_CLASSES, link: 'download' },
        'l2': { text: 'Plot Alleles', classes: LINK_CLASSES, link: 'plot' },
        'l3': { text: 'Information', classes: LINK_CLASSES, link: 'information' },
        'l4': { text: 'Change Log', classes: LINK_CLASSES, link: 'changelog' },
        'l5': { text: 'Publications', classes: LINK_CLASSES, link: 'publications' },
        'l6': { text: 'About', classes: LINK_CLASSES, link: 'about' },
    };
    
    return (
      <div className="bg-gradient-to-b from-primary to-secondary">
        <div className="text-primary-content px-36 pt-16 py-4 2xl:max-w-screen-2xl 2xl:mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <Link to="/">
                    <div className="text-2xl font-bold text-center">
                    <span className="whitespace-nowrap">KI Adaptive Immune Receptor Variant Atlas</span>
                    <p>KIARVA</p>
                      </div>
                    </Link>
                </div>
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal text-lg">
                    {Object.keys(links).map( key => (
                        <li key={key} className="ml-1 max-w-36">{<NavLink className={links[key].classes} to={links[key].link}>{links[key].text}</NavLink>}</li>
                    ))}
                    </ul>
                </div>
                <div className="navbar-end hidden 2xl:block">
                </div>
            </div>
        </div>
      </div>
    )
  }
  