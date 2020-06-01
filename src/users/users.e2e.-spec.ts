import {INestApplication} from "@nestjs/common";
import {UsersModule} from "./users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Test} from "@nestjs/testing";
import {UserEntity} from "./model/user.entity";
import {Repository} from "typeorm";
import supertest = require("supertest");
import {UserRepository} from "./user.repository";

describe('Users', () => {
    let app: INestApplication;
    let repository: Repository<UserEntity>;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                UsersModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.DATABASE_HOST,
                    port: 5432,
                    username: 'postgres',
                    password: 'password',
                    database: 'e2e_test',
                    entities: [UserEntity],
                    synchronize: true,
                }),
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        repository = module.get(UserRepository)
    });
    afterEach(async () => {
        await repository.query(`delete
                                from e2e_test.public.user
                                where name is not null`);
    });

    describe('GET /users', () => {
        it('should return an array of users', async () => {
            await repository.save([
                {name: 'John'},
                {name: 'Tommy'},
            ]);

            const {body} = await supertest.agent(app.getHttpServer())
                .get('/users')
                .expect(200);

            expect(body).toEqual([
                {id: expect.any(Number), name: 'John'},
                {id: expect.any(Number), name: 'Tommy'},
            ]);
        });
    });
});