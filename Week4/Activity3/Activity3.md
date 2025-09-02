# Actividad #4 - Testing Strategy: Tipos de pruebas y cobertura de código

<div align="center">

## Fundamentos del Testing en Desarrollo de Software
### *Una exploración profunda de las estrategias de testing modernas*

</div>

El objetivo de esta actividad fue comprender a profundidad los **diferentes tipos de pruebas** en el desarrollo de software, analizar las **estrategias de priorización** en testing, y establecer criterios claros sobre **cobertura de código**. A través de esta investigación, pude estructurar un enfoque sólido para implementar testing efectivo en proyectos reales.

---

## Objetivos de Aprendizaje

> **Metas principales de esta actividad:**
> - **Diferenciar** entre pruebas unitarias, de integración y end-to-end
> - **Establecer** prioridades de testing en el desarrollo
> - **Definir** métricas ideales de cobertura de código
> - **Identificar** herramientas estándar para cobertura en Node.js

---

## Tipos de Pruebaso

### Pruebas Unitarias

> **Base fundamental del testing**

Las **pruebas unitarias** son la base de cualquier estrategia de testing sólida. Durante mi experiencia, he comprobado que estas pruebas son fundamentales porque:

- **Rápidas:** Se ejecutan en milisegundos, permitiendo feedback inmediato
- **Precisas:** Identifican exactamente qué componente está fallando
- **Controladas:** Utilizan mocks y stubs para eliminar dependencias externas
- **Enfoque específico:** Prueban una sola función o método de forma aislada

**Ejemplo práctico:**
```javascript
const calculateTax = (amount, rate) => amount * (rate / 100);

test('calculateTax should return correct tax amount', () => {
  expect(calculateTax(100, 10)).toBe(10);
});
```

### Pruebas de Integración

> **Validando la comunicación entre componentes**

Las **pruebas de integración** validan que diferentes módulos trabajen correctamente en conjunto. He aprendido que son cruciales porque:

- **Interacciones:** Verifican la comunicación entre componentes
- **Bases de datos:** Prueban operaciones reales con sistemas de persistencia
- **APIs:** Validan integraciones con servicios externos
- **Balance:** Ofrecen un equilibrio entre cobertura y velocidad

**Casos que cubro:**
- Conexiones a bases de datos
- Integraciones con APIs de terceros
- Flujos de datos entre módulos
- Configuraciones de middleware

### Pruebas End-to-End (E2E)

> **Simulando la experiencia real del usuario**

Las **pruebas E2E** simulan el comportamiento real del usuario final. Nosotros vimos una pequeña parte de eso en calidad de software 2. En mi experiencia, estas pruebas son esenciales para:

- **Perspectiva del usuario:** Prueban flujos completos como los usaría un usuario real
- **Interfaz completa:** Validan tanto frontend como backend
- **Experiencia real:** Incluyen navegadores, dispositivos y redes reales
- **Escenarios complejos:** Cubren workflows de negocio completos

**Herramientas que utilizo:**
- **Cypress** para aplicaciones web
- **Playwright** para testing multiplataforma
- **Selenium** para casos legacy

---

## Estrategia de Priorización en Testing

### Mi Enfoque de Priorización

Basándome en la **pirámide de testing** y lo que aprendimos en calidad de software 2, priorizo las pruebas de la siguiente manera:

| **Tipo de Prueba** | **Porcentaje** | **Características Principales** |
|---|---|---|
| **Pruebas Unitarias** | **70%** | Rápidas, baratas, alta cobertura, feedback inmediato |
| **Integración** | **20%** | Validan integraciones críticas, detectan problemas de configuración |
| **E2E** | **10%** | Flujos críticos de negocio, happy paths principales |

### Criterios de Priorización

**Alto impacto en negocio:**
- Funcionalidades que generan ingresos
- Procesos críticos para usuarios
- Integraciones con sistemas externos

**Alta frecuencia de uso:**
- Features utilizadas diariamente
- APIs con mayor tráfico
- Componentes reutilizables

---

## Cobertura de Código: Métricas y Realidades

### Mi Perspectiva sobre Cobertura Ideal

A través de mi experiencia en diferentes proyectos, he llegado a las siguientes conclusiones sobre cobertura:

| **Tipo de Proyecto** | **Cobertura Mínima** | **Cobertura Ideal** | **Justificación** |
|---|---|---|---|
| **Sistemas Críticos** | 90% | **95%+** | Aplicaciones médicas, financieras, seguridad |
| **Aplicaciones Web** | 75% | **85%** | E-commerce, SaaS, plataformas empresariales |
| **Proyectos Experimentales** | 60% | **70%** | MVPs, prototipos, proof of concepts |

### Consideraciones Importantes

**La cobertura no lo es todo:** He aprendido que el 100% de cobertura no garantiza calidad. Es más importante tener:

- **Pruebas significativas** que validen lógica de negocio
- **Casos edge** y manejo de errores
- **Pruebas que documenten** el comportamiento esperado
- **Balance entre velocidad** y exhaustividad

---

## Herramientas para Cobertura en Node.js

### NYC (Istanbul) - El Estándar de Facto

**NYC** es la herramienta estándar que sin dudas sería mi primera elección para generar cobertura de código en Node.js:

**Ventajas que he experimentado:**
- **Reportes detallados:** HTML, JSON, LCOV, texto
- **Integración perfecta:** Funciona nativamente con Jest, Mocha, Ava
- **Configuración flexible:** `.nycrc` para personalizar comportamiento
- **Compatibilidad:** Soporte para ES6, TypeScript, Babel

**Configuración que utilizo:**
```json
{
  "all": true,
  "include": ["src/**/*.js"],
  "exclude": ["**/*.test.js", "**/node_modules/**"],
  "reporter": ["html", "text", "json-summary"],
  "check-coverage": true,
  "lines": 80,
  "statements": 80,
  "functions": 80,
  "branches": 80
}
```

### Alternativas Modernas

| **Herramienta** | **Descripción** | **Comando** |
|---|---|---|
| **Jest Built-in** | Cobertura integrada sin configuración adicional. Es como tal la que estamos trabajando en el proyecto capstone actual | `jest --coverage` |
| **C8** | Usa V8's built-in coverage. Más rápido y preciso para código moderno | `c8 npm test` |

---

<div align="center">

## Lo que aprendí

</div>

**Estrategia de Testing:** Comprendí que una buena estrategia de testing requiere equilibrio. Las pruebas unitarias son la base, pero necesito integración y E2E para tener confianza real en mi sistema.

**Cobertura Inteligente:** Aprendí que perseguir el 100% de cobertura puede ser contraproducente. Es mejor enfocarse en cobertura significativa que realmente valide la lógica de negocio crítica.

**Herramientas Prácticas:** NYC se consolidó como mi herramienta estándar para cobertura, mientras que Jest simplifica todo el flujo de testing. La combinación de ambas me permite crear una suite de testing robusta y maintainible.

**Velocidad vs Calidad:** Encontré el balance perfecto priorizando pruebas unitarias para feedback rápido, complementadas estratégicamente con integración y E2E para los flujos más críticos.