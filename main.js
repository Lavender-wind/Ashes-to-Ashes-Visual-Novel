class Screen{
    constructor(img, textBox){
        this.img = img;
        this.textBox = textBox;
        this.inAnimation = false;
    }
    setScene(scene,fade){
        if(this.inAnimation)return;
        if(fade == true){
            this.inAnimation = true;
            var fadebox = document.createElement("img");
            fadebox.width = window.innerWidth;
            fadebox.height = window.innerHeight;
            fadebox.src = "resources/Fadebox.png";
            fadebox.classList.add("fadebox");
            document.body.appendChild(fadebox);
            setTimeout(()=>{
                fadebox.style.animationDirection = "reverse";
                fadebox.style.animationDelay = "1s";
                this.scene = scene;
                scene.onSet(this);
            },1000);
            setTimeout(()=>{
                this.inAnimation = false;
                document.body.removeChild(fadebox);
            },2000);
            return;
        }
        this.scene = scene;
        scene.onSet(this);
       // this.textBox.setText(scene.text);
    }
}

class Scene{
    constructor(img, text, character){
        this.img = img;
        this.text = text;
        this.character = character;
    }
    onSet(screen){
        screen.img.src = this.img;
        uno.textbox.hidden=true;
        dos.textbox.hidden=true;
        tres.textbox.hidden=true;
        m.textbox.hidden=true;
        f.textbox.hidden=true;
        eh.textbox.hidden=true;
    }
}

class TimedScene extends Scene{
    setNext(scene,delay){
        this.nextScene = scene;
        this.delay = delay;
        return scene;
    }
    onSet(screen){
        super.onSet(screen);
        setTimeout(()=>{screen.setScene(this.nextScene,true)},this.delay);
    }
}

class DialogueScene extends Scene{
    constructor(img, text, character, dialogueBox, characterBox){
        super(img, text, character);
        this.dialogueBox = dialogueBox;
        this.characterBox = characterBox;
        return this;
    }
    onSet(screen){
        super.onSet(screen);
        this.dialogueBox.setText(this.text);
        this.characterBox.setText(this.character);
        SkipButton.hidden=false;
    }
}

class ChoiceScene extends DialogueScene{
    constructor(img, text, character, dialogueBox, characterBox, Uno, Dos, Tres, uno, dos, tres){
        super(img, text, character, dialogueBox, characterBox);
        this.uno = uno;
        this.dos = dos;
        this.tres = tres;
        this.Uno = Uno;
        this.Dos = Dos;
        this.Tres = Tres;
        return this;
    }
    onSet(screen){
        super.onSet(screen);
        this.uno.setText(this.Uno);
        this.dos.setText(this.Dos);
        this.tres.setText(this.Tres);
        uno.textbox.hidden=false;
        dos.textbox.hidden=false;
        tres.textbox.hidden=false;
        SkipButton.hidden=true;
    }
}

class GenderScene extends DialogueScene{
    constructor(img, text, character, dialogueBox, characterBox, M, F, Eh, m, f, eh){
        super(img, text, character, dialogueBox, characterBox);
        this.m = m;
        this.f = f;
        this.eh = eh;
        this.M = M;
        this.F = F;
        this.Eh = Eh;
        return this;
    }
    onSet(screen){
        super.onSet(screen);
        this.m.setText(this.M);
        this.f.setText(this.F);
        this.eh.setText(this.Eh);
        m.textbox.hidden=false;
        f.textbox.hidden=false;
        eh.textbox.hidden=false;
        SkipButton.hidden=true;
    }
}

class TextBox{
    constructor(css){
        this.textbox = document.createElement("p");
        this.textbox.classList.add(css);
        document.body.appendChild(this.textbox);
        this.currentletter = 0;
    }
    setText(text){
        this.text = text;
        this.textbox.innerHTML = "";
        this.currentletter = 0;
        if(this.timeoutId)clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(()=>{this.update();},20);
    }
    update(){
        if(this.text === undefined) return;
        this.textbox.innerHTML = this.textbox.innerHTML + this.text[this.currentletter];
        this.currentletter ++;
        if(this.currentletter>=this.text.length)return;
        this.timeoutId = setTimeout(()=>{this.update();},20);
    }
}

//1. Switching between backgrounds, screens, & character poses



//2. Dialogue running along with plot progression
//3. Player choices affecting ending and some plot

//Start Code
var GoodEnding = 0;
var NeutralEnding = 0;
var BadEnding = 0;
var FGender = 0;
var MGender = 0;
var EhGender = 0;
var dialogueBox = new TextBox("DialogueBox");
var characterBox = new TextBox("CharacterBox");
var uno = new TextBox("Option1");
var dos = new TextBox("Option2");
var tres = new TextBox("Option3");
var m = new TextBox("Gender1");
var f = new TextBox("Gender2");
var eh = new TextBox("Gender3");
    dialogueBox.textbox.hidden = true;
    characterBox.textbox.hidden = true;
    uno.textbox.hidden=true;
    dos.textbox.hidden=true;
    tres.textbox.hidden=true;
    m.textbox.hidden=true;
    f.textbox.hidden=true;
    eh.textbox.hidden=true;
    document.getElementById("Skip").hidden=true;
    
const screen = new Screen(document.getElementById("Placeholder"),undefined);

var firstScene = new TimedScene("resources/CutsceneBurn.jpg","idk man", 4000);
firstScene
    .setNext(new TimedScene("resources/CutsceneReflection.jpg","hello"),4000)
    .setNext(new TimedScene("resources/CutsceneBlack.jpg","hello"),2000);

var Start = document.getElementById("Start");
Start.onclick = function(){
    screen.setScene(firstScene,true);
    // screen.setScene(secondScene,true);
    document.body.removeChild(Start);
    document.getElementById("Ashes-to-Ashes").hidden = true;
    // setTimeout(()=>{screen.setScene(firstScene,true)},4000);
    setTimeout(()=>{
        dialogueBox.textbox.hidden = false;
        characterBox.textbox.hidden = false;
        document.getElementById("Skip").hidden=false;},14000);
    setTimeout(()=>{
        nextScene();
    },14000);
}
// var SkipButton = document.getElementById("Skip");
// SkipButton.addEventListener("click",()=>{
//         screen.setScene(thirdScene,false);
// });
var SkipButton = document.getElementById("Skip");
SkipButton.addEventListener("click",nextScene);

m.textbox.addEventListener("click", function(){
    MGender ++;
    nextScene();
  });

f.textbox.addEventListener("click", function(){
    FGender ++;
    nextScene();
  });

eh.textbox.addEventListener("click", function(){
    EhGender ++;
    nextScene();
  });

uno.textbox.addEventListener("click", function(){
    GoodEnding ++;
    nextScene();
  });
dos.textbox.addEventListener("click", function(){
    BadEnding ++;
    nextScene();
  });
tres.textbox.addEventListener("click", function(){
    NeutralEnding ++;
    nextScene();
  });

  function nextScene(){
    if(currentScene>=scenes.length)return;
    screen.setScene(scenes[currentScene],false);
    currentScene += 1;
}

