function sendmail(){
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        content : document.getElementById("content").value,
    }
    emailjs.send("service_jcgqqj7", "template_si1in7m", parms).then(alert("Email Sent !"));
}