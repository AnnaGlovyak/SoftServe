function decoding(message) {

    if ( message === '') {
        return '';
    } else {
        const messageArray = message.split(/[.?!]+\s/);
        const keys = messageArray[0].split(/[\s,"']+/);
        return checkResult(messageArray, keys);    
    }
    
    function checkResult(messages, keys){
        
        let result = '';

        for (let i = 0; i < keys.length; i++){
            let index = keys[i].length;
            result += `${messages[i + 1].split(/[\s,"]+/)[index - 1]} `;
        }
        const newResult = result.charAt(0).toLocaleUpperCase() + result.slice(1, result.length - 1) + '. ';
        
        if ( messages.length === keys.length + 1) {
            return newResult;
        } else {   
            const nextMessages = messages.slice(keys.length + 1);
            const nextKeys = messages.slice(keys.length + 1)[0].split(/[\s,"']+/);
            return newResult + checkResult(nextMessages, nextKeys);
        } 
    }
    
}

let letter = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse! The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it? I wanted to feel done with it first. Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse! The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it? I wanted to feel done with it first.'

console.log(decoding(letter));