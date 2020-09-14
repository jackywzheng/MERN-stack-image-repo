import React from "react";

const Profile = () => {
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              alt="profile"
              src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
            />
          </div>
          <div>
            <h4>Jacky Zheng</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "110%",
              }}
            >
              <h6>40 posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
        <img
          className="item"
          alt="gallery"
          src="https://scontent.fyvr4-1.fna.fbcdn.net/v/t1.0-9/119056505_10158869358216983_4624107452860068230_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=lu3roo-cNhAAX_gQSxK&_nc_ht=scontent.fyvr4-1.fna&oh=426d64dbafd9ccf64c8e50bb3edb3a96&oe=5F85633A"
        />
      </div>
    </div>
  );
};

export default Profile;
