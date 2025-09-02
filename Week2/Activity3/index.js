import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';

dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');

    await User.deleteMany({});

    const newUser = await User.create({
      name: 'Ángel Mini',
      email: 'angel@gmail.com',
      age: 22,
      social: {
        facebook: 'angel.fb',
        twitter: 'angel.tw',
      },
    });

    console.log(' Usuario creado:', newUser);

    const found = await User.findOne({ email: 'angel@gmail.com' });

    console.log('\nMétodo saludar:', found.saludar());
    console.log(' ¿Es adulto?', found.isAdult());
    console.log('fullInfo (virtual):', found.fullInfo);

    const leanUser = await User.findOne({ email: 'angel@gmail.com' })
      .select('name email age')
      .lean();

    console.log('\n Consulta optimizada con lean():', leanUser);
  } catch (error) {
    console.error(' Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log(' Desconectado de MongoDB');
  }
}

main();
