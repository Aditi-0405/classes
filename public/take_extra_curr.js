
const form_sub = document.getElementById("form_sub_take_extra_curr")

form_sub.addEventListener("submit" , async(event) => {
    event.preventDefault();
    try{
        const formData = new FormData(form_sub);
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
          };
        await axios.post('/api/v1/tutions/create_student_extra_curr', formData, config)
        console.log("posted")

    }
    catch(error){
        console.log(error);
    }
})