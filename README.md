# Montreal React & React Native JavaScript

The website for the Montreal React & React Native meetup. The site lists information related to upcoming and past meetups including the presenters, topics discussed, and sponsors.

The content for the website is managed using Netlify CMS.

## Local Development

### Prerequisites

- Node (see [.nvmrc](./.nvmrc) for version)

### Run the project

```
$ git clone git@github.com:robertcoopercode/gatsby-netlify-cms.git
$ cd gatsby-netlify-cms
$ yarn
$ yarn develop
```

To test the CMS locally, you'll to need run a production build of the site:

```
$ yarn build
$ yarn serve
```

### Setting up the CMS

For details on how to configure the CMS, take a look at the [Netlify CMS Docs](https://www.netlifycms.org/docs/intro).

## Useful Ressources
- ["Official" Gatsby and Netlify CMS starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms)
This starter includes a blog built with Gatsby and Netlify CMS. It was actually used as the starting off point for this repository.