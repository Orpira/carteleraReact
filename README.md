# Librería de Componentes React

Librería de 5 componentes reutilizables hecha en React con JavaScript.  
Incluye ejemplos de uso, pruebas unitarias y estilos con Tailwind CSS.

✅ Props – ✅ Children – ✅ Composición

## Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Componentes Disponibles](#componentes-disponibles)
- [Scripts](#scripts)
- [Pruebas](#pruebas)
- [Cobertura de Código](#cobertura-de-código)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## Características

- Componentes reutilizables y personalizables.
- Pruebas unitarias con Vitest y Testing Library.
- Estilos con Tailwind CSS y PostCSS.
- Ejemplo de integración en una aplicación React.
- 100% de cobertura en la mayoría de los componentes principales.

## Instalación

Clona el repositorio e instala las dependencias:

```sh
git clone <url-del-repo>
cd libreriaComponentes
npm install
```

## Uso

Puedes importar los componentes desde el archivo principal:

```jsx
import { Card, Navbar, Form, Head, Footer } from "./index.js";
```

Ejemplo de uso de un componente:

```jsx
<Form onSubmit={(data) => console.log(data)} />
```

## Componentes Disponibles

- **Card**
- **Head**
- **Footer**
- **Navbar**
- **Form**

Cada componente acepta props para su personalización. Consulta el código fuente para más detalles.

## Scripts

- `npm run dev` – Inicia el servidor de desarrollo con Vite.
- `npm run build` – Genera la build de producción.
- `npm run preview` – Previsualiza la build.
- `npm run test` – Ejecuta las pruebas unitarias.
- `npm run test:coverage` – Ejecuta las pruebas y genera el reporte de cobertura.

## Pruebas

Las pruebas están ubicadas en la carpeta [`tests/`](tests/).  
Ejecuta todas las pruebas con:

```sh
npm run test
```

Para ver la cobertura:

```sh
npm run test:coverage
```

El reporte se genera en [`coverage/`](coverage/).

## Cobertura de Código

- Los componentes principales tienen 100% de cobertura de statements, branches y functions.
- Puedes consultar los reportes HTML en la carpeta [`coverage/`](coverage/).

## Estructura del Proyecto

```
libreriaComponentes/
├── src/
│ ├── components/
│ │ ├── Card/
│ │ ├── Footer/
│ │ ├── Form/
│ │ ├── Head/
│ │ └── Navbar/
│ ├── App.jsx
│ ├── main.jsx
│ └── ...
├── tests/
│ ├── App.test.jsx
│ ├── Card.test.jsx
│ ├── Footer.test.jsx
│ ├── Form.test.jsx
│ └── Head.test.jsx
├── public/
├── coverage/
├── package.json
└── README.md
```
