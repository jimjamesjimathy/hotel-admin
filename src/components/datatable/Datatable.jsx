import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import useFetch from '../../hooks/useFetch.js';
import "./datatable.scss";
import { useEffect } from "react";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [list, setList] = useState()
  const { data, loading, error } = useFetch(`/${path}`);


  useEffect(() => {
    setList(data)
  },[data]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New: {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
