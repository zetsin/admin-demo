This project was bootstrapped with
- [Create React App](https://github.com/facebookincubator/create-react-app) for client side
- Express for server side

Key Word: **react.js**, **redux**, **react-router**, **MaterialUI**, **Express**, **Sequelize**, **Docker**

# How to run - take these two ways
1. Run with Docker, then open http://localhost/admin
```
docker-compose up
```

2. For developing, run these in two terminals
> you need to setup PostgreSQL(or MySQL is available if making some changes in config file)

- Init project
```
npm install
```

- Server side, serve api on http://localhost:80
```
sudo npm run forever
```

- Client side, serve DEV on http://localhost:3000
```
npm run start
```
then open http://localhost:3000/admin

# Screenshot

![Screenshot](/WX20180302-165033@2x.png)

![Screenshot](/WX20180302-165042@2x.png)


# Main Depandencies

## Client Side
- React
- React-redux
- React-router
- MaterialUI

## Server Side
- Express
- Sequelize
- Passport