var currentScene = 0;

var secondScene = new DialogueScene("resources/CutsceneBlack.jpg","...It's dark","You",dialogueBox,characterBox);

var thirdScene = new DialogueScene("resources/CutsceneBlack.jpg","My home...It's been ruined. No...No it can't be, they can't all be dead!","You",dialogueBox,characterBox);

var fourthScene = new DialogueScene("resources/CutsceneBlack.jpg","(The fire last night...Was Alestria, wasn't it.)","You",dialogueBox,characterBox);

var fifthScene = new DialogueScene("resources/CutsceneBlack.jpg","...I'll kill them. I swear on it, I'll kill them all.","You",dialogueBox,characterBox);

var sixthScene = new DialogueScene("resources/CutsceneBlack.jpg","...","You",dialogueBox,characterBox);

var seventhScene = new GenderScene("resources/CutsceneBlack.jpg","(choose your gender)","()",dialogueBox,characterBox, "Male", "Female", "Idk Really", m, f, eh);

var eighthScene = new ChoiceScene("resources/CutsceneBlack.jpg","I need to get out of here first.","You",dialogueBox,characterBox, "Look Around", "Stay Lying Down", "Explore", uno, dos, tres);

var ninthScene = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(You try to get into a better position)","()",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(You try to get into a better position)","()",dialogueBox,characterBox);

var tenthScene = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(I can't move...I think I'm trapped under the rubble. I can't remember anything from last night except blacking out, but I don't think I broke anything.)","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(I can't move...I think I'm trapped under the rubble. I can't remember anything from last night except blacking out, but I don't think I broke anything.)","You",dialogueBox,characterBox);

var eleventhScene = (MGender > 1)?
new DialogueScene("resources/MaleMCSpeak.jpg","Help! Is there anyone nearby?","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCSpeak.jpg","Help! Is there anyone nearby?","You",dialogueBox,characterBox);

var twelfthScene = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","..!","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","..!","You",dialogueBox,characterBox);

var thirteenthScene = new DialogueScene("resources/CaelusSad.jpg","Are you okay?","???",dialogueBox,characterBox);

var fourteenthScene = (MGender > 1)?
new DialogueScene("resources/MaleMCSpeak.jpg","Yeah, I think, but I'm stuck.","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCSpeak.jpg","Yeah, I think, but I'm stuck.","You",dialogueBox,characterBox);

var fifteen = new DialogueScene("resources/CaelusSmile.jpg","Ah, that's good.","???",dialogueBox,characterBox);

var sixteen = new DialogueScene("resources/CaelusSmile.jpg","There doesn't seem like there are any injuries on you, either, so I'll assume you're trapped under this boulder.","???",dialogueBox,characterBox);

var seventeen = new DialogueScene("resources/CaelusSmile.jpg","Here, let me help.","???",dialogueBox,characterBox);

var eighteen = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(The stranger helps you break free from the rubble, and in an instant, you feel a great weight being lifted off you.)","()",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(The stranger helps you break free from the rubble, and in an instant, you feel a great weight being lifted off you.)","()",dialogueBox,characterBox);

var nineteen = (MGender > 1)?
new DialogueScene("resources/MaleMCSpeak.jpg","Ah, thanks.","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCSpeak.jpg","Ah, thanks.","You",dialogueBox,characterBox);

var twenty = new DialogueScene("resources/CaelusGrin.jpg","No worries!","???",dialogueBox,characterBox);

var twentyone = new DialogueScene("resources/CaelusSmile.jpg","The name's Caelus, by the way, what's yours?","???",dialogueBox,characterBox);

var twentytwo = (MGender > 1)?
new DialogueScene("resources/MaleMCSpeak.jpg","Ash","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCSpeak.jpg","Asha","You",dialogueBox,characterBox);

var twentythree = (MGender > 1)?
new DialogueScene("resources/CaelusSmile.jpg","Ash...has a nice ring to it.","Caelus",dialogueBox,characterBox):
new DialogueScene("resources/CaelusSmile.jpg","Asha...has a nice ring to it.","Caelus",dialogueBox,characterBox);

var twentyfour = new DialogueScene("resources/CaelusSmile.jpg","Well, in any case, me and my team were scouting for any survivors of the fire.","Caelus",dialogueBox,characterBox);

var twentyfive = new DialogueScene("resources/CaelusSmile.jpg","I think you're the only one, but strangely, you're not a bit hurt.","Caelus",dialogueBox,characterBox);

var twentysix = new DialogueScene("resources/CaelusSmile.jpg","Ah, but we must not delay, I'll take you to see the others, let's go!","Caelus",dialogueBox,characterBox);

var twentyseven = (MGender > 1)?
new ChoiceScene("resources/MaleMCNeutral.jpg","(...Should I trust him?)","You",dialogueBox,characterBox, "Hesitate", "Don't Follow Him", "Follow Him", uno, dos, tres):
new ChoiceScene("resources/FemaleMCNeutral.jpg","()...Should I trust him?)","You",dialogueBox,characterBox, "Hesitate", "Don't Follow Him", "Follow Him", uno, dos, tres);

var twentyeight = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(A bit hesitant, you don't follow immediately, but Caelus's hand grabs you.)","()",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(A bit hesitant, you don't follow immediately, but Caelus's hand grabs you.)","()",dialogueBox,characterBox);

var twentynine = (MGender > 1)?
new DialogueScene("resources/MaleMCSpeak.jpg","..!","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCSpeak.jpg","..!","You",dialogueBox,characterBox);

var thirty = new DialogueScene("resources/CaelusGrin.jpg","Come on!","Caelus",dialogueBox,characterBox);

var thirtyone = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","...","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","...","You",dialogueBox,characterBox);

var thirtytwo = new DialogueScene("resources/CutsceneBlack.jpg","(After a while, you reach a dip in the terrain. Caelus waves you over, and you see two other people at the campsite.)","()",dialogueBox,characterBox);

var thirtythree = new DialogueScene("resources/CaelusGrin.jpg","I'm back, everybody!","Caelus",dialogueBox,characterBox);

var thirtyfour = new DialogueScene("resources/AmphriteSpeak.jpg","Welcome back, and who might this be?","???",dialogueBox,characterBox);

var thirtyfive = new DialogueScene("resources/AltairNeutral.jpg","...","?",dialogueBox,characterBox);

var thirtysix = (MGender > 1)?
new DialogueScene("resources/CaelusSmile.jpg","This is Ash, I found him trapped under the rubble.","Caelus",dialogueBox,characterBox):
new DialogueScene("resources/CaelusSmile.jpg","This is Asha, I found her trapped under the rubble.","Caelus",dialogueBox,characterBox);

var thirtyseven = new DialogueScene("resources/CaelusSad.jpg","I don't think anyone else has survived, though.","Caelus",dialogueBox,characterBox);

var thirtyeight = new DialogueScene("resources/AmphriteSpeak.jpg","My, that's unfortunate.","???",dialogueBox,characterBox);

