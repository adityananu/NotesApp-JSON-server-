import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { api } from "../Api/api";
import { AiFillPlusCircle } from "react-icons/ai";
import parse from "html-react-parser";
import Shimmer from "./Shimmer";

function View() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(api);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const delition = (id) => {
    axios.delete(`${api}/${id}`).then(getUser());
  };

  return (
    <div className="mainEhe">
      <div className="from">
        <nav> <h2>Notes-App</h2> </nav>
        <aside className="toAdjust">
          <Link to="/add">
            <AiFillPlusCircle className="hyper" />
          </Link>
        </aside>
      </div>
      <div className="second">
        {data.length === 0 ? (
          <Shimmer />
        ) : (
          data.map((note) => (
            <div className="notes_content" key={note.id}>
              <div className="inner">
                Title: {note.title}
                <br />
                Author: {note.author}
              </div>
              Content : <br />
              <div className="content">{parse(`${note.markUp}`)}</div>
              <div className="but">
                <button className="del" onClick={() => delition(note.id)}>
                  Delete
                </button>
                <Link to={`/singleView/${note.id}`}>
                  <button className="fully">SingleView</button>
                </Link>
                <Link to={`/edit/${note.id}`}>
                  <button className="edit">Edit</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default View;
