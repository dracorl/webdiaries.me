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
        {children}
      </div>
    </>
  )
}

export default Tabs
