import React from 'react';
import './styles.css';
import { useEffect, useState } from 'react';



function Prova () {
    const [dates, setDates] = useState ([])
    const [code, setCode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')




    function handleAddOnTable(event){
        event.preventDefault()
        if( code === '' || 
            code === 'Digite o codigo IBGE' ||
            city === '' || 
            city === 'Digite o nome do Municipio' ||
            state === '' || 
            state === 'Digite o nome do Estado'
        ){
            alert('Campos vazios, por favor preencha corretamente')
        } else {
            const date = {
                id: new Date().getTime(),
                code,
                city,
                state
            }
            setDates([...dates, date])
            clearForm()

        }
    }

    function clearForm(){
        setCode('')
        setCity('')
        setState('')
    }

    function handleDelete(id){
        setDates(dates.filter(dates => dates.id !== id))
    }
    useEffect(() => {
        function loadData() {
          const keepInfo = localStorage.getItem("@caddates:dates");
          if (keepInfo) {
            setDates(JSON.parse(keepInfo));
          }
        }
        loadData();
      }, []);
      useEffect(() => {
        function saveData(){
            localStorage.setItem('@caddates:dates', JSON.stringify(dates))
        }
        saveData()
      }, [dates])

return (
    <div class="Page">
         <h1 class="text">Cadastro Ibge</h1>
        <form onSubmit={handleAddOnTable}>
            <div class="Form">
            <div class="box"> 
                <label class="text">Codigo Ibge</label>
                <input
                placeholder="Digite o codigo IBGE"
                type="text" 
                name="code"
                value={code}
                maxlength='5'
                onChange={(event) => {
                    if (isNaN(Number(event.target.value))) {
                      return;
                    } else {
                      setCode(event.target.value);
                    }
                  }}
                />
            </div>
            <div> 
            <label class="text">Municipio</label>
                <input
                placeholder="Digite o nome do Municipio"
                type='text' 
                name='city'
                value={city} 
                onChange={(event) => setCity(event.target.value)}
                />
            </div>
            <div> 
                <label className='text'>Estado</label>
                <input 
                type='text' 
                name='state'
                placeholder='Digite o nome do Estado'
                value={state}
                maxlength="2"
                onChange={(event) => setState(event.target.value)}

                />
            </div>
            <div> 
                <button
                 type='submit' 
                 name='send'
                 className='text'
                 className='button'
                 >
                    Enviar
                </button>
            </div>
        </div>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Municipio</th>
                    <th>Estado</th>
                    <th colSpan ={1}>Ações</th>
                </tr>
            </thead>
            <tbody>
                {dates.map(dates => (
                    <tr key ={dates.id}>
                    <td>{dates.code}</td>
                    <td>{dates.city}</td>
                    <td>{dates.state}</td>
                    <td>
                        <button className="Delete"
                        onClick={() => handleDelete(dates.id)}
                        clearForm>
                        Excluir
                        </button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

}


export { Prova };