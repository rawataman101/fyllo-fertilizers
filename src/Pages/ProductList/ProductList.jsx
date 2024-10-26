import "./ProductList.css";
import { data } from "../../result";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getPieData, getPieDataTop5Least } from "../../utils";
import { useState } from "react";
import TopKResults from "../../Components/TopKResults";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 140,
    sortable: true,
    floatingFilter: true,
  },

  {
    field: "_year",
    headerName: "Year",
    width: 200,
    sortable: true,
    filter: "agTextColumnFilter",
    floatingFilter: true,
  },
  {
    field: "month",
    filter: "agTextColumnFilter",
    headerName: "Month",
    width: 150,
    sortable: true,
    floatingFilter: true,
  },
  {
    field: "product",
    filter: "agTextColumnFilter",
    headerName: "Product",
    width: 180,
    sortable: true,
    floatingFilter: true,
  },
  {
    field: "state",
    filter: "agTextColumnFilter",
    headerName: "State",
    width: 250,
    sortable: true,
    floatingFilter: true,
  },
  {
    field: "requirement_in_mt_",
    filter: "agTextColumnFilter",
    headerName: "Requirement (MT)",
    width: 250,
    sortable: true,
    floatingFilter: true,
  },
  {
    field: "availability_in_mt_",
    filter: "agTextColumnFilter",
    headerName: "Availability (MT)",
    width: 190,
    sortable: true,
    floatingFilter: true,
  },
];

function ProductList() {
  const [result, setResult] = useState([]);
  const [toggleTop5, setToggleTop5] = useState(false);
  const [toggleLeast5, setToggleLeast5] = useState(false);

  const handleData = (type) => {
    if (type === "top") {
      console.log("top");
      setResult(
        getPieData(data, "requirement_in_mt_").map((item) => item.name)
      );
      setToggleTop5((prev) => !prev);
      setToggleLeast5(false);
    } else {
      setResult(
        getPieDataTop5Least(data, "availability_in_mt_").map(
          (item) => item.name
        )
      );
      setToggleLeast5((prev) => !prev);
      setToggleTop5(false);
    }
  };

  return (
    <div className="productList">
      <div className="productListHeading">ProductList</div>
      <div className="productListContainerSortButtons">
        <button
          className={toggleTop5 && "productListSortButton"}
          onClick={() => handleData("top")}
        >
          Top 5 Required Products
        </button>
        <button
          className={toggleLeast5 && "productListSortButton"}
          onClick={() => handleData("least")}
        >
          Top 5 Least Available Products
        </button>
      </div>
      {toggleTop5 &&
        result.map((item, index) => (
          <TopKResults item={item} index={index} key={index} />
        ))}
      {toggleLeast5 &&
        result.map((item, index) => (
          <TopKResults item={item} index={index} key={index} />
        ))}

      <div className="productListTable">
        <div className="ag-theme-alpine" style={{ width: "100%" }}>
          <AgGridReact
            rowData={data}
            columnHoverHighlight={true}
            columnDefs={columns}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
