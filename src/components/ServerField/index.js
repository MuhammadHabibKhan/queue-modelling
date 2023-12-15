import './index.css';

function ServerField({ name, style, style2, disabled, serverChange, val, styleContainer }) {
  return (
    <div className='container' style={styleContainer}>
      <label style={style2}>{name}</label>
      <input style={style} disabled={disabled}type='number' onChange={serverChange} value={val}/>
    </div>
  );
}

export default ServerField;