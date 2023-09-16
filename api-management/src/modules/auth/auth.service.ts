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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
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

    const accessToken = await this.generateAccessToken(user.uuid, user.roleId);

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
        roleId: 1,
      },
    });

    const accessToken = await this.generateAccessToken(user.uuid, user.roleId);

    return { accessToken };
  }

  private generateAccessToken(userUuid: string, roleId: number) {
    const payload = { sub: userUuid, role: roleId };
    return this.jwtService.signAsync(payload);
  }
}
