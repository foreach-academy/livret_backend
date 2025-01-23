import app from './index.js';

app.listen(process.env.API_PORT || 4000, () => {
    console.log(
        `L'API est lancé sur le port ${process.env.API_PORT}`
    );
});