    
    
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    const inputBox = document.querySelector('.to-do-input');
    const speechBtn = document.querySelector(".to-do-speech-btn"  );

    recognition.addEventListener('result', e =>{
        const transcript = Array.from(e.results)
            .map(results => results[0])
            .map(results => results.transcript)
            .join('');

            console.log(transcript);

        inputBox.value = transcript;
    })

speechBtn.addEventListener('click', recognition.start());