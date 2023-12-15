import './index.css';

function Button({name, onClick, style}){
    return(
        <div className='buttonContainer' style={style}>
            <button onClick={onClick}>{name}</button>
        </div>
    );
}

export default Button