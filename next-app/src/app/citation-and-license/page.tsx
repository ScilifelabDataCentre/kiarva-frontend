"use client";

import { ReactElement } from "react";

import { LastUpdated } from "@/components/common/last-updated";

import Title from "@/components/common/title";

export default function CitationAndLicensePage(): ReactElement {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div
        className="flex flex-col gap-y-4"
        aria-label="Citation and license information"
      >
        <Title level={1}>Citation and license</Title>
        <p role="doc-abstract">
          In line with the principles of FAIR and Open Science, we encourage the
          reuse and recognition of material made available on KIARVA for non-commercial purposes. This page 
          provides guidance on how to cite the website and outlines the licensing 
          conditions for using its content and code.
        </p>
        <Title level={2} aria-label="Information about citing the website">
          Citing the website
        </Title>
        <p>
          When information in KIARVA is updated, this will be documented under News and in the Changelog. Therefore, it
          is important to cite specific versions (or to provide access
          dates) when citing the resource.
        </p>
        <Title level={3} aria-label="Citation guidance for research community">
          Research Community
        </Title>
        <p>
          Researchers are requested to cite Corcoran et al. Immunity 2026 and KIARVA with
          its underlying code in scientific publications.
        </p>
        <Title level={4}>Citing website content</Title>
        <p>
          The <strong>Research Resource Identifier (RRID)</strong> for KIARVA is{" "}
          <strong>
            <a
              href="https://rrid.site/data/record/nlx_144509-1/SCR_026682/resolver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="RRID SCR_026682 (opens in new tab)"
            >
              SCR_026682
            </a>
          </strong>
          . Using this identifier helps track reuse and ensures proper
          attribution.
          <br />
          Moreover, the <strong>version numbers</strong> for the backend and frontend are available at the
          bottom of any page on KIARVA. Two examples of how to cite the portal are
          provided below.
        </p>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="Citation examples"
        >
          <li role="listitem">
            In-text citation example (APA style): KIARVA,
            Karolinska Institutet and SciLifeLab Data Centre, <i>version number</i>, RRID: SCR_026682.
            (Access date: date of access).
          </li>
          <li role="listitem">
            Reference list example: KIARVA (
            <i>access date</i>), Karolinska Institutet and SciLifeLab Data Centre, version (version
            number) from{" "}
            <a
              href="https://kiarva.scilifelab.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="KIARVA website (opens in new tab)"
            >
              https://kiarva.scilifelab.se
            </a>
            , RRID: SCR_026682.
          </li>
        </ul>
        <p>
          When citing a specific page with a listed author, date or DOI, include
          that information along with the RRID.
        </p>
        <Title level={3} aria-label="Citation guidance for journalists">
          Journalists
        </Title>
        <p>
          Journalists are welcome to reuse text, images, and other content from
          KIARVA in articles, blog posts, and social media for non-commercial purposes. 
          Please cite Corcoran et al. Immunity 2026 and acknowledge the source as{" "}
          <strong>KIARVA</strong>, include a link to{" "}
          <a
            href="https://kiarva.scilifelab.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="KIARVA website (opens in new tab)"
          >
            https://kiarva.scilifelab.se
          </a>
          , and cite the RRID as described above.
        </p>
        <Title level={2} aria-label="License information section">
          License Information
        </Title>
        <Title level={3} aria-label="Website content license">
          Website
        </Title>
        <p>
          Unless otherwise stated, this website is licensed under the{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Creative Commons Attribution-NonCommercial 4.0 International License (opens in new tab)"
          >
            Creative Commons Attribution-NonCommercial 4.0 International License (CC BY NC 4.0)
          </a>
          . This is a human-readable summary of (and not a substitute for){" "}
          <a
            href="https://creativecommons.org/licenses/by-nc/4.0/legalcode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Full CC BY NC 4.0 license text (opens in new tab)"
          >
            the license.
          </a>
        </p>
        <Title level={4}>You are free to</Title>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="License freedoms"
        >
          <li role="listitem">
            <strong>Share</strong> – copy and redistribute the material in any medium or format for academic purposes
          </li>
          <li role="listitem">
            <strong>Adapt</strong> – remix, transform, and build upon the material for academic purposes
          </li>
        </ul>
        <p>
            The data content should not be used for commercial purposes.<br/><br/>
            These freedoms cannot be revoked as long as you follow the license
            terms.
        </p>
        <Title level={4}>Under the following terms</Title>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="License requirements"
        >
          <li role="listitem">
            <strong>Attribution</strong> – You must give appropriate credit,
            provide a link to the license, and indicate if changes were made.
          </li>
          <li role="listitem">
            <strong>No additional restrictions</strong> – You may not apply
            legal terms or technological measures that restrict others from
            doing anything the license permits.
          </li>
        </ul>
        <Title level={4}>Notices</Title>
        <p>
          You do not have to comply with the license for elements of the
          material in the public domain or where your use is permitted by an
          applicable exception or limitation.
        </p>
        <p>
          No warranties are given. The license may not give you all of the
          permissions necessary for your intended use. For example, other rights
          such as publicity, privacy, or moral rights may limit how you use the
          material.
        </p>
        <Title level={3} aria-label="Software license information">
          Software
        </Title>
        <p>
          Except where otherwise noted, any software in this repository are made
          available under the{" "}
          <a
            href="https://opensource.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Open Source Initiative website (opens in new tab)"
          >
            OSI
          </a>
          -approved{" "}
          <a
            href="https://opensource.org/licenses/mit-license.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="MIT License (opens in new tab)"
          >
            MIT License
          </a>
          .<br />
          For the rest of the code, © 2026 SciLifeLab Data Centre.
        </p>
        <Title level={4}>MIT License</Title>
        <p role="doc-notice">
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          &quot;Software&quot;), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        </p>
        <p role="doc-notice">
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </p>
        <p role="doc-notice">
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
          KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
      <div className="mt-8">
        <LastUpdated date="02-02-2026" />
      </div>
    </div>
  );
}