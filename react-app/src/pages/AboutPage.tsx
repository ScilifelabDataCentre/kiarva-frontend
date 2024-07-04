import { ReactElement } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import {
    BODY_CLASSES,
    H_1,
} from '../constants';
import { TrackPageViewIfEnabled } from '../util/cookiesHandling';
import martinCorcoran from '../assets/images/martinCorcoran.png';
import sanjanaNarang from '../assets/images/sanjanaNarang.png';
import mateuszKaduk from '../assets/images/mateuszKaduk.png';
import markChernyshev from '../assets/images/markChernyshev.png';
import gunillaKarlssonHedestam from '../assets/images/gunillaKarlssonHedestam.png';

export default function AboutPage(): ReactElement {
    TrackPageViewIfEnabled();

    var pageTitle: string = "About Us";
    
    return (
        <>
 <div className={BODY_CLASSES}>
    <div className={H_1}>{pageTitle}</div>
    <p className='pb-8 text-justify'>Our research focuses on the function of B lymphocytes and qualitative aspects of immunological memory. In several projects, we define anti-viral antibody responses at the clonal level by single-cell sorting memory B cells for sequence analysis of antibody V(D)J transcripts and for isolation and characterization of antigen-specific monoclonal antibodies. We also apply next generation sequencing to analyze expressed immune repertoires and to trace specific antibody lineages to understand their fate and levels of affinity maturation. Because V(D)J gene assignment is a critical first step of lineage tracing, and there is considerable genetic variation in germline V genes/alleles between subjects, we developed a computational tool that allows the generation of individualized germline V gene databases, IgDiscover. This is a major technical advance that will enable the use of individualized germline databases to become a standard element of high-quality immunological studies in both humans and experimental animals. By applying these methods, we obtain highly detailed information about polymorphisms in these genes, allowing us to investigate how the VDJ germline allele content influences the establishment of antigen-specific responses.</p>
    <ProfileComponent
        imageUrl={martinCorcoran}
        linkUrl="https://ki.se/personer/martin-corcoran"
        name="Martin Corcoran"
        title="Head of Immunogenetics"
        bgColor="bg-neutral"
        />
        <ProfileComponent
        imageUrl={sanjanaNarang}
        linkUrl="https://ki.se/en/people/sanjana-narang"
        name="Sanjana Narang"
        title="Post-doctoral Scientist"
        bgColor="bg-white"
        />
        <ProfileComponent
        imageUrl={mateuszKaduk}
        linkUrl="https://ki.se/en/people/mateusz-kaduk"
        name="Mateusz Kaduk"
        title="Bioinformatician"
        bgColor="bg-neutral"
        />
        <ProfileComponent
        imageUrl={markChernyshev}
        linkUrl="https://ki.se/en/people/mark-chernyshev"
        name="Mark Chernyshev"
        title="PhD student/Bioinformatician"
        bgColor="bg-white"
        />
        <ProfileComponent
        imageUrl={gunillaKarlssonHedestam}
        linkUrl="https://ki.se/en/people/gunilla-karlsson-hedestam"
        name="Gunilla Karlsson Hedestam"
        title="Professor/Group leader"
        bgColor="bg-neutral"
        />
        </div>
        </>
    );
}
