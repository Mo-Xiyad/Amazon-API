# Amazon product PAI

> In this API i am using sequelize to connect to the database and i am using postgres as my database

From some basic usage of sequelize and advanced usage of sequelize i have created this API
All of the CRUD operations are available in this API

- products
- categories
- users
- reviews

### to use the API check out the Documentation

### Environment Variables

> NODE_ENV = "development";
> PGHOST = "localhost"; // in case you are using a local database server most likely you will be using this
> PGUSER = "mohamedziyad"; // your username in most likely case (machine username)
> PGDATABASE = "postgres";
> PGPASSWORD = ""; // your master password which you have created when you installed postgres
> PGPORT = 5432; // default port for postgres
> PORT = 3000; // default port for nodejs
> Im also using cloudinary to store the images so be sure to create an account and get your cloud name, api key and api secret
> CLOUDINARY_URL

After you have created the database and the tables you can run the following command to start the server

```bash
npm run dev
```
