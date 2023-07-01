let search_form = document.getElementById("search_form");
let container1 = document.getElementById("container1");
let word_name = document.getElementById("word_name");
let sub_heading = document.getElementById("sub_heading");
let container2_text = document.getElementById("container2_text");

search_form.addEventListener("submit", async (e)=>{
    // Getting the word from the input
    let word_input = document.getElementById("word_input");
    e.preventDefault()
    let word = word_input.value;
    while(container1.hasChildNodes()){
    container1.removeChild(container1.firstChild)
    }

    // Calling the api to fetch data
    try{
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    let data = await response.json();
    let actualData = data[0].meanings;
    container2_text.innerText = ""
    word_name.innerText = `Word : ${word}`
    sub_heading.innerText = "Meanings & Definitions"
    renderData(actualData)
    } catch{
        container2_text.innerText = "Sorry, You have entered wrong word !"
        word_name.innerText = `Word : ${word}`
        sub_heading.innerText = ""
    }
})


function renderData(data){
    let data_length = data.length;
    for (i=0; i<data_length; i++){
    
    let data_element = data[i];
    let partOfSpeech = data_element.partOfSpeech;
    let definitions = data_element.definitions[0];
    let synonyms = anto_syno_data("syno", data_element);
    let antonyms = anto_syno_data("anto", data_element);


    let dictionary_ul = document.createElement("ul");
    dictionary_ul.classList.add("list-group");
    dictionary_ul.classList.add("mb-5");
    dictionary_ul.classList.add("w-50");
    container1.appendChild(dictionary_ul);
    dictionary_ul.innerHTML = `<li class="list-group-item active" aria-current="true">${partOfSpeech}</li>
    <li class="list-group-item">Definition : ${definitions.definition}</li>
    <li class="list-group-item">Synonyms : ${synonyms}</li>
    <li class="list-group-item">Antonyms : ${antonyms}</li>
    <li class="list-group-item">Example : ${definitions.example}</li>`
    }
}

function anto_syno_data(dataType, data_element){
let anto_syno;
if (dataType=="syno"){
    anto_syno = data_element.synonyms;
} else{
    anto_syno = data_element.antonyms;
}
let actual_anto_syno = anto_syno.toString();
return actual_anto_syno;
}