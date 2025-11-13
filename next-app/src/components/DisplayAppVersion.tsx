// currently is used as a client component due how env variables are handled. If we change the current env
// variables to be on server, could change this to server comp

"use client";

import { useEffect, useState } from "react";
import { LINK_CLASSES } from "@/constants";

export default function FooterVersion() {
  const [frontendImage, setFrontendImage] = useState<string | null>(null);
  const [backendImage, setBackendImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/meta/version")
      .then((res) => res.json())
      .then((data) => {
        setFrontendImage(data.frontendImage);
        setBackendImage(data.backendImage);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
      <nav>
        <a href={"https://" + frontendImage || "/"}>
          <p className={`text-info-content/70 text-sm ${LINK_CLASSES}`}>
            Frontend version: {frontendImage?.split(":")[1] || "n/a"}
          </p>
        </a>
      </nav>
      <nav>
        <a href={"https://" + backendImage || "/"}>
          <p className={`text-info-content/70 text-sm ${LINK_CLASSES}`}>
            Backend version: {backendImage?.split(":")[1] || "n/a"}
          </p>
        </a>
      </nav>
      <nav>
        <a
          href="https://precision-medicine-portal.scilifelab.se/privacy"
          rel="noopener noreferrer"
          target="_blank"
        >
          <p className={`text-info-content/70 text-sm ${LINK_CLASSES}`}>
            Privacy policy
          </p>
        </a>
      </nav>
      <nav>
        <a
          href="https://precision-medicine-portal.scilifelab.se/citation-and-license"
          rel="noopener noreferrer"
          target="_blank"
        >
          <p className={`text-info-content/70 text-sm ${LINK_CLASSES}`}>
            Citation and license
          </p>
        </a>
      </nav>
    </div>
  );
}
