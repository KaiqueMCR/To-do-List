const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setBank = bank => localStorage.setItem('todoList', JSON.stringify(bank))

function creatTasks(taskName, status, index) {
  const task = document.createElement('label')
  task.classList.add('task')
  task.innerHTML = `
    <input type="checkbox" ${status} data-index = ${index}>
    <div>${taskName}</div>
    <button data-index = ${index} type="button">
      <i class="far fa-trash-alt"></i>
    </button>
  `
  document.getElementById('tasks').appendChild(task)
}

function refreshTasks() {
  const tasks = document.getElementById('tasks')
  while (tasks.firstChild) {
    tasks.removeChild(tasks.lastChild)
  }
}

function getTasks() {
  refreshTasks()
  const dataBank = getBank()
  dataBank.forEach((task, index) => creatTasks(task.taskId, task.status, index))
}

function insertTask() {
  let taskName = document.getElementById('newtask').value

  if (taskName == '') {
    alert('Please insert a task first')
  } else {
    const dataBank = getBank()
    dataBank.push({ taskId: taskName, status: '' })
    setBank(dataBank)

    getTasks()

    document.getElementById('newtask').value = ''
  }
}

function removeTask(index) {
  const dataBank = getBank()
  dataBank.splice(index, 1)
  setBank(dataBank)
  getTasks()
}

function updateDataBank(index) {
  const dataBank = getBank()
  dataBank[index].status = dataBank[index].status == '' ? 'checked' : ''
  setBank(dataBank)
  getTasks()
}

function taskEvent(event) {
  const element = event.target
  if (element.type === 'button') {
    const index = element.dataset.index
    removeTask(index)
  } else if (element.type === 'checkbox') {
    const index = element.dataset.index
    updateDataBank(index)
  }
}

document.getElementById('push').addEventListener('click', insertTask)
document.getElementById('tasks').addEventListener('click', taskEvent)

getTasks()
