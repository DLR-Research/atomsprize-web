import { Badge } from "../types"

type BadgeProps = {
  badge: Badge
}

export default function BadgeComponent({
  badge: { name, img_url }
}: BadgeProps) {
  return (
    <div className="gallery-item">
      <img
        alt={name}
        src={img_url}
        className="badge"
        width={400}
        height={400}
        loading="lazy"
      />
      <div className="name">{name}</div>
    </div>
  )
}
