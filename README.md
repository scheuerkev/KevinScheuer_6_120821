<h1 align="center">API Piiquante</h1>
<p align="center">
    <img alt="Logo Piiquante" src="https://i.ibb.co/HxZFzpy/output-onlinepngtools.png" width="120" />
</p>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/KevinScheuer_6_120821#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/scheuerkev/KevinScheuer_6_120821/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
 <a href="https://twitter.com/scheuerkev" target="_blank">
    <img alt="Twitter: scheuerkev" src="https://img.shields.io/twitter/follow/scheuerkev.svg?style=social" />
  </a>
</p>

> Piiquante RESTFul API provides usage of Hot Takes web app. To enhance hype through hots sauces, Hot Takes 
> want to be the web's best hot sauce reviews. This application allow users to post their owns sauces, 
> like and dislike other users' sauces. Hot Takes is split between front app and this backend app
> (see below : [How to clone repos and run app ?](#how-to-clone-repos-and-run-app-)). Please don't forget to read [prerequisites & troubleshooting section](#prerequisites-and-troubleshooting-section-) before This documentation tell how Piiquante API work.  

### 🏠 [API Repository](https://github.com/scheuerkev/KevinScheuer_6_120821)  
### API Reference

>Piiquante API is organized around REST. This REpresentational State Transfer provides a collection of builds based 
>on HTTP protocol. As each RESTFul API, Piiquante respects 6 main guidelines : 
1. Client / server separation
2. Stateless
3. Cacheable
4. Uniforme interface
5. Layered system
6. Code on demand    

### API Authentification
>Piiquante API uses [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) to notarize requests. As far as Piiquante is a private API, usage of Hot Take
>only permit to authenticated users.   

### API Documentation
>Piiquante documentation is provided from [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification)

### 📖 [See API Documentation](http://localhost:3000/api/docs/#/) 
⚠️ Run API to access documentation 

### Prerequisites and troubleshooting section
>To prevent compilation issues you have to be very careful on these points : 
#### Global app folder
* Make sure that **Node.js 14.xx** is your current Node.js version. In other cases, you need to install and run this one. Otherwise, your compile work doesn't run.

#### Backend folder
* In some cases, you'll have to force nodemon global installation on your backend/ folder. After you clone the backend repo, you'll just have to run :
```npm install -g nodemon``` if your nodemon launching failed : e.g. ```-bash: nodemon: command not found``` OR ```-zsh: nodemon: command not found```. This means that nodemon isn't running globally.
* Create images/ folder on the root of backend/ folder. This one will be ignored by git but needs to be created to multer work properly
* Create your .env file on the backend/ root. **That's imperative !** For Mongo Credentials, you can follow a connection how-to on [mongoDB website](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database).
#### Frontend folder
* In some cases, you'll have to override deprecated node-sass version. The best way to do this is replace ```npm install node-sass@4.14.1``` by ```sudo npm install -g --unsafe-perm node-sass --save```. Some node versions doesn't allow installing old versions of a package, so you have to do this as a superuser. Look in your ```package.json``` if node-sass dependencies is something like ```"node-sass": "^4.14.1"```

## Dotenv configuration
### What is Dotenv ?
>To prevent security leaks and issues, Piiquante API use Dotenv to use environment variables.
>[Dotenv](https://github.com/motdotla/dotenv) is a zero-dependency 
> module that loads environments variables from a ```.env``` file into ```process.env``` 

### Set up your own Dotenv
1. Create your own ```.env``` file in the root directory of backend folder
2. Set your own variables based on the model NAME=VALUE
3. Provide value on the previous model for <br />```MONGO_URI=<YourDBCredentials>@<YourDBHost>``` <br /> as waited on MongoDB specifications
4. Provide value on the same model for <br />```TOKEN_KEY=<YourOwnTokenKey>``` <br /> a random alphanumeric chars string to ensure token encryption. 
_(We highly recommend to use randomly generated string from at least 28 chars)_ 
5. Don't forget to gitignore your ```.env``` file 

## How to clone repos and run app ?  
### Front-end repo   
1. First, clone the repo in a frontend folder :   
* ```git clone https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git frontend```  
* ````cd frontend````    
2. Install dependencies :   
* ```npm install```  
* ```npm install node-sass@4.14.1```  
* ```npm install angular```  
3. Then, start front-end app :  
* ```npm start```  
  
### Back-end repo
1. First, clone the repo in a backend folder :   
* ```git clone https://github.com/scheuerkev/KevinScheuer_6_120821 backend```  
* ````cd backend````    
2. Install dependencies :   
* ```npm install```   
3. Then, start API :   
* ```nodemon server```  
4. Console reports listening port :   
* ```Server running on port : 3000```


### Developed and maintained by

🦊 **Kévin Scheuer**

* Twitter: [@scheuerkev](https://twitter.com/scheuerkev)
* Github: [@scheuerkev](https://github.com/scheuerkev)
* LinkedIn: [@Kévin Scheuer](https://www.linkedin.com/in/k%C3%A9vin-scheuer-078b1510b/)

### 🤝 Contributing

Contributions, issues and feature requests are welcome!

### Show your support

Give a ⭐️ if this project helped you!

### 📝 License

Copyright © Kévin Scheuer 2021 - ISC license
***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_