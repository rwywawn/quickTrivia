import {React,useState }from "react";
export default function Questions(props){
  const [state,set]=useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    props.that.callApi(state,"/verify");
  };
  const handleChange = (event) => {
    const values = {
      [event.target.name]: event.target.value,
    };
    console.log(values)
    console.log(event)
    

  };
  console.log(props, "ds");
  if (!props.questions) {
    return <div></div>;
  }
  return (
    <div>
      <h1>Questions</h1>
      <form className="form-1" onSubmit="handleSubmit">
        {props.questions.map((item, ind) => (
          <div>
            <label key={`${ind}l`} htmlFor={`question${ind}`}>
              {ind + 1}. {decodeHTMLEntities(item.question)}
            </label>
            <br></br>
            <select key={`${ind}s`} name={`question${ind}`} defaultValue={decodeHTMLEntities(item.type)} onChange={handleChange}>
              {item.incorrect_answers.map((ans, ind) => (
                <option key={`${ind}o`} defaultValue={decodeHTMLEntities(ans)}>
                  {decodeHTMLEntities(ans)}
                </option>
              ))}
            </select>
            <br></br>
            <br></br>
          </div>
        ))}
        <button type="submit" id="submit">
          Submit Answers
        </button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

function decodeHTMLEntities(html) {
  let text = document.createElement("textarea");
  text.innerHTML = html;
  return text.value;
}