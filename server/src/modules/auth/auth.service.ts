import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                provider: 'CREDENTIALS',
            },
            select: {
                id: true,
                email: true,
                name: true,
                provider: true,
                isOnboarded: true,
            },
        });

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email);

        return {
            user,
            ...tokens,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                provider: user.provider,
                isOnboarded: user.isOnboarded,
            },
            ...tokens,
        };
    }

    async googleAuth(profile: any) {
        const { email, name, sub: providerId } = profile;

        // Check if user exists
        let user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { providerId, provider: 'GOOGLE' }],
            },
        });

        if (!user) {
            // Create new user
            user = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    provider: 'GOOGLE',
                    providerId,
                },
            });
        }

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                provider: user.provider,
                isOnboarded: user.isOnboarded,
            },
            ...tokens,
        };
    }

    async refreshToken(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return this.generateTokens(user.id, user.email);
    }

    private async generateTokens(userId: string, email: string) {
        const payload = { sub: userId, email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET')!,
                expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '15m',
            } as any),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
                expiresIn:
                    this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
            } as any),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
