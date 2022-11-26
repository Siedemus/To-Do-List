{
    let tasks = [
    ];
    let hideDoneTasks = false;

    const addNewTask = (newTask) => {
        tasks = [
            {content: newTask},
            ...tasks,
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index +1),
        ];
        render()
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index +1),
        ];
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const doneButtons = document.querySelectorAll(".js-done")
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
             <li class="list__item">
               <button class="list__done js-done">${task.done ? "✔" : ""}</button>
                <p class="js-listItem list__text${task.done ? " list__text--done" : ""}">${task.content}</p>
               <button class="list__remove js-remove">🗑</button>
             </li>
            `
        };
        document.querySelector(".js-list").innerHTML = htmlString;
        bindEvents();
    };

    const focusInput = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", () => {
            const input = document.querySelector(".js-input")
            input.focus();
        });
    };

    const clearInput = () => {
        const form = document.querySelector(".js-form");
        form.reset();
    };

    const submitForm = (event) => {
        event.preventDefault();

        let input = document.querySelector(".js-input").value.trim()
        if (input === "") {
            clearInput();
            focusInput();
            return;
        };
        clearInput();
        addNewTask(input);
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", submitForm);
        render();
    };
    init();
}