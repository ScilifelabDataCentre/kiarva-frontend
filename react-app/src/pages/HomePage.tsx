import { ReactElement } from 'react';
import { BODY_CLASSES, 
        // BUTTON_TYPE_ONE, 
        // H_1
    } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import { Link } from 'react-router-dom';
import hedestamFooterImage from '../assets/images/hedestamFooterImage.png';


export default function HomePage(): ReactElement {

    TrackPageViewIfEnabled();

    return (
        <div>
            <div className={BODY_CLASSES}>
            <div>
        <div className="carousel w-full pt-12">
            <Link to="download" className="px-0.5">
            <div id="download" className="carousel-item w-full">
                <img src={hedestamFooterImage} className="w-full" alt="Download Page" />
            </div>
            </Link>
            <Link to="plot" className="px-0.5">
            <div id="plot" className="carousel-item w-full">
                <img src={hedestamFooterImage} className="w-full" alt="Plot Page"/>
            </div>
            </Link>
        </div>
        </div>
            </div>
            </div>
    );
}