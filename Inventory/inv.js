const CLIENT_ID = localStorage.getItem("clientID");  // 個人識別する番号（ニックネーム登録時に割り振られる）
const FILE_N = localStorage.getItem("fileN");        // チーム番号のようなもの

function getClientData(callback){
    $.ajaxSetup({async: false}); 
    $.post("/get_client_details", {
        "clientID": CLIENT_ID,
        "fileN": FILE_N
    }).done((res) => {
        callback(res);
    });
}


window.onload = function(){
    getClientData(function(data){
        console.log(data.nickName);
        if (data["unknown_client"]){
            // data: {"unknown_client": true}
            // セタガクエスト来てねみたいな画面
            return;
        }
        console.log(data);

        //今回作ったコード(多分うまくいくはず)
        for(var item of data.items) {
            /**
             * @param key elem data(json)の一つ一つのアイテム要素の情報格納用変数
             */
            var elem = {html:null, type:item.type, stars:item.stars, rarity:item.rarity};
    
            var stars = "";
            for(var i=0; i<elem.stars; i++) {
                stars += "★"; 
            }
            //アイテム一つ一つのhtml
            elem.html = `
            <div class="item"style="">
                <img id="itemImg" src="${elem.type=="剣"?"images/ken.png": elem.type=="弓" ? "images/bow.png" : "images/stick.png"}" alt="剣の写真" width="auto" height="100%">
                <div class="spacer"> </div>
    
                <div class="discription"> 
                    <p id="stars">${stars}</p>
                    <p>${elem.rarity}</p>
                </div>
            </div>`;
            const itemArea = document.querySelector(".items");
            itemArea.insertAdjacentHTML("beforeend", elem.html);
        }

        /*
        {
            "nickName": "せたがく",
            "kagos": [],        // 今のところ加護は獲得できないらしい
            "items": [          // 剣, 弓, 杖の三種類で それぞれの武器の祠を一個もクリアしてないときは持っていない
            {
                "type": "剣",
                "stars": "8",
                "rarity": "uncommon"
            },
            {
                "type": "杖",
                "stars": "2",
                "rarity": "common"
            }
            ],
            "finishedevents": [     // クリア下祠のid (urlパラメーターでおいてる)
            "4353",
            "6800",
            "3290"
            ],
            "finishedmbosses": []   // 倒したミニボスのid
        }
        */
    });

    //以下試験用コード=>後で消しといて
    //<test>
        
        const testJson = {
            "nickName": "せたがく",
            "kagos": [],       
            "items": [          
            {
                "type": "剣",
                "stars": "8",
                "rarity": "uncommon"
            },
            {
                "type": "杖",
                "stars": "2",
                "rarity": "common"
            },
            {
                "type":"弓",
                "stars":"5",
                "rarity":"uncommon",
            }
            ],
            "finishedevents": [    
            "4353",
            "6800",
            "3290"
            ],
            "finishedmbosses": []  
        };
        for(var item of testJson.items) {
            var elem = {html:null, type:item.type, stars:item.stars, rarity:item.rarity};
    
            var stars = "";
            for(var i=0; i<elem.stars; i++) {
                stars += "★"; 
            }
            elem.html = `
            <div class="item"style="">
                <img id="itemImg" src="${elem.type=="剣"?"images/sword.png": elem.type=="弓" ? "images/bow.png" : "images/stick.png"}" alt="剣の写真" width="auto" height="100%">
                <div class="spacer"> </div>
    
                <div class="discription"> 
                    <p id="stars">${stars}</p>
                    <p>${elem.rarity}</p>
                </div>
            </div>`;
            const itemArea = document.querySelector(".items");
            itemArea.insertAdjacentHTML("beforeend", elem.html);
        }
    //</test>
}
