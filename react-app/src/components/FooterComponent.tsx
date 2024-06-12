import { ReactElement } from 'react';
import { ILink } from '../interfaces/types';
import { Link } from 'react-router-dom';
import { LINK_CLASSES } from '../constants';
import footerBackground from '../assets/images/hedestamIndexImage.png';

export default function FooterComponent(): ReactElement {
  
  let links: { [id: string] : ILink; } = {
      'l1': { text: 'Information', classes: LINK_CLASSES, link: '/information' },
      'l2': { text: 'Change Log', classes: LINK_CLASSES, link: '/changelog' },
      'l3': { text: 'Publications', classes: LINK_CLASSES, link: '/publications' },
      'l4': { text: 'About', classes: LINK_CLASSES, link: '/about' },
  };

  return (
    <div className="bg-primary">
      <div className="bg-blend-overlay"> <img src={footerBackground} alt="" />
      <footer className='footer footer-center p-10 px-36 2xl:max-w-screen-2xl 2xl:mx-auto'>
        <p className='neutral-content text-xl font-semibold'>Please visit the other pages of this database</p>
        <nav className="grid grid-flow-col gap-4">
        {Object.keys(links).map( key => (
          <div className="text-info-content px-8 py-2 bg-info rounded-3xl justify-center items-center flex">
              <Link className={links[key].classes} to={links[key].link} key={key}>{links[key].text}</Link>
          </div>
        ))}
        </nav> 
      </footer>
    </div>
    </div>
  )
}

