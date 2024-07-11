import { ReactElement } from 'react';
import { BODY_CLASSES,
        // BUTTON_TYPE_ONE, 
        // H_1,
        H_2
    } from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import { Link } from 'react-router-dom';
import NewsComponent from '../components/NewsComponent';

export default function HomePage(): ReactElement {

    TrackPageViewIfEnabled();

    return (
        <div>
            <div className={BODY_CLASSES}>
            <div className="alert my-5 py-8 bg-white border-white rounded-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className='flex flex-col'>
            <label className={`font-bold ${H_2}`}>Welcome to KIARVA</label>
            <span>3-5 lines summary description of the tool</span>
            </div>
            </div>


            <div className="grid grid-cols-2 place-items-center gap-6">
<div
  className="hero min-h-96 bg-neutral">
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md flex flex-col items-center">
      <h1 className="mb-5 text-5xl font-bold text-nowrap">Download FASTA files</h1>
      <p className="mb-5">
        Download FASTA files here...
      </p>
      <Link to="/download">
      <button className="text-info-content text-base flex justify-center items-center w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800">Go</button>
    </Link>
    </div>
  </div>
</div>
<div
  className="hero min-h-96 bg-neutral">
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md flex flex-col items-center">
      <h1 className="mb-5 text-5xl font-bold">Plot alleles</h1>
      <p className="mb-5">
        Plot alleles here...
      </p>
      <Link to="/plot">
      <button className="text-info-content text-base flex justify-center items-center w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800">Go</button>
    </Link>
    </div>
  </div>
</div>
</div>

<div className="pt-2 pb-4">
<h1 className={H_2}>News</h1>
          <NewsComponent
            title="Release soon!"
            date="2024-07-11"
            text="Text here..."
            bgColor="bg-secondary"
          />
          <NewsComponent
            title="Release soon!"
            date="2024-07-11"
            text="Text here..."
            bgColor="bg-white"
          />
        </div>
     </div>
            </div>
    );
}