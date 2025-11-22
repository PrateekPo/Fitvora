import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OnboardingDto } from './dto/onboarding.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                provider: true,
                dateOfBirth: true,
                gender: true,
                currentWeight: true,
                height: true,
                goalWeight: true,
                fitnessGoal: true,
                workoutEnvironment: true,
                isOnboarded: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async completeOnboarding(userId: string, onboardingDto: OnboardingDto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                dateOfBirth: new Date(onboardingDto.dateOfBirth),
                currentWeight: onboardingDto.currentWeight,
                height: onboardingDto.height,
                goalWeight: onboardingDto.goalWeight,
                gender: onboardingDto.gender,
                fitnessGoal: onboardingDto.fitnessGoal,
                workoutEnvironment: onboardingDto.workoutEnvironment,
                isOnboarded: true,
            },
            select: {
                id: true,
                email: true,
                name: true,
                isOnboarded: true,
                fitnessGoal: true,
                workoutEnvironment: true,
            },
        });

        return user;
    }

    async updateProfile(userId: string, updateData: Partial<OnboardingDto>) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(updateData.dateOfBirth && {
                    dateOfBirth: new Date(updateData.dateOfBirth),
                }),
                ...(updateData.currentWeight && {
                    currentWeight: updateData.currentWeight,
                }),
                ...(updateData.height && { height: updateData.height }),
                ...(updateData.goalWeight && { goalWeight: updateData.goalWeight }),
                ...(updateData.gender && { gender: updateData.gender }),
                ...(updateData.fitnessGoal && { fitnessGoal: updateData.fitnessGoal }),
                ...(updateData.workoutEnvironment && {
                    workoutEnvironment: updateData.workoutEnvironment,
                }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                dateOfBirth: true,
                gender: true,
                currentWeight: true,
                height: true,
                goalWeight: true,
                fitnessGoal: true,
                workoutEnvironment: true,
                isOnboarded: true,
            },
        });

        return user;
    }
}
