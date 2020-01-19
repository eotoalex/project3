
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {

    
    getScrapedNews:function (req,res) {
        axios.get("https://www.nydailynews.com/new-york/nyc-crime/").then(function(response){
          var $ = cheerio.load(response.data);

         
        
        let results = [];
      
        $(".crd--cnt").each(function(i, element){
            var title = $(element).find(".r-mb").find("a").text();
            var headline = $(element).find("p.preview-text").text();
            var href = $(element).find(".r-mb").find("a").attr("href");
            
            if(title !== "" && headline !== "" && href !== ""){
                results.push({
                    title:title,
                    headline: headline,
                    href:href,
                   
                })
            }
        })
        let resultsList = [];
        resultsList.push(results[0],results[2],results[4],results[6],results[8]);
        res.json(resultsList);
        
        })
        
      }
}