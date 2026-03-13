# Funds Management

Aplicación web para gestión de fondos de inversión desarrollada con Angular 21.

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Librerías Utilizadas](#-librerías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Metodología de Carpetas](#-metodología-de-carpetas)
- [Testing](#-testing)
- [Despliegue](#-despliegue)

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm >= 9.x

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/funds-management.git

# Entrar al directorio
cd funds-management

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start` | `npm start` | Inicia el servidor de desarrollo |
| `build` | `npm run build` | Compila la aplicación para producción |
| `test` | `npm test` | Ejecuta tests en modo watch |
| `test:ci` | `npm run test:ci` | Ejecuta tests con cobertura (CI/CD) |
| `watch` | `npm run watch` | Compila en modo watch |

## 📚 Librerías Utilizadas

### Dependencias de Producción

| Librería | Versión | Descripción |
|----------|---------|-------------|
| `@angular/core` | ^21.1.0 | Framework principal |
| `@angular/forms` | ^21.1.0 | Manejo de formularios reactivos |
| `@angular/router` | ^21.1.0 | Enrutamiento SPA |
| `rxjs` | ~7.8.0 | Programación reactiva |
| `zone.js` | ^0.16.1 | Detección de cambios |

### Dependencias de Desarrollo

| Librería | Versión | Descripción |
|----------|---------|-------------|
| `tailwindcss` | ^4.2.1 | Framework CSS utility-first |
| `karma` | ^6.4.4 | Test runner |
| `jasmine-core` | ^6.1.0 | Framework de testing |
| `typescript` | ~5.9.2 | Superset de JavaScript |

## 📁 Estructura del Proyecto

```
src/app/
├── core/                    # Núcleo de la aplicación
│   ├── api/                 # Servicios de API
│   │   ├── fund/           # Servicio de fondos
│   │   ├── subscription/   # Servicio de suscripciones
│   │   ├── transaction/    # Servicio de transacciones
│   │   └── user/           # Servicio de usuario
│   ├── constants/          # Constantes y mensajes
│   ├── models/             # Interfaces y tipos
│   └── services/           # Servicios de utilidad
│       └── toast/          # Servicio de notificaciones
├── pages/                   # Páginas/Vistas
│   ├── dashboard/          # Dashboard principal
│   │   ├── funds-list/     # Lista de fondos
│   │   ├── subscriptions/  # Suscripciones activas
│   │   └── transactions/   # Historial de transacciones
│   └── landing/            # Página de inicio
├── shared/                  # Componentes compartidos
│   ├── components/         # Componentes reutilizables
│   │   ├── confirm-modal/
│   │   ├── data-table/
│   │   ├── fund-card/
│   │   ├── header/
│   │   ├── search-input/
│   │   ├── sidebar/
│   │   ├── subscribe-modal/
│   │   ├── timeline/
│   │   ├── toast/
│   │   └── view-toggle/
│   └── directives/         # Directivas personalizadas
│       ├── button.directive.ts
│       └── input.directive.ts
└── testing/                 # Utilidades de testing
    └── mocks/              # Datos mock para tests
```

## 🏗️ Metodología de Carpetas

El proyecto sigue una arquitectura modular basada en **Feature Modules**:

### Core Module (`/core`)
Contiene la lógica de negocio central:
- **api/**: Servicios que interactúan con datos externos
- **models/**: Interfaces, tipos y enums
- **services/**: Servicios de utilidad (toast, etc.)
- **constants/**: Mensajes y valores constantes

### Pages (`/pages`)
Cada página es un módulo independiente con sus propios componentes:
- Lazy loading para optimizar carga inicial
- Cada página puede tener sub-componentes específicos

### Shared Module (`/shared`)
Componentes y directivas reutilizables:
- **components/**: UI components (modales, tablas, cards)
- **directives/**: Directivas de estilo (`appButton`, `appInput`)

### Testing (`/testing`)
Utilidades para pruebas unitarias:
- **mocks/**: Datos mock centralizados (`MOCK_USER`, `MOCK_FUNDS`, etc.)

## 🧪 Testing

El proyecto utiliza **Karma + Jasmine** para pruebas unitarias.

### Ejecutar Tests

```bash
# Modo watch (desarrollo)
npm test

# Modo CI con cobertura
npm run test:ci
```

### Cobertura Actual

| Métrica | Cobertura |
|---------|-----------|
| Statements | 90.56% |
| Branches | 86.84% |
| Functions | 83.62% |
| Lines | 90.34% |

### Metodología de Testing

- **AAA Pattern**: Arrange, Act, Assert
- **Mocks centralizados**: Ubicados en `/testing/mocks`
- **Spies de Jasmine**: Para mockear dependencias
- **TestBed**: Configuración de módulos de prueba

### Ejemplo de Test

```typescript
describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    
    service = TestBed.inject(SubscriptionService);
  });

  it('should create subscription', () => {
    // Arrange
    userServiceSpy.getUser.and.returnValue(MOCK_USER);
    
    // Act
    const result$ = service.subscribe(1, 75000, NotificationMethod.EMAIL);
    
    // Assert
    result$.subscribe(result => {
      expect(result.success).toBeTrue();
    });
  });
});
```

## 🚀 Despliegue

El proyecto se despliega automáticamente en **GitHub Pages** mediante GitHub Actions.

### Pipeline CI/CD

1. **Test**: Ejecuta pruebas unitarias
2. **Build**: Compila la aplicación (solo si tests pasan)
3. **Deploy**: Despliega a GitHub Pages (solo en `main`)

### Build Manual

```bash
npm run build -- --configuration production --base-href /funds-management/
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
