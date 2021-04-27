import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { payloadDto } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private jwt: AuthService,
  ) {}
  create(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    const user = this.user.findOne({ name: name });
    if (!user) {
      throw new HttpException(
        'username is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return new this.user(createUserDto).save();
  }

  findAll() {
    return this.user.find();
  }

  findOne(id: string) {
    return this.user.findById(id);
  }
  lockUser(id: string, lock: boolean) {
    return this.user.findByIdAndUpdate(id, { lock: lock }, { new: true });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string) {
    return this.user.findByIdAndRemove(id);
  }
  async validation(loginDto: loginDto) {
    const { name, password } = loginDto;
    const user = await this.user.findOne({ name: name, password: password });
    if (!user) {
      throw new HttpException(
        'برجاء ادخال الاسم ورقم المرور صحيحين',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
  async login(loginDto: loginDto) {
    const user = await this.validation(loginDto);
    const payload = { name: user.name, id: user._id, role: user.role };
    const token = await this.jwt.sign(payload);
    return { name: user.name, role: user.role, token: token };
  }
}
