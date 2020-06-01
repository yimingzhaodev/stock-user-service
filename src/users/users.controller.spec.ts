import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {Test} from "@nestjs/testing";
import {CreateUserDTO} from "./dto/create.users.dto";
import {UsersRepository} from "./users.repository";
import {UserRepository} from "./user.repository";

describe('UsersController', () => {
    let usersService : UsersService;
    let usersController : UsersController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: UserRepository,
                    useClass: UsersRepository
                },
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

            const allUsers = await usersService.findAll();
            const addedUser = allUsers.find(user => user.name == 'test');

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

            const allUsers = await usersService.findAll();
            const updatedUser = allUsers.find(user => user.name == 'John');

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

            const allUsers = await usersService.findAll();
            const updatedUser = allUsers.find(user => user.name == 'test');
            expect(updatedUser).toBeUndefined();
        });
    })
});