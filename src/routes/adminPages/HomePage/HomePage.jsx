import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page fancy-background">
      <h2>Admin home page</h2>
      <p>Welcome to the Admin home page</p>
      <p>
        Here you can use the <b>Admin Menu</b> to navigate through the available management pages.
        To show the Admin Menu click the <b>"&gt;"</b> button on the left side of the screen. To{" "}
        <b>hide</b> it again, click the <b>"X"</b> button.
      </p>
    </div>
  );
}

export default HomePage;
