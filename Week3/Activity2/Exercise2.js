/**
 *  una función que planifique una actividad de juego para niños. La función tomará tres argumentos: activityName, duration (en minutos) y numberOfKids. Utilizando la aplicación parcial, crearás funciones específicas para diferentes actividades con duraciones predefinidas. Finalmente, usarás estas funciones para planificar actividades para diferentes números de niños.
 * @param {activityName} el nombre de la actividad
 * @param {duration} la duración de la actividad en minutos
 * @param {numberOfKids} el número de niños que participarán en la actividad
 * @returns {string} una descripción de la actividad
 */

const planActivity = (activityName, duration, numberOfKids) => {
    return `El ${activityName} dura ${duration} minutos y tiene ${numberOfKids} niños`;
};


/**
 *  una función parcialmente aplicada planActivityWithDuration de 15 minutos con un número de niños de 5.
 * @param {activityName} el nombre de la actividad
 * @param {numberOfKids} el número de niños que participarán en la actividad
 * @returns {string} una descripción de la actividad
 */

const planActivityWithDuration = (activityName, numberOfKids) => planActivity(activityName, 15, numberOfKids);

// finalmente aplique esta función parcialmente aplicada para planificar actividades para diferentes números de niños.

const activity1 = planActivityWithDuration("juego de mesa", 5);
const activity2 = planActivityWithDuration("juego de mesa", 10);
const activity3 = planActivityWithDuration("juego de mesa", 15);

console.log(activity1);
console.log(activity2);
console.log(activity3);