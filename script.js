{
    let tasks = [
    ];
    let hideDoneTasks = false;

    const addNewTask = (newTask) => {
        tasks = [
            { content: newTask },
            ...tasks,
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
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
            ...tasks.slice(index + 1),
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

    const renderTasks = () => {
        const taskHTML = task => `
        <li class="list__item${task.done && hideDoneTasks ? " list__item--hidden" : ""}">
        <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>
         <p class="js-listItem list__text${task.done ? " list__text--done" : ""}">${task.content}</p>
        <button class="list__button list__button-remove js-remove">🗑</button>
      </li>
     `

        const listElement = document.querySelector(".js-list")
        listElement.innerHTML = tasks.map(taskHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons")

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
            <button class="container__button js-ToggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="container__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}>
            Ukończ wszystkie
            </button>
        `
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTaskDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-ToggleHideDoneTasks")

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
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