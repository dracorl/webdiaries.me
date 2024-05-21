const Rating = ({rate, id}) => {
  return (
    <div className="rating rating-sm">
      <input
        type="radio"
        name={id + "-rating-1"}
        className="mask mask-star"
        defaultChecked={rate === 1}
      />
      <input
        type="radio"
        name={id + "-rating-2"}
        className="mask mask-star"
        defaultChecked={rate === 2}
      />
      <input
        type="radio"
        name={id + "-rating-3"}
        className="mask mask-star"
        defaultChecked={rate === 3}
      />
      <input
        type="radio"
        name={id + "-rating-4"}
        className="mask mask-star"
        defaultChecked={rate === 4}
      />
      <input
        type="radio"
        name={id + "-rating-5"}
        className="mask mask-star"
        defaultChecked={rate === 5}
      />
    </div>
  )
}
export default Rating
