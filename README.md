# connect
connect is is a react app that helps you evaluate potential bicycle or pedestrian improvements in the greater Philadelphia region.

the app serves as the front-end for the developed by DVRPC. 

the backend logic is handled [here](https://github.com/dvrpc/connect-api). it uses fastapi and postgres + postgis + pgrouting, as well as the [lts/sidewalk connectivity tool.](https://github.com/dvrpc/LTS_island_connectivity) 

## getting started
make sure you have the latest LTS version of node/npm installed. 

also- i had to add this to my .bashrc : `export NODE_OPTIONS=--openssl-legacy-provider`. alternatively, use node v16 or earlier.
(relates to [this issue](https://github.com/webpack/webpack/issues/14532))

Run the following command to install node dependencies
```shell
npm install
```

then start the server with
```shell
npm start
```

## user authentication
in order to keep projects separate between people, some level of authentication is needed. 
rather than handle this in-house, [auth0](https://auth0.com/) is used. 

the auth0 user.nickname is passed down to other parts of the app, and ultimately into the db. 

auth0 has local, staging, and production environments, so these need to be adjusted for production.
additionally, auth0 has a list of urls it can route back to after authentication, so the final project domain info 
will need to be inputted there upon launch.


