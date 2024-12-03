const getAdvice = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    } else {
        const advice = await response.json();
        return advice;
    }
};

const generateAdvice = () => {
    const adviceText = document.getElementById("advice-text");
    const adviceId = document.getElementById("advice-id");

    getAdvice().then(data => {
        const text = data.slip.advice;
        const id = data.slip.id;
        adviceText.innerHTML = `"${text}"`;
        adviceId.innerHTML = id;
    }).catch(error => {
        alert(error.message);
        console.log(error.message);
    });
};
