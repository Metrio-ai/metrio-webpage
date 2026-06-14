#!/usr/bin/env bash
# Ejecutar desde la raíz del repo, con sesión GitHub autenticada (git push + gh).
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Push develop..."
git push -u origin develop

echo "→ Crear PR develop → main..."
gh pr create --base main --head develop --title "Rediseño Metrio: SEO/AEO, FAQs, contacto y nuevas páginas" --body "$(cat <<'EOF'
## Summary

- Rediseño completo de la web: header/footer premium, tema claro, imágenes locales y PageSpeed (LCP, lazy Cal.com, code splitting).
- Nuevas páginas: `/sobre-nosotros`, `/trabaja-con-nosotros`, `/faq`, `/clientes` con carrusel y logos reales.
- SEO/AEO: `llms.txt`, `ai.txt`, `robots.txt` para crawlers IA, JSON-LD ampliado, sitemap, meta optimizados para «consultora tecnológica».
- FAQs: 40+ por sección, layout split (preguntas izquierda / respuesta derecha), contenido reescrito en home.
- Contacto: formulario con envío real vía FormSubmit (+ fallback mailto), Cal.com embed, candidaturas en careers.

## Variables de entorno

Configurar en el panel del hosting (Cloudflare Pages, Netlify, Vercel, GitHub Actions, etc.) **antes o durante el deploy**:

| Variable | ¿Obligatoria? | Valor por defecto | Descripción |
|----------|---------------|-------------------|-------------|
| `VITE_CONTACT_EMAIL` | No | `hola@metrio.es` | Email destino del formulario de contacto y candidaturas (FormSubmit AJAX). Solo cambiar si queréis otro buzón. |
| `BASE_PATH` | No | `/` | Ruta base de Vite en build. Usar solo si la web se sirve en subpath (ej. `BASE_PATH=/metrio-webpage/` en GitHub Pages con project site). |

### Notas importantes (no son variables)

1. **FormSubmit — activación única:** la primera vez que alguien envíe el formulario en producción, FormSubmit manda un email a `hola@metrio.es` (o al valor de `VITE_CONTACT_EMAIL`) con el enlace **«Activate Form»**. Hay que hacer clic **una vez** o los envíos no llegarán.
2. **Cal.com:** no requiere variables de entorno. El embed usa el enlace público configurado en `src/utils/cal.js` (`CAL_LINK`). Si cambiáis el evento de Cal, editad ese archivo o extraedlo a `VITE_CAL_LINK` en un follow-up.
3. **No hay `.env` en el repo** — nada sensible commiteado. Opcional: crear `.env.local` en desarrollo con `VITE_CONTACT_EMAIL=test@...` si queréis probar sin tocar producción.

### Ejemplo `.env.local` (desarrollo, opcional)

```env
VITE_CONTACT_EMAIL=hola@metrio.es
BASE_PATH=/
```

### Ejemplo GitHub Actions / CI

```yaml
env:
  VITE_CONTACT_EMAIL: hola@metrio.es
  BASE_PATH: /
```

## Test plan

- [ ] `npm run build` sin errores
- [ ] Home: hero, FAQs split, carrusel clientes, tema claro/oscuro
- [ ] `/contact`: envío formulario (tras activar FormSubmit) + Cal.com carga al scroll
- [ ] `/faq`: buscador, categorías, 48+ preguntas
- [ ] `/sobre-nosotros`, `/trabaja-con-nosotros`, `/services`, `/clientes`, `/blog`
- [ ] PageSpeed Insights en home y contact
- [ ] Verificar `https://metrio.es/llms.txt` y `sitemap.xml` tras deploy
- [ ] Confirmar email FormSubmit en hola@metrio.es

EOF
)"

echo "✓ PR creado. Ver: gh pr view --web"
