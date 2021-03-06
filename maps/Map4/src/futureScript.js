/// <reference types ="@workadventure/iframe-api-typings" />
/// <reference types ="@workadventure/scripting-api-extra" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra"
const defaultAssetsUrl = "http://unpkg.com/@workadventure/scripting-api-extra@1.3.2/dist";

console.log('Script started successfully');

// let currentPopup = undefined;

// var id = 1
var hint1 = 'Check out the house. I wonder who left their things all over the place.'
var hint2 = 'The time machine is disguised as the locker. The numerical code is 6 digits long.'
var hint3 = 'Go to the time machine. Enter 123456.'
var directions = 'In order to leave this time period, you must find the time machine. Keep in mind, the last time the time machin disapeared it became disguised.'
var introduction = 'All you see is a flash of light before you awake in a strange deserted area. The time machine malfunctioned and did not send you back to the present. '
// var robotIntro = 'Hello, bla bla bla. I do all these things.'
var robotCom = 'Hi, if you need a hint just send a chat containing the word hint. Or if you would like me to resend the directions send a chat containing the word directions.'

// Waiting for the API to be ready
WA.onInit().then(() => {
    var hintLevel = 1;

    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // WA.room.onEnterLayer('tableZone').subscribe(() => {;
    //     const today = new Date();
    //     today.setFullYear(1764);
    //     currentPopup = WA.ui.openPopup("tablePopup","test",[{
    //         label: "Close",
    //         className: "primary",
    //         callback: (popup) => {
    //             popup.close()
    //         }
    //     }]);
    // })

    WA.room.onEnterLayer('yearZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("yearPopup","The year is 12454.",[{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                popup.close()
            }
        }])
    })

    // WA.room.onEnterLayer('benchZone').subscribe(() => {
    //     currentPopup = WA.ui.openPopup("benchPopup","test",[{
    //         label: "Close",
    //         className: "primary",
    //         callback: (popup) => {
    //             popup.close()
    //         }
    //     }])
    // })

    // WA.room.onEnterLayer('boxZone').subscribe(() => {
    //     currentPopup = WA.ui.openPopup("boxPopup","test",[{
    //         label: "Close",
    //         className: "primary",
    //         callback: (popup) => {
    //             popup.close()
    //         }
    //     }])
    // })

    // WA.room.onEnterLayer('timeMachineZone').subscribe(() => {
    //         currentPopup = WA.ui.openPopup("timeMachinePopup","",[{
    //             label: "test",
    //             className: "disabled",
    //             callback: () => {
    //                 // popup.close()
    //             }
    //         }]);
    // })

    WA.room.onLeaveLayer('yearZone').subscribe(closePopUp);
    // WA.room.onLeaveLayer('deskZone').subscribe(closePopUp);
    // WA.room.onLeaveLayer('benchZone').subscribe(closePopUp);
    // WA.room.onLeaveLayer('boxZone').subscribe(closePopUp);
    // WA.room.onLeaveLayer('timeMachineZone').subscribe(closePopUp);

    // WA.chat.sendChatMessage(robotIntro, 'Mr. Robot')
    // console.log('User introduced to Mr. Robot.')
    WA.chat.sendChatMessage(introduction, 'Mr.Robot')
    console.log('Riddle introduced to user.')
    WA.chat.sendChatMessage(directions, 'Mr.Robot')
    console.log('Directions sent to user.')
    WA.chat.sendChatMessage("If you need any help let me know.", 'Mr.Robot');
    console.log('Asked user what help they need.');
    WA.chat.onChatMessage((message => {
        console.log('User sent :', message);
        var testmessage = message.toLowerCase()
        switch(true) {

            case testmessage.includes('thank you'):
                WA.chat.sendChatMessage("You're welcome!", "Mr.Robot")
                break

            case testmessage.includes('help'):
                WA.chat.sendChatMessage('How can I help you?', 'Mr.Robot')
                break

            case testmessage.includes('instructions') || testmessage.includes('directions'):
                WA.chat.sendChatMessage(directions, 'Mr.Robot')
                break

            case testmessage.includes('reprint'):
                WA.chat.sendChatMessage(hint1, 'Mr.Robot');
                WA.chat.sendChatMessage(hint2, 'Mr.Robot');
                WA.chat.sendChatMessage(hint3, 'Mr.Robot');
                console.log('All hints reprinted.')
                break

            case testmessage.includes("no") && testmessage.includes('help'):
                console.log('User said they do not need help. Wait for next message.');
                WA.chat.sendChatMessage('Okay, I am here if you need me!', 'Mr.Robot')
                break

            case testmessage.includes("code"):
                console.log('User would like to enter code.');
                WA.chat.sendChatMessage('Ok, you may enter your code now.', 'Mr.Robot');
                console.log('Prompted user for code.');
                break;

            case testmessage.includes("hint"):
                console.log('User asked for a hint.');
                if (hintLevel == 1){
                    WA.chat.sendChatMessage('Here is your first hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint1, 'Mr Robot');
                    console.log('First hint given to user.');
                }

                else if (hintLevel == 2){
                    WA.chat.sendChatMessage('Here is your second hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint2, 'Mr Robot');
                    console.log('Second hint given to user.');
                }
                
                else if (hintLevel == 3){
                    WA.chat.sendChatMessage('Here is your third hint:', 'Mr.Robot');
                    WA.chat.sendChatMessage(hint3, 'Mr Robot');
                    console.log('Third hint given to user.')
                }

                else{
                    WA.chat.sendChatMessage('You are out of hints. If you would like to see them all again, type reprint.', 'Mr.Robot');
                    console.log('User has used all hints. Asked about re-printing them.')
                }

                hintLevel ++ 
                break;
 
            default: 
            if (isNaN(parseInt(message))){
                console.log('User did not enter a code')
            }
            else{
                console.log('User entered a code.')
                if (parseInt(message) == 1764){
                    console.log('Code is entered and correct.')
                    WA.chat.sendChatMessage('You answered the correct code. You may now enter.', 'Mr.Robot')
                    console.log('Tell user code is correct');
                    break
                    }
                else{
                    console.log('Code is entered but incorrect.')
                    WA.chat.sendChatMessage('You answered the incorrect code.', 'Mr.Robot')
                    console.log('Tell user the code is incorrect.');
                }
            }
            WA.chat.sendChatMessage(robotCom, 'Mr. Robot')
            break
        }
    }))


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');}).then(() => {
    }).catch(e => console.error(e));
    initDoors(defaultAssetsUrl)
    
}).catch(e => console.error(e));
   



function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};