var thirtynine = new DialogueScene("resources/AmphriteSmile.jpg","But I'm glad Caelus managed to find you, at least. It'd be a terribly sad to have to clean up the corpse of someone as cute as you.","???",dialogueBox,characterBox);

var fourtyone = new DialogueScene("resources/AmphriteWink.jpg","Hahaha, just kidding! The last part is true though, I do specialize in cleanups while Caelus does the scouting.","???",dialogueBox,characterBox);

var fourtytwo = new DialogueScene("resources/AmphriteSpeak.jpg","My name is Amphrite, and this is Altair, he's our protector, basically. Won't you say hi, now, Altair?","Amphrite",dialogueBox,characterBox);

var fourtythree = new DialogueScene("resources/AltairNeutral.jpg","...","Altair",dialogueBox,characterBox);

var fourtyfour = new DialogueScene("resources/AmphriteSmile.jpg","Altair~","Amphrite",dialogueBox,characterBox);

var fourtyfive = new DialogueScene("resources/AltairGesture.jpg","(Altair sighs.)","()",dialogueBox,characterBox);

var fourtysix = new DialogueScene("resources/AltairNeutral.jpg","...I'm Altair.","Altair",dialogueBox,characterBox);

var fourtyseven = new DialogueScene("resources/AltairNeutral.jpg","(At Amphrite's prompt, he continues speaking.)","()",dialogueBox,characterBox);

var fourtyeight = new DialogueScene("resources/AltairNeutral.jpg","I specialize in keeping people who shouldn't be here away.","Altair",dialogueBox,characterBox);

var fourtynine = (MGender > 1)?
new ChoiceScene("resources/MaleMCNeutral.jpg","(I guess I should think of something to say.)","You",dialogueBox,characterBox, "Be Sarcastic", "Follow Up With a Compliment", "Say Something Random", uno, dos, tres):
new ChoiceScene("resources/FemaleMCNeutral.jpg","(I guess I should think of something to say.)","You",dialogueBox,characterBox, "Be Sarcastic", "Follow Up With a Compliment", "Say Something Random", uno, dos, tres);

var fifty = (MGender > 1)?
new DialogueScene("resources/MaleMCGrin.jpg","Well it seems you've been doing a pretty good job.","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCGrin.jpg","Well it seems you've been doing a pretty good job.","You",dialogueBox,characterBox);

var fiftyone = new DialogueScene("resources/AltairBlush.jpg","!","Altair",dialogueBox,characterBox);

var fiftytwo = new DialogueScene("resources/AltairGesture.jpg","Thanks.","Altair",dialogueBox,characterBox);

var fiftythree = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(Well that was unexpected.)","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(Well that was unexpected.)","You",dialogueBox,characterBox);

var fiftyfour = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(I meant it half sarcastically, too.)","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(I meant it half sarcastically, too.)","You",dialogueBox,characterBox);

var fiftyfive = new DialogueScene("resources/CaelusSmile.jpg","You guys seem to be getting along pretty well, then I suppose we can get back on topic.","Caelus",dialogueBox,characterBox);

var fiftysix = new DialogueScene("resources/CaelusSad.jpg","Last night, a mysterious blaze burned down our town. We're all people who managed to get out unscathed.","Caelus",dialogueBox,characterBox);

var fiftyseven = new DialogueScene("resources/CaelusSad.jpg","The culprit seems to be Alestria, a nation intent on getting what it wants, even by force.","Caelus",dialogueBox,characterBox);

var fiftyeight = new DialogueScene("resources/CaelusSad.jpg","As for what Alestria is looking for...","Caelus",dialogueBox,characterBox);

var fiftynine = (MGender > 1)?
new DialogueScene("resources/CaelusGrin.jpg","It's you, Ash.","Caelus",dialogueBox,characterBox):
new DialogueScene("resources/CaelusGrin.jpg","It's you, Asha.","Caelus",dialogueBox,characterBox);

var sixty = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","(Wha-)","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","(Wha-)","You",dialogueBox,characterBox);

var sixtyone = (MGender > 1)?
new DialogueScene("resources/CaelusGrin.jpg","That pin you wear along your bag, where'd you get it?.","Caelus",dialogueBox,characterBox):
new DialogueScene("resources/CaelusGrin.jpg","That pendant you wear on your neck, where'd you get it?.","Caelus",dialogueBox,characterBox);

var sixtytwo = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","...","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","...","You",dialogueBox,characterBox);

var sixtythree = (MGender > 1)?
new ChoiceScene("resources/MaleMCNeutral.jpg","(Do I tell him?)","You",dialogueBox,characterBox, "Don't Tell Him", "Tell Him", "Lie", uno, dos, tres):
new ChoiceScene("resources/FemaleMCNeutral.jpg","(Do I tell him?)","You",dialogueBox,characterBox, "Don't Tell Him", "Tell Him", "Lie", uno, dos, tres);

var sixtyfour = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","It's-","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","It's-","You",dialogueBox,characterBox);

var sixtyfive = new DialogueScene("resources/CaelusSmile.jpg","An heirloom from your parents, perhaps?","Caelus",dialogueBox,characterBox);

var sixtysix = new DialogueScene("resources/CaelusSmile.jpg","Judging by the look on your face, I'm right.","Caelus",dialogueBox,characterBox);

var sixtyseven = new DialogueScene("resources/CaelusSmile.jpg","I noticed the moment I saw you. Your hair, your eyes, and especially that edged rose. You're a descendant from the main rivals of Alestria, whom they seek to kill.","Caelus",dialogueBox,characterBox);

var sixtyeight = new DialogueScene("resources/CaelusGrin.jpg","In other words, you're the reason we're in this mess.","Caelus",dialogueBox,characterBox);

var sixtynine = new DialogueScene("resources/AltairNeutral.jpg","!","Altair",dialogueBox,characterBox);

var seventy = new DialogueScene("resources/AmphriteSpeak.jpg","Now, no need to scare our little guest, is there?","Amphrite",dialogueBox,characterBox);

var seventyone = (MGender > 1)?
new DialogueScene("resources/AmphriteSpeak.jpg","He's innocent, but you really should've told us sooner.","Amphrite",dialogueBox,characterBox):
new DialogueScene("resources/AmphriteSpeak.jpg","She's innocent, but you really should've told us sooner.","Amphrite",dialogueBox,characterBox);

var seventytwo = (MGender > 1)?
new DialogueScene("resources/AmphriteSpeak.jpg","Now, Ash, I'm sure we'll work something out. No harm will come to you.","Amphrite",dialogueBox,characterBox):
new DialogueScene("resources/AmphriteSpeak.jpg","Now, Asha, I'm sure we'll work something out. No harm will come to you.","Amphrite",dialogueBox,characterBox);

var seventythree = new DialogueScene("resources/AltairNeutral.jpg","Alestria is dangerous, we could use another more allies in our revenge. Animosity will bring nothing.","Altair",dialogueBox,characterBox);

