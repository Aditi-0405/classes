
const form_sub = document.getElementById("form_sub_give_extracurr")

form_sub.addEventListener("submit" , async(event) => {
    event.preventDefault();
    try{
        const formData = new FormData(form_sub);
        await axios.post('/api/v1/tutions/create_tut_extra_curr', formData)
        console.log("posted")

    }
    catch(error){
        console.log(error);
    }
})
