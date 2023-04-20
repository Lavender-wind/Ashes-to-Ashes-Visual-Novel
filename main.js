var idCounter = 0;

class Screen{
    constructor(img, textBox){
        this.img = img;
        this.textBox = textBox;
    }
    setScene(scene){
        this.img.src = scene.img;
        this.scene = scene;
       // this.textBox.setText(scene.text);
    }
}

class Scene{
    constructor(img, text, character){
        this.img = img;
        this.text = text;
        this.character = character;
        this.id = idCounter;
        idCounter++;
    }
}

const screen = new Screen(document.getElementById("someImage"),undefined);

var Start = document.getElementById("Start");
Start.onclick = function(){
    screen.setScene(new Scene("whateverthefuck","you suck"));
}

//1. Switching between backgrounds, screens, & character poses



//2. Dialogue running along with plot progression
//3. Player choices affecting ending and some plot