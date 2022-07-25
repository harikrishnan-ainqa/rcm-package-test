

export const NetworkReadCall = async (body) => {

var Url = "https://arangodbservice.dev.ainqaplatform.in/api/read_documents";
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: "follow",
  };
  let response_data = await fetch(Url, requestOptions);
  let response_json = response_data.json();
  return response_json;
};
