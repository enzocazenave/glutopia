export const Textarea = (props) => {
    const defaultClassName = 'p-2 border rounded-md focus:outline-none'
    const normalizedProps = { ...props, className: `${defaultClassName} ${props.className}` }
  
    return <textarea { ...normalizedProps }></textarea>
  }