export const Button = (props) => {
  const defaultClassName = "bg-black text-white rounded-md p-2 hover:bg-opacity-85 transition-colors flex items-center gap-2 justify-center outline-none"
  const normalizedProps = { ...props, className: `${defaultClassName} ${props.className}` }

  return (
    <button disabled={props?.isLoading} {...normalizedProps}>
      {props?.icon ?? null}
      {props.children}
    </button>
  )
}