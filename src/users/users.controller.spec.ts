import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {Test} from "@nestjs/testing";
import {UsersRepository} from "./users.repository";
import {CreateUserDTO} from "./dto/create.users.dto";

describe('UsersController', () => {
    let usersService : UsersService;
    let usersController : UsersController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                UsersRepository,
            ]
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('get',  () => {
        it('should return an array of users', async () => {
            const spy = jest
                .spyOn(usersController, 'get')
                .mockImplementation(async () => [])
            const users = await usersController.get();
            expect(users).toStrictEqual([]);
        });
    })

    describe('post',  () => {
        it('should add an user', async () => {
            const createUserDTO = new CreateUserDTO();
            createUserDTO.name = 'test'
            await usersController.add(createUserDTO)

            const addedUser = usersService.findAll().find(user => user.name == 'test');

            expect(addedUser).toBeDefined();
            expect(addedUser.name).toEqual(createUserDTO.name);
        });
    })

    describe('put',  () => {
        it('should update an user\'s name', async () => {
            const createUserDTO = new CreateUserDTO();
            createUserDTO.name = 'test';
            await usersController.add(createUserDTO);
            createUserDTO.name="John";
            await usersController.update(3, createUserDTO);

            const updatedUser = usersService.findAll().find(user => user.name == 'John');

            expect(updatedUser).toBeDefined();
            expect(updatedUser.name).toEqual(createUserDTO.name);
        });
    })

    describe('remove',  () => {
        it('should remove an user', async () => {
            const createUserDTO = new CreateUserDTO();
            createUserDTO.name = 'test';
            await usersController.add(createUserDTO);
            await usersController.remove(3);

            const updatedUser = usersService.findAll().find(user => user.name == 'test');
            expect(updatedUser).toBeUndefined();
        });
    })
});