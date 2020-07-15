import "./NavBar.css";
import React from "react";

const endpoint = "http://localhost:3000/";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trivia_amount: 10, trivia_category: "any", trivia_difficulty: "any", trivia_type: "any" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.call = this.call.bind(this);
  }
  componentDidMount() {
    //add some random
  }
  handleInputChange(event) {
    const target = event.target;
    console.log(target.name);
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }
  call(req, end) {
    const request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      request.open("POST", endpoint + end, true);
      request.setRequestHeader("Content-Type", `application/json`);
      request.onload = function () {
        if (this.status === 200) {
          if (JSON.parse(this.responseText).status === 200) {
            resolve(JSON.parse(this.responseText).responseText);
          } else {
            reject(JSON.parse(this.responseText));
          }
        } else {
          reject({ status: this.status, text: this.responseText });
        }
      };
      console.log(JSON.stringify(req));
      request.send(JSON.stringify(req));
    });
  }
  callApi(event) {
    event.preventDefault();
    const { trivia_amount, trivia_category, trivia_difficulty, trivia_type } = this.state;
    console.log(trivia_amount);
    console.log(this.state);
    const req = {
      amount: trivia_amount,
      category: trivia_category,
      difficulty: trivia_difficulty,
      type: trivia_type,
    };

    this.call(req, "")
      .then((req) => {
        console.log(req);
        this.setState({ question: req });
      })
      // .catch(function (error) {
      //   console.log(error);
      //   console.log("Error " + error.status + " " + error.responseText);
      // });
  }
  checkAnswers(event) {
    event.preventDefault();
    console.log(event);
    //this.call(,"/verify")
    console.log("df");
  }
 
  render() {
    console.log(document.getElementsByClassName("grades").length===0);
    if (document.getElementsByClassName("grades").length !== 0) {
      this.setState({ question: undefined });
    }
    return (
      <div>
        <div className="NavBar">
          <ul>
            <li>
              <button onClick={() => console.log("D")}> Merge Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Insertion Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Bubble Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Quick Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Selection Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Heap Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Counting Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Radix Sort </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Random Swaps </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Swap Random </button>
            </li>
            <li>
              <button onClick={() => console.log("D")}> Reset </button>
            </li>
          </ul>
        </div>
        <div className="container">
          <h1>Pick the difficulty</h1>
          <form action="" name="formInfo" onSubmit={this.callApi}>
            <label htmlFor="trivia_amount"> Number of Questions: </label>
            <input
              type="number"
              name="trivia_amount"
              id="trivia_amount"
              className="form"
              min="1"
              max="50"
              value={this.state.questions}
              defaultValue="10"
              onChange={this.handleInputChange}></input>
            <br></br> <br></br>
            <label htmlFor="trivia_category"> Category: </label>
            <select name="trivia_category" className="form" value={this.state.category} onChange={this.handleInputChange}>
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
            </select>
            <br></br> <br></br>
            <label htmlFor="trivia_difficulty"> Difficulty: </label>
            <select name="trivia_difficulty" className="form" value={this.state.difficulty} onChange={this.handleInputChange}>
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <br></br> <br></br>
            <label htmlFor="trivia_type"> Question Type: </label>
            <select name="trivia_type" className="form" value={this.state.type} onChange={this.handleInputChange}>
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
            <br></br> <br></br>
            <button type="submit" id="submit">
              Get Questions
            </button>
          </form>
        </div>
        <br></br>
        <Questions questions={this.state.question} />
      </div>
    );
  }
}

function decodeHTMLEntities(html) {
  let text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}
class Questions extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.callApi(this.state);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }
  callApi() {
    const answers = Object.values(this.state);
    answers.shift()
    console.log(answers,"dsfsa");

    this.call(answers, "verify")
      .then((req) => {
        console.log(req,"df");
        this.setState({ grade: req });
      })
      .catch(function (error) {
        console.log(error);
        console.log("Error " + error.status + " " + error.responseText);
      });
  }
  call(req, end) {
    const request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      console.log(endpoint + end);
      request.open("POST", endpoint + end, true);
      request.setRequestHeader("Content-Type", `application/json`);
      request.onload = function () {
        if (this.status === 200) {
          if (JSON.parse(this.responseText).status === 200) {
            resolve(JSON.parse(this.responseText).responseText);
          } else {
            reject(JSON.parse(this.responseText));
          }
        } else {
          reject({ status: this.status, text: this.responseText });
        }
      };
      console.log(JSON.stringify(req));
      request.send(JSON.stringify(req));
    });
  }
  reset(event) {
    event.preventDefault();
    this.setState({ grade: undefined });
  }
  render() {
    console.log(this.props.questions);
    if (!this.props.questions) {
      return <div></div>;
    } else if (this.state.grade !== undefined) {
      return (
        <div>
          <h1 className="grade">Your Grade is {this.state.grade * 100}%</h1>
          <button className="Reset" onClick={this.reset}>
            New Quiz
          </button>
        </div>
      );
    } else {
      const defaultVal = {};
      if (Object.keys(this.state).length === 0) {
        console.log("sdf");
        defaultVal.ques=true;
        this.props.questions.map((item, ind) => (defaultVal[`question${ind}`] = decodeHTMLEntities(item.incorrect_answers[0])));
        this.setState(defaultVal);
      }
      return (
        <div>
          <h1>Questions</h1>
          <form className="form-1" onSubmit={this.handleSubmit}>
            {this.props.questions.map((item, ind) => (
              <div>
                <label key={`${ind}l`} htmlFor={`question${ind}`}>
                  {ind + 1}. {decodeHTMLEntities(item.question)}
                </label>
                <br></br>
                <select key={`${ind}s`} name={`question${ind}`} onChange={this.handleChange}>
                  {item.incorrect_answers.map((ans, index) => (
                    <option key={`${index}o`} defaultValue={decodeHTMLEntities(ans)}>
                      {decodeHTMLEntities(ans)}
                    </option>
                  ))}
                </select>
                <br></br>
                <br></br>
              </div>
            ))}
            <button type="submit">Submit Answers</button>
          </form>
          <br></br>
          <br></br>
        </div>
      );
    }
  }
}
