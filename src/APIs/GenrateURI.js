 const GenrateURI = async (membership,discount,image) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membership:membership,discount:discount,image:image})
    };
     const response = await fetch("http://localhost:5000/metadata",requestOptions)
    
     if (response.status===400){
        return 400
     }else{
        return response.json()
     }


}
export default GenrateURI;