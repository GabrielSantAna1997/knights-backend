import express from 'express';
import UserController from "../controllers/usersController.js"
import {isAuthenticated} from '../middleware/isAuthenticated.js';

const router = express.Router();
router  
    .get("/knights", UserController.listUser)
    .post("/knights", UserController.createUser)
    .get("/knights/:id", UserController.getKnightById)
    .delete("/knights/:id", UserController.removeKnight)
    .put("/knights/:id", UserController.updateKnightNickname)
    .put("/knights/hero/:id", UserController.updateKnightToHero)
    
export default router;