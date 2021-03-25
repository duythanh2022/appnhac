const express = require("express");
const app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser")
const rp = require("request-promise");
const cheerio = require("cheerio");

app.use(morgan("dev"));
app.set("view engine", "ejs")

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

/* Lấy tên và miêu tả của tutorial*/










  app.get("/", (req, res) => {
      res.render("index")
  })

app.get("/manguon", (req, res) => {
    
     let kw = req.query.kw
     
    var request = require('request');
    const diachi = `http://m.nhaccuatui.com/tim-kiem/bai-hat?q=${kw}&page=10`;
    console.log(kw,diachi);
    request(diachi, (error, response, body) => {
        console.error(error);      
        const options = {
            uri: diachi,
            transform: function (body) {
                return cheerio.load(body);
            },
        };
        (async function crawler() {
            try {
                
                var $ = await rp(options);
            } catch (err) {
                console.log(err);
                return error;
            }
            
            // const song = $(".sn_search_single_songa").text().trim();
            const tableContent = $(".song_item_single");
            console.log(tableContent.length);
            let data = [];
            for (let i = 0; i < tableContent.length; i++) {
                let chaper = $(tableContent[i]);
                // 
                let tenbaihat = chaper.find(".box_info h3 a").text().trim();
                let tencasi = chaper.find(".box_info h4 a").text().trim();
                const table = chaper.find(".item_thumb span");
                let keybaihat = table.attr('keyencrypt');
                let linkytb = table.attr('refkeyyoutube');
                console.log(tenbaihat,tencasi)
                data.push({
                    tenbaihat,
                    tencasi,
                    keybaihat,
                    linkytb
                });

            }
            console.log(data);
            res.send(JSON.stringify(data));
        })();
        
        
    })
})


const server = app.listen(4043, () => {
    console.log("Chay thanh cong port 7000");
})
