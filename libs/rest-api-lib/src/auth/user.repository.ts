import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    authCredentialDto: AuthCredentialDto
  ): Promise<void | { id: string }> {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashPassword });

    try {
      await this.save(user);
      return { id: user.id };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
