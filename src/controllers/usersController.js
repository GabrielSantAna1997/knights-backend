import CharacterModel from "../models/Character.js";
import { isValidObjectId } from 'mongoose';

class UserController {
    static createUser = async (req, res) => {
        try {
            const newKnight = await CharacterModel.create(req.body);

            res.status(201).json(newKnight);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static listUser = async (req, res) => {
        try {
            const filter = req.query.filter;
    
            let knights;
            if (filter) {
                knights = await CharacterModel.find({ type: filter }); 
            } else {
                knights = await CharacterModel.find({ type: { $ne: 'hero' } });
            }
            
            res.json(knights);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static getKnightById = async (req, res) => {
        try {
            const knight = await CharacterModel.findById(req.params.id);
            if (!knight) {
                return res.status(404).json({ message: 'Knight not found' });
            }
            res.json(knight);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static removeKnight = async (req, res) => {
        try {
            const removedKnight = await CharacterModel.findByIdAndDelete(req.params.id);
            if (!removedKnight) {
                return res.status(404).json({ message: 'Knight not found' });
            }
            res.json({ message: 'Knight removed', knight: removedKnight });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static updateKnightNickname = async (req, res) => {
        try {
            const knightId = req.params.id;
            const newNickname = req.body.nickname;

            if (!isValidObjectId(knightId)) {
                return res.status(400).json({ message: "Invalid knight ID" });
            }
    
            const updatedKnight = await CharacterModel.findByIdAndUpdate(knightId, { nickname: newNickname }, { new: true });
    
            if (!updatedKnight) {
                return res.status(404).json({ message: "Knight not found" });
            }
    
            res.json(updatedKnight);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default UserController;