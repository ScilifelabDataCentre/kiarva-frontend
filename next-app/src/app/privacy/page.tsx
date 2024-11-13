'use client';

import { ReactElement, useState } from "react";
import { BODY_CLASSES, BUTTON_TYPE_ONE, H_1 } from "@/constants";
import { trackingDisabled, TrackPageViewIfEnabled } from "@/util/cookiesHandling";
import Link from "next/link";
import { deleteCookie, setCookie } from "cookies-next";

export default function PrivacyPage(): ReactElement {
  TrackPageViewIfEnabled();

  const optInOrOutTextActive = (isTrackingEnabled: boolean): string[] => {
    if (isTrackingEnabled) {
        return ["Click on the button to the right to opt out of tracking", "Opt Out"]
    }
    else {
        return ["Click on the button to the right to opt in to tracking", "Opt In"]
    }
  }

  const [ optInText, setOptInText ] = useState(optInOrOutTextActive(!trackingDisabled()))

  const handleOptOut = () => {
    if (trackingDisabled()) {
      deleteCookie("trackingDisabled")
    }
    else {
      setCookie("trackingDisabled", "true", { maxAge: 60*60*24*365 });
    }
    setOptInText(optInOrOutTextActive(!trackingDisabled()));
  }
  
  return (
    <>
      <div className={BODY_CLASSES}>
        <div className={H_1}>Privacy Policy</div>
        <div className="divider">Privacy Policy</div>
        <p>
          SciLifeLab operates KIARVA. This page is used to inform website
          visitors regarding our personal data processing policy. If you choose
          to use our Service, then your personal data will be processed in
          accordance with this policy. The personal information that we collect
          is used for providing and improving the Service. We will not use or
          share your information with anyone except as described in this policy.
          All collected personal information will be processed for research
          purposes, i.e. using the lawful basis of public interest and in
          accordance with Regulation (EU) 2016/679 of the European Parliament
          and of the Council of 27 April 2016, the General Data Protection
          Regulation.
        </p>
        <div role="alert" className="alert bg-neutral text-neutral-content">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{optInText[0]}</span>
          <div className="space-x-2">
              <button onClick={handleOptOut} className={BUTTON_TYPE_ONE}>{optInText[1]}</button>
          </div>
        </div>
        <div className="divider">Links to Other Sites</div>
        <p>
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the privacy policy of these websites. We have no control
          over, and assume no responsibility for, the content, privacy policies,
          or practices of any third-party sites or services.
        </p>
        <div className="divider">Changes to This Privacy Policy</div>
        <p>
          We may update our privacy policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new privacy policy on this page.
          These changes posted on this page are effective immediately.
        </p>
        <div className="divider">Contact Us</div>
        <p>
          If you have any questions or suggestions about our privacy policy, do
          not hesitate to{" "}
          <Link href="/about">
            contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
