import React from 'react';

function NewBeerForm() {

    const [beerData, setBeerData] = useState({
        name: "", 
        brewery_id: `${breweryName}`, 
        abv: "", 
        ibu: "", 
        descript: ""
    });

    function handleChange(evt) {
        const {name, value} = evt.target;
        setBeerData(data => ({
        ...data,
        [name]: value
        }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        add(beerData);
    }


    return (
<div className="container">
<form onSubmit={handleSubmit}> 

  <div className="mb-3">
    <label htmlFor="newbeerform-name" className="form-label">Name: </label>
    <input id="loginform-name" onChange={handleChange} aria-describedby="beer-name" name="name" className="form-control" value={beerData.name}/>
  </div>

  <div className="mb-3">
    <label htmlFor="newbeerform-abv" className="form-label">ABV: </label>
    <input className="form-control" onChange={handleChange} id="newbeerform-abv" name="abv" value={beerData.abv}/>
  </div>

    <div className="mb-3">
     <label htmlFor="newbeerform-ibu" className="form-label">IBU: </label>
     <input className="form-control" onChange={handleChange} id="newbeerform-ibu" name="ibu" value={beerData.ibu}/>
   </div>

<div className="mb-3">
    <label htmlFor="newbeerform-descript" className="form-label">Description: </label>
    <input className="form-control" onChange={handleChange} id="newbeerform-descript" name="descript" value={beerData.descript}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Register</button>
</form>
</div>
    )
    
}

export default NewBeerForm;