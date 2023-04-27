var FCM = require('fcm-node');
var serverKey = process.env.FCM_SERVER_KEY
var fcm = new FCM(serverKey);

exports.Send = async (req, res) => {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'cw994h2XyeBmmIUszHWGX8:APA91bH6Xygoo0QJKJf1pJfc8Hf5zoRRw2oFYSXoOXLvPXzS2Pcmc4ew6YUtRzPNaS_bQMmHG28P1WhMWRQ68E2-hBXJObl8cJqaK_E-lmGMj4zetyDDbpKWEgWwN-ULJpCAeZFBHpcO', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully sent with response: ", response);
            res.send(response);
        }
    });
}