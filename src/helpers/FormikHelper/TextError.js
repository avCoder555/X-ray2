const TextError =(props)=>{
    return(
        <div>
              <small className="text-danger">{props.children}</small>
        </div>
    )
}
export default TextError;
