import {
    content, headerName, addProject, projectform, projectformedit, theform, 
    theformedit, projectNameValue, projectNameValueEdit, allTasks, nextWeek, today, importantTasks, submitIt, tasksform, addTask,
    addtaskButton, canceltask, tasks, container, remove, removeEdit, fancyPopup, popupName, popupDescription, popupDate, popupPriority
} from "./var.js";

/*
    our global variables
*/
let currentProject = -1;

/*
    our data structures
*/
let projects;
let ds;
if (localStorage.projects != null)
    projects = JSON.parse(localStorage.projects);
else
    projects = [];

if (localStorage.tasks != null)
    ds = JSON.parse(localStorage.tasks);
else
    ds = [];

/*
    our constructors
*/
function theproject(title) {
    this.title = title;
}
function thetask(name, description, important, date) {
    this.name = name;
    this.description = description;
    this.important = important;
    this.date = date;
}
const outTheTasks = function(i, j) {
    let taskdiv = document.createElement('div');
    let name = document.createElement('div');
    let icons = document.createElement('div');
    let important = document.createElement('div');
    let threedots = document.createElement('div');
    let bars = document.createElement('div');
    let p = document.createElement('p');
    
    taskdiv.setAttribute('class', 'task');
    taskdiv.style.cursor = 'pointer';
    name.setAttribute('class', 'name');
    icons.setAttribute('class', 'icons');
    important.setAttribute('class', 'important');
    threedots.setAttribute('class', 'threedots');
    bars.innerHTML = '<i class="fa-solid fa-bars"></i>';
    p.textContent = `${ds[i][j].name}`;
    name.appendChild(bars);
    name.appendChild(p);
    important.innerHTML = '<i class="fa-regular fa-star"></i>';
    threedots.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
    if (ds[i][j].important)
        important.style.color = 'gold';
    icons.appendChild(important);
    icons.appendChild(threedots);
    taskdiv.appendChild(name);
    taskdiv.appendChild(icons);
    bars.addEventListener('click', function() {
        if (fancyPopup.style.display == 'block')
            fancyPopup.style.display = 'none';
        else
            fancyPopup.style.display = 'block';
        popupName.textContent = ds[i][j].name;
        popupDescription.textContent = ds[i][j].description;
        popupDate.textContent = ds[i][j].date;
        if (ds[i][j].important)
            popupPriority.textContent = 'Important';
        else
            popupPriority.textContent = 'Not Important';
    });
    container.appendChild(taskdiv);
    let pop = document.createElement('div');
    let del = document.createElement('p');
    let edit = document.createElement('p');
    threedots.addEventListener('click', function() {
        del.style.setProperty('margin-bottom', '13px');
        del.textContent = 'Delete';
        edit.textContent = 'Edit';
        edit.style.setProperty('cursor', 'pointer');
        del.style.setProperty('cursor', 'pointer');
        pop.appendChild(del);
        pop.appendChild(edit);
        pop.style.setProperty('position', 'absolute');
        pop.style.setProperty('right', '-20px');
        pop.style.setProperty('top', '-100px');
        pop.style.setProperty('background-color', '#273746');
        pop.style.setProperty('padding', '15px 20px');
        icons.append(pop);
    });
    del.addEventListener('click', function() {
        ds[i].splice(j, 1);
        localStorage.tasks = JSON.stringify(ds);
        pop.remove();
        displayTasks();
    });
    edit.addEventListener('click', function() {
        currentProject = i;
        currentTask = j;
        isitEditForm = true;
        addTask.style.display = 'block';
    })
    pop.addEventListener('click', function() {
        pop.remove();
    });
    important.addEventListener('click', function() {
        if (!ds[i][j].important) {
            important.style.color = 'gold';
            ds[i][j].important = true;
            localStorage.setItem('tasks', JSON.stringify(ds));
        }
        else {
            important.style.color = 'white';
            ds[i][j].important = false;
            localStorage.setItem('tasks', JSON.stringify(ds));
        }
    });
   
}
const displayAllTasks = function() {
    for (let i = 0; i < projects.length; i++) {
        if (Array.isArray(ds[i])) {
            for (let j = 0; j < ds[i].length; j++) {
                outTheTasks(i, j);
            }
        }
    }
}
const AllTasksSection = function() {
    addtaskButton.style.display = 'none';
    container.textContent = '';
    headerName.textContent = 'All Tasks';
    content.style.display = 'block';
    displayAllTasks();
    console.log('from all tasks');
};
AllTasksSection();
allTasks.addEventListener('click', AllTasksSection);
const displaySpecificTasksWithSpecificDate = function(specificDate) {
    container.textContent = '';
    addtaskButton.style.display = 'none';
    for (let i = 0; i < projects.length; i++) {
        if (Array.isArray(ds[i])) {
             for (let j = 0; j < ds[i].length; j++) {
                let myDate = new Date(ds[i][j].date);
                let currentDate = new Date();
                let formatter = new Intl.DateTimeFormat('default', {timezone: 'Africa/Cairo'});
                myDate = formatter.format(myDate);
                currentDate = formatter.format(currentDate);
                let diff =  new Date(myDate).getTime() - new Date(currentDate).getTime();
                diff = Math.floor(diff / (1000 * 60 * 60 * 24));
                if (specificDate == 'week') {
                    if (diff > 7)
                        outTheTasks(i, j);
                }
                else if (specificDate == 'today') {
                    if (diff == 0)
                        outTheTasks(i, j);
                }
             }
        }
     }
};
nextWeek.addEventListener('click', function() {
    headerName.textContent = 'Next Week';
    displaySpecificTasksWithSpecificDate('week');
});
today.addEventListener('click', function() {
    headerName.textContent = 'Today';
    displaySpecificTasksWithSpecificDate('today');
});
importantTasks.addEventListener('click', function() {
    container.textContent = '';
    addtaskButton.style.display = 'none';
    headerName.textContent = 'Important';
    for (let i = 0; i < projects.length; i++) {
        if (Array.isArray(ds[i])) {
            for (let j = 0; j < ds[i].length; j++) {
                if (ds[i][j].important)
                    outTheTasks(i, j);
            }
        }
    }
});
addProject.addEventListener('click', function() {
    projectform.style.display = 'block';

});
remove.addEventListener('click', function(event) {
    event.preventDefault();
    projectform.style.display = 'none';
});
removeEdit.addEventListener('click', function(event) {
    event.preventDefault();
    projectformedit.style.display = 'none';
});
const addtheProject = function() {
    const ourdata = new FormData(theform);
    const projectName = ourdata.get('project-name');

    const project = new theproject(projectName);
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    displaytheProjects();
}
addtaskButton.addEventListener('click', function() {
    addTask.style.display = 'block';
});
canceltask.addEventListener('click', function() {
    addTask.style.display = 'none';
});
theform.addEventListener('submit', function(event) {
    event.preventDefault();
    addtheProject();
    projectform.style.display = 'none';
});
let isitEditForm = false;
let currentTask = -1;
tasksform.addEventListener('submit', function(event) {
    event.preventDefault();
    const ourtask = new FormData(tasksform);
    const taskName = ourtask.get('task-name');
    const taskDescription = ourtask.get('task-description');
    const deadline = ourtask.get('deadline');
    const itstask = new thetask(taskName, taskDescription, false, deadline);
    if (!isitEditForm) {
        if (!Array.isArray(ds[currentProject]))
            ds[currentProject] = [];
        ds[currentProject].push(itstask);
        localStorage.setItem('tasks', JSON.stringify(ds));
        addTask.style.display = 'none';
    }
    else {
        ds[currentProject][currentTask].name = taskName;
        ds[currentProject][currentTask].description = taskDescription;
        ds[currentProject][currentTask].date = deadline;
        ds[currentProject][currentTask].important = false;
        localStorage.tasks = JSON.stringify(ds);
        addTask.style.display = 'none';
    }
    displayTasks(currentProject);
});

