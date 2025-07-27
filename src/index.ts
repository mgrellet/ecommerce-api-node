import express, { json, urlencoded } from 'express';
import productRouter from './routes/products';

const app = express();

app.use(urlencoded({ extended: false}))
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.use('/products', productRouter);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});

