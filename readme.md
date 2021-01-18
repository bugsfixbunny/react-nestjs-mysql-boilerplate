<p align="center">
  <a href="https://fast-modular-project.com/" target="_blank"><img src="./fmp.png" height="130px" alt="FMP Logo"/></a>
</p>

### Modular code to help you start and deploy your project faster.
  
# Starter React.js / NestJS / MySQL

As we get bored building over and over same core features, we decided to build a community on Slack in order to make modules.

Modules are reusable functionnalities between projects that are fully compatible with this starter.

Some modules are already created like Sockets, IP location, Emailing, upload file on s3 etc.

If you want to be part of the community, join our **[Slack](https://join.slack.com/t/fast-modular-project/shared_invite/zt-kxajf3gi-CIvFSB4fx7TktmWwmwP7Ig)** (FR/EN) and we will share with you everything.

## Description

This starter allows you to develop a web application like Facebook, Twitter, Reddit etc… <br/>
This is not adapted for web sites where SEO is important like a marketplace for example. 

If you don't know the stack, here is some very usefull links :

* **React js**: [NestJS in 10 minutes](https://blog.fast-modular-project.com)(coming soon) / [Official documentation.](https://fr.reactjs.org/) 

* **Nest (NestJS)**: [NestJS in 10 minutes](https://blog.fast-modular-project.com/nestjs-in-10-minutes) / [Official documentation.](https://nestjs.com/) 

* **TypeORM**: [TypeORM with NestJS in 10 minutes](https://blog.fast-modular-project.com/nestjs-in-10-minutes)(coming soon) / [Official documentation.](https://nestjs.com/) 

* **Docker**: [Docker in 10 minutes](https://blog.fast-modular-project.com/docker-in-10-minutes) / [Official documentation.](https://www.docker.com/) 


## Quick start (10 minutes) :zap:

**Step 1 : get the code** <br/>
git clone  

**Step 2 : prepare your environment** <br/>
[Install Docker](https://docs.docker.com/get-docker/) on your machine.

**Step 3 : Launch docker** <br/>
At the end of the installation, don't forget to launch docker.<br/>
When the whale icon in the status bar stays steady, Docker Desktop is up-and-running, and is accessible from any terminal window.

**Step 4 : launch the project** <br/>
``` cd ./starter_web ``` <br/>
``` docker-compose up```

Frontend is launched at ``` http://localhost:8080/ ``` <br/>
Backend is launched at ``` http://localhost:3000/api ``` <br/>
Database is launched at ```http://localhost:3306```

**Install packages** <br/>
If you want to install a package with npm, you can npm install it locally. <br>
A watcher in the container is waiting for changes in your package.json and package-lock.json to replicate the installation you have done locally. <br/>
<br/>
If you are facing any issue, you can delete anoynmous container and force a rebuilt of your containers using : <br/>
`docker-compose up -V --build`

**Logs** <br/>
If you want to ease your usage of Docker containers, you can download [Docker Desktop](https://www.docker.com/products/docker-desktop ) <br/>

**Clean your docker** <br/>
``` docker rm -f $(docker ps -a -q) ``` <br/>
``` docker system prune -a -f --volumes ```

## Deployment in production / Continuous integration
The infrastucture will be hosted on AWS.
There is two way to create an infracture for your starter : 
- either manually
- either using Terraform that will automate everything for you

In both scenarios we will first create an infrastructure (manually or with Terraform), and then use Github Actions to deploy our app.

### Manual creation of the infrastructure and deployments ###

We will create the AWS infrastructure manually and it will contain : 
- an ElasticBeanStack (EBS) for the backend
- an Amazon Relational Database (RDS)
- an S3 bucket and CloudFront for the frontend

**Step 1 : create the EBS for an auto scalable backend** <br/>

Documentation [here](https://blog.fast-modular-project.com/deployment-aws-elastic-beanstalk).

**Step 2 : create the RDS database** <br/>

Documentation [here](https://blog.fast-modular-project.com/deployment-aws-rds).

**Step 3 : create the S3 bucket and se CloudFront CDN to serve it** <br/>

Documentation [here](https://blog.fast-modular-project.com/deployment-aws-s3-cloudfront).

### Automatic creation of the infrastructure with [Terraform](https://www.terraform.io) and deployments ###
Coming soon...


## Documentation

### How to ... ? ###

**How to access my frontend ?** <br/>
`http://localhost:8080`

**How to access my backend ?** <br/>
A postman collection and a Postman environment are available in `./backend/postman/`. <br/>
You can import it directly in Postman to be able to test your backend.

**How to access my database ?** <br/>
- Install [MySQL Workbench](https://www.mysql.com/fr/products/workbench/) <br/>
- Create a new connection : `hostname=127.0.0.1`, `username=root`, `port=3306`, `password=password` (everything is here `./.env`). <br/>
- Click on "test connection" to check that your new connection is ok. <br/>
- Double click on your new connection to access your database. <br/>

## Guidelines
Guidelines are recommended but not mandatory.


### Front guidelines ###
Recommended folder and file structure :
<pre>
.
├── assets
│   ├── fonts
│   ├── icons
│   └── imgs
└── src
    ├── app.js
    ├── environments.js
    ├── components
    │   ├── forms
    │   │   ├── button.component.tsx
    │   │   ├── checkbox.form.tsx
    │   │   ├── forms.utils.tsx
    │   │   ├── input.form.tsx
    │   │   ├── text.input.tsx
    │   │   └── textarea.form.tsx
    │   ├── navbar
    │   │   ├── components
    │   │   │   └── button.component.js
    │   │   └── navbar.component.js
    │   └── style
    │       └── text.component.tsx
    ├── models
    │   └── user.model.tsx
    ├── pages
    │   ├── auth
    │   │   ├── auth.styled.tsx
    │   │   ├── signin.screen.tsx
    │   │   └── signup.screen.tsx
    │   ├── pages.navigation.js
    │   └── tabs
    │       ├── account
    │       │   ├── components
    │       │   │   ├── card-user.tsx
    │       │   │   └── hotel-card.component.tsx
    │       │   └── home.screen.tsx
    │       ├── signin
    │       ├── home
    │       └── signout
    ├── services
    │   ├── auth.service.tsx
    │   ├── services.util.tsx
    │   └── user.service.tsx
    ├── store
    │   ├── configure.store.tsx
    │   └── reducers
    │       ├── auth.slice.tsx
    │       └── user.slice.tsx
    ├── themes
    │   ├── color.theme.ts
    │   ├── font.theme.ts
    │   └── responsive.theme.ts
    └── utils
        ├── animations
        ├── date.util.tsx
        ├── geolocalisation.util.tsx
        └── regex.util.tsx
</pre>

**Naming**

All files have a suffix which defines their typology. <br/>
The suffix makes it easier to read when browsing files and when viewing them in tab mode in your IDE.
 
File type:
* component
* reducer
* navigator
* service
* form
* modal
* screen
* enum
* util
* model
* hook
* styled
* ...


### Back guidelines ###


NestJs is fully inspired from Angular. <br/>
If you want more guidelines (for the naming...) here is the [original documentation](https://angular.io/guide/styleguide).

Recommended folder and file structure :
<pre>
.
└── src
    ├── app.controller.ts
    ├── app.js
    ├── app.module.ts
    ├── app.service.ts
    ├── environments
    ├── api
    │   ├── auth
    │   │   ├── auth.controlleer.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.servicee.ts
    │   │   ├── dto
    │   │   ├── entities
    │   │   └── interfaces
    │   └── users
    │       ├── dto
    │       ├── entities
    │       ├── interfaces
    │       ├── users.controller.ts
    │       └── users.module.ts
    └── shared
        ├── config
        ├── decorators
        ├── footer
        └── guards
</pre>

<p align="center">
<b>Join our <a href="https://join.slack.com/t/fast-modular-project/shared_invite/zt-kxajf3gi-CIvFSB4fx7TktmWwmwP7Ig">Slack</a> if you want more.</>
</p>
<p align="center">
  <img src="https://media.giphy.com/media/oVW4ztszdtmM0/giphy.gif" alt="animated"/>
</p>
