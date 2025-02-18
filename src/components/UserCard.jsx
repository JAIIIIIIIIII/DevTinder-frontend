//mport React from 'react'

const UserCard = ({user}) => {
//console.log(user);

    const {name , profile , about , gender  } = user || "";
   
  
  return (
    <div className="card bg-blue-200 w-96 shadow-xl">
    <figure>
      <img
        src={profile}
        alt="profile" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-black">{name}</h2>
      <p className="text-black">{gender}</p>
      <p className="text-black">{about}</p>
     
      <div className="card-actions justify-center">
        <button className="btn btn-neutral">Interested</button>
        <button className="btn btn-neutral">Pass</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard