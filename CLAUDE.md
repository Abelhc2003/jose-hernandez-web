# CLAUDE.md — Web Oficial de José Hernández Mondéjar

> Este documento es la fuente de verdad del proyecto. Léelo completo antes de escribir cualquier línea de código. Todas las decisiones técnicas, de diseño y de contenido están aquí documentadas.

---

## 1. VISIÓN GENERAL DEL PROYECTO

Sitio web oficial del escritor **José Hernández Mondéjar** (Murcia, 1953). El objetivo es presentar al autor y sus obras de forma elegante y profesional, dirigir al lector a comprar en Amazon, y crear una experiencia literaria inmersiva que enganche desde el primer scroll.

**No es** un e-commerce propio. **No** gestiona pagos. **Sí** es una vitrina editorial de alto nivel con experiencia cinematográfica.

---

## 2. STACK TECNOLÓGICO

| Capa | Tecnología | Motivo |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSG/SSR, SEO, i18n nativo, ecosistema maduro |
| Lenguaje | **TypeScript** | Seguridad de tipos, mantenibilidad |
| Estilos | **Tailwind CSS** | Utilidad rápida + design system coherente |
| Animaciones | **Framer Motion** | Scroll cinematográfico, parallax, pinceladas |
| 3D Hero | **Three.js + React Three Fiber** | Libro 3D abriéndose en el hero principal |
| Scroll narrativo | **GSAP + ScrollTrigger** | Control preciso de animaciones por scroll (trilogía) |
| Scroll suave | **Lenis** | Scroll cinematográfico premium, integrado con GSAP RAF |
| i18n | **next-intl** | Soporte ES / EN / FR |
| Formulario contacto | **React Hook Form + Resend** | Email real al autor sin backend propio |
| Newsletter | **Resend Audiences** | Gestión de suscriptores, gratuito hasta 3k/mes |
| CMS (opcional fase 2) | **Contentlayer o archivos MDX** | Blog del autor sin base de datos |
| Deploy | **Vercel** | CI/CD automático, dominio custom, analytics gratis |
| Analytics | **Vercel Analytics** | Sin cookies, GDPR-friendly |

---

## 3. AUTOR — DATOS REALES

```
Nombre completo : José Hernández Mondéjar
Nacimiento      : 3 de noviembre de 1953, Murcia (España)
Formación       : Graduado Social · Licenciado en Ciencias del Trabajo · Máster en Dirección de Empresas
Carrera prof.   : Director del Hospital Perpetuo Socorro de Cartagena (desde 1992)
Periodismo      : Articulista de opinión en La Verdad y La Opinión de Murcia durante +20 años
Primeras letras : Diario Línea · Servicio militar (varios premios)
Descripción     : Voz crítica del ciudadano de a pie. Visionario político. Escritor de poesía, prosa y narrativa.
Redes sociales  : [AÑADIR URLs cuando estén disponibles]
Email contacto  : [AÑADIR email real del autor]
```

**Foto del autor:** Pendiente de recibir. El componente `AuthorPhoto` debe manejar gracefully el estado sin foto (placeholder literario elegante).

---

## 4. CATÁLOGO COMPLETO DE OBRAS

### 4.1 Trilogía — "La no muerte de Jesús"
Carácter: histórico-religioso. Revisión heterodoxa de los Evangelios.

| # | Título | Amazon ES | Precio ref. |
|---|---|---|---|
| 1 | La no muerte de Jesús *(Evangelio invisible)* | https://www.amazon.es/muerte-Jes%C3%BAs-INVISIBLES-EVANGELIO-MIRAHADAS/dp/8419973521/ | 26,95 € |
| 2 | La no muerte de Jesús — Hechos de los Apóstoles | https://www.amazon.es/muerte-Jes%C3%BAs-Ap%C3%B3stoles-MIRAHADAS-J%C3%93VENES/dp/B0DNHLDBR9/ | 25,95 € |
| 3 | La no muerte de Jesús — Cartas de Pablo | https://www.amazon.es/muerte-Jes%C3%BAs-MIRAHADAS-J%C3%93VENES-ADULTOS/dp/B0DNHQQVP7/ | 25,95 € |

