// started to working the logic design


// let Job = [
//     {

//         role :"software" ,
//         skillset : "java" ,
//         package : "20000/year"
//     },
//     {

//         role :"Datagner" ,
//         skillset : "copilet" ,
//         package : "1000/year"
//     },
//     {

//         role :"DataTech" ,
//         skillset : "Javascript"  ,
//         package : "300000/year"
//     },
//     {

//         role :"DataScience"  ,
//         skillset : "sql" ,
//         package : "400000/year"
//     },
//     {

//         role : "dataAnalyst" ,
//         skillset : "java" ,
//         package : "20000/year"
//     }

// ]

//this work fine
// Job.forEach((e)=>{
//     console.log(e);
// })

//1.when I open the home page it will get all job details after that I can search
// directly fetch
fetch("http://localhost:8080/alljobs")

.then((response => response.json()))
.then((data)=>{

    showjobs("http://localhost:8080/alljobs");
}).catch(error =>{
    console.log(error);
})

//get nessecery elements in html
let role = document.getElementById("jobrole");
let skilset = document.getElementById("skillset");
let package = document.getElementById("package");
let btn1 = document.getElementById("icon1");
let searchjob= document.getElementById("searchbyJob");
let jobheading = document.getElementById("jobroleheading");

//SECOND STEP 



//FIRST - STEP 
//now loop over the entire array of object and if matched append the text
//loop over the array of object
//here value is null at first so try to  give it in asyn

let count =0;
btn1.addEventListener("click",()=>{
    count =0;
    let value = encodeURIComponent(searchjob.value);
    
    // ✅ 1. Check input first (before API call)
    if (searchjob.value.trim() === "") {
        alert("Enter the job name");
        return;
    }
    else{
        showjobs(`http://localhost:8080/searchjob/${value}`);
    }
})
function showjobs(api) {

    

    // ✅ 2. Fetch data from API
    fetch(api)
        .then((response) => response.json())
        .then((matchedJobs) => {

            let jobcard = document.getElementById("Jobcard");
            let showbtn = document.querySelector(".showmore");

            // reset UI
            if (count === 0) {
                jobcard.innerHTML = "";
            }
            showbtn.innerHTML = "";

            // ✅ 3. Handle no data
            if (matchedJobs.length === 0 && count === 0) {
                jobheading.innerHTML = "NO JOB FOUND";
                return;
            }

            // ✅ 4. Loop through API data
            for (let i = count; i < count + 3 && i < matchedJobs.length; i++) {

                let e = matchedJobs[i];

                let div = document.createElement("div");
                div.classList.add("jobs");

                let roleupdate = document.createElement("h5");
                let skillupdate = document.createElement("h5");
                let packageupdate = document.createElement("h6");
                let apply = document.createElement("button");

                roleupdate.innerHTML = "Role : " + e.jobName;
                skillupdate.innerHTML = "Skill : " + e.jobSkills;
                packageupdate.innerHTML = "Package : " + e.jobPackage;

                apply.innerHTML = "Apply";
                apply.style.border = "none";
                apply.style.height = "20px";
                apply.style.width = "60px";



                
            //appply
                let userEmail = localStorage.getItem("userEmail");

                //whenever i click the apply button
                apply.addEventListener("click",(e)=>{
                    e.preventDefault();

                    fetch(`http://localhost:8080/appliedjobs/${userEmail}`,
                        {
                            method : "POST",
                            header : {
                                "Contecnt-Type":"application/x-www-form-urlencoded"
                            },
                            body:`email=${userEmail}`
                        }
                    )
                    .then((response => response.json()))
                    .then((data)=>{
                            if (data === true) {
                                window.location.href="notification.html"
                            }
                            else{
                                alert("something went wrong")
                            }
                    })
                    .catch(error => {
                        console.error(error);
                        alert("Something went wrong");
                    });
                })



            //apply end 

                div.append(roleupdate, skillupdate, packageupdate, apply);
                jobcard.append(div);


            }

            
            // update count
            count = count + 3;

            // ✅ 5. Show "More" button
            if (count < matchedJobs.length) {
                let morebtn = document.createElement("button");
                morebtn.textContent = "More";

                morebtn.addEventListener("click", showjobs);
                showbtn.append(morebtn);
            }
        })
        .catch((error) => {
            console.error("Error fetching jobs:", error);
        });


        

}


// //1.check input is empty or not 
//     if(searchjob.value.trim() == ""){
//         alert("entr the job name ");
//         return;
//     }
//     else{
//         let jobcard = document.getElementById("Jobcard");
//         let showbtn = document.querySelector(".showmore");