const displayTasks = function (i) {
    container.textContent = '';
    if (Array.isArray(ds[i])) {
        for (let j = 0; j < ds[i].length; j++) {
           outTheTasks(i, j);
        }
    }
}
const displaytheProjects = function() {
    tasks.textContent = '';
    for (let i = 0; i < projects.length; i++) {
        let projectdiv = document.createElement('div');
        let icon = document.createElement('div');
        let name = document.createElement('p');
        let dots = document.createElement('div');
        
        projectdiv.setAttribute('id', 'task');
        icon.setAttribute('class', 'icon');
        name.setAttribute('id', 'task-name');
        dots.setAttribute('id', 'dots');
        icon.innerHTML = '<i class="fa-solid fa-bars"></i>';
        name.textContent = projects[i].title;
        dots.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        projectdiv.appendChild(icon);
        projectdiv.appendChild(name);
        let pop = document.createElement('div');
        let del = document.createElement('p');
        let edit = document.createElement('p');
        dots.addEventListener('click', function() {
            del.style.setProperty('margin-bottom', '13px');
            del.textContent = 'Delete';
            edit.textContent = 'Edit';
            edit.style.setProperty('cursor', 'pointer');
            del.style.setProperty('cursor', 'pointer');
            pop.appendChild(del);
            pop.appendChild(edit);
            pop.style.setProperty('position', 'absolute');
            pop.style.setProperty('right', '10px');
            pop.style.setProperty('top', '-80px');
            pop.style.setProperty('background-color', '#273746');
            pop.style.setProperty('padding', '15px 20px');
            projectdiv.appendChild(pop);
        });
        projectdiv.appendChild(dots);
        tasks.appendChild(projectdiv);
        pop.addEventListener('click', function() {
            this.remove();
        });
        del.addEventListener('click', function() {
            projects.splice(i, 1);
            localStorage.projects = JSON.stringify(projects);
            projectformedit.style.display = 'none';
            displaytheProjects();
        });
        edit.addEventListener('click', function() {
            projectformedit.style.display = 'block';
            projectNameValueEdit.value = projects[i].title;
            pop.remove();
            theformedit.addEventListener('submit', function(event) {
                event.preventDefault();
                const editData = new FormData(theformedit);
                projects[i].title = editData.get('project-name-edit');
                localStorage.projects = JSON.stringify(projects);
                projectformedit.style.display = 'none';
                displaytheProjects();
            });
        });
        projectdiv.addEventListener('click', function() {
            headerName.textContent = projects[i].title;
            content.style.display = 'block';
            addtaskButton.style.display = 'flex';
            currentProject = i;
            container.textContent = '';
            displayTasks(currentProject);
        });
    }
}
displaytheProjects();
export {theform, displaytheProjects};