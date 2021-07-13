# StorefrontBackend

## Package installation

    'npm install' to install the required packages.

## Docker setup

    'docker-compose up' to start the docker container. Used a init script to create dev and test databases.
    While pushing the script to git it replaced all LF as CRLF. So while running the 'docker-compose up' if the script gave any error please open the scipt in any linux editor and rewrite the method. I dont have other better solution now. Sorry for that.

## Ports

    express port : localhost:3000
    docker port : localhost:5432

## Jasmine tests

    'npm run test' to run jasmine tests. It will change the environment to test and perform tests using the test DB. It will run DB migrtions on the test DB. Sometimes very rarely i am getting one or two test case failures due to timing issue. I will try to resolve them.

## Start express

    'npm run start' to start express

## DB Migrate

    'db-migrate up' to perform migration. Please run this migrate command before accessing any endpoint
