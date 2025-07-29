import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import {getUser,getUsers} from '../controllers/user.controllers.js';
// Importing necessary modules and functions

// from express and user controllers
const userRouter = Router();

userRouter.get('/',getUsers)
 

userRouter.get('/:id',authorize,getUser);
 

userRouter.post('/', (req, res) => res.send({
    title: "create a new user",
}));
userRouter.put('/:id', (req, res) => res.send({
    title: "update user ",
}));
userRouter.delete('/:id', (req, res) => res.send({
    title: "DELETE users",
}));

export default userRouter;