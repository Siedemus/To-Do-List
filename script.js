{
    const tasks = [
        {
            content: "Dodać zadanie",
            done: false,
        },
    ];


    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask
        });
        render();
    };


    const removeTask = (index) => {
        tasks.splice(index, 1)
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

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
               <button class="list__done js-done">${task.done ? "✔" : "᠎​"}</button>
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