var seventyfour = new DialogueScene("resources/CaelusGrin.jpg","I suppose you're all right. But walking bait that attracts Alestria's attention would be quite troublesome for us, if they didn't pitch in to do anything.","Caelus",dialogueBox,characterBox);

var seventyfive = (MGender > 1)?
new ChoiceScene("resources/CaelusSmile.jpg","Well, would you like to join us, Ash?","Caelus",dialogueBox,characterBox, "I suppose", "Yes", "I don't really have a choice now, do I?", uno, dos, tres):
new ChoiceScene("resources/CaelusSmile.jpg","Well, would you like to join us, Asha?","Caelus",dialogueBox,characterBox, "I suppose", "Yes", "I don't really have a choice now, do I?", uno, dos, tres);

var seventysix = (MGender > 1)?
new DialogueScene("resources/MaleMCNeutral.jpg","There's no way I could hesitate at a time like this. Alestria...for killing everyone I've ever known, need to pay.","You",dialogueBox,characterBox):
new DialogueScene("resources/FemaleMCNeutral.jpg","There's no way I could hesitate at a time like this. Alestria...for killing everyone I've ever known, need to pay.","You",dialogueBox,characterBox);

var seventyseven = new DialogueScene("resources/CaelusGrin.jpg","Wonderful.","Caelus",dialogueBox,characterBox);

var seventyeight = new DialogueScene("resources/AmphriteSpeak.jpg","Then we should discuss what we're really here to do.","Amphrite",dialogueBox,characterBox);

var seventynine = new DialogueScene("resources/AmphriteSpeak.jpg","It's true that we do help survivors of any incident of Alestria's causing, but that's just duty that compells us.","Amphrite",dialogueBox,characterBox);

var eighty = new DialogueScene("resources/AmphriteWink.jpg","Or rather, upon Altair's insisistence.","Amphrite",dialogueBox,characterBox);

var eightyone = new DialogueScene("resources/AltairGesture.jpg","I didn't say anything.","Altair",dialogueBox,characterBox);

var eightytwo = new DialogueScene("resources/AmphriteWink.jpg","Yeah, right.","Amphrite",dialogueBox,characterBox);

var eightythree = new DialogueScene("resources/AmphriteSpeak.jpg","But see, our real goal all along has been revenge.","Amphrite",dialogueBox,characterBox);

var eightyfour = new DialogueScene("resources/AmphriteSpeak.jpg","We'd like to get back at Alestria for everything they've done to us and all our families, and I suppose you must be the same.","Amphrite",dialogueBox,characterBox);

var eightyfive = new DialogueScene("resources/AmphriteWink.jpg","So we want to destroy them. We have been gathering an army for many years all for this, although a portion of our forces have been killed in the fire, admittedly, which is why I suppose Caelus was mad at you.","Amphrite",dialogueBox,characterBox);

var eightysix = new DialogueScene("resources/CaelusSad.jpg","I'm not mad! Just stating the facts.","Caelus",dialogueBox,characterBox);

var eightyseven = new DialogueScene("resources/AltairGesture.jpg","We've worked together for a long time, so we can tell, you know.","Altair",dialogueBox,characterBox);

var eightyeight = new DialogueScene("resources/AmphriteSpeak.jpg","Yup, definitely.","Amphrite",dialogueBox,characterBox);

var eightynine = new DialogueScene("resources/AmphriteWink.jpg","I any case, with my brilliant mind, I managed for formulate a strategy for us, with battle plans and all. So we'll be splitting into three factions, me, Caelus, and Altair a member of the three different factions each.","Amphrite",dialogueBox,characterBox);

var ninety = new DialogueScene("resources/AmphriteSpeak.jpg","You'll be working with us soon enough, and I'd like to welcome you on board, but I trust that you don't have any battle skills?","Amphrite",dialogueBox,characterBox);

var ninetyone = new DialogueScene("resources/AltairNeutral.jpg","...You don't have any either.","Altair",dialogueBox,characterBox);

var ninetytwo = new DialogueScene("resources/AmphriteWink.jpg","I don't need to fight, I'm a tactician~","Amphrite",dialogueBox,characterBox);

var ninetythree = new DialogueScene("resources/AltairNeutral.jpg","You'll be training in our main branch that we'll take you to, then they'll decide who's team you're most fit to join.","Altair",dialogueBox,characterBox);

var ninetyfour = new DialogueScene("resources/AltairGesture.jpg","...It'll take around two years.","Altair",dialogueBox,characterBox);

var ninetyfive = new DialogueScene("resources/AmphriteWink.jpg","Yup, we look forwards to working with you soon!","Amphrite",dialogueBox,characterBox);

var ninetysix = new DialogueScene("resources/CaelusSmile.jpg","Well then, we'd better get going. Time waits for no one.","Caelus",dialogueBox,characterBox);

var ninetyseven = new DialogueScene("resources/CutsceneBlack.jpg","(You arrive at the main branch, Amphrite, Caelus, and Altair wave goodbye. You're on your own now, but somehow you feel hope rising in your chest.)","()",dialogueBox,characterBox);

//you have committed a programming equivalent of a war crime --Stephanie
var ninetyeight = new DialogueScene("resources/CutsceneBlack.jpg","(Alestria will pay, I will make sure of that.)","You",dialogueBox,characterBox);

//you have committed a programming equivalent of a war crime --Stephanie
var ninetynine = new ChoiceScene("resources/CutsceneBlack.jpg","(I might wanna think of which faction I wanna join, too. Should I become a tactician with Amphrite, a fighter with Altair, or a scout with Caelus? I'll do my best to get into the one that benefits my mission most. In order to do that I'll...)","You",dialogueBox,characterBox, "Study Alestria and Their Weaknesses", "Train hard", "Familiarize Myself With More People", uno, dos, tres);

//you have committed a programming equivalent of a war crime --Stephanie
var hundred = new ChoiceScene("resources/CutsceneBlack.jpg","(I think...)","You",dialogueBox,characterBox, "Strategies Are the Most Important", "I Need to Grow Stronger", "I Need to Gain Advantages Over the Situation", uno, dos, tres);

//you have committed a programming equivalent of a war crime --Stephanie
var hundredoone = new ChoiceScene("resources/CutsceneBlack.jpg","(I hope that everything ends well.)","You",dialogueBox,characterBox, "I Hope We Can Win", "I Hope Alestria Burns", "I Hope That I Don't Die", uno, dos, tres);

//you have committed a programming equivalent of a war crime --Stephanie
var hundredotwo = new DialogueScene("resources/CutsceneBlack.jpg","(Time passes quickly, and before you know it, it's been two years. The branch has grown and you are sorted into a faction.)","()",dialogueBox,characterBox);

class BranchingDialougeScene extends DialogueScene{
    constructor(img, text, character, dialogueBox, characterBox, onBranch){
        super(img, text, character, dialogueBox, characterBox);
        this.onBranch = onBranch;
    }
    onSet(screen){
        super.onSet(screen);
        this.onBranch();
    }
}