### 4.2 Poesía

| # | Título | Amazon ES |
|---|---|---|
| 4 | Entre versos y prosa — Amor y desamor | https://www.amazon.es/Entre-versos-prosa-Amor-desamor/dp/B0FKZTFB3J/ |
| 5 | Entre Prosa y Poesía | https://www.amazon.es/Entre-Prosa-Poes%C3%ADa-MIRAHADAS-JOVENES/dp/B0DZ66Z26N/ |

### 4.3 Narrativa

| # | Título | Amazon ES |
|---|---|---|
| 6 | Estación Terminus | https://www.amazon.es/Estaci%C3%B3n-Terminus-Jos%C3%A9-Hern%C3%A1ndez-Mond%C3%A9jar/dp/B0GXGK65FF/ |

> **Nota para Claude Code:** Todos los enlaces de Amazon deben abrirse en `target="_blank" rel="noopener noreferrer"`. Usar el parámetro de afiliado si el autor lo tiene (`?tag=XXXX`).

---

## 5. ARQUITECTURA DE RUTAS

```
/                          → Home (hero 3D + resumen autor + libros destacados + newsletter)
/autor                     → Página completa del autor (bio extensa + foto + trayectoria)
/obras                     → Catálogo completo de todas las obras
/obras/trilogia            → Página narrativa scrolleable de la trilogía (experiencia inmersiva)
/obras/[slug]              → Página individual de cada libro
  /obras/estacion-terminus
  /obras/entre-versos-y-prosa-amor-y-desamor
  /obras/entre-prosa-y-poesia
  /obras/la-no-muerte-de-jesus
  /obras/la-no-muerte-de-jesus-apostoles
  /obras/la-no-muerte-de-jesus-cartas-pablo
/contacto                  → Formulario de contacto + mapa / localización Murcia
/newsletter                → Confirmación de suscripción (página de gracias)

# Con i18n (next-intl):
/es/...   /en/...   /fr/...
```

---

## 6. DISEÑO — DESIGN SYSTEM

### 6.1 Paleta de colores

```css
/* Definir en tailwind.config.ts */
colors: {
  gold: {
    DEFAULT: '#C9A84C',
    light:   '#E8C97A',
    dark:    '#9A7A2E',
    muted:   'rgba(201,168,76,0.15)',
  },
  dark: {
    DEFAULT: '#0D0D0D',
    2:       '#161616',
    3:       '#1E1C18',
    4:       '#111111',
  },
  cream: {
    DEFAULT: '#F5EFE0',
    2:       '#EDE5D0',
    muted:   '#A0998A',
  },
}
```

### 6.2 Tipografía

```css
/* globals.css o tailwind */
--font-serif  : 'Playfair Display', Georgia, serif;   /* Títulos, citas, letras capitulares */
--font-sans   : 'Lato', system-ui, sans-serif;         /* Cuerpo, UI, navegación */
```

Cargar desde Google Fonts con `next/font` para máximo rendimiento.

### 6.3 Espaciado y estilo general

- Diseño oscuro dominante. Fondos: `dark.DEFAULT` y `dark.2` alternando entre secciones.
- Bordes: `1px solid rgba(201,168,76,0.15)` — muy sutiles, dorados.
- Sombras: largas y oscuras, nunca blancas.
- Esquinas: sin border-radius (estética editorial clásica) salvo en badges pequeños.
- Letras capitulares (`::first-letter`) en color gold en párrafos de apertura.

### 6.4 Componentes clave de UI

