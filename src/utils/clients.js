/**
 * Carga clientes desde public/clientes/
 *
 * Estructura por cliente:
 *   public/clientes/{slug}/
 *     logo-{slug}-1.{ext}
 *     client.json
 *
 * Añadir el slug en public/clientes/index.json
 */

export async function loadClients () {
  const base = import.meta.env.BASE_URL
  try {
    const indexRes = await fetch(`${base}clientes/index.json`)
    if (!indexRes.ok) return []
    const { clients: slugs } = await indexRes.json()
    if (!Array.isArray(slugs)) return []

    const results = await Promise.all(
      slugs.map(async (slug) => {
        const res = await fetch(`${base}clientes/${slug}/client.json`)
        if (!res.ok) return null
        const data = await res.json()
        const ext = data.logoExt || 'svg'
        return {
          slug,
          logo: `${base}clientes/${slug}/logo-${slug}-1.${ext}`,
          ...data
        }
      })
    )
    return results.filter(Boolean)
  } catch {
    return []
  }
}

export function getClientLogoPath (slug, logoExt = 'svg') {
  const base = import.meta.env.BASE_URL
  return `${base}clientes/${slug}/logo-${slug}-1.${logoExt}`
}
