const express = require ("express")
const bodyparser = require("body-parser")
const app = express()
const request  = require("request");
const https = require("https");
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");

})
app.post("/" ,function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    console.log(firstName +  lastName + email);
    const data = {
        members : [{
            email_address:email,
            status : "subscribed",
            merge_fields : {
                FNAME :firstName,
                LNAME :lastName
            }
        }

        ]
     };
    const jsonData = JSON.stringify(data);
    const url =  "https://us22.api.mailchimp.com/3.0/lists/3820d23719";
    const options  = {
        method : "POST" ,
        auth : "prayag:e14a33d5bc582354daae3d238eb63c3c-us22"
    };
   const request =  https.request(url , options ,function (response){
    if (response.statusCode === 200){
        res.sendFile(__dirname +"/success.html");
    
    }
    else {
        res.sendFile(__dirname +"/failure.html");
    }
// response.on ("data",function(data){
//    // console.log(JSON.parse(data));
// })

    }) 
request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
res.redirect("/")
}
) 
app.listen(process.env.PORT,function(){
    console.log("server is start at port 3000")
})

// api Key

// e14a33d5bc582354daae3d238eb63c3c-us22


// id
// 3820d23719

