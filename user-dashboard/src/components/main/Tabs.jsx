const Tabs = ({children, name, ariaLabel, defaultChecked}) => {
  return (
    <>
      <input
        type="radio"
        name={name}
        role="tab"
        className="tab"
        aria-label={ariaLabel}
        defaultChecked={defaultChecked}
      />
      <div role="tabpanel" className="tab-content p-10">
        <div className="flex-col flex gap-3">{children}</div>
      </div>
    </>
  )
}

export default Tabs
