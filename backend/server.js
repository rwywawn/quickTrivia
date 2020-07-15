const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const port = process.env.PORT || 3000;
let answers = [];
app.use(
  parser({
    extended: true,
  })
);
app.use(cors());
const tokenUrl = "https://opentdb.com/api_token.php?command=request";

let token1 = startUp(tokenUrl)
  .then(function (data) {
    console.log("token retrieved");
    return JSON.parse(data.responseText);
  })
  .catch(function (error) {
    console.log(error);
    return error;
  });

app.post("", async (req, res) => {
  console.log(`Connected`);
  answers=[]
  const body = req.body;
  console.log(req);
  let { amount, category, difficulty, type } = body;
  amount = amount === "any" ? "" : `amount=${amount}`;
  category = category === "any" ? "" : `&category=${category}`;
  difficulty = difficulty === "any" ? "" : `&difficulty=${difficulty}`;
  type = type === "any" ? "" : `&type=${type}`;
  const token = (await token1).token;
  const url = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}&token=${token}`;
  res.send(
    await callApi(url)
      .then(function (data) {
        const questions = JSON.parse(data.responseText).results;
        if (questions.length===0){
          startUp(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
          return JSON.stringify({status:200, responseText:"Try Again"})
        }
        console.log(questions);

        for (let i = 0; i < questions.length; i++) {
          answers.push(questions[i].correct_answer);
          questions[i].incorrect_answers.splice(random(0, questions[i].incorrect_answers.length), 0, questions[i].correct_answer);
          delete questions[i].correct_answer;
        }
        console.log(data.responseText);

        return JSON.stringify({ status: data.status, responseText: questions });
      })
      .catch(function (error) {
        console.log(error);
        return error;
      })
  );
});
app.post("/verify", async (req, res) => {
  console.log(answers)
  if (!answers) {
    res.send(JSON.stringify({ responseText: "No questions were asked" }));
    return
  }
  const response = req.body;
  console.log(response,"sdfsd")

  let correct = 0;
  for (let i = 0; i < response.length; i++) {
    if (response[i] === answers[i]) {
      correct++;
      console.log(correct)
    }
  }
  let mark = correct / answers.length;
  console.log(mark)
  res.send(JSON.stringify({ status: 200, responseText: mark }));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

function callApi(endpoint) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open("GET", endpoint, true);
    request.setRequestHeader("Content-Type", `application/json`);
    request.onload = function () {
      if (this.status === 200) {
        resolve({ responseText: this.responseText, status: this.status });
      } else {
        reject({ status: this.status, responseText: this.responseText });
      }
    };
    request.send();
  });
}
function startUp(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-Type", `application/json`);
    request.onload = function () {
      if (this.status === 200) {
        resolve({ responseText: this.responseText, status: this.status });
      } else {
        reject({ status: this.status, responseText: this.responseText });
      }
    };
    request.send();
  });
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
