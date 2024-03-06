# Link
Link is is a React app that helps you evaluate potential bicycle or pedestrian improvements in the greater Philadelphia region.

This repository contains the front-end components.

The [backend](https://github.com/dvrpc/link-api) is built with:
* FastAPI  
* Postgres (+ postgis & pgrouting)
* DVRPC's [LTS/sidewalk connectivity tool.](https://github.com/dvrpc/LTS_island_connectivity) 

## Setup/Installation 

### Dependencies
Make sure you have the latest LTS version of node/npm installed. Follow instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
It is strongly recommended to use one of the Node Version Managers (NVM) at the link for your OS. Once you have nvm available on the command line, get the latest stable npm version with:

```shell
nvm install lts 
```
and then (replacing 18.x.x with whatever the latest stable version you just installed was):

```shell
nvm use 18.x.x
```

### Installation

For Linux users: add this line to the end of your .bashrc and restart your shell : `export NODE_OPTIONS=--openssl-legacy-provider`. Alternatively, use node v16 or earlier.
(relates to [this issue](https://github.com/webpack/webpack/issues/14532)). Something similar may be required for Windows users. 

#### 1. Clone the repo
```shell
git clone https://github.com/dvrpc/link
```

#### 2. Run the following command to install node dependencies.
```shell
npm install
```

#### 3. Setup .env and start the server. 
Create .env.development and .env.production files in the root directory.
Both should set the REACT_APP_API_URL variable.

For example, env.development might look like:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_USER=user
REACT_APP_API_PASSWORD=pw
```
note the /api in the api. This should match whatever you set the environment variable to in the backend, if you set one.

Start the server with:

```shell
npm start
```
or build it with 
```npm run build``` which creates a directory with a production build of your app. 


#### 4. Start the backend server, following the instructions in the [backend repository.](https://github.com/dvrpc/link-api)

## Usage
Interact with the Link app by drawing segments and then clicking 'analyze'. Future functionality will include geoJSON upload and editing a copy of previous projects.
More to be added here as the app is developed.

## Contributing
Contributions are welcome. Once this app departs from the prelease stage, [conventional/semantic](https://planning-innovation-resources.ue.r.appspot.com/standards/github/) commits will be enforced.
If you'd like to contribute, open a new branch, perform your work, and open a pull request into main. 

## User authentication
In order to keep user-created projects separate between users in the app, some level of authentication is needed. 
Rather than handle this in-house, [auth0](https://auth0.com/) is used, which wraps around the main React routers. 

The auth0 user.nickname is passed down to other parts of the app, and ultimately into the db. 

Auth0 has local, staging, and production environments, so these need to be adjusted for production.
additionally, auth0 has a list of urls it can route back to after authentication, so the final project domain info 
will need to be inputted there upon launch.

## License
This project uses the GNU(v3) public license. 