```
<GoldButton>        → CTA principal, hover rellena de dorado
<SectionTag>        → Etiqueta pequeña uppercase dorada encima de títulos
<GoldDivider>       → Línea horizontal dorada de 50px
<BookCard>          → Tarjeta de libro con hover y underline dorado animado
<TrilogyBadge>      → Píldora dorada "Trilogía · Libro I"
<AuthorPhoto>       → Imagen con marco decorativo + fallback elegante
<NewsletterForm>    → Input email + botón, integrado con Resend
<ReviewCard>        → Tarjeta de reseña de lector con citas tipográficas
```

---

## 7. PÁGINAS — ESPECIFICACIÓN DETALLADA

### 7.1 HOME (`/`)

**Secciones en orden:**

1. **Hero 3D** — Ver sección 8.1
2. **Intro autor** — Nombre, 2-3 líneas, foto pequeña, botón "Conocer al autor"
3. **Obras destacadas** — Grid de 3 libros (uno por categoría), CTA "Ver todas las obras"
4. **Trilogía teaser** — Banner oscuro con imagen de fondo tenue, texto evocador, CTA "Descubrir la trilogía"
5. **Cita del autor** — Tipografía grande, serif, centrada, con comillas doradas decorativas
6. **Newsletter** — Sección de suscripción (ver 7.5)
7. **Footer**

---

### 7.2 PÁGINA DE LA TRILOGÍA (`/obras/trilogia`)

Esta es la página más importante y elaborada. Experiencia de scroll narrativo cinematográfico.

**Experiencia de usuario:**
- El usuario entra y ve el título de la trilogía con partículas o niebla suave
- Al hacer scroll, la historia se va revelando como si leyera un libro
- Cada libro de la trilogía tiene su propio "acto" con fondo, color accent y texto
- Entre actos: transiciones con líneas de texto que "se escriben solas" (typewriter)
- Al final: CTA para comprar los 3 libros

**Estructura de scroll (con GSAP ScrollTrigger):**

```
[INTRO]      — Título grande: "Una verdad que lo cambia todo"
              Subtítulo: "La trilogía que reescribe la historia"
              Fondo: oscuro con partículas doradas

[ACTO I]     — "¿Y si Jesús no murió en la cruz?"
              Texto revelándose frase a frase al hacer scroll
              Imagen/ilustración lateral con parallax
              CTA: Comprar Libro I

[TRANSICIÓN] — Línea tipográfica escribiéndose: "Pero la historia no terminó ahí..."

[ACTO II]    — "Los apóstoles sabían la verdad"
              Mismo tratamiento narrativo
              CTA: Comprar Libro II

[TRANSICIÓN] — "Y Pablo... Pablo lo cambió todo."

[ACTO III]   — "Las cartas que nadie debía leer"
              CTA: Comprar Libro III

[CIERRE]     — "La trilogía completa. Tu visión del mundo, transformada."
              Grid con los 3 libros + botones Amazon
```

**Animaciones de esta página:**
- `ScrollTrigger.pin()` para efectos de parallax intenso
- Texto con `SplitText` o implementación propia de reveal por palabras
- Fondo con gradientes que transicionan entre actos
- Números de libro ("I", "II", "III") en tipografía serif gigante, opacity baja, de fondo

---

### 7.3 PÁGINA INDIVIDUAL DE LIBRO (`/obras/[slug]`)

Estructura de cada página de libro:

```
[HERO del libro]
  - Título grande (Playfair Display)
  - Categoría badge (Poesía / Narrativa / Trilogía)
  - Extracto o sinopsis corta impactante
  - Botón "Comprar en Amazon" prominente

[SINOPSIS]
  - Texto completo de la sinopsis
  - Si es de la trilogía: nav entre los 3 libros (Libro I · Libro II · Libro III)

[SOBRE ESTA OBRA]
  - Contexto de la obra, inspiración (si se tiene)
  - Cita memorable del libro (si se tiene)

[EL AUTOR]
  - Mini-bio + foto + enlace a /autor

[TAMBIÉN TE PUEDE INTERESAR]
  - 2-3 libros relacionados del mismo autor

[CTA FINAL]
  - "¿Listo para leerlo?" + botón Amazon grande
```

