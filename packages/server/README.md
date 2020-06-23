## Previous steps

- install `NodeJS` to your local machine

- install `postgresql` to your local machine

- install dependencies in the folder

## Development process

#### start:dev

- starts a postgres DB locally

## Deployment process

### Preparation stages

- install `aws cli` to your local machine (see https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html for reference)

- configure `aws cli` (see https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

- create `envVariables.json` file in the following format:

```
{
    "POSTGRES_PASSWORD": "password_for_existing_postgres_db",
    "POSTGRES_DB": "db_name",
    "POSTGRES_USER": "master_user_name",
    "POSTGRES_HOST": "host_for_existing_postgres_db",
    "POSTGRES_PORT": "5432",
    "PORT": "3000"
}
```

- make sure there is no `crotonLambda` or `crotonLambda-executor` in the `Lambda` section of your IAM user; if there are such they should be deleted

### Deployment stage

#### server:deploy

- deploys your code to aws

#### set up policies

- go to the IAM account

- find the `crotonLambda-executor` role

- set-up following policies: `AmazonRDSFullAccess`, `AWSLambdaFullAccess`, `IAMFullAccess`, `AmazonAPIGatewayAdministrator`, `AWSLambdaVPCAccessExecutionRole`

- check out the `claudia.json` file: it should look like this:

```
{
  "lambda": {
    "role": "crotonLambda-executor",
    "name": "crotonLambda",
    "region": "us-east-1"
  },
  "api": {
    "id": "1234567890"
  }
}
```

- the root endpoint is composed like this: `https://${api.id}.execute-api.${lambda.region}.amazonaws.com/latest`, in this case it would be `https://1234567890.execute-api.us-east-1.amazonaws.com/latest`
