# SiteName website - WORKING PROGRESS 17/01/2017

![http://www.kentico.com/getattachment/Product/Kentico-10/Facebook-Kentico-10-LP-1200x630-px.png?lang=en-US](Kentico 10)

### Background

SiteName is a ... 

## Getting Started

### Front-end dependencies
You will need the following software packages installed in order to compile all front-end assets. 
This includes things such as SASS, JavaScript, etc. If the site ever looks a little weird, always make sure you have compiled the front-end assets.

* [NodeJS (minimum version 4.0)](https://nodejs.org/en/)

This version uses Webpack to compile Front-End assets.  It has support for:

* SASS
* PostCSS + Autoprefixer
* Babel + ES6 JavaScript

### Compiling assets

#### First Run:
Install the dependencies using `npm install`

```
npm install
```

#### Compiling for production
Compile Production assets using `npm run build`. This will do a single-run compile of the assets in `/source` to `/CMS/assets/`.

```
npm run build
```

#### Compiling for development
A development version of the assets can be built with compilation-on-change by running `npm run dev`, which will start a Development
server on localhost with hot-module-reloading and a dev-facing styleguide for rapid previewing.

```
npm run dev
```

#### Running Tests
E2E tests via Nightwatch.js and Unit tests via Karma + MochaJS are supported out of the box. Run them individually via `npm run unit`
or `npm run e2e`, or run them both with `npm run test`. ESLint testing is supported via `npm run lint`, with most settings tuned down
to just warnings, for the sake of sanity.

```
npm run unit
npm run e2e
npm run lint
```
or 
```
npm run test
npm run lint
```

### Environments / Access Restrictions / HOSTS Entries

At present, we have two environments:

* Development: Will be updated when we have the environment details
* QA: Will be updated when we have the environment details

These environments are restricted to the MMT Digital network (and the sitename network).

#### HOSTS Entries
For local development, you'll need to add the following host entry to your local machine:

```sh
127.0.0.1      local.sitename.co.uk
```
### Development Workflow & Deployment
#### Tools
* StoriesOnBoard: 
* Pivotal Tracker: https://www.pivotaltracker.com/n/projects/1953429

#### GIT Workflow / Branches
We follow a feature branch workflow. When starting a new feature or bug, create a branch for it, do all your work within this branch, and then merge back into the `dev` branch. There is no strict naming convention for branches. Just keep it clear and clean branches up when you know you don't need them anymore:

#### Deployment Process
Typical one-directional deployment flow: DEV --> QA --> PROD

* TeamCity: http://

#### Kentico Continuous integration
As of Kentico 10, we have started to use Kentico's CI process to help developers work on local databases, but yet stay in sync with content. This has proved challenging, as the tool is not 100% perfect. However, we have established a fairly decent workflow, as follows:

* Always start with a cloned database from DevOps

__*WIP*__

#### Kentico Content Staging
We use Kentico Content Staging keep our database object changes in sync from one environment to another. The Content Staging module is accessed from the Kentico Admin backend. This module lists all tasks in the exact order they were ran on the server. These tasks are grouped by type, and can be selectively synchronised / staged.

__*NOTE:*__ It's important to make sure you only stage relevant tasks. 99% of the time, you should really only be staging "Global Development Objects", which are easily filters within the staging module. It's a good idea to talk to a team member who understands the process before doing this yourself.

### CSS Architecture
We have taken a component-based CSS approach to our front-end development on this project. You can read more about this from our [brown bag presentation](https://docs.google.com/presentation/d/1ry2EfT7U4l-bG0YBfCgU6DYLmtzaFqsplYInLiWIoGY/edit). Essentially, this approach empowers the developer to be able to make changes to any styling aspect of the website and have complete assurance / control in what they are changing. On mature projects, too often we encounter issues where changing styles in one place causes things to break elsewhere – this approach aims to solve these types of common development issues.

Aside from this, another advantage of using a component-based approach is the modularity of the codebase. This lends itself perfectly to our agile processes, and brings about many positives. We're now able to A/B test mutliple components, test our assumptions / validate them, and then strip out redundant components from the site in a much more clean and efficient manner.

For more guidance on this, speak to James Sear or Tim Ramage.


### IIS / Site bindings / web.config

#### Creating the site in IIS
The actual site is located in `sitename/CMS` – this is the physical path where you'll need to point your site when creating the site in IIS. The site is configured to run on `https://local.sitename.co.uk`. When adding this binding, make sure to select __HTTPS__ as the protocol type and set your self-signed IIS Express Development Certificate in the "SSL certificate" drop-down.

#### web.config
Within `sitename/CMS`, you'll find a `web.config.dev` which you'll need to copy / paste and then rename to `web.config` (keep within the same directory).

#### IIS Extensions
We are making use of IIS's URL Rewrite Module (2.0) to redirect non-HTTP traffic to HTTPS. If you do not have this installed already, the site will not work properly, so you'll need to download and install directly from Microsoft's website: http://www.iis.net/downloads/microsoft/url-rewrite


# Generic MMT Structure Information

## sitename Group Grunt folder structure

This grunt structure has been built using the MMT Digital boilerplate (https://bitbucket.org/mmtdigital/mmt-digital-grunt-structure/overview) and makes a few assumptions with regards to your assets folder structure. Please change these to suit the project.

Source files exist __*outside*__ of the web solution and only their compiled output is packaged along with each site build (generally handled as part of your continuous deployment process).


    |-- sitename_exp001-kenticowebsite
		|-- website
			|-- source
				|-- scss
				|-- js
				|-- img
				|-- icons    // SVG icons for use in a webfont
			|-- CMS
					|-- assets    // Grunt outputs compiled assets here
						|-- css
						|-- js
						|-- img
						|-- fonts
					|-- App_Code
					|-- ...
					|-- ...
					|-- SiteWebParts
					|-- etc
			|-- tools
				|-- grunt
					|-- Gruntfile.js
			|-- package.json

##Database connection string
The web.config.local should be used for development purpose. However, to make sure that the repo does not have any credentials, the developers will have to contact the autodots to  get the connection string details.