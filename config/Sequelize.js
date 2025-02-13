import { Sequelize } from "sequelize";



const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host : process.env.DATABASE_HOST,
    dialect : "postgres",
    port : process.env.DATABASE_PORT
})

sequelize.authenticate()

    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err );
    });

export default sequelize;