# Actividad #3 - Mejores prácticas para el uso de ORM en proyectos Node.js

## Objetivo

El objetivo de este laboratorio es explorar y documentar las mejores prácticas para el uso de bibliotecas ORM (Object-Relational Mapping) en proyectos Node.js. Al completar este laboratorio, obtendrá una comprensión completa de cómo utilizar ORM de manera efectiva para gestionar las interacciones de base de datos, optimizar el rendimiento y mantener la calidad del código.

---

## Por qué Mongoose?

Elegí **Mongoose** porque me permite trabajar con una base de datos NoSQL sin complicaciones. Es ideal para pequeños proyectos o prototipos, y al mismo tiempo lo suficientemente poderoso para aplicaciones complejas. Algunas razones por las que lo considero adecuado:

- Soporte completo para esquemas y validaciones.
- Métodos personalizados y virtuales.
- Buen control sobre relaciones y rendimiento.
- Comunidad activa y buena documentación.

---

## 🛠️ Instalación y Configuración

Para comenzar, instalé los paquetes necesarios:

```bash
npm install mongoose dotenv
```

Luego, creé un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster-url>/<base-de-datos>?retryWrites=true&w=majority
```

Esta configuración asegura que el proyecto se conecte a la base de datos especificada en la variable `MONGODB_URI`. Asegúrate de reemplazar los valores de `<usuario>`, `<contraseña>`, `<cluster-url>` y `<base-de-datos>` con los valores adecuados para su entorno.

---

## Ejemplo de uso

```js
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
```

## definicion de modelo user

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0, max: 120 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  social: {
    facebook: { type: String },
    twitter: { type: String },
  },
});

userSchema.virtual('fullInfo').get(function () {
  return `${this.name} (${this.email}) - Edad: ${this.age ??
    'N/A'}`;
});

userSchema.methods.saludar = function () {
  return `Hola, soy ${this.name} y mi correo es ${this.email}`;
};

userSchema.methods.isAdult = function () {
  return this.age >= 18;
};

userSchema.pre('save', function (next) {
  if (!this.email.endsWith('@gmail.com')) {
    console.warn(`⚠️ Usuario con email no Gmail: ${this.email}`);
  }
  next();
});

userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);
```

Buenas practicas aplicadas:

- Usar `mongoose.model` para definir el modelo.
- Usar `virtual` para definir propiedades virtuales.
- Usar `pre` para definir métodos que se ejecutan antes de guardar un documento.
- Usar `index` para crear índices en la base de datos.


## Consultas

```js
const found = await User.findOne({ email: 'angel@gmail.com' });

console.log('\nMétodo saludar:', found.saludar());
console.log(' ¿Es adulto?', found.isAdult());
console.log('fullInfo (virtual):', found.fullInfo);

const leanUser = await User.findOne({ email: 'angel@gmail.com' })
  .select('name email age')
  .lean();

console.log('\n Consulta optimizada con lean():', leanUser);


```
ademas aproveche 2 metodos definidos en el modelo y un campo virtual que es el .fullInfo

esto se puede usar de la siguiente manera

```js
console.log(found.saludar());        // Hola, soy Ángel Mini...
console.log(found.isAdult());        // true
console.log(found.fullInfo);         // Ángel Mini (angel@gmail.com) - Edad: 22

```
## optimizacion de consultas

tambien probe el uso de lean() para optimizar la consulta para que una consulta pese mucho menos y sea mas rapida

```js
const leanUser = await User.findOne({ email: 'angel@gmail.com' })
  .select('name email age')
  .lean();
```


---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Este laboratorio me permitió aplicar muchas buenas prácticas al trabajar con ORMs en Node.js:

Elegí un ORM adecuado (Mongoose) según el tipo de base de datos (NoSQL).

Definí un modelo completo con validaciones, relaciones, métodos y virtuales, implementé consultas eficientes y seguras, indexación y serialización. Gracias a esto, ahora comprendo mejor cómo organizar mis modelos y optimizar consultas.