//         if(count === 0 ){
//             jobcard.innerHTML = ""; //set it default  
//         }
//         showbtn.innerHTML = ""; //set it default

//         //filter the array of objects 
//         let matchedJobs  = Job.filter((e)=>{
//           return  e.role.toLowerCase().includes(searchjob.value)
//         })
//         if (matchedJobs.length === 0 && count === 0  ) {
//             jobheading.innerHTML = " NO JOB FOUND";
//             return;
//         }
//         //loop through the matched jobs 
//         for(let i = count ; i < count+3 && i < matchedJobs.length ;i++){
//             let e = matchedJobs[i];

//             //create the div,role,skillset,package and add with jobs
//             let div = document.createElement("div")
//             //add class 
//             div.classList.add("jobs");
//             let roleupdate =document.createElement("h5");
//             let skillupdate = document.createElement("h5");
//             let packageupdate = document.createElement("h6");
//             let apply = document.createElement("button");



//             //give value
//             roleupdate.innerHTML = "role : "+e.role;
//             skillupdate.innerHTML = "skill : "+e.skillset;
//             packageupdate.innerHTML = "package : "+e.package;
//             apply.innerHTML = " Apply ";
//             apply.style.border = "none";
//             apply.style.height = "20px";
//             apply.style.width =  "60px"; 

//              //append
//             div.append(roleupdate,skillupdate,packageupdate,apply);
//             jobcard.append(div);
//         }
//         count = count + 3;

//         if(count < matchedJobs.length){
//             //create button
//             let morebtn = document.createElement("button");
//             morebtn.textContent = "More";
            

//             morebtn.addEventListener("click",showjobs);
//             showbtn.append(morebtn);
//         }

//     }


// function search() {
    
//     btn1.addEventListener("click",()=>{

//     //check the input is empty or not 
//     if(searchjob.value.trim() === ""){
//         alert(
//             "enter the job name "
//         )
//         return;

//     }
//     let jobcard = document.getElementById("Jobcard");
//     let showclass = document.querySelector(".showmore");
//     let count = 0;
//     Job.forEach((e)=>{
        
//         if (count < 3) {
            
        
//         if (e.role.toLowerCase().includes(searchjob.value.toLowerCase()) ) {
           
//             //first change the jobrole
//             jobheading.innerHTML = searchjob.value.toUpperCase();
   

//             //create the div,role,skillset,package and add with jobs
//             let div = document.createElement("div")
//             //add class 
//             div.classList.add("jobs");
//             let roleupdate =document.createElement("h5");
//             let skillupdate = document.createElement("h5");
//             let packageupdate = document.createElement("h6");
//             let apply = document.createElement("button");



//             //give value
//             roleupdate.innerHTML = "role : "+e.role;
//             skillupdate.innerHTML = "skill : "+e.skillset;
//             packageupdate.innerHTML = "package : "+e.package;
//             apply.innerHTML = " Apply ";
//             apply.style.border = "none";
//             apply.style.height = "20px";
//             apply.style.width =  "60px";

//             //append
//             div.append(roleupdate,skillupdate,packageupdate,apply);
//             jobcard.append(div);
//             count ++;
//             console.log(count);
            

            
//         }
//     }
    
//     })
//     //create button
//     let morebtn = document.createElement("button");
//     morebtn.textContent = "More";
//     showclass.append(morebtn);

//     morebtn.addEventListener("click",()=>{
//         count=0;
//         search();
//     })
   
// })
// }
// search();


//STEP THREE
//not working 
// let showmore = document.createElement("button");
// showmore.innerHTML = "More";
// let showclass  = document.getElementsByClassName("showmore");
// showclass.append(showmore);
//fine i need to create each element and uppend with class


//how to create  this works fine but still
/*let JobClass = document.querySelector(".jobs");
let roleupdate = document.createElement("h5");
roleupdate.innerHTML = "Heellll"
JobClass.appendChild(roleupdate);

let jobcard = document.getElementById("Jobcard");

//create the div,role,skillset,package and add with jobs
let div = document.createElement("div")
//add class 
div.classList.add("jobs");
let roleupdate =document.createElement("h5");
let skillupdate = document.createElement("h5");
let packageupdate = document.createElement("h6");


//give value
roleupdate.innerHTML = "software Devleper ";
skillupdate.innerHTML = "java sql Devleper ";
packageupdate.innerHTML = "40000 ";

//append
div.append(roleupdate,skillupdate,packageupdate);
jobcard.append(div); */

 