//you have committed a programming equivalent of a war crime --Stephanie
var hundredothree = new BranchingDialougeScene("resources/CutsceneBlack.jpg","(Today you rendevous with a member of the faction you haven't seen in a long time.)","()",dialogueBox,characterBox,()=>{
    var goodone = (MGender > 1)?
    new DialogueScene("resources/AmphriteSpeak.jpg","Ah, welcome, long time no see, Ash!","Amphrite",dialogueBox,characterBox):
    new DialogueScene("resources/AmphriteSpeak.jpg","Ah, welcome, long time no see, Asha!","Amphrite",dialogueBox,characterBox);

    var goodtwo = new DialogueScene("resources/AmphriteSmile.jpg","How have you been? Glad to see you're in my faction.","Amphrite",dialogueBox,characterBox);

    var goodthree = new DialogueScene("resources/AmphriteSpeak.jpg","Now as much as I would like to continue with the pleasantries, I'll tell you about the faction first, and what we intend to take care of.","Amphrite",dialogueBox,characterBox);

    var goodfour = new DialogueScene("resources/AmphriteSpeak.jpg","I guess you could say we're the tacticians of Operation Alestria. We don't exactly participate in the action and fighting as much as we do the planning.","Amphrite",dialogueBox,characterBox);

    var goodfive = new DialogueScene("resources/AmphriteSpeak.jpg","For safety reasons, we don't exactly tell the other factions either. We are only in charge of giving the command on the day of the mission, the rest is up to them.","Amphrite",dialogueBox,characterBox);

    var goodsix = new DialogueScene("resources/AmphriteWink.jpg","Feels pretty good staying out of the action, doesn't it? Ah but don't mistake us for being useless.","Amphrite",dialogueBox,characterBox);

    var goodseven = new DialogueScene("resources/AmphriteSpeak.jpg","The entire plan for the mission rests on us, you know, based off the scouts' information.","Amphrite",dialogueBox,characterBox);

    var goodeight = new DialogueScene("resources/AmphriteWink.jpg","With that said, here's a warm welcome, and I'll introduce you!","Amphrite",dialogueBox,characterBox);

    var goodnine = new DialogueScene("resources/CutsceneBlack.jpg","(A year passes and you grow in experience. You work closely with members of the faction, but especially Amphrite. As months pass, you even enter a relationship.)","()",dialogueBox,characterBox);

    var goodten = new DialogueScene("resources/CutsceneBlack.jpg","(And soon, the fated day arrives.)","()",dialogueBox,characterBox);

    var goodeleven = new DialogueScene("resources/AmphriteSpeak.jpg","As the votes stand, we have a more favored strategy. Whatever happens, remember to remain vigilant, everyone, and good luck.","Amphrite",dialogueBox,characterBox);

    var goodtwelve = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(The meeting dissembles as the final plan is decided, and you swarm in to see the results.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(The meeting dissembles as the final plan is decided, and you swarm in to see the results.)","()",dialogueBox,characterBox);

    var goodthirteen = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Who knows if it'll work? You can only hope for the best. But as the culmination of everything you'd worked for arrives, you grip the pin close.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Who knows if it'll work? You can only hope for the best. But as the culmination of everything you'd worked for arrives, you grip the amulet close.)","()",dialogueBox,characterBox);

    var goodfourteen = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(You were a key part of the plan and the rose you wave will be both the distraction for Alestria and the cue for everything else to happen.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(You were a key part of the plan and the rose you wave will be both the distraction for Alestria and the cue for everything else to happen.)","()",dialogueBox,characterBox);

    var goodfifteen = (MGender > 1)?
    new DialogueScene("resources/MaleMCGrin.jpg","(I won't fail!)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCGrin.jpg","(I won't fail!)","You",dialogueBox,characterBox);

    var goodsixteen = new DialogueScene("resources/CutsceneBlack.jpg","(You had one shot, one first and final chance.)","()",dialogueBox,characterBox);
    
    var goodseventeen = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(As the sun sets, you hold the rose in your hand, walking through the dark streets bordering Alestria.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(As the sun sets, you hold the rose in your hand, walking through the dark streets bordering Alestria.)","You",dialogueBox,characterBox);
    
    var goodeighteen = new DialogueScene("resources/CutsceneEnd.jpg","(The rose glows brillianty, and as you hear the alert, you know you have their attention.)","()",dialogueBox,characterBox);
    
    var goodnineteen = (MGender > 1)?
    new DialogueScene("resources/MaleMCGrin.jpg","(Catch me if you can, Alestria, let's play.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCGrin.jpg","(Catch me if you can, Alestria, let's play.)","You",dialogueBox,characterBox);

    var goodtwenty = new DialogueScene("resources/CutsceneBlack.jpg","(As the night darkens, you run, out of sight to your designated hiding space as you wait. Until the sky bursts into an explosion of flames. You hear screams in the distance, but they are part of the beautiful symphony of death you have conducted.)","()",dialogueBox,characterBox);

    var goodtwentyone = new DialogueScene("resources/CutsceneReflection.jpg","(Firelight flickers in your eyes, and you see the same spark in your fellow companions, the great swath of flames spreading over the landscape, Alestria burning as your home once did. You'd done it, finally, have never felt more alive, as the great burden is lifted off your shoulders. You know that Amphrite will be here soon, as will Altair and Caelus. You smile to yourself.)","()",dialogueBox,characterBox);

    var goodtwentytwo = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(...A rose?)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(...A rose?)","You",dialogueBox,characterBox);

    var goodtwentythree = new DialogueScene("resources/CutsceneBlack.jpg","(A single white rose lies on the side of the street. Pale, beautiful. You throw it into the fires of which Alestria burns. The purest of white, it folds and sizzles in the heat as it withers into smoke. The dead will be offered no redemption.)","()",dialogueBox,characterBox);

    var goodtwentyfour = new DialogueScene("resources/CutsceneBlack.jpg","(As fire rises, you whisper into the fumes.)","()",dialogueBox,characterBox);

    var goodtwentyfive = (MGender > 1)?
    new DialogueScene("resources/MaleMCGrin.jpg","Ashes to ashes, dust to dust. May evil fall to oblivion, and the guilty never find rest.","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCGrin.jpg","Ashes to ashes, dust to dust. May evil fall to oblivion, and the guilty never find rest.","You",dialogueBox,characterBox);

    var goodtwentysix = new DialogueScene("resources/CutsceneBlack.jpg","End","...",dialogueBox,characterBox);

    var goodtwentyseven = new DialogueScene("resources/CutsceneBlack.jpg","Good Ending","...",dialogueBox,characterBox);

    var goodtwentyeight = new DialogueScene("resources/Test.png","(Yes I had to)","...",dialogueBox,characterBox);


    var neutralone = new DialogueScene("resources/AltairBlush.jpg","..!","Altair",dialogueBox,characterBox);

    var neutraltwo = new DialogueScene("resources/AltairBlush.jpg","It's you.","Altair",dialogueBox,characterBox);

    var neutralthree = new DialogueScene("resources/AltairGesture.jpg","Glad to see you're in my faction.","Altair",dialogueBox,characterBox);

    var neutralfour = new DialogueScene("resources/AltairNeutral.jpg","...We're a faction that specializes in fighting, we carry out the tactician faction's plans.","Altair",dialogueBox,characterBox);

    var neutralfive = new DialogueScene("resources/AltairNeutral.jpg","Those plans are usually private, but since you're not occupying Amphrite today, she'll explain the plans to Caelus, since the scouting faction is taking a break today as well.","Altair",dialogueBox,characterBox);

    var neutralsix = new DialogueScene("resources/AltairGesture.jpg","Who knows why he wants to know so early.","Altair",dialogueBox,characterBox);

    var neutralseven = new DialogueScene("resources/AltairNeutral.jpg","But we should get going, I'll give you a low-down of the secret sword styles we use later.","Altair",dialogueBox,characterBox);

    var neutraleight = new DialogueScene("resources/AltairNeutral.jpg","I really don't do this often...But only 'cause it's you.","Altair",dialogueBox,characterBox);

    var neutralnine = new DialogueScene("resources/AltairBlush.jpg","..!","Altair",dialogueBox,characterBox);

    var neutralten = new DialogueScene("resources/AltairGesture.jpg","As in I admire your fighting abilities, that's all I mean!","Altair",dialogueBox,characterBox);

    var neutraleleven = (MGender > 1)?
    new DialogueScene("resources/MaleMCGrin.jpg","(Yeah, sure.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCGrin.jpg","(Yeah, sure.)","You",dialogueBox,characterBox);

    var neutraltwelve = new DialogueScene("resources/CutsceneBlack.jpg","(Roughly a year passes, in which you continue to train ever so diligently. Altair often comes to visit you, and you ask him for suggestions after the coach of the fighting has trained you.)","()",dialogueBox,characterBox);

    var neutralthirteen = new DialogueScene("resources/CutsceneBlack.jpg","(He's a surprisingly good fighter and teacher, even though all he does is give suggestions when you ask him to. Sort of a tutor, probably.)","()",dialogueBox,characterBox);

    var neutralfourteen = new DialogueScene("resources/CutsceneBlack.jpg","(But soon enough, although you don't exactly know how you got here, you enter into a relationship with him.)","()",dialogueBox,characterBox);

    var neutralfifteen = new DialogueScene("resources/CutsceneBlack.jpg","(It's awkward at first, but soon you grow closer.)","()",dialogueBox,characterBox);

    var neutralsixteen = new DialogueScene("resources/CutsceneBlack.jpg","(Soon, the fated day is close, and you doze lightly in your tent. Altair and Amphrite sit beside you, chatting, while Caelus is nowhere to be seen.)","()",dialogueBox,characterBox);

    var neutralseventeen = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(It feels nice, but strangely I feel like something is missing.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(It feels nice, but strangely I feel like something is missing.)","You",dialogueBox,characterBox);

    var neutraleighteen = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(As you get up, a sudden movement catches your eye, too fast for you to even react.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(As you get up, a sudden movement catches your eye, too fast for you to even react.)","()",dialogueBox,characterBox);

    var neutralnineteen = new DialogueScene("resources/CutsceneBlack.jpg","(Amphrite falls at your feet, her eyes glassy as the life fades from them. You scream.)","()",dialogueBox,characterBox);

    var neutraltwenty = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(A blade stabs for you, too, from behind the tent, the wielder obscured through the fabric. Too late, you have no time to dodge.","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(A blade stabs for you, too, from behind the tent, the wielder obscured through the fabric. Too late, you have no time to dodge.)","()",dialogueBox,characterBox);

    var neutraltwentyone = new DialogueScene("resources/CutsceneBlack.jpg","(Yet you feel no pain.)","()",dialogueBox,characterBox);
    
    var neutraltwentytwo = new DialogueScene("resources/AltairNeutral.jpg","(You turn to see Altair, bleeding as he'd thrown himself behind you, wresting away the sword and saving your life.)","()",dialogueBox,characterBox);
   
    var neutraltwentythree = new DialogueScene("resources/AltairGesture.jpg","...Go!","Altair",dialogueBox,characterBox);

    var neutraltwentyfour = new DialogueScene("resources/CutsceneBlack.jpg","(Badly wounded, he pulls out the with bloody hands, and rushes at nearby enemies who'd begun to swarm in.)","()",dialogueBox,characterBox);

    var neutraltwentyfive = new DialogueScene("resources/CutsceneBlack.jpg","(Your mind stays on Amphrite, and all that she used to be, and feel a rage boiling inside of you. It's too late, you won't hold back anymore.)","()",dialogueBox,characterBox);

    var neutraltwentysixr = new DialogueScene("resources/CutsceneBlack.jpg","(It then occured to you that there was only one way that attack would've happened -- If Caelus had spilled the plans to Alestria, if he'd been in cahoots with them from the very beginning.)","()",dialogueBox,characterBox);
   
    var neutraltwentyseven = new DialogueScene("resources/CutsceneBlack.jpg","(And the blade that Altair now held was unmistakably Caelus's.)","()",dialogueBox,characterBox);

    var neutraltwentyeight = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox);

    var neutraltwentynine = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox);

    var neutralthirty = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Tears threatened to escape your eyes, but you hold them back, you empty your mind and let one thought take over. You'd trained this long, and could hold your own against as many people as you wanted.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Tears threatened to escape your eyes, but you hold them back, you empty your mind and let one thought take over. You’d trained this long, and could hold your own against as many people as you wanted.)","()",dialogueBox,characterBox);
    
    var neutralthirtyone = new DialogueScene("resources/CutsceneBlack.jpg","(You attack, your blade the only salvation within an endless torrent of death.)","You",dialogueBox,characterBox);
    
    var neutralthirtytwo = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Don't stop, keep going, don't stop.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Don't stop, keep going, don't stop.)","You",dialogueBox,characterBox);

    var neutralthirtythree = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Don't stop, keep going, don't you dare stop.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Don't stop, keep going, don't you dare stop.)","You",dialogueBox,characterBox);

    var neutralthirtyfour = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Don't stop, keep going, don't stop!)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Don't stop, keep going, don't stop!)","You",dialogueBox,characterBox);
    
    var neutralthirtyfive = new DialogueScene("resources/CutsceneBlack.jpg","(The world spun, whirring as you feel your instincts take over before stillness reigns, and the town is empty, save for you. You did it, you'd killed them all. Even Caelus.)","()",dialogueBox,characterBox);

    var neutralthirtysix = new DialogueScene("resources/CutsceneBlack.jpg","(You stand atop a mountain of corpses, some of your friends, but more that you’ve slain, your blade stained with their blood. Yet as you walk off, you feel nothing, nothing at all as emptiness takes form in your heart.)","()",dialogueBox,characterBox);

    var neutralthirtyseven = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","...","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","...","You",dialogueBox,characterBox);
    
    var neutralthirtyeight = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(You’ve come this far, just to lose everything again.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(You’ve come this far, just to lose everything again.)","()",dialogueBox,characterBox);
    
    var neutralthirtynine = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(A faraway cry sounds, the sobbing of a child, but you pay it no heed.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(A faraway cry sounds, the sobbing of a child, but you pay it no heed.)","()",dialogueBox,characterBox);
    
    var neutralfourty = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Ashes to Ashes, your soul to fire. Your heart was long dead since the day of the flames, buried beneath the rubble of your home, and the people you failed to save.)","()",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Ashes to Ashes, your soul to fire. Your heart was long dead since the day of the flames, buried beneath the rubble of your home, and the people you failed to save.)","()",dialogueBox,characterBox);

    var neutralfourtyone = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(Traitor, you traitor!)","You",dialogueBox,characterBox);

    var neutralfourtytwo = new DialogueScene("resources/CutsceneBlack.jpg","(But as you turn to leave, a voice stops you, and you turn.)","()",dialogueBox,characterBox);

    var neutralfourthree = new DialogueScene("resources/CutsceneBlack.jpg","(You could recognize that voice anywhere.)","()",dialogueBox,characterBox)
    
    var neutralfourtyfour = (MGender > 1)?
    new DialogueScene("resources/MaleMCSpeak.jpg","Altair?","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCSpeak.jpg","Altair?","You",dialogueBox,characterBox);

    var neutralfourtyfive = new DialogueScene("resources/CutsceneBlack.jpg","(Was he still alive? You didn't know, but you pick apart the tents, wishing, hoping that he was.)","()",dialogueBox,characterBox);

    var neutralfourtysix = new DialogueScene("resources/CutsceneBlack.jpg","(Finally you see him, and go to his side. You find a pulse and stop his bleeding. The wound is deep, but as his breathing eases out you know he'll live.)","()",dialogueBox,characterBox);
    
    var neutralfourtyseven = new DialogueScene("resources/CutsceneBlack.jpg","(Sigining in relief, you stay beside him, the only remnant left of the world that you still care about.)","()",dialogueBox,characterBox);
    
    var neutralfourtyeight = new DialogueScene("resources/CutsceneBlack.jpg","(At least you'll make it another day, alive, in this bloodstained world where you managed to take down all your enemies, but at what cost?)","()",dialogueBox,characterBox);

    var neutralfourtynine = new DialogueScene("resources/CutsceneEnd.jpg","(All that's left unstained was the single triangular rose you wore, still radiant in its purity, even after everything.)","()",dialogueBox,characterBox);

    var neutralfifty = new DialogueScene("resources/CutsceneBlack.jpg","End","...",dialogueBox,characterBox);

    var neutralfiftyone = new DialogueScene("resources/CutsceneBlack.jpg","Neutral Ending","...",dialogueBox,characterBox);

    var neutralfiftytwo = new DialogueScene("resources/Test.png","(Yes I had to)","...",dialogueBox,characterBox);

    var badone = new DialogueScene("resources/CaelusSmile.jpg","Oh wow, isn't great to see you here.","Caelus",dialogueBox,characterBox);

    var badtwo = new DialogueScene("resources/CaelusGrin.jpg","We haven't talked in a long while.","Caelus",dialogueBox,characterBox);

    var badthree = new DialogueScene("resources/CaelusSmile.jpg","Still remember me?","Caelus",dialogueBox,characterBox);

    var badfour = new DialogueScene("resources/CaelusSmile.jpg","A-haha I was kidding~ Welcome to the scouting faction! Where we relay news and intel to the tacticians and fighters so tehy can carry out with the plan better.","Caelus",dialogueBox,characterBox);

    var badfive = new DialogueScene("resources/CaelusSmile.jpg","Of course we'll also have a part in the fighting if you wanted to exact revenge with your own hands, except we mainly do long range combat and short range only when neccesary.","Caelus",dialogueBox,characterBox);

    var badsix = new DialogueScene("resources/CaelusGrin.jpg","We still have to train though, so don't even think about slacking off.","Caelus",dialogueBox,characterBox);

    var badseven = new DialogueScene("resources/CaelusSmile.jpg","With all that said, I'll go get some intel on the battle plans from Amphrite.","Caelus",dialogueBox,characterBox);

    var badeight = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(I can't help feeling a bit suspicious, didn't the branch always teach us that the tacticians but never reveal information to anyone else?)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(I can't help feeling a bit suspicious, didn't the branch always teach us that the tacticians but never reveal information to anyone else?)","You",dialogueBox,characterBox);

    var badnine = new DialogueScene("resources/CaelusGrin.jpg","Well then, you go on to the faction, and I'll help out later!.","Caelus",dialogueBox,characterBox);

    var badten = new DialogueScene("resources/CutsceneBlack.jpg","(Around a year passes, and the time of battle approaches. Nervous, you stand on the balcony to get some air.)","()",dialogueBox,characterBox);

    var badeleven = (MGender > 1)?
    new DialogueScene("resources/MaleMCNeutral.jpg","(It's strangely quiet.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCNeutral.jpg","(It's strangely quiet.)","You",dialogueBox,characterBox);

    var badtwelve = (MGender > 1)?
    new DialogueScene("resources/MaleMCGrin.jpg","(But I suppose that means everyone else is busy with preparations, that's a good thing. I sure hope we win this.)","You",dialogueBox,characterBox):
    new DialogueScene("resources/FemaleMCGrin.jpg","(But I suppose that means everyone else is busy with preparations, that's a good thing. I sure hope we win this.","You",dialogueBox,characterBox);

    var badthirteen = new DialogueScene("resources/CutsceneBlack.jpg","(Footsteps enter behind you, but you have no time to turn around before a flash of pain threatens to make the world go black.)","()",dialogueBox,characterBox);

    var badfourteen = new DialogueScene("resources/CutsceneBlack.jpg","...!!","You",dialogueBox,characterBox);

    var badfifteen = new DialogueScene("resources/CutsceneBlack.jpg","(It hurts...I can't...)","You",dialogueBox,characterBox);

    var badsixteen = new DialogueScene("resources/CutsceneBlack.jpg","(The sword plunges deeper into your back, and you choke on the warmth of your own blood. You can't talk, you can't breathe--)","()",dialogueBox,characterBox);

    var badseventeen = (MGender > 1)?
    new DialogueScene("resources/CaelusSad.jpg","I'm sorry, Ash.","Caelus",dialogueBox,characterBox):
    new DialogueScene("resources/CaelusSad.jpg","I'm sorry, Asha.","You",dialogueBox,characterBox);

    var badeighteen = new DialogueScene("resources/CutsceneBlack.jpg","(You'd trusted him, of course you did.)","()",dialogueBox,characterBox);

    var badnineteen = new DialogueScene("resources/CutsceneBlack.jpg","(Caelus, you traitor, you traitor!)","You",dialogueBox,characterBox);

    var badtwenty = new DialogueScene("resources/CaelusSad.jpg","I really hoped it would't turn out this way, and it's not exactly easy to feel proud about fooling you guys for so long.","Caelus",dialogueBox,characterBox);

    var badtwentyone = new DialogueScene("resources/CaelusSmile.jpg","But I suppose sacrifices do have to be made. All hail Alestria.","Caelus",dialogueBox,characterBox);

    var badtwentytwo = (MGender > 1)?
    new DialogueScene("resources/CaelusGrin.jpg","Ashes to ashes, dust to dust. Farewell, Ash, and may you rest forevermore.","Caelus",dialogueBox,characterBox):
    new DialogueScene("resources/CaelusGrin.jpg","Ashes to ashes, dust to dust. Goodbye, Asha, and may you rest forevermore.","Caelus",dialogueBox,characterBox);

    var badtwentythree = new DialogueScene("resources/CutsceneBlack.jpg","(The plan was over, you'd all failed.)","()",dialogueBox,characterBox);
   
    var badtwentyfour = new DialogueScene("resources/CutsceneBlack.jpg","(No words come out as you gasp, light fading from your eyes as the world swirls into cold.)","()",dialogueBox,characterBox);

    var badtwentyfive = new DialogueScene("resources/CutsceneEnd.jpg","(Cold, it was so cold...)","()",dialogueBox,characterBox);

    var badtwentysix = new DialogueScene("resources/CutsceneBlack.jpg","End","...",dialogueBox,characterBox);

    var badtwentyseven = new DialogueScene("resources/CutsceneBlack.jpg","Bad Ending","...",dialogueBox,characterBox);

    var badtwentyeight = new DialogueScene("resources/Test.png","(Yes I had to)","...",dialogueBox,characterBox);

var highest = [];
    var endings = [GoodEnding,NeutralEnding,BadEnding];
    var highestValue = 0;
    for (let i = 0; i < endings.length; i++) {
        const count = endings[i];
        if(count>highestValue){
            highest = [i];
            highestValue = count;
        }else if(count == highestValue){
            highest = highest.concat(i);
        }
    }

    var branches = [
        [
            goodone,
            goodtwo,
            goodthree,
            goodfour,
            goodfive,
            goodsix,
            goodseven,
            goodeight,
            goodnine,
            goodten,
            goodeleven,
            goodtwelve,
            goodthirteen,
            goodfourteen,
            goodfifteen,
            goodsixteen,
            goodseventeen,
            goodeighteen,
            goodnineteen,
            goodtwenty,
            goodtwentyone,
            goodtwentytwo,
            goodtwentythree,
            goodtwentyfour,
            goodtwentyfive,
            goodtwentysix,
            goodtwentyseven,
            goodtwentyeight
        ],
        [
            neutralone,
            neutraltwo,
            neutralthree,
            neutralfour,
            neutralfive,
            neutralsix,
            neutralseven,
            neutraleight,
            neutralnine,
            neutralten,
            neutraleleven,
            neutraltwelve,
            neutralthirteen,
            neutralfourteen,
            neutralfifteen,
            neutralsixteen,
            neutralseventeen,
            neutraleighteen,
            neutralnineteen,
            neutraltwenty,
            neutraltwentyone,
            neutraltwentytwo,
            neutraltwentythree,
            neutraltwentyfour,
            neutraltwentyfive,
            neutraltwentysixr,
            neutraltwentyseven,
            neutraltwentyeight,
            neutraltwentynine,
            neutralthirty,
            neutralthirtyone,
            neutralthirtytwo,
            neutralthirtythree,
            neutralthirtyfour,
            neutralthirtyfive,
            neutralthirtysix,
            neutralthirtyseven,
            neutralthirtyeight,
            neutralthirtynine,
            neutralfourty,
            neutralfourtyone,
            neutralfourtytwo,
            neutralfourthree,
            neutralfourtyfour,
            neutralfourtyfive,
            neutralfourtysix,
            neutralfourtyseven,
            neutralfourtyeight,
            neutralfourtynine,
            neutralfifty,
            neutralfiftyone,
            neutralfiftytwo
            //SO MANY SCENES WHATTT
        ],
        [
            badone,
            badtwo,
            badthree,
            badfour,
            badfive,
            badsix,
            badseven,
            badeight,
            badnine,
            badten,
            badeleven,
            badtwelve,
            badthirteen,
            badfourteen,
            badfifteen,
            badsixteen,
            badseventeen,
            badeighteen,
            badnineteen,
            badtwenty,
            badtwentyone,
            badtwentytwo,
            badtwentythree,
            badtwentyfour,
            badtwentyfive,
            badtwentysix,
            badtwentyseven,
            badtwentyeight
        ]
    ];

    var index = Math.floor(Math.random()*highest.length);
    var ending = highest[index];
    scenes = scenes.concat(branches[ending]);
});
// var a;

