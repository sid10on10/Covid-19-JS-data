let main = document.body
let mydiv = document.createElement("div")
mydiv.setAttribute("style","width:100%;height:auto;")
mydiv.setAttribute("class","card-group")
let header_div = document.createElement("div")
header_div.setAttribute("style","text-align:center;color:black;")
let header = document.createElement("h1")
header.innerText = "World Covid-19 Alert Data";
header_div.appendChild(header)
main.appendChild(header_div)
main.appendChild(mydiv)
let url = 'https://api.covid19api.com/countries';

async function getData(url){
    let country = await fetch(url)
    let arr = await country.json()
    return arr
}

async function slugData(slug){
    let url = `https://api.covid19api.com/country/${slug}?from=2020-07-01T00:00:00Z&to=2020-08-01T00:00:00Z`
    let result = await getData(url)
    let line = ""
    for(each of result){
        line += "Confirmed : " + each["Confirmed"] + "Deaths : " + each["Deaths"] + "Recovered : " + each["Recovered"] + "Active : " + each["Active"] +  "\n"
    }
    alert(line);
}


async function processCountry(){
    try{
        let arr = await getData('https://api.covid19api.com/countries')
    for(let i=0;i<arr.length;i++){
        let outer_div = document.createElement("div")
        outer_div.setAttribute("style","display:flex;justify-content:center;padding:5px;")
        outer_div.setAttribute("class","col-4")
        
        let card_div = document.createElement("div")
        card_div.setAttribute("class","card")
        
        let card_body = document.createElement("div")
        card_body.setAttribute("class","card-body")
        
        let card_head = document.createElement("h5")
        card_head.setAttribute("class","card-title")
        card_head.innerText = arr[i]["Country"]
        
        let card_code = document.createElement("p")
        card_code.setAttribute("class","card-text")
        card_code.innerText = `Country Code : ${arr[i]["ISO2"]}`
        
        let card_slug = document.createElement("p")
        card_slug.setAttribute("class","card-text")
        card_slug.innerText = `Country Slug : ${arr[i]["Slug"]}`
        let slug = arr[i]["Slug"]
        

        let detail_button = document.createElement("a")
        detail_button.setAttribute("class","btn btn-primary")
        detail_button.setAttribute("onclick", `slugData('${slug}')`)
        detail_button.innerText = "Details"

        card_body.appendChild(card_head)
        card_body.appendChild(card_code)
        card_body.appendChild(card_slug)
        card_body.appendChild(detail_button)
        
        card_div.appendChild(card_body)
        outer_div.appendChild(card_div)
        mydiv.appendChild(outer_div)
    }
}catch(error){
    console.log(error)
}
}

processCountry();