**Datos por libro (completar cuando se tengan):**

```typescript
// src/data/books.ts
export const books = [
  {
    slug: 'la-no-muerte-de-jesus',
    title: 'La no muerte de Jesús',
    subtitle: 'El evangelio invisible',
    category: 'trilogia',
    trilogiaNum: 1,
    amazonUrl: 'https://www.amazon.es/...',
    price: '26,95 €',
    synopsis: '[COMPLETAR]',
    quote: '[COMPLETAR — frase impactante del libro]',
    coverImage: '/images/covers/la-no-muerte-de-jesus.jpg', // pendiente
  },
  // ... resto de libros
]
```

---

### 7.4 PÁGINA DEL AUTOR (`/autor`)

```
[Hero]       — Foto grande del autor + nombre + cita personal
[Bio larga]  — Historia completa con letras capitulares, párrafos bien espaciados
[Timeline]   — Línea de tiempo visual: 1953 nacimiento → primeras letras → prensa → libros
[Trayectoria profesional] — Hospital, periodismo, premios
[En prensa]  — Si hay artículos o menciones externas (añadir después)
[Sus obras]  — Grid completo de libros, CTA a /obras
```

---

### 7.5 NEWSLETTER

**Integración con Resend:**

```typescript
// app/api/newsletter/route.ts
// POST /api/newsletter
// Body: { email: string, locale: string }
// Acción: añadir contacto a Resend Audience
// Respuesta: 200 OK o error manejado
```

- Formulario minimalista: solo campo email + botón "Suscribirme"
- Texto bajo el formulario: "Sin spam. Solo novedades literarias. Cancela cuando quieras."
- Email de bienvenida automático con Resend (plantilla en HTML elegante)
- GDPR: checkbox de aceptación de política de privacidad (obligatorio en ES/FR)
- Página de confirmación en `/newsletter` con mensaje de gracias

---

### 7.6 FORMULARIO DE CONTACTO

```typescript
// app/api/contact/route.ts
// Campos: nombre, email, asunto (select), mensaje
// Asuntos: Presentación / Entrevista / Consulta sobre obra / Otro
// Envío: Resend → email del autor
// Rate limiting: máx 3 envíos por IP por hora (middleware)
```

---

## 8. ANIMACIONES — ESPECIFICACIÓN TÉCNICA

### 8.1 Hero 3D (Three.js + React Three Fiber)

**Escena:** Libro 3D central que se abre lentamente al cargar. Libros secundarios flotando con profundidad. Partículas doradas ascendentes.

```typescript
// components/hero/BookScene.tsx
// - Usar @react-three/fiber + @react-three/drei
// - Canvas con alpha: true, fondo transparente (el fondo lo pone CSS)
// - El libro central abre su tapa con animación de 3-4 segundos al montar
// - MouseMove: rotación sutil del libro (máx ±5°)
// - Scroll: la cámara se aleja suavemente (camera.position.z aumenta)
// - Partículas: 150 puntos dorados con movimiento ascendente lento
// - Luces: AmbientLight suave + DirectionalLight dorada + PointLight frontal
// - Materiales: MeshStandardMaterial con roughness/metalness calibrados
// - Optimización: usar useMemo para geometrías, dispose en unmount
// - Mobile: reducir partículas a 60, desactivar sombras
```

**Importante:** El canvas 3D debe tener `pointer-events: none` para no bloquear el scroll. Los botones del hero van en un div encima con `z-index` mayor y `pointer-events: auto`.

### 8.2 Animaciones de scroll generales (Framer Motion)

```typescript
// Patrón estándar para revelar secciones:
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}
// Usar con whileInView + viewport={{ once: true, margin: "-100px" }}
```

- **Títulos de sección:** fade + slide-up al entrar en viewport
- **Cards de libros:** stagger de 0.1s entre cards del mismo grid
- **Foto del autor:** fade-in con ligero scale (1.05 → 1)
- **Citas:** fade-in con blur inicial (filter: blur(4px) → 0)
- **Líneas decorativas:** width animado de 0 → 50px al entrar

