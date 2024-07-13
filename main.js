let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');

let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create';
let temp;

function getTotal(){

        if((taxes.value !=''||ads.value !='' )&& price.value==''){
            window.alert("pleae Enter the price first");
        }else if(price.value !=''){
            let result = (+price.value+ +taxes.value+ +ads.value)-(+discount.value);
            total.innerHTML= result;
            total.style.background='green';
        }else{
            total.innerHTML= '';
            total.style.background= 'red';
        }       
}

let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro =[];
}



submit.onclick = function(){

    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    if(title.value!=''&&price.value!=''&& category.value!=''&&newpro.count < 100){
    if(mood === 'create'){
        if(newpro.count>1){
            for(let i = 0 ; i< newpro.count ; i++){
                datapro.push(newpro);
            }   
            }else{
                datapro.push(newpro);
            }

    }else{
        datapro[temp] = newpro;
        mood='create';
        submit.innerHTML='Create';
        count.style.display='block';
    }
    clearData();   
}

    localStorage.setItem('product', JSON.stringify(datapro));
    console.log(datapro);
    
    showData();

}

function clearData(){
    title.value='';
     price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.value='';
    count.value='';
    category.value='';
    total.innerHTML='';

}
function showData(){
    getTotal();
    let table ='';
    for(let i=0; i < datapro.length; i++){
        table +=`
                
                            <td>${i+1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                             <td>${datapro[i].category}</td>
                            <td><button onclick="updatadata(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>        
        
        `
    }
    document.getElementById('tbody').innerHTML = table; 
    let btndelete =document.getElementById('deleteAll')
    if(datapro.length>0)
{
    btndelete.innerHTML = `


        <button onclick = "deleteAll()">Delete All (${datapro.length})</button>
    
    `
}else{
    btndelete.innerHTML = ''
}
}
showData();

function deleteData(i){

    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData();



}

function deleteAll(){

        localStorage.clear();
        datapro.splice(0);
        showData();


}

function updatadata(i){
   title.value= datapro[i].title;
   price.value= datapro[i].price;
   taxes.value= datapro[i].taxes;
   ads.value= datapro[i].ads;
   discount.value= datapro[i].discount;
   total.value= datapro[i].total;
   category.value= datapro[i].category;
   count.style.display= 'none';
   getTotal();
   submit.innerHTML='Update';
    mood='update';
    temp=i;
    scroll({
        top:0,
        behavior: "smooth",

    })
        
    
}

//search\

let searchmode='title';

function getsearchmode(id){
   let search= document.getElementById('search')
    if(id == 'searchtitle'){
        searchmode='title';
        search.placeholder= 'Search By Title'
    }else{
        searchmode='category';
        search.placeholder= 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();

}

function searchData(value){
    let    table ='';



    if(searchmode == 'title'){


      
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){

                table +=`
                
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>
                <td><button onclick="updatadata(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>        

`;










            }
        }






    }
    else{
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){

                table +=`
                
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                 <td>${datapro[i].category}</td>
                <td><button onclick="updatadata(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>        

`;










            }
        }

    }
            document.getElementById('tbody').innerHTML = table; 
}