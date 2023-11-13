function _1(md){return(
md`# HW2 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationNames(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女作","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _constellationCounts(){return(
[]
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _6(constellationNames,constellationCounts,data)
{
  constellationNames.forEach(constellationName => {
    constellationCounts.push({Constellation : constellationName, Gender : "男", count : 0});
    constellationCounts.push({Constellation : constellationName, Gender : "女", count : 0});
  });

  data.forEach(person => {
    let index = person.Constellation * 2 + (person.Gender == "男" ? 0 : 1);
    constellationCounts[index].count++;
  })
  return constellationCounts;
}


function _7(Plot,plot2,constellationNames,data){return(
Plot.plot({  

	marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
	y: {grid: true, label: "count"},
  x: {
    ticks: 12,
    tickFormat: d => constellationNames[d],
    domain:[0, 11]
  },
	marks: [    
    Plot.ruleY([0]),
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
	 ]
})
)}

function _8(Plot,plot2,constellationCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(constellationCounts, {x: "Constellation", y: "count", tip: true , fill:"Gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationNames")).define("constellationNames", _constellationNames);
  main.variable(observer("constellationCounts")).define("constellationCounts", _constellationCounts);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["constellationNames","constellationCounts","data"], _6);
  main.variable(observer()).define(["Plot","plot2","constellationNames","data"], _7);
  main.variable(observer()).define(["Plot","plot2","constellationCounts"], _8);
  return main;
}
