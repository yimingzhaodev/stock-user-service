import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {Test} from "@nestjs/testing";
import {User} from "./model/user.entity";
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

            const spy = jest.spyOn(usersService, 'add');
            await usersController.add(createUserDTO) 

            const addedUser = usersService.findAll().find(user => user.name == 'test');

            expect(spy).toBeCalledWith(createUserDTO);
            expect(addedUser).toBeDefined();
            expect(addedUser.name).toEqual(createUserDTO.name);
        });
    })
});