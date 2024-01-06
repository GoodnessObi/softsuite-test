import Icons from "../../../assets/images";

export default function EmptyState () {
  return (
    <div className="empty">
      <img src={Icons['Empty']} alt="" />
      <p>There are no elements to display</p>
    </div>
  )
}