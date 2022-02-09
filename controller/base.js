const pwaAssetGenerator = require('pwa-asset-generator');
const fs = require('fs')
const path = require('path');
const util = require('util');
const storageFolder = path.join(process.cwd(), '/public');

const zipdir = require('zip-dir');
var http = require('http');

const checkState = (req, res) => {
  const { name, short_name, theme_color, background_color, display, description, scope, start_url, page_key } = req.body;

  
  try {
    if (fs.existsSync(`${storageFolder}/${page_key}/index.html`)) {

      fs.readFile(`${storageFolder}/${page_key}/index.html` , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }else{
      return res.send({ name: "index.html" });
    }
  } catch(err) { 
    console.error(err)
  }

  // var assets = [];
  // var bFlag = false;

  // var checkFile = function (dir, done) {

  //   function recWalk(d, res) {
  //     var list = fs.readdirSync(d);
  //     list.forEach((name) => {
  //       var tempassets = [];
  //       var file = path.resolve(d, name);
  //       var stat = fs.statSync(file);
  //       if (stat && stat.isDirectory()) {
  //         recWalk(file, tempassets);
  //         var obj = {};
  //         obj[name] = tempassets;

  //       } else {
  //         if (!name.includes("manifest.json") && !name.includes("serviceWorker.js"))
  //         {
  //             var fileType = name.split('.')[1];
  //             if(fileType.includes("js"))
  //               bFlag = true;
  //         }
  //       }
  //     });
  //   }

    // try {
    //   recWalk(dir, assets);
    //   done(null, assets);
    // } catch (err) {
    //   done(err);
    // }
  // };

  // checkFile(`${storageFolder}/${page_key}/`, function (err, data) {
  //   console.log("data is " + data);
  //   if (err) console.log(err);
  //   else{
  //     if(!bFlag)
  //     return res.send({ name: "JS file" });
  //   }
  // });

  try {

    if (!fs.existsSync(`${storageFolder}/${page_key}/icon.png`))
      return res.send({ name: "App icon" });

  } catch(err) {
    console.error(err)
  }
  return res.send({ name: "success" });

}

const upload = async (req, res) => {


  const { name, short_name, theme_color, background_color, display, description, scope, start_url, page_key } = req.body;

  const target_path = `${storageFolder}/${page_key}`;
  if (!fs.existsSync(target_path)) {
      fs.mkdirSync(target_path);
  }

  const image_path = `${storageFolder}/${page_key}/images`;
  if (!fs.existsSync(image_path)) {
      fs.mkdirSync(image_path);
  }

  const icon_path = `${storageFolder}/${page_key}/images/icon`;
  if (!fs.existsSync(icon_path)) {
      fs.mkdirSync(icon_path);
  }


  fs.writeFileSync(`${storageFolder}/${page_key}/manifest.json`, JSON.stringify({ name, short_name, theme_color, background_color, display, description, scope, start_url }, null, 4))
 
  try {
    await generator({ name, short_name, theme_color, background_color, display, description, scope, start_url }, page_key);
  } catch(err) {
    console.error(err)
    return res.send({ name: err });
  }

  return res.send({ name: "success" });
}

const download = (req, res) => {
  const name = req.body.name;
  const page_key = req.body.page_key;

  try{
    zipdir(`${storageFolder}/${page_key}`, { saveTo: `${storageFolder}/${page_key}/${name}.zip` }, function (err, buffer) {
      if(err){
        console.log(err);
        return res.status(500).send({ name: "Error occured" });
      }
      return res.send({name: `${name}`, path: `/public/${page_key}/${name}.zip` });
    });
  } catch(err) {
    return res.send({name: err, path: `/public/${page_key}/${name}.zip` });
  }
 

}

// Icon File Asset Generator
const generator = async (manifestJSON, page_key) => {

  const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
    `${storageFolder}/${page_key}/icon.png`,
    `${storageFolder}/${page_key}/images/icon`,
    {
      noSandbox:true,
      scrape: false,
      background: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
      iconOnly: true,
      index: `${storageFolder}/${page_key}/index.html`,
      manifest: `${storageFolder}/${page_key}/manifest.json`,
      log: true
    });

 
  var assets = [];

  var dirToJSON = function (dir, done) {
    assets.push("/");

    function recWalk(d, res) {
      var list = fs.readdirSync(d);
      list.forEach((name) => {
        var tempassets = [];
        var file = path.resolve(d, name);
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          recWalk(file, tempassets);
          var obj = {};
          obj[name] = tempassets;
          // for(var i = 0; i < tempassets.length; i ++){
          //   if(tempassets[i].split(".")[1] == "jpg" || tempassets[i].split(".")[1] == "png" || tempassets[i].split(".")[1] == "svg")
          //     res.push("/images" + tempassets);
          // }

        } else {
          if (!name.includes("manifest.json") && !name.includes("serviceWorker.js"))
            res.push("/" + name);
        }
      });
    }

    try {
      recWalk(dir, assets);
      done(null, assets);
    } catch (err) {
      done(err);
    }
  };

  dirToJSON(`${storageFolder}/${page_key}/`, function (err, assets) {
    if (err) console.log(err);
    else console.log(JSON.stringify(assets, null, 4));
  });

  const addScript = `
const static = "Coffee";
const assets = ${JSON.stringify(assets, null, 4)};
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(static).then(cache => {
        cache.addAll(assets);
      })
    );
  });
  
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
    `
  fs.writeFileSync(`${storageFolder}/${page_key}/serviceWorker.js`, addScript)

  return;
}
module.exports = {
  upload,
  download,
  checkState,
}