import {
    IsOptional,
    IsDateString,
    IsEnum,
    IsNumber,
    Min,
    Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, FitnessGoal, WorkoutEnvironment } from '@prisma/client';

export class OnboardingDto {
    @ApiProperty({ example: '1990-01-01' })
    @IsDateString()
    dateOfBirth: string;

    @ApiProperty({ example: 70 })
    @IsNumber()
    @Min(30)
    @Max(300)
    currentWeight: number;

    @ApiProperty({ example: 175 })
    @IsNumber()
    @Min(100)
    @Max(250)
    height: number;

    @ApiProperty({ example: 65, required: false })
    @IsOptional()
    @IsNumber()
    @Min(30)
    @Max(300)
    goalWeight?: number;

    @ApiProperty({ enum: Gender })
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({ enum: FitnessGoal })
    @IsEnum(FitnessGoal)
    fitnessGoal: FitnessGoal;

    @ApiProperty({ enum: WorkoutEnvironment })
    @IsEnum(WorkoutEnvironment)
    workoutEnvironment: WorkoutEnvironment;
}
