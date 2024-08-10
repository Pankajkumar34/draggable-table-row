## draggable-table-row

`draggable-table-row` is a React component designed to add drag-and-drop functionality to table rows. This package ensures that the order of rows is preserved across page reloads and allows you to integrate additional button functionalities within the table rows.

## Features

- **Drag-and-Drop:** Reorder table rows easily with drag-and-drop support.
- **Persistent State:** Row order is preserved across page reloads using `localStorage`.
- **Customizable:** Integrate custom buttons and functionalities within each row.
- **Simple Integration:** Easily integrate with existing React tables.
- **Drag and Drop:** Optionally highlight rows while dragging with `isDragAndDrop`  prop.


## Installation

To install the package, run the following command:

```bash
 npm install draggable-table-row
```
## import
```bash
 import { DndProvider, HTML5Backend } from 'draggable-table-row'
```
    import {MainTable,TableRow} from 'draggable-table-row';
    

    
## Usage/Examples
`main.jsx or index.js`
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DndProvider, HTML5Backend } from 'draggable-table-row'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);


```

```javascript

import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import {MainTable,TableRow} from 'draggable-table-row'

export const MyTable = () => {
  const [data, setData] = useState([
    { _id: "1", userName: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", address: "123 Elm St" },
    { _id: "2", userName: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", address: "456 Oak St" },
    { _id: "3", userName: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-555-5555", address: "789 Pine St" },
    { _id: "4", userName: "Bob Brown", email: "bob.brown@example.com", phone: "111-222-3333", address: "101 Maple St" }
  ]);

  // Function to render custom cells in table rows
  const renderCustomCellTbody = (item, index) => (
    <>
      <td className="px-6 py-4">{item.userName}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.phone}</td>
      <td className="px-6 py-4">{item.address}</td>
      <td className="px-6 py-4 w-[100px]">
        <button
          type="button"
          className="border border-black p-2 rounded w-[120px] flex items-center"
          onClick={() => alert(`Clicked on ${item.userName}`)}
        >
          <span className="mr-5 flex items-center mx-5">Button <FaCloudDownloadAlt className="ml-3" /></span>
        </button>
      </td>
    </>
  );

  return (
    <div className="bg-[#1f214e] sm:py-[30px] h-[100vh]">
      <div className="container">
        <MainTable
          dataLength={data?.length}
          setStateFun={setData}
          isDragAndDrop="true"
          tableDivClass={` py-[30px]`}
          tableClass="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs border-t border-l border-r text-white rounded-[10px] uppercase bg-[#1f214e] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <TableRow
                key={`${item._id}-${index}`}
                item={item}
                index={index}
                customeRow={renderCustomCellTbody}
                tableBodyRowClass="my-2 bg-white border-b border-gray-800 dark:bg-gray-800 dark:border-gray-700"
              />
            ))}
          </tbody>
        </MainTable>
      </div>
    </div>
  );
};

```


    
    