### 8.3 Lenis — Scroll suave global

```typescript
// src/components/layout/SmoothScroll.tsx
// Wrapper global que inicializa Lenis y lo conecta con GSAP ticker
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    // Conectar Lenis con GSAP para que ScrollTrigger funcione correctamente
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])
  return <>{children}</>
}
```

- Envolver el layout raíz con `<SmoothScroll>` por encima de todo
- **Desactivar en móvil** si hay problemas de rendimiento: `smoothWheel: window.innerWidth > 768`
- Lenis y ScrollTrigger **deben compartir el mismo RAF** — el patrón de arriba lo garantiza
- No usar `ScrollSmoother` de GSAP (requiere licencia Club); Lenis es gratuito y superior

### 8.4 Trilogía scroll (GSAP + ScrollTrigger)

```typescript
// Solo en /obras/trilogia
// Instalar: gsap @gsap/react
// NO usar ScrollSmoother (requiere licencia Club)
// SÍ usar ScrollTrigger gratuito

// Patrón por acto:
gsap.timeline({
  scrollTrigger: {
    trigger: '#acto-1',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
  }
})
.fromTo('.acto-1-title', { opacity: 0, y: 60 }, { opacity: 1, y: 0 })
.fromTo('.acto-1-text .word', { opacity: 0 }, { opacity: 1, stagger: 0.05 }, '<0.3')
```

- Texto revelar palabra por palabra: split el texto en `<span>` por palabra en el componente React, animar con stagger
- Parallax de imágenes/fondos: `gsap.to(el, { yPercent: -20, scrollTrigger: { scrub: true } })`
- Limpieza: siempre `ScrollTrigger.getAll().forEach(t => t.kill())` en el `useEffect` cleanup

---

## 9. INTERNACIONALIZACIÓN (i18n)

**Librería:** `next-intl`

**Estructura de archivos:**
```
messages/
  es.json   ← español (idioma base)
  en.json   ← inglés
  fr.json   ← francés
```

**Locale por defecto:** `es`. URL sin prefijo para español (`/obras`), con prefijo para otros (`/en/obras`, `/fr/obras`).

**Claves de traducción principales:**
```json
{
  "nav": { "author": "El Autor", "works": "Obras", "trilogy": "La Trilogía", "contact": "Contacto" },
  "hero": { "ornament": "Escritor & Articulista", "cta": "Descubrir sus obras" },
  "books": { "buyOnAmazon": "Comprar en Amazon", "trilogy": "Trilogía", "poetry": "Poesía", "fiction": "Narrativa" },
  "newsletter": { "title": "...", "placeholder": "Tu email", "cta": "Suscribirme", "legal": "..." },
  "contact": { "subjects": ["Presentación", "Entrevista", "Consulta sobre obra", "Otro"] }
}
```

**Nota:** Las sinopsis de los libros deben estar traducidas también. Si no se tienen traducciones profesionales al inicio, usar el texto en español en todos los idiomas con un comentario `// TODO: traducir` hasta tenerlas.

---

## 10. SEO Y METADATOS

```typescript
// app/[locale]/layout.tsx
export const metadata = {
  title: { template: '%s | José Hernández Mondéjar', default: 'José Hernández Mondéjar — Escritor' },
  description: 'Escritor murciano. Autor de la trilogía La no muerte de Jesús, poesía y narrativa. Compra sus libros en Amazon.',
  openGraph: { type: 'website', locale: 'es_ES', images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image' },
}

// Cada página de libro:
// title: `${book.title} | José Hernández Mondéjar`
// description: sinopsis corta (160 chars máx)
// openGraph.images: portada del libro
```

**Archivos necesarios:**
- `public/og-image.jpg` — imagen 1200×630px para compartir en redes
- `public/favicon.ico` + `public/icon.svg`
- `app/sitemap.ts` — sitemap dinámico con todas las rutas y locales
- `app/robots.ts` — robots.txt

