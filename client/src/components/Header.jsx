import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>🏡 Gated Guest Log System</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#0077cc",
    color: "white",
    padding: "15px",
    textAlign: "center",
    borderRadius: "8px",
  },
};

export default Header;
