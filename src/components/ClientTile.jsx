import './ClientTile.css'

function ClientTile ({ client, onSelect, compact = false }) {
  return (
    <button
      type="button"
      className={`clientTile ${compact ? 'clientTile--compact' : ''}`}
      onClick={() => onSelect(client)}
      aria-label={`Ver ficha de ${client.name}`}
    >
      <span className="clientTileLogoWrap">
        <img
          src={client.logo}
          alt=""
          className="clientTileLogo"
          loading="lazy"
          width={160}
          height={48}
        />
      </span>
      <span className="clientTileName">{client.name}</span>
      {client.sector && (
        <span className="clientTileSector">{client.sector}</span>
      )}
      <span className="clientTileHint">
        Ver resumen
        <span className="material-icons" aria-hidden="true">arrow_forward</span>
      </span>
    </button>
  )
}

export default ClientTile