---

## 11. ESTRUCTURA DE CARPETAS

```
jose-hernandez-web/
├── CLAUDE.md                     ← este archivo
├── messages/
│   ├── es.json
│   ├── en.json
│   └── fr.json
├── public/
│   ├── images/
│   │   ├── covers/               ← portadas de libros (pendiente)
│   │   ├── author/               ← foto del autor (pendiente)
│   │   └── og-image.jpg
│   └── fonts/                    ← si se sirven localmente
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          ← Home
│   │   │   ├── autor/page.tsx
│   │   │   ├── obras/
│   │   │   │   ├── page.tsx      ← Catálogo
│   │   │   │   ├── trilogia/page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── contacto/page.tsx
│   │   │   └── newsletter/page.tsx
│   │   └── api/
│   │       ├── contact/route.ts
│   │       └── newsletter/route.ts
│   ├── components/
│   │   ├── ui/                   ← GoldButton, SectionTag, BookCard, etc.
│   │   ├── hero/                 ← BookScene.tsx (Three.js)
│   │   ├── trilogy/              ← componentes del scroll narrativo
│   │   ├── layout/               ← Navbar, Footer
│   │   └── forms/                ← ContactForm, NewsletterForm
│   ├── data/
│   │   └── books.ts              ← catálogo completo tipado
│   ├── lib/
│   │   ├── resend.ts             ← cliente Resend
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 12. VARIABLES DE ENTORNO

```bash
# .env.local (nunca subir a git)
RESEND_API_KEY=re_xxxxxxxxxxxx          # API key de Resend para emails
CONTACT_EMAIL=email-del-autor@xxx.com   # Destino del formulario de contacto
RESEND_AUDIENCE_ID=xxxxxxxx             # ID del audience de Resend para newsletter
NEXT_PUBLIC_SITE_URL=https://josehernandezmondejar.com  # URL final (cambiar cuando se tenga dominio)
```

---

## 13. SEGURIDAD Y GDPR

### 13.1 Seguridad básica (suficiente para este proyecto)

- **Rate limiting** en `/api/contact` y `/api/newsletter`: máx 3 peticiones por IP cada 10 minutos. Usar la librería `@upstash/ratelimit` con Upstash Redis (plan gratuito) o una solución en memoria simple con `lru-cache` para empezar.
- **Variables de entorno**: NUNCA hardcodear API keys en el código. Todas en `.env.local` (git-ignored) y en el panel de Vercel.
- **Validación de inputs**: usar `zod` en todas las API routes para validar y sanear los datos recibidos antes de procesarlos.
- **Headers de seguridad**: configurar en `next.config.ts`:

```typescript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

- **No hay autenticación, base de datos propia ni pagos** — el riesgo es mínimo. No necesitas nada más complejo.

### 13.2 GDPR (obligatorio — web europea)

Esta web está dirigida a usuarios de España, Francia y Reino Unido/Europa. El cumplimiento GDPR es **legalmente obligatorio**.

**Lo que hay que implementar:**

1. **Banner de cookies** — aparece en la primera visita. Opciones: Aceptar / Rechazar / Configurar. Usar la librería `react-cookie-consent` o implementación propia simple. Solo hay cookies de analytics (Vercel Analytics es cookieless por defecto ✅).

2. **Checkbox de consentimiento** en el formulario de newsletter:
```
☐ Acepto recibir comunicaciones de José Hernández Mondéjar y la política de privacidad.
```
Este checkbox es **obligatorio y no puede venir pre-marcado**.

3. **Página de Política de Privacidad** (`/privacidad`): debe incluir qué datos se recogen (email), para qué (newsletter), quién los gestiona (Resend), cómo darse de baja y datos del responsable. Añadir esta ruta al sitemap.

4. **Pie de página**: enlace visible a Política de Privacidad y Aviso Legal en todas las páginas.

5. **Email de newsletter**: cada email enviado debe incluir enlace de baja (unsubscribe) en el pie — Resend lo gestiona automáticamente.

