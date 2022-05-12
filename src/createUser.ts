import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import SendEmail from './email/SendEmail';

interface ICreateUserProps {
  email: string;
  username: string;
  firstName: string;
  lastName?: string;
  password: string;
}

async function CreateUser(props: ICreateUserProps) {
  const prisma = new PrismaClient();

  if (props.password.length < 8) throw new Error('Password is too short');

  const hashedPassword = await hash(
    props.password,
    parseInt(process.env.HASH_SALT || '10')
  );

  // create user
  const user = await prisma.user.create({
    data: {
      email: props.email,
      username: props.username,
      firstName: props.firstName,
      lastName: props.lastName,
      password: hashedPassword,
    },
  });

  // create email validation token
  const token = await prisma.verifyUserToken.create({
    data: {
      userId: user.id,
    },
  });

  // send email
  await SendEmail(
    'Verify your email',
    `<a href="${process.env.APP_URL}/verify-email?token=${token.id}">Verify your email</a>`,
    user.email
  );
}

export default CreateUser;
