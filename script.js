const timeArray = JSON.parse(localStorage.getItem("timeArray")) || [];

//Store user input and pass to local storage
const userInput = () => {
    const userInputTitle = document.querySelector(".text-input").value;
    const userInputDate = document.querySelector(".date-input").value;
    const userDateTime = new Date(userInputDate).getTime();

    const inputArray = {userInputTitle, userDateTime};
    timeArray.push(inputArray);
    localStorage.setItem("timeArray", JSON.stringify(timeArray));
    console.log(timeArray);
}

//Returns diffenece between user input and current time
const timeDifference = () => {
    const diff = [];
    timeArray.forEach(time => {
        const userTitle = time.userInputTitle;
        const userTime = time.userDateTime;
        const currentTime = new Date().getTime();
        const timeDifference = userTime - currentTime;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const textDay = Math.floor(timeDifference / day);
        const textHour = Math.floor((timeDifference % day) / hour);
        const textMinute = Math.floor((timeDifference % hour) / minute);
        const textSecond = Math.floor((timeDifference % minute) / second);

        diff.push({userTitle, textDay, textHour, textMinute, textSecond});
    })
    return diff;
}

const createCountdownCard = () => {
    const diffArray = timeDifference();
    const container = document.querySelector(".countdown-container");
    container.innerHTML = "";

    diffArray.forEach(time => {
        const card = document.createElement("div");
        card.classList.add("countdown-card-container");
        container.appendChild(card);

        const title = document.createElement("h2");
        title.innerText = time.userTitle;
        card.appendChild(title);

        const day = document.createElement("p");
        day.innerHTML = "<span>days </span>" + time.textDay;
        card.appendChild(day);
        
        const hour = document.createElement("p");
        hour.innerHTML = "<span>hours </span>" + time.textHour;
        card.appendChild(hour);
        
        const minute = document.createElement("p");
        minute.innerHTML = "<span>minutes </span>" + time.textMinute;
        card.appendChild(minute);

        const second = document.createElement("p");
        second.innerHTML= "<span>seconds </span>" + time.textSecond;
        card.appendChild(second);

        const deleteButton = document.createElement("button");
        card.appendChild(deleteButton);
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
            timeArray.splice(timeArray.indexOf(time), 1);
            localStorage.setItem("timeArray", JSON.stringify(timeArray));
        });
      
    })

}


document.addEventListener("DOMContentLoaded", () => {
    createCountdownCard();
    setInterval(createCountdownCard, 1000);
});

const button = document.querySelector(".submit-button");
button.addEventListener("click", () => {
    userInput();
    createCountdownCard();
});