---

## 14. RENDIMIENTO Y CALIDAD

- **Core Web Vitals objetivo:** LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Imágenes:** siempre `next/image` con `priority` en hero, `loading="lazy"` en el resto
- **Fuentes:** `next/font/google` con `display: 'swap'`
- **Three.js:** importar dinámicamente con `next/dynamic` + `ssr: false`
- **GSAP:** importar solo en client components, limpiar en useEffect cleanup
- **Lighthouse objetivo:** ≥ 90 en Performance, 100 en Accessibility, 100 en SEO
- **No usar `any` en TypeScript.** Tipar todos los props y datos.
- **Accesibilidad:** todos los botones con `aria-label`, imágenes con `alt` descriptivo, contraste AA mínimo

---

## 14. PENDIENTES / ASSETS QUE FALTAN

Estos elementos deben ser proporcionados por el cliente antes de completar la web:

- [ ] **Foto del autor** — JPG/PNG de alta resolución (mín. 800×1000px)
- [ ] **Portadas de los 6 libros** — JPG de alta resolución
- [ ] **Sinopsis completas** de cada libro (texto más largo que el de Amazon si es posible)
- [ ] **Citas memorables** de cada libro (frases para usar en las páginas individuales)
- [ ] **Email de contacto** del autor o gestor
- [ ] **URLs de redes sociales** del autor
- [ ] **Dominio** elegido y configurado en Vercel
- [ ] **Reseñas de lectores** (nombre, texto, puntuación) — mínimo 3 por libro si es posible
- [ ] **Textos legales** — Política de privacidad y Aviso legal (puede redactarlos un abogado o usar generador online adaptado a España)
- [ ] **Textos en inglés y francés** (o confirmación de que se usará el español inicialmente)
- [ ] **API key de Resend** (crear cuenta gratuita en resend.com)
- [ ] **Enlace de afiliado Amazon** (si se desea monetizar los clics — opcional)

---

## 15. ORDEN DE DESARROLLO RECOMENDADO

```
Fase 1 — Base y estructura
  1. Setup Next.js 14 + TypeScript + Tailwind + next-intl
  2. Design system: tokens de color, tipografía, componentes UI base
  3. Layout global: Navbar + Footer (multiidioma)
  4. Datos: books.ts con el catálogo completo tipado
  5. Home básico sin animaciones 3D
  6. Catálogo /obras y páginas individuales /obras/[slug]

Fase 2 — Contenido rico
  7. Página del autor /autor con timeline
  8. Página de la trilogía /obras/trilogia (estructura sin animaciones avanzadas)
  9. Formulario de contacto + API route + Resend
  10. Newsletter + API route + Resend Audience

Fase 3 — Experiencia visual
  11. Hero 3D con Three.js + React Three Fiber
  12. Animaciones de scroll con Framer Motion (todas las páginas)
  13. Scroll narrativo GSAP en /obras/trilogia
  14. Pulido visual: partículas, parallax, transiciones entre páginas

Fase 4 — Lanzamiento
  15. SEO: metadatos, sitemap, robots, OG images
  16. Optimización de rendimiento (Lighthouse)
  17. Deploy en Vercel + dominio custom
  18. Pruebas en móvil, tablet y desktop
  19. Analytics (Vercel Analytics)
```

---

## 16. CONVENCIONES DE CÓDIGO

- Componentes: PascalCase. Archivos: `kebab-case.tsx`
- Exportaciones: named exports en componentes UI, default export en páginas
- Datos estáticos: en `src/data/`, nunca hardcodeados en los componentes
- Textos visibles: siempre a través de `next-intl` (`useTranslations`), nunca strings literales en JSX
- Clases Tailwind: ordenar con `prettier-plugin-tailwindcss`
- Commits: en español, descriptivos (`feat: añadir hero 3D con Three.js`)

---

*Última actualización: Abril 2025 — Generado para Claude Code*
