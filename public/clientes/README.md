# Cómo añadir un nuevo cliente

1. Crea una carpeta con el **slug** del cliente (minúsculas, guiones):
   ```
   public/clientes/nombre-del-cliente/
   ```

2. Añade el **logo** con este nombre exacto:
   ```
   logo-nombre-del-cliente-1.png   (o .svg, .webp, .jpg)
   ```

3. Crea el archivo **client.json** dentro de la carpeta:
   ```json
   {
     "name": "Nombre comercial del cliente",
     "description": "Breve descripción del proyecto o relación.",
     "url": "https://www.ejemplo.com",
     "sector": "Retail",
     "services": ["Automatización", "IA", "BI"],
     "logoExt": "svg",
     "featured": true
   }
   ```

4. Registra el slug en **index.json** (array `clients`):
   ```json
   {
     "clients": ["censalia", "nombre-del-cliente"]
   }
   ```

El logo y la ficha aparecerán automáticamente en la home y en `/clientes`. Al hacer clic se abre un resumen del cliente.

## Clientes actuales

| Slug | Empresa |
|------|---------|
| censalia | Censalia |
| puretea | PureTea |
| bess-skin-health | Bess Skin Health |
| diligenz | Diligenz |
| luanvi | Luanvi |
| listing-boost | Listing Boost |
