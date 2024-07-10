import { ReactElement } from 'react';
import { ILink } from '../interfaces/types';
import { LINK_CLASSES } from '../constants';
import footerBackground from '../assets/images/hedestamFooterImage.png';
import { useLocation } from 'react-router-dom';

export default function FooterComponent(): ReactElement {
  
  let links: { [id: string] : ILink; } = {
      'l1': { text: 'Download Fasta Files', classes: LINK_CLASSES, link: '/download' },
      'l2': { text: 'Plot Alleles', classes: LINK_CLASSES, link: '/plot' },
      'l3': { text: 'Information', classes: LINK_CLASSES, link: '/information' },
      'l4': { text: 'Change Log', classes: LINK_CLASSES, link: '/changelog' },
      'l5': { text: 'Publications', classes: LINK_CLASSES, link: '/publications' },
      'l6': { text: 'About', classes: LINK_CLASSES, link: '/about' },
  };

  const location = useLocation();
  const currentPath = location.pathname;

return (
  <div className="relative bg-primary">
    <img className="h-64 w-full object-cover" src={footerBackground} alt="Random image" />
    <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
    <footer className="absolute inset-0 footer footer-center p-10 px-36 2xl:max-w-screen-2xl 2xl:mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 z-10">
        <p className='text-primary-content text-xl font-semibold'>Please visit the other pages of this database</p>
        <nav className="grid grid-flow-col gap-4">
        {Object.keys(links)
              .filter(key => links[key].link !== currentPath) // Filter out the current page link
              .map(key => (
            <a key={key} href={links[key].link} rel="noopener noreferrer">
              <div className="text-info-content text-base flex justify-center items-center h-10 px-8 py-2 bg-info font-medium opacity-80 rounded-2xl shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:opacity-90">
                {links[key].text}
              </div>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  </div>
)
}
