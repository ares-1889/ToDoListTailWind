const form = document.querySelector('[data-inpForm]')
const inp = document.querySelector('[data-inp]')
const lists = document.querySelector('[data-tasksContainer]')
const delButton = document.querySelector('#removeBtn')
const body = document.querySelector("#bod")
const dateDiv = document.querySelector('[data-date]')
const timeDiv = document.querySelector('[data-time]')
let time = dayjs().format('HH:MM:SS')
let date = dayjs().format('YYYY-MM-DS')
let submittedTask =[]
let task = ""
let tasks = JSON.parse(localStorage.getItem("lsStuff")) || []
let SelectedIdArray= JSON.parse(localStorage.getItem("lsSStuff")) || []
let SelectedListId =""

form.addEventListener('submit', (e)=>
{
            e.preventDefault()
            if(inp.value.trim() !== '')
            {
            submittedTask = inp.value
            tasks.push(arrayConverter(submittedTask))
            render()
            inp.value = ''
            save()
            }
            else {
                  alert('Nothing cannot be added')
            }
          

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
      Ntask.style.paddingLeft = "8vw"
      Ntask.style.paddingTop ="1.5vh"
      Ntask.style.paddingBottom = "1vh"
      Ntask.style.backgroundColor = "lightblue"
      Ntask.style.border = "1px solid grey"
      Ntask.style.overflow ="hidden"
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
      SelectedIdArray = SelectedIdArray.filter(id => id !== SelectedListId);
    } else {
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

const dateTime = ()=>
{
     let time = dayjs().format('HH:mm:ss')
      let date = dayjs().format('DD-MM-YYYY')
      timeDiv.innerHTML = time
      dateDiv.innerHTML = date
}

setInterval(dateTime,1000)
window.onload = render()