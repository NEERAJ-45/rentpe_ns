import { pool } from '../config/db';
import { hash } from '../utils/hash';
import { ApiError } from '../utils/ApiHandler';
import { HTTP_STATUS } from '../utils/http_status';
export enum Role {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    SELLER = 'seller',
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export class User {
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly middleName: string;
    private readonly email: string;
    private readonly password: string | null;
    private readonly mobile: string;
    private readonly gender: Gender;
    private readonly role: Role;

    constructor(
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        password: string | null,
        mobile: string,
        gender: Gender,
        role: Role
    ) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.gender = gender;
        this.role = role;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getMiddleName(): string {
        return this.middleName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string | null {
        return this.password;
    }

    public getMobile(): string {
        return this.mobile;
    }

    public getGender(): Gender {
        return this.gender;
    }

    public getRole(): Role {
        return this.role;
    }
}

export class UserService {
    public static async insertUser(user: User): Promise<string | number> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const existing = await client.query(
                'SELECT id FROM "users" WHERE email = $1 OR mobile = $2',
                [user.getEmail(), user.getMobile()]
            );

            if (existing.rows.length > 0) {
                throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'User already exists');
            }

            const hashedPassword = await hash(user.getPassword() || '');

            const userInsert = await client.query<{ id: string | number }>(
                `INSERT INTO "users" (fname, mname, lname, email, password, mobile, gender)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING id`,
                [
                    user.getFirstName(),
                    user.getMiddleName(),
                    user.getLastName(),
                    user.getEmail(),
                    hashedPassword,
                    user.getMobile(),
                    user.getGender(),
                ]
            );

            const userId = userInsert.rows[0].id;

            await client.query(
                `INSERT INTO role (user_id, role)
         VALUES ($1, $2)`,
                [userId, user.getRole()?.toLowerCase() || 'customer']
            );

            await client.query('COMMIT');

            return userId;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}