class Feedback {
    constructor() {
        this.rating1 = document.getElementById("rating1");
        this.rating2 = document.getElementById("rating2");
        this.rating3 = document.getElementById("rating3");
        this.rating4 = document.getElementById("rating4");
        this.rating5 = document.getElementById("rating5");
        this.defaultCard = document.getElementById("default-card");
        this.thankYou = document.getElementById("thank-you");
        this.result = document.getElementById("selected");
        this.feedbackValue = 0;
    }
}

const feedback = new Feedback();

feedback.rating1.addEventListener("click", () => {
    if (feedback.feedbackValue != 0) {
        return null;
    } else {
        feedback.feedbackValue = 1;
        feedback.rating1.className = "rating-active";
        feedback.rating2.className = "disabled";
        feedback.rating3.className = "disabled";
        feedback.rating4.className = "disabled";
        feedback.rating5.className = "disabled";
    }
});

feedback.rating2.addEventListener("click", () => {
    if (feedback.feedbackValue != 0) {
        return null;
    } else {
        feedback.feedbackValue = 2;
        feedback.rating1.className = "disabled";
        feedback.rating2.className = "rating-active";
        feedback.rating3.className = "disabled";
        feedback.rating4.className = "disabled";
        feedback.rating5.className = "disabled";
    }
});

feedback.rating3.addEventListener("click", () => {
    if (feedback.feedbackValue != 0) {
        return null;
    } else {
        feedback.feedbackValue = 3;
        feedback.rating1.className = "disabled";
        feedback.rating2.className = "disabled";
        feedback.rating3.className = "rating-active";
        feedback.rating4.className = "disabled";
        feedback.rating5.className = "disabled";
    }
});

feedback.rating4.addEventListener("click", () => {
    if (feedback.feedbackValue != 0) {
        return null;
    } else {
        feedback.feedbackValue = 4;
        feedback.rating1.className = "disabled";
        feedback.rating2.className = "disabled";
        feedback.rating3.className = "disabled";
        feedback.rating4.className = "rating-active";
        feedback.rating5.className = "disabled";
    }
});

feedback.rating5.addEventListener("click", () => {
    if (feedback.feedbackValue != 0) {
        return null;
    } else {
        feedback.feedbackValue = 5;
        feedback.rating1.className = "disabled";
        feedback.rating2.className = "disabled";
        feedback.rating3.className = "disabled";
        feedback.rating4.className = "disabled";
        feedback.rating5.className = "rating-active";
    }
});


function sendFeedback() {
    const alertMessage = document.createElement("p");
    const errorField = document.getElementById("error");
    const gifLoading = document.createElement("img");
    const loadingField = document.getElementById("loading");

    alertMessage.style.color = "red";
    alertMessage.style.marginBottom = "10px"
    alertMessage.innerHTML = "Select an option";

    gifLoading.src = "./images/loading4.gif";
    gifLoading.style.maxWidth = "50px";
    

    if (feedback.feedbackValue === 0) {
        errorField.appendChild(alertMessage);
    } else {
        feedback.defaultCard.className = "hide";
        loadingField.appendChild(gifLoading);

        setTimeout(() => {
            loadingField.className = "hide";
            feedback.thankYou.className = "show";
            feedback.result.innerHTML = feedback.feedbackValue;
        }, 3000);
    }
}
