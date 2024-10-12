const form = document.querySelector('[data-inpForm]')
const inp = document.querySelector('[data-inp]')
const lists = document.querySelector('[data-tasksContainer]')
const delButton = document.querySelector('#removeBtn')
const body = document.querySelector("#bod")
let submittedTask =[]
let task = ""
let tasks = JSON.parse(localStorage.getItem("lsStuff")) || []
let SelectedIdArray= JSON.parse(localStorage.getItem("lsSStuff")) || []
let SelectedListId =""

form.addEventListener('submit', (e)=>
{
            e.preventDefault()
            submittedTask = inp.value
            tasks.push(arrayConverter(submittedTask))
            render()
            inp.value = ''
            save()

})

function arrayConverter(param)
{
    return {id : Date.now().toString(),
     Content : submittedTask}

}
const render = ()=>
{     
      clearFirstElement(lists)
      tasks.forEach(task => {
      let Ntask  = document.createElement("div") 
      Ntask.dataset.did = task.id
      Ntask.innerText = task.Content
      lists.appendChild(Ntask)
      if (SelectedIdArray.includes(task.id))
      {
            Ntask.style.backgroundColor = "lightgrey"
            Ntask.style.border = "thick solid grey"
      }
      });
}


lists.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === "div") {
    SelectedListId = e.target.dataset.did;
    if (SelectedIdArray.includes(SelectedListId)) {
      // If the task is already selected, remove it from the selection
      SelectedIdArray = SelectedIdArray.filter(id => id !== SelectedListId);
    } else {
      // If the task is not selected, add it to the selection
      SelectedIdArray.push(SelectedListId);
    }
    save();
    render();
  }
});

const clearFirstElement= (param)=>
{
      while(param.firstChild)
      {
            param.removeChild(param.firstChild)
      }
}

const save = ()=>
{
      localStorage.setItem("lsStuff",JSON.stringify(tasks))
      localStorage.setItem("lsSStuff",JSON.stringify(SelectedIdArray))
}


delButton.addEventListener("click",()=>
{
      SelectedIdArray.forEach(SelectedListId => {
      tasks = tasks.filter(task=> task.id  !== SelectedListId)
      });
      render()
      SelectedIdArray=[]
      
      save()
}
)

body.addEventListener("keydown", keyCheck = (event)=>{
      let KeyId = event.keyCode
      if(KeyId === 46)
      {
           SelectedIdArray.forEach(SelectedListId => {
      tasks = tasks.filter(task=> task.id  !== SelectedListId)
      });
      render()
      SelectedIdArray=[]
      
      save() 
      }
})



window.onload = render()