// if(){
//     a = smth;
// }else if(){
//     a = new DialogueScene("resources/ImgPlaceholder.png","i am not okay","Sasuke",dialogueBox,characterBox)
// }else{
//     a = aaaaa;
// }

var scenes = [
    secondScene,
    thirdScene,
    fourthScene,
    fifthScene,
    sixthScene,
    seventhScene,
    eighthScene,
    ninthScene,
    tenthScene,
    eleventhScene,
    twelfthScene,
    thirteenthScene,
    fourteenthScene,
    fifteen,
    sixteen,
    seventeen,
    eighteen,
    nineteen,
    twenty,
    twentyone,
    twentytwo,
    twentythree,
    twentyfour,
    twentyfive,
    twentysix,
    twentyseven,
    twentyeight,
    twentynine,
    thirty,
    thirtyone,
    thirtytwo,
    thirtythree,
    thirtyfour,
    thirtyfive,
    thirtysix,
    thirtyseven,
    thirtyeight,
    thirtynine,
    fourtyone,
    fourtytwo,
    fourtythree,
    fourtyfour,
    fourtyfive,
    fourtysix,
    fourtyseven,
    fourtyeight,
    fourtynine,
    fifty,
    fiftyone,
    fiftytwo,
    fiftythree,
    fiftyfour,
    fiftyfive,
    fiftysix,
    fiftyseven,
    fiftyeight,
    fiftynine,
    sixty,
    sixtyone,
    sixtytwo,
    sixtythree,
    sixtyfour,
    sixtyfive,
    sixtysix,
    sixtyseven,
    sixtyeight,
    sixtynine,
    seventy,
    seventyone,
    seventytwo,
    seventythree,
    seventyfour,
    seventyfive,
    seventysix,
    seventyseven,
    seventyeight,
    seventynine,
    eighty,
    eightyone,
    eightytwo,
    eightythree,
    eightyfour,
    eightyfive,
    eightysix,
    eightyseven,
    eightyeight,
    eightynine,
    ninety,
    ninetyone,
    ninetytwo,
    ninetythree,
    ninetyfour,
    ninetyfive,
    ninetysix,
    ninetyseven,
    ninetyeight,
    ninetynine,
    hundred,
    hundredoone,
    hundredotwo,// WHY THE F**K DID YOU DO THIS --Stephanie
    hundredothree
]

