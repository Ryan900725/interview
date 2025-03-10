import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AccordionItem from "./AccordionItem";
import data from "./data.json";

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [jsonData, setJsonData] = useState([]);
  const [summaryAdd, setSummaryAdd] = useState("");
  const [detailsAdd, setDetailsAdd] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Assuming `data` is an array or an object you want to use
    setJsonData(data);
  }, []);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  const handleSummaryAdd = (e) => {
    setSummaryAdd(e.target.value);
  };
  const handleDetailsAdd = (e) => {
    setDetailsAdd(e.target.value);
  };

  const isSimilar = (first, second) => {
    let tmp;
    let row = [];
    // Initialize the row
    for(let i = 0; i < first.length; i++) {
        row[i] = i;
    }
    for(let i = 1; i <= second.length; i++) {
        tmp = i;
        for(let j = 1; j <= first.length; j++) {
            let cost = first[j-1] === second[i-1] ? 0 : 1;
            let val = Math.min(row[j-1] + cost, Math.min(tmp + 1, row[j] + 1));
            row[j-1] = tmp;
            tmp = val;
        }
    }
    return row[first.length-1];
  }
  const isSimilarWordContained = (keywords, txt) => {
    let txtArr = txt.split(" ");
    for (let i = 0; i < keywords.length; i ++) {
      for (let j = 0; j < txtArr.length; j ++) {
        let r = isSimilar(keywords[i], txtArr[j]);
        if (r <= keywords[i].length/5*2) return true;
      }
    }
  }
  // const addItem = async () => {
  //   try {
  //     await axios.put("http://localhost:5000/add-data", {
  //       summary: summaryAdd,
  //       details: detailsAdd,
  //     });
  //     alert("Data updated successfully");
  //   } catch (error) {
  //     alert("Error updating data");
  //   }
  // };

  return (
    <div>
      <>
        {/* <div>
          <input
            type="text"
            id="summary-add"
            placeholder="Summary"
            style={{ width: "50%", marginBottom: "20px", padding: "5px" }}
            onChange={handleSummaryAdd}
          />
        </div>
        <div>
          <textarea
            type="text-area"
            id="details-add"
            placeholder="Details"
            style={{ width: "50%", height: "300px", padding: "5px" }}
            onChange={handleDetailsAdd}
          />
        </div> */}
        {/* <div>
          <input
            type="button"
            onClick={addItem}
            style={{ width: "30%", padding: "5px" }}
            value="AddItem"
          />
        </div> */}
      </>

      <input
        type="text"
        placeholder="Search"
        style={{ width: "50%", marginBottom: "20px", marginTop: "20px", padding: "5px" }}
        onChange={handleSearchText}
      />
      {jsonData.map((d, i) => {
        return (
          (
            d.summary.toLowerCase().includes(searchText.toLowerCase()) ||
            // d.details.toLowerCase().includes(searchText.toLowerCase()) ||
            isSimilarWordContained(d.keywords, searchText)
          ) && (
            <AccordionItem
              key={i}
              panelName={"panel" + (i + 1)}
              expanded={expanded}
              setExpanded={setExpanded}
              summary={d.summary.replace(/\n/g, '<br>')}
              details={d.details.replace(/\n/g, '<br>')}
            />
          )
        );
      })}
      {/* <AccordionItem
        panelName={"panel2"}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <AccordionItem
        panelName={"panel3"}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <AccordionItem
        panelName={"panel4"}
        expanded={expanded}
        setExpanded={setExpanded}
      /> */}
      {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography component="span">Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography component="span">Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
