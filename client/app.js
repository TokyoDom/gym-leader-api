async function getData() {
  const res = await fetch("/api/leaders/misty");
  const data = await res.json();
  console.log(data);
}

getData();