import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { USER } from 'src/shared/decorators/roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.uuid, user.role);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const emailTaken = await this.usersRepo.findUnique({
      where: { email: signupDto.email },
    });

    if (emailTaken) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await hash(signupDto.password, 12);

    const user = await this.usersRepo.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        city: signupDto.city,
        state: signupDto.state,
        country: signupDto.country,
        phoneNumber: signupDto.phoneNumber,
        phoneRegionCode: signupDto.phoneRegionCode,
        phoneCountryCode: signupDto.phoneCountryCode,
        role: USER,
      },
    });

    const accessToken = await this.generateAccessToken(user.uuid, user.role);

    return { accessToken };
  }

  private generateAccessToken(userUuid: string, role: string) {
    const payload = { sub: userUuid, role: role };
    return this.jwtService.signAsync(payload);
  }
}
