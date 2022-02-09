const tus = require('tus-node-server');
const server = new tus.Server();
const path = require('path');
const express = require('express');
const fs = require('fs')

var key = null;
server.datastore = new tus.FileStore({
    path: `/public`
});

const storageFolder = path.join(process.cwd(), '/public')

//////////Tus File Upload Server
const metadataStringToObject = (stringValue) => {
    const keyValuePairList = stringValue.split(',')

    return keyValuePairList.reduce((metadata, keyValuePair) => {
        let [key, base64Value] = keyValuePair.split(' ')
        metadata[key] = new Buffer(base64Value, "base64").toString("ascii")

        return metadata
    }, {})
}
const waitResponse = () => {
    server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
        console.log("on complete", key);
        const target_path = `${storageFolder}/${key}`;
        if (!fs.existsSync(target_path)) {
            fs.mkdirSync(target_path);
        }

        const target_image_path = `${storageFolder}/${key}/images`;
        if (!fs.existsSync(target_image_path)) {
            fs.mkdirSync(target_image_path);
        }

        const metaData = metadataStringToObject(event.file.upload_metadata);
        const fileName = metaData.filename;
        const fileType = metaData.filetype;

        // var checkFile = function (dir, done) {

        //     function recWalk(d, res) {
        //       var list = fs.readdirSync(d);
        //       list.forEach((name) => {
        //         var tempassets = [];
        //         var file = path.resolve(d, name);
        //         var stat = fs.statSync(file);
        //         if (stat && stat.isDirectory()) {
        //           recWalk(file, tempassets);
        //           var obj = {};
        //           obj[name] = tempassets;
        
        //         } else {
        //           if (!name.includes("manifest.json") && !name.includes("serviceWorker.js"))
        //           {
        //               var fileType = name.split('.')[1];
        //               if(fileType.includes("js"))
        //                 bFlag = true;
        //           }
        //         }
        //       });
        //     }
        
        //     try {
        //       recWalk(dir, assets);
        //       done(null, assets);
        //     } catch (err) {
        //       done(err);
        //     }
        //   };
        
        //   checkFile(`${storageFolder}/${page_key}/`, function (err, data) {
        //     console.log("data is " + data);
        //     if (err) console.log(err);
        //     else{
        //       if(!bFlag)
        //       return res.send({ name: "JS file" });
        //     }
        //   });

        if (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/gif" || fileType == "image/svg") {
            if(fileName.split(".")[0] == "icon"){
                fs.rename(`${storageFolder}/${event.file.id}`, `${target_path}/icon.png`, res => {
                    console.log("icon rename success");
                });
            }else{
                fs.rename(`${storageFolder}/${event.file.id}`, `${target_image_path}/${fileName}`, res => {
                    console.log("images rename success");
                });
            }
        } else {
            fs.rename(`${storageFolder}/${event.file.id}`, `${target_path}/${fileName}`, res => {
                if (fileName != "index.html") return;
                fs.readFile(`${target_path}/${fileName}`, 'utf8', function (err, data) {
                    if (err) throw err;
                    String.prototype.splice = function (idx, rem, str) {
                        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
                    };
                    data = data.splice(data.search("</head>"), 0, '    <link rel="manifest" href="manifest.json"> ');
                    const addScript = `
    <script>
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("https://insytdev.com/public/${key}/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
        });
    }
    </script>`;
                    data = data.splice(data.search("</body>"), 0, addScript);

                    fs.writeFile(`${target_path}/${fileName}`, data, res => {
                        console.log("write index.html");
                    })
                });
            })
        }
        return;

    })
    ////////////////////////////////
}
waitResponse();
const uploadApp = express();
uploadApp.all('*', (request, response) => {
    key = request.headers.page_key;
    server.handle(request, response);
});

module.exports = uploadApp