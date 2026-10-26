# Nuestra pequeña historia — para Cami 💌

Página web romántica de regalo, lista para abrir en VS Code.

## Cómo verla

1. Descomprime el zip.
2. Abre la carpeta en VS Code.
3. Instala la extensión **Live Server** (o similar) y haz clic derecho en `index.html` → "Open with Live Server".
   - También puedes abrir `index.html` directamente en el navegador con doble clic, aunque algunas cosas (como el audio) funcionan mejor con un servidor local.

## Qué personalizar

Todo el contenido editable está señalado con comentarios en el código.

| Qué | Dónde |
|---|---|
| Canción favorita | Reemplaza `assets/nuestra-cancion.mp3` (hoy es una melodía de relleno; debe llamarse igual, o cambia el nombre en `index.html`) |
| Fecha de aniversario | Variable `START_DATE` al inicio de `script.js` (ya está en 18 de junio de 2022) |
| Frases de "Razones por las que te amo" | Arreglo `REASONS` en `script.js` — agrega, quita o edita las líneas que quieras |
| Textos de la línea de tiempo | Sección `#timeline` en `index.html` (fechas, títulos y descripciones) |
| Descripciones de la galería | Cada `<figure class="gallery-item">` en `index.html` |

Esta versión no incluye imágenes: el hero y la galería muestran un marcador elegante (✦). Los nombres, fechas e historia son inventados; edítalos a tu gusto.

## Estructura

```
nuestra-historia/
├── index.html      → estructura y contenido (6 secciones)
├── style.css        → paleta vino tinto / negro, tipografía y animaciones
├── script.js         → contador, scroll reveal, partículas, razones, música
└── assets/           → aquí va tu canción
```

Hecho con cariño para Camila — mi cielo, mi calma, mi hogar. 🥀
