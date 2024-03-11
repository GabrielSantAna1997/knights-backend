import mongoose from "mongoose";

const weaponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mod: { type: Number, required: true },
    attr: { type: String, required: true },
    equipped: { type: Boolean, default: false }
});

const characterSchema = new mongoose.Schema({
    name: { type: String },
    nickname: { type: String },
    birthday: { type: Date },
    weapons: [weaponSchema],
    attributes: {
        strength: { type: Number, default: 0 },
        dexterity: { type: Number, default: 0 },
        constitution: { type: Number, default: 0 },
        intelligence: { type: Number, default: 0 },
        wisdom: { type: Number, default: 0 },
        charisma: { type: Number, default: 0 }
    },
    keyAttribute: { type: String },
    type: { type: String },
});

const CharacterModel = mongoose.model('Character', characterSchema);

export default CharacterModel;
