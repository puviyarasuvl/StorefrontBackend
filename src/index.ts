import express from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable cors for all origins and routes
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started successfully at ${port}`);
});

export default app;
