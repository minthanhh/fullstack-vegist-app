import { Express } from 'express';
import productRouter from './product';
import categoriesRouter from './categories';
import loginRouter from './login';
import registerRouter from './register';

const route = (app: Express) => {
    app.use('/products', productRouter);
    app.use('/categories', categoriesRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
};

export default route;
