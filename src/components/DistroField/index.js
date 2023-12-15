import './index.css';

function DistroField({name, distChange}){

    return(
        <div className='container'>
            <label>{name}</label>

            <select id="dist" name="dist" onChange={distChange}>
                <option value="Select" selected disabled>Select</option>
                <option value="Poisson">Poisson</option>
                <option value="Exponential">Exponential</option>
                <option value="Uniform">Uniform</option>
                <option value="Normal">Normal</option>
                <option value="Gamma">Gamma</option>
            </select>

        </div>
    );
}

export default DistroField