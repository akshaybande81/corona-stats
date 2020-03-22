const express = require("express");
const router = new express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

getData = html => {
  data = [];
  $ = cheerio.load(html);
  $("table thead tr").each(function() {
    let temp = [];
    $(this)
      .children("th")
      .each(function() {
        temp.push($(this).text());
      });
    data.push(temp);
  });
  data.splice(0, 2);
  $("table tr").each(function() {
    let temp = [];
    $(this)
      .children("td")
      .each(function() {
        temp.push($(this).text());
      });
    data.push(temp);
  });

  let title = data[0];
  data.splice(0, 7);
  data = data.reduce((acc, val, index) => {
    let obj = {};
    for (i in val) {
      obj[title[i]] = val[i];
    }
    acc.push(obj);
    return acc;
  }, []);
  return data;
};

router.get("/", async (req, res) => {
  try {
    let data = await axios("https://www.mohfw.gov.in/");
    let scrapedData = getData(data.data);
    res.status(200).send(scrapedData);
  } catch (e) {
    res.status(500).send({ error: JSON.stringify(e) });
  }
});

module.exports = router;
