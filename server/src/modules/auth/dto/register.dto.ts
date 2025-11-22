import {
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password123' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: 'Password must contain at least one letter and one number',
    })
    password: string;
}
