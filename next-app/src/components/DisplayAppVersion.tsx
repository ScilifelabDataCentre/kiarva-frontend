// currently is used as a client component due how env variables are handled. If we change the current env
// variables to be on server, could change this to server comp

"use client";

import { useEffect, useState } from "react";

function toHref(value: string) {
  const v = value.trim();
  if (!v) return "#";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

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
    <div className="flex flex-col gap-1 items-start lg:items-end">
      {frontendImage ? (
        <a
          href={toHref(frontendImage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded-sm"
          aria-label={`Frontend version ${frontendImage.split(":")[1] || ""}`}
        >
          Frontend version: {frontendImage.split(":")[1] || "n/a"}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <span>Frontend version: n/a</span>
      )}

      {backendImage ? (
        <a
          href={toHref(backendImage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 rounded-sm"
          aria-label={`Backend version ${backendImage.split(":")[1] || ""}`}
        >
          Backend version: {backendImage.split(":")[1] || "n/a"}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <span>Backend version: n/a</span>
      )}
    </div>
  );
}
