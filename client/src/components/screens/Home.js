import React, {useState, useEffect, useContext} from "react";
import {UserContext} from "../../App"

const Home = () => {
  const [data, setData] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=> {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(response => response.json())
    .then(result => {
      console.log(result);
      setData(result.posts)
    })
  }, [])

  const likePost = (id) => {
    fetch('/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(response => response.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      })
      setData(newData)
    }).catch(error => {
      console.log(error)
    })
  }

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(response => response.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      })
      setData(newData)
    }).catch(error => {
      console.log(error)
    })
  }

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text,
        postId
      })
    }).then(response => response.json())
    .then(result => {
      console.log(result)
      const newData = data.map(item => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      })
      setData(newData)
    }).catch(error => {
      console.log(error)
    })
  }

  // dynamically return posts
  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image">
                <img src={item.image} />
              </div>
              <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                {item.likes.includes(state._id)
                  ?
                  <i className="material-icons"
                  onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                  :
                  <i className="material-icons"
                  onClick={()=>{likePost(item._id)}}>thumb_up</i>
                }
                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {
                  item.comments.map(record => {
                    return (
                      <h6 key={record._id}><span style={{fontWeight: "500"}}>{record.postedBy.name}</span> {record.text}</h6>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id)
                }}>
                  <input type="text" placeholder="Add a comment" />
                </form>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Home;
