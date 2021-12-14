const clear=document.querySelector('.clear');
const list=document.querySelector('.list');
const input=document.getElementById("input");
const taskHeading=document.getElementById("task-heading");

const check="fas fa-check-circle";
const uncheck="far fa-circle";
const lineThrough="lineThrough";

let currentTask=0;

let array;
let id;

let data=localStorage.getItem("TODO");

if(data)
{
    array=JSON.parse(data);
    id=array.length;
    loadArray(array);

}
else{
    array=[];
    id=0;
}


function loadArray(array)
{
    array.forEach(element => {

        addToDO(element.text,element.id,element.done,element.trash);
        
    });
}


function addToDO(toDO,id,done,trash){

    if (trash)
        {return;}
    const DONE=done ?check:uncheck;
    const LINE=done ?lineThrough:"";

    const item=`

    <div class="list-item">
        <i class="${DONE}" job="complete" id="${id}"></i>
        <p class="text ${LINE}" job="nothing">${toDO}</p>
        <i class="fas fa-trash-alt" job="remove" id="${id}"></i>
    </div>
    
    `;

    const position='beforeend';

    list.insertAdjacentHTML(position,item);

    currentTask+=1;
    updateTaskHeading();

}

function completeToDO(element){
    element.classList.toggle("fas");
    element.classList.toggle("fa-check-circle");

    element.classList.toggle("far");
    element.classList.toggle("fa-circle");

    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    array[element.id].done= array[element.id].done ? false: true;

}

function removeTodo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    array[element.id].trash=true;

    currentTask-=1;
    updateTaskHeading();

}

function updateTaskHeading(){
if( currentTask<=1 ){
    taskHeading.innerHTML=`Task(${currentTask})`;
}
else{
    taskHeading.innerHTML=`Tasks(${currentTask})`;
}
}


document.addEventListener("keyup", function(event){

    if(event.key === 'Enter')
    {
        const toDo=input.value;

        if(toDo)
        {
            addToDO(toDo,id,false,false);
            array.push({
                id:id,
                text:toDo,
                done:false,
                trash:false
            });
            localStorage.setItem("TODO",JSON.stringify(array));
            id++;
            input.value="";
            
        }
    }
});

list.addEventListener("click",(event)=>{

    const element=event.target;

    const elementJob=element.attributes.job.value;

    if(elementJob=="complete"){
        completeToDO(element);
    }
    else if (elementJob=="remove"){
        removeTodo(element);
    }

    localStorage.setItem("TODO",JSON.stringify(array));
});

clear.addEventListener("click",()=>{

    localStorage.clear();
    location.reload();

});

