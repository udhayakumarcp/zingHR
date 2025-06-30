# Zing HR

The Node.js application will mark the punch in/out at the desired time.

## Create .env

Copy `env` file as `.env` and update the required parameters by below the command.

```bash
cp .env.example .env
```

## Install the Docker

To Install the Docker run the below command in Ubuntu. For more visit the [Docker's install page](https://docs.docker.com/engine/install/)

## For Development

### Install NVM

To install the NVM, run the below command. For more info visit the [NVM's docs](https://github.com/nvm-sh/nvm?tab=readme-ov-file)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

### Install the Node

Install the Node.js by using the below command.

```bash
nvm install
```

```bash
nvm use
```

### Install packages

Install the dependencies by using the below command.

```bash
npm install
```

### Run the docker

Run the below command to run the PostgreSQL through Docker.

```bash
docker compose up -d
```

### Run the migration

```bash
npx sequelize-cli db:migrate
```

### Run the Application

Run the application by using the below command

```bash
npm run dev
```

## For Production

### Build the application

To build and run the application as container through Docker run the below command.

```bash
docker compose --profile prod up -d --build

```

### Run the migration

```bash
docker-compose exec app npx sequelize-cli db:migrate
```
