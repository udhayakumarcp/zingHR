# Zing HR

The Node.js application will mark the in/out at the desired time.

## Install NVM

To install the NVM, run the below command. For more info visit the [NVM's docs](https://github.com/nvm-sh/nvm?tab=readme-ov-file)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

## Install the Node

Install the Node.js by using the below command.

```bash
nvm install
```

```bash
nvm use
```

## Install packages

Install the dependencies by using the below command.

```bash
npm install
```

## Create .env

Copy `env` file as `.env` and update the required parameters.

## Run the database

### Install the Docker

To Install the Docker run the below command in Ubuntu. For more visit the [Docker's install page](https://docs.docker.com/engine/install/)

### Run the docker

Run the below command to run the PostgreSQL

```bash
docker compose up -d
```

## Run the migration

```bash
npx sequelize-cli db:migrate
```

## Run the Application

Run the application by using the below command

```bash
npm run dev
```

## Build the application

To build the application run the below command

```bash
npm run build
```
