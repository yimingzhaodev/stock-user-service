import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {Test} from "@nestjs/testing";
import {User} from "./model/user.entity";
import {UsersRepository} from "./users.repository";

describe('UsersController', () => {
    let usersService : UsersService;
    let usersController : UsersController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, UsersRepository]
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('get',  () => {
        it('should return an array of users', async () => {
            const testUsers = [];
            jest.spyOn(usersService, "findAll").mockImplementation(() => testUsers);
            expect(await usersController.get()).toBe(testUsers);
        });
    })
});