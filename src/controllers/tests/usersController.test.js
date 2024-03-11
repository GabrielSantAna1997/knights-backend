// usersController.test.js
import UserController from '../usersController';
import CharacterModel from '../../models/Character';

jest.mock('../../models/Character');

describe('UserController', () => {


  describe('createUser', () => {
    it('deve criar um novo cavaleiro com sucesso', async () => {
      const req = { body: { name: 'Sir Lancelot', type: 'knight' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(CharacterModel, 'create').mockResolvedValueOnce(req.body);

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('deve retornar status 500 em caso de falha na criação do cavaleiro', async () => {
      const req = { body: { name: 'Sir Lancelot', type: 'knight' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Erro na criação do cavaleiro';
      jest.spyOn(CharacterModel, 'create').mockRejectedValueOnce(new Error(errorMessage));

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

  });



  describe('listUser', () => {
    it('deve retornar todos os cavaleiros quando nenhum filtro é fornecido', async () => {
      const req = { query: {} };
      const res = { json: jest.fn() };

      const knights = [{ name: 'Sir Lancelot', type: 'knight' }, { name: 'Sir Galahad', type: 'knight' }];
      jest.spyOn(CharacterModel, 'find').mockResolvedValueOnce(knights);

      await UserController.listUser(req, res);

      expect(res.json).toHaveBeenCalledWith(knights);
    });

    it('deve retornar cavaleiros filtrados pelo tipo fornecido', async () => {
      const req = { query: { filter: 'knight' } };
      const res = { json: jest.fn() };

      const knights = [{ name: 'Sir Lancelot', type: 'knight' }, { name: 'Sir Galahad', type: 'knight' }];
      jest.spyOn(CharacterModel, 'find').mockResolvedValueOnce(knights);

      await UserController.listUser(req, res);

      expect(CharacterModel.find).toHaveBeenCalledWith({ type: 'knight' });
      expect(res.json).toHaveBeenCalledWith(knights);
    });

    it('deve retornar status 500 em caso de erro ao buscar cavaleiros', async () => {
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const errorMessage = 'Erro ao buscar cavaleiros';
      jest.spyOn(CharacterModel, 'find').mockRejectedValueOnce(new Error(errorMessage));

      await UserController.listUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getKnightById', () => {
    it('deve retornar o cavaleiro com o ID correspondente', async () => {
      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };

      const knight = { _id: '123', name: 'Sir Lancelot', type: 'knight' };
      jest.spyOn(CharacterModel, 'findById').mockResolvedValueOnce(knight);

      await UserController.getKnightById(req, res);

      expect(CharacterModel.findById).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith(knight);
    });

    it('deve retornar status 404 quando o cavaleiro não é encontrado', async () => {
      const req = { params: { id: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(CharacterModel, 'findById').mockResolvedValueOnce(null);

      await UserController.getKnightById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Knight not found' });
    });
  });


  describe('removeKnight', () => {
    it('deve remover o cavaleiro com o ID correspondente', async () => {
      const req = { params: { id: '123' } };
      const res = { json: jest.fn() };

      const removedKnight = { _id: '123', name: 'Sir Lancelot', type: 'knight' };
      jest.spyOn(CharacterModel, 'findByIdAndDelete').mockResolvedValueOnce(removedKnight);

      await UserController.removeKnight(req, res);

      expect(CharacterModel.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Knight removed', knight: removedKnight });
    });

    it('deve retornar status 404 quando o cavaleiro não é encontrado', async () => {
      const req = { params: { id: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      jest.spyOn(CharacterModel, 'findByIdAndDelete').mockResolvedValueOnce(null);

      await UserController.removeKnight(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Knight not found' });
    });
  });

  describe('updateKnightNickname', () => {
    it('deve retornar status 400 para ID de cavaleiro inválido', async () => {
      const req = { params: { id: 'invalid_id' }, body: { nickname: 'Sir Lancelot the Brave' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await UserController.updateKnightNickname(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid knight ID' });
    });
  });

  describe('updateKnightToHero', () => {
    it('deve retornar status 400 para ID de cavaleiro inválido', async () => {
      const req = { params: { id: 'invalid_id' }, body: { nickname: 'Sir Lancelot the Brave' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await UserController.updateKnightNickname(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid knight ID' });
    });
});

});