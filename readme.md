<p align="center">
  <img src="./fmp.png" height="130px" />
</p>

### Modular code to help you start and deploy your project faster.
  
# Starter React.js / NestJS / MySQL

As we get bored building over and over same core features, we decided to build a community on Slack in order to make modules.

Modules are reusable functionnalities between projects that are fully compatible with this starter.

Some modules are already created like Sockets, IP location, Emailing, upload file on s3 etc.

If you want to be part of the community, join our **[Slack](https://join.slack.com/t/fast-modular-project/shared_invite/zt-kmlmemhz-6bcD0lxh4Wo~6tjQc9gXTQ)** (FR/EN) and we will share with you everything.

## Description

This starter allows you to develop a web application like Facebook, Twitter, Reddit etc… <br/>
This is not adapted for web sites where SEO is important like a marketplace for example. 

* **React js** is a javascript framework built by facebook which allows building UI fastly. [Official documentation.](https://fr.reactjs.org/) 

* **Styled components** which allows us to reuse more easily the css. [Official documentation.](https://styled-components.com/)

* **Redux** will help us to store data which will be available by all the applications. [Official documentation.](https://redux.js.org/) 

* **Nest (NestJS)** is a framework for building efficient, scalable Node.js server-side applications. It’s based on express js. [Official documentation.](https://nestjs.com/) 

* We will use **Typescript** for these two frameworks. Typescript is a superset of javascript which add more reusability and security on your javascript code.

* **Docker** allows us to launch your project in an insolteed environment in one command, without downloading anything excepted [Docker.](https://www.docker.com/) 


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
You should follow this well written [tutorial](https://galadrim.fr/blog/comment-deployer-votre-back-end-sur-aws-elastic-beanstalk-avec-github-actions?fbclid=IwAR3-rh815WEBBKRZnb5ZRJqfgBm7jPZeNjswHyc4vm5tLlpOuwCHnSffW0A), but you can skip the part “Créer une Github Action” as needed files are already present in the Starter. <br/>

Set the "health check adress" from `/` to `/api` in your EBS environment : <br/>
`EBS environment` > `Configuration` > `Load Balancer` > `Modify` > `Processus`. <br/>

In [github project] > settings > Secrets, add your access keys and secrets you created in the tutorial.<br/>
`AWS_ACCESS_KEY_ID`<br/>
`AWS_SECRET_ACCESS_KEY`<br/>

Your backend will be automatically pushed to the EBS when merging on master branch thanks to Github Actions defined in `.github/workflows/main.yml`. <br/>

Now that the EBS is created, please add the URL of your EBS environment in `frontend/environments.ts` in order to direct your frontend requests to the EBS that contains your backend instance(s): 
```
const production = {
    apiUrl: "http://yourEBSname-env.xxxxxx.yourRegion.elasticbeanstalk.com/api"
}
...
```
**Step 2 : create the RDS database** <br/>
You should now create an RDS database and connect the backend (your EBS) to it. <br/>
Please note that you should have an ebs-independant RDS instance for your production env. 
Here if the main worfklow to follow for the RDS creation, but you can follow the [AWS fully detailed documentation](https://docs.aws.amazon.com/fr_fr/elasticbeanstalk/latest/dg/AWSHowTo.RDS.html) :
- create the RDS database.
- add the EBS security group to “inbound rules” of the RDS database to allow traffic from your ElasticBeanStack on port 3306.
- add the RDS security group to the EBS environment.
- add `RDS_HOSTNAME`, `RDS_USERNAME`, `RDS_PASSWORD`, `RDS_PORT`, `RDS_HOST` as env variables in your EBS environment according to what is defined in the RDS you created. Note that `backend/environment.prod.ts` refers to those env variables and we need them in our EBS environment to allow the backend to communicate with the database. Do not forget to also add a key-pair `ENV` -> `PROD` in your EBS env variables to make the backend environment switch working. <br/>


How to access production database ? <br/>
If you are not able to connect to the RDS database you can follow below instructions :
- check that your RDS database is in "publicly accessible" under  `Amazon RDS` > `Security`.
- click on the security group of your RDS (it should be the default one).
- add an inbound rule to allow your public IP to access the database (type=MYSQL, source=myIP). Note that this rule will need to be updated each time your public IP changes.
- connect with mysqlWorkBench (hostname=yourRDSEndpoint, port=3306, username=yourRDSusername, password=yourRDSpassword)

**Step 3 : create the S3 bucket and se CloudFront CDN to serve it** <br/>
This S3 bucket will hold the frontend static files. <br/>
You should follow this [tutorial](https://wolovim.medium.com/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af), but you can skip the part on uploading the code to the S3. This step will be done automatically when merging on master branch with the Github Action defined in `.github/workflows/main.yml`. <br/>

Now that your S3 bucket is created, you should update your bucket-name and your region in `./github/workflows/main.yml`.  <br/><br/>

You are now enable to access your app with the CloudFront domain name you just created (like `http://xxxx.cloudfront.net`).
That's it ! :rocket: <br/><br/>

**Step 4 (optional) : buy a domain and create your certificate** <br/>
Domain : <br/>
You can buy you own domain name with AWS Route 53 service, or with an external provider.  <br/>
For Route 53 it will automatically create an “Hosted zone” for you when buwing your domain : `Route 53` > `Verify a domain`.
Once created, wait for AWS to send you a validation mail that states your domain is created successfully (it can take up to several minutes).

Request a certificate :<br/>
You are now able to [request a public X.509 certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) with ACM using the domain name bought above.
This certificate should be on your instance's region (and us-east-1 (viriginia) for cloudFront instance).

- Provide the name you just bought above and choose a “DNS validation”.
- During the validation step (“validation pending”), click on thee dropdown containing your domain name and click on “Create a record in Route 53". This will update your CNAME records automatically.
- Once successfully done, you can click on “Continue” to end the certificate creation (will take several minutes to end the process).

Set up redirection :<br/>
Create a record in Route 53 with (`name = “”`, `alias = “Yes”`, `region=”yourRegion”`, `redirectTrafficTo=yourInstance`: `Route 53` > `Hosted zone` > `Create a record set`. <br/>

To add you certificate to your ElasticBeanStack (EBS): <br/>
- Activate the load balancer in your EBS configuration (you can set max instance = 1 if you still want a single instance of your backend) : `ElasticBeanStack` > `Configuration` > `Capacity` > Environment Type = “Load balanced”
- Add a listener in your EBS Load balancer : `ElasticBeanStack` > `Configuration` > `Load balancer` > `Listeners` > “Add a listener”. (`Port=443`, `type=HTTPS`, `certificate=vertificateCreatedBefore`).

To add you certificate to your CloudFront : <br/>
- disable IPv6
- add your custom domain name in “Other domain name”. Separate domain names with commas, or type each domain name on a new line.
- Choose “Custom SSL certificate” and select your ACM certificate you created before on us-east-1 (if this option is grey, double check that the region of the certificate is us-east-1, if it still does not work log-in and log-out from the AWS console).


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

### Docker documentation ###

**Context** <br/>
The build and the run of the starter should be as easy as possible for you. This means using docker to encapsulate the project in order to avoid conflicts with your local machine and avoid the need to install dev dependencies, a preprod cloud SQL database an so on.

**Dockerfile** <br/>
Frontend has it’s own DockerFile which defines the node version to be used, installs dependencies and starts the server. <br/>
Backend has it’s own DockerFile which defines the node version to be used, installs dependencies and then starts the server. <br/>
Database has it’s own DockerFile which defines a version of mysql to be used and the database schema. <br/>
Those dockerfiles should not be launched directly with the use of docker-compose. Otherwise, other services won’t be up (back, database...).

**Docker-compose** <br/>
It’s purpose it’s to launch and config all containers and their interactions according to what is defined in their DockerFile. <br/>
Thanks to it you can fire up the entire project with ```docker-compose up``` and stop it using ```docker-compose down```. <br/>
You can also force a re-built of the images with ```docker-compose build --no-cache```. It will force an entire rebuild. <br/>
All environment variables defined in ```.env``` and are used in Dockerfiles. Those env variables are automatically sourced when firing-up the docker-compose.

**Tips** <br/>
If you don’t have Docker Desktop, you can jump in your container and exec bash commands simply with : ```docker-compose exec -it [front|back|db]```


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
<b>Join our <a href="https://join.slack.com/t/fast-modular-project/shared_invite/zt-kmlmemhz-6bcD0lxh4Wo~6tjQc9gXTQ">Slack</a> if you want more.</>
</p>
<p align="center">
  <img src="https://media.giphy.com/media/oVW4ztszdtmM0/giphy.gif" alt="animated"/>
</p>
