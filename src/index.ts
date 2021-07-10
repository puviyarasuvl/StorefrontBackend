import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started successfully at ${port}`);
});

export default app;
