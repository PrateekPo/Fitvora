import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { OnboardingDto } from './dto/onboarding.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'User profile retrieved' })
    async getProfile(@CurrentUser() user: any) {
        return this.usersService.getProfile(user.id);
    }

    @Post('onboarding')
    @ApiOperation({ summary: 'Complete user onboarding' })
    @ApiResponse({ status: 200, description: 'Onboarding completed' })
    async completeOnboarding(
        @CurrentUser() user: any,
        @Body() onboardingDto: OnboardingDto,
    ) {
        return this.usersService.completeOnboarding(user.id, onboardingDto);
    }

    @Patch('me')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiResponse({ status: 200, description: 'Profile updated' })
    async updateProfile(
        @CurrentUser() user: any,
        @Body() updateData: Partial<OnboardingDto>,
    ) {
        return this.usersService.updateProfile(user.id, updateData);
    }
}
