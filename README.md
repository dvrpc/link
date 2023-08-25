# connect
connect is is a react app that serves as the front-end for the lts/sidewalk connectivity tool, developed by DVRPC. 
the underlying python module is [here](https://github.com/dvrpc/LTS_island_connectivity). 

the backend is under development, viewable [here](https://github.com/dvrpc/connect-api). it uses fastapi and postgres + postgis + pgrouting.

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

## todo 
* add setup documentation
* bring in interactivity scripts from sandbox
* add draw line functions, set up a way to make new table from segments
* create hooks and routers for authentication, tie to api endpoints
* setup sidebar where studies will be viewable, create hooks to api

