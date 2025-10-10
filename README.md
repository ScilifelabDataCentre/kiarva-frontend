# KIARVA (frontend)

The Karolinska Institutet Adaptive Immune Receptor Gene Variant Atlas (KIARVA) frontend provides the user interface for exploring and visualizing germline immunoglobulin (IG) heavy chain (IGH) allele data. It is a read-only web application built with Next.js and TypeScript and consumes the KIARVA backend API to render interactive plots, tables, and sequence views, as well as allowing users to download FASTA files of allele data.

## Table of Contents

* [Background](#background)
* [Cite this portal](#cite-this-portal)
* [Contributing](#contributing)
* [How to get help](#how-to-get-help)
* [Credits](#credits)
* [Development](#development)
  * [Architecture Overview](#architecture-overview)
  * [Repository structure](#repository-structure)
  * [Running a local copy of the frontend and contributing to the codebase](#running-a-local-copy-of-the-frontend-and-contributing-to-the-codebase)


## Background

KIARVA catalogs germline-encoded IG heavy chain (IGH) alleles identified using the ImmuneDiscover pipeline. The frontend presents allele frequencies, sequence alignments, and associated metadata. It is intended for researchers and developers who need a straightforward UI to explore allele distributions and download sequence data.


## Cite this portal

(TBD)


## Contributing

We welcome contributions to the codebase, documentation, and example data. All contributions are reviewed before merging.

**Basic workflow for external contributors**

1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Create a feature branch for your work.
4. Make changes and commit with clear messages. Signed commits are required for merges.
5. Push the branch to your fork and open a pull request against the upstream `main` branch.

See the Development section below for detailed commands and local setup.


## How to get help

* For questions about the **scientific content or data**: contact Gunilla Karlsson Hedestam (`Gunilla.Karlsson.Hedestam@ki.se`) and Martin Corcoran (`Martin.Corcoran@ki.se`).
* For questions about the **code** or deployments: contact the SciLifeLab Data Centre team at `precisionmedicine@scilifelab.se`.


## Credits

The frontend was developed and is maintained by SciLifeLab Data Centre and collaborators at Karolinska Institutet. The scientific data and domain expertise are provided by Gunilla Karlsson Hedestam's research group.


## Development

### Architecture Overview

The frontend is a modern web application built with the following core technologies:

* **Framework**: Next.js (App Router) with React and TypeScript
* **Styling**: Tailwind CSS with PostCSS
* **UI primitives**: shadcn/ui (Radix + Tailwind-based components)
* **Analytics**: Matomo (initialization included in the app)

The app is a read-only client that fetches data from the KIARVA backend. Most visualization is performed client-side using Plotly or custom React components.

### Repository structure

```
KIARVA frontend
├── Dockerfile
├── LICENSE
├── .github/
├── next-app
│   ├── components.json
│   ├── fonts/
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── public/
│   ├── README.md
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── constants.ts
│   │   ├── content/
│   │   ├── interfaces/
│   │   └── lib/
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

#### CI/CD

* **Dockerfile** — Multi-stage build for producing a production image.
* **`.github/`** - Workflows for Github actions (building and pushing image on release, security scans etc.)

#### Important config files

* **next.config.mjs** — Next.js configuration (redirects, image domains, etc.).
* **postcss.config.mjs** — PostCSS/Tailwind pipeline configuration.
* **tailwind.config.ts** — Tailwind theme and plugin configuration.
* **tsconfig.json** — TypeScript compiler settings.
* **package.json / package-lock.json** — Dependencies and npm scripts.

### Key source directories

* **`src/app/`** — Next.js App Router pages and layouts. Each subfolder maps to a route. Shared layout and global styles live here.
* **`src/components/`** — Reusable React components and visualization building blocks (plots, dropdowns, headers, footers).
* **`src/lib/`** — Small utilities and helpers used across the app. Example: `utils.ts` provides a `cn()` helper for composing Tailwind class names.
* **`src/content/`** — Static example data and markdown content used for demos or testing.
* **`src/interfaces/`** — TypeScript types and interfaces for shared data shapes.
* **`public/`** — Static assets such as images and fonts.

### Testing

There are no comprehensive automated tests included at the time of writing. Basic checks can be performed locally by running the build and lint scripts. Adding unit and end-to-end tests is encouraged.


## Running a local copy of the frontend and contributing to the codebase

### Fork and clone the repository

**Important**: Work through a fork. Do not commit directly to the upstream repository.

1. Fork the repository on GitHub: `https://github.com/ScilifelabDataCentre/kiarva-frontend`.
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/kiarva-frontend.git
cd kiarva-frontend/next-app
```

3. Add the upstream remote so you can keep your fork up to date:

```bash
git remote add upstream https://github.com/ScilifelabDataCentre/kiarva-frontend.git
```

You can fetch changes from upstream at any time:

```bash
git fetch upstream
git pull upstream dev
```

> Note: the project requires signed commits for merges. See GitHub documentation on signing commits if you haven't set this up.

### Local development setup

#### Prerequisites

* Node.js 18+ (LTS recommended)
* npm (or another compatible package manager)

#### Install dependencies

From the `next-app` directory:

```bash
npm install
```

#### Run in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The frontend expects a running KIARVA backend. By default `constants.ts` detects if you are running on localhost:3000 and in that case points to `http://localhost:5000` for a local backend instance.

#### Build for production (locally)

```bash
npm run build
```

Running a local build is useful to catch build-time errors that don’t appear during development. It is useful to do this as if you fail to catch these errors, the build will fail later when we try to do a new release with your changes.

### Docker

A Dockerfile is provided to build a production-ready image. Use it in CI or for local testing.

### Create a branch and develop

Create a topic branch for your work:

```bash
git checkout -b my_feature_branch
```

Make changes and add them to your commit:

```bash
git add -A
git commit -S -m "Describe your change"
git push origin my_feature_branch
```

### Make a pull request

Open a pull request from your fork's branch to the upstream `main` branch. Add a clear description, link to related issues (if applicable), and request reviewers. By default, the repository owners are always requested and notified.

The team will review the PR before merging. Follow-up changes may be requested.
