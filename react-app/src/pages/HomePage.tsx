import { ReactElement } from "react";
import {
  BODY_CLASSES,
  // BUTTON_TYPE_ONE,
  // H_1,
  H_2,
} from "../constants";
import { TrackPageViewIfEnabled } from "../util/cookiesHandling";
import { Link } from "react-router-dom";
import downloadHeroBackground from "../assets/images/heroDownloadImage.jpg";
import plotHeroBackground from "../assets/images/heroPlotImage.jpg";

export default function HomePage(): ReactElement {
  TrackPageViewIfEnabled();

  return (
    <div>
      <div className={BODY_CLASSES}>
        <div className="flex flex-col lg:flex-row items-stretch place-items-center gap-6 mb-6">
          <div className="flex-grow lg:basis-1/2 alert lg:my-5 shadow-lg bg-white border-white rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <label className={`font-bold ${H_2}`}>Welcome to KIARVA</label>
              <p className="mt-4 max-h-60 overflow-auto text-sm lg:text-base">
                Variation between individuals and populations within the
                immunoglobulin (IG) locus involves both structural and allelic
                diversity. The Karolinska Institutet Adaptive Immune Receptor
                Gene Variant Atlas (<b>KIARVA</b>) hosts germline-encoded IG
                heavy chain (IGH) alleles identified in 2485 individuals from
                the 1000 Genomes Project (1KGP) collection, in total 479 IGHV,
                10 IGHJ and 40 IGHD alleles. <b>KIARVA</b> is open source and
                provides downloadable FASTA files with all sequences, as well as
                information about the frequency of each allele in 5
                superpopulations and 25 subpopulations. In the near future,
                KIARVA will be extended to also contain population-based
                information about IG kappa and lambda genes, as well as T cell
                receptor genes. When using this database, please cite Corcoran
                et al. BioRxivXX, and when using the resource for commercial
                purposes, contact the authors.
              </p>
            </div>
          </div>

          <div className="flex-grow lg:basis-1/2 alert lg:my-5 shadow-lg bg-white border-white rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeWidth="0.5"
                d="M30.56 8.47a8 8 0 0 0-7-7 64.29 64.29 0 0 0-15.06 0 8 8 0 0 0-7 7 64.29 64.29 0 0 0 0 15.06 8 8 0 0 0 7 7 64.29 64.29 0 0 0 15.06 0 8 8 0 0 0 7-7 64.29 64.29 0 0 0 0-15.06zm-2 14.83a6 6 0 0 1-5.28 5.28 63.65 63.65 0 0 1-14.6 0 6 6 0 0 1-5.26-5.28 63.65 63.65 0 0 1 0-14.6A6 6 0 0 1 8.7 3.42a63.65 63.65 0 0 1 14.6 0 6 6 0 0 1 5.28 5.28 63.65 63.65 0 0 1 0 14.6z"
              />
              <path d="M13 7H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-4 8V9h4v6zM14 19h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zM14 23H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM25 11h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2zM25 7h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2zM25 15h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2zM25 19h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2zM23 23h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2z" />
            </svg>
            <div>
              <label className={`font-bold ${H_2}`}>News</label>
              <div className="mt-4 max-h-60 overflow-auto text-sm lg:text-base">
                <p className="italic">Date: 2024-08-08</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  pellentesque sapien vitae felis laoreet, sit amet condimentum
                  est ultricies. Etiam neque enim, bibendum et neque id, iaculis
                  facilisis sem. Morbi turpis purus, lobortis in sodales et,
                  tincidunt ut elit. Nam eu velit sagittis, fringilla justo vel,
                  rhoncus nunc. Mauris sagittis tincidunt aliquet. Fusce eget
                  nisi nec ex aliquet vulputate. Curabitur vel sapien rhoncus
                  enim malesuada finibus congue ut risus. Maecenas rhoncus,
                  massa at pellentesque fermentum, quam tortor eleifend sapien,
                  sed viverra purus quam vel tortor. Sed lobortis lobortis dui
                  quis rutrum. Sed luctus dignissim nibh.
                </p>
              </div>
              <Link className="float-end pt-2" to="/changelog">
                <button className="text-info-content text-base flex justify-center items-center h-10 px-2 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800">
                  See change log
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6">
          <div className="relative hero min-h-96 bg-neutral">
            <img
              className="object-cover w-full h-full"
              src={downloadHeroBackground}
              alt="Download Hero Image"
            />
            <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
            <div className="hero-content text-secondary-content text-center">
              <div className="max-w-md flex flex-col items-center">
                <h1 className="mb-5 text-2xl lg:text-3xl font-bold text-nowrap">
                  Download FASTA files
                </h1>
                <p className="mb-5 text-sm lg:text-base">
                  Download FASTA files here...
                </p>
                <Link to="/download">
                  <button className="text-info-content text-base flex justify-center items-center w-24 sm:w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800">
                    Go
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hero min-h-96 bg-neutral">
            <img
              className="object-cover w-full h-full"
              src={plotHeroBackground}
              alt="Plot Image"
            />
            <div className="absolute inset-0 bg-gray-700 opacity-85"></div>
            <div className="hero-content text-secondary-content text-center">
              <div className="max-w-md flex flex-col items-center">
                <h1 className="mb-5 text-2xl lg:text-3xl font-bold">
                  Plot alleles
                </h1>
                <p className="mb-5 text-sm lg:text-base">
                  Plot alleles here...
                </p>
                <Link to="/plot">
                  <button className="text-info-content text-base flex justify-center items-center w-24 sm:w-36 h-10 px-8 py-2 bg-info font-bold opacity-100 rounded-lg shadow-inner backdrop-blur-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-fuchsia-800">
                    Go
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
