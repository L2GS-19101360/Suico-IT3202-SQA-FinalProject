import { Component } from 'react';
import { Button } from 'react-bootstrap';
import wallpaper from '../src/assets/wallpaper.jpeg';
import GeneralNavbar from './components/GeneralNavbar';
import { FaBookOpen } from 'react-icons/fa';
import Lorenz from '../src/assets/userimage/Lorenz.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() { }

  componentWillUnmount() { }

  render() {
    // Styles for the overlay and the content
    const styles = {
      container: {
        position: 'relative',
        height: '100%',
        width: '100%',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 0.1, // Adjust the opacity as needed
        zIndex: -1, // Ensure the overlay is behind other content
      },
      content: {
        position: 'relative',
        zIndex: 1,
        padding: '5%',
        textAlign: 'center',
      },
      textJustify: {
        textAlign: 'justify',
      },
      listStyle: {
        listStyle: 'none',
        paddingLeft: 0, // Remove default padding
      },
      listItem: {
        marginBottom: '10px', // Add some space between list items
      },
    };

    return (
      <div style={styles.container}>
        <GeneralNavbar />
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <h1>Welcome to L2GS Library System</h1>
          <br />
          <h3>
            Welcome to the L2GS Library System, your ultimate destination for
            efficient and user-friendly book management. Our platform is
            designed to simplify and enhance your library experience, whether
            you're a reader, a librarian, or an administrative.
          </h3>
          <br />
          <div>
            <a href="/RegisterPage">
              <Button variant="primary">
                <h4> <FaBookOpen /> &nbsp; Start Reading</h4>
              </Button>
            </a>
          </div>
          <br />
          <h3>Explore Our Features</h3>
          <div style={styles.textJustify}>
            <ul style={styles.listStyle}>
              <li style={styles.listItem}>
                <b>Book Catalog</b>: Dive into our extensive catalog of
                available books. Browse through a wide array of titles,
                authors, genres, and more, with real-time availability status.
              </li>
              <li style={styles.listItem}>
                <b>Search and Filter</b>: Easily find your next great read.
                Our robust search and filter tools allow you to locate specific
                books based on title, author, or genre, ensuring you find
                exactly what you're looking for with minimal effort.
              </li>
              <li style={styles.listItem}>
                <b>Book Checkout and Return</b>: Seamlessly check out books
                using your library card or member ID. Our system keeps track
                of borrowed books and due dates, making it easy for you to
                return books on time and avoid late fees.
              </li>
              <li style={styles.listItem}>
                <b>User Management</b>: Our intuitive user management system
                allows administrators to efficiently handle user accounts.
                Create, update, and delete accounts with ease, while managing
                different user roles and permissions to keep your library
                running smoothly.
              </li>
              <li style={styles.listItem}>
                <b>Book Management</b>: Keep your library collection up-to-date
                and well-organized. Administrators can add new books, update
                book details, manage availability statuses, and remove books
                when necessary, ensuring that your library remains a valuable
                resource for all users.
              </li>
            </ul>
          </div>
          <br />
          <h3>
            Join us at L2GS Library System and discover a new way to manage and
            enjoy your library resources. Whether you're here to find your next
            favorite book or to streamline library operations, we have
            everything you need for a seamless and enriching library experience.
          </h3>
          <br />
          <br />
          <h3>L2GS Library System Owner and Creator</h3>
          <img src={Lorenz} alt="Lorenz Gil G. Suico" height={200} width={200} />
          <p>Hello! I'm Lorenz Gil G. Suico, the owner and creator of L2GS Library System. As a dedicated IT professional and the founder of SNAP InfoTechnovation, I have a passion for developing innovative solutions that simplify and enhance user experiences.</p>
          <p>About Me:</p>
          <p>With a Bachelor of Science in Information Technology from the University of San Carlos, I have a robust foundation in both frontend and backend web application development. My expertise extends to networking, self-reliance, and team leadership skills, all of which contribute to the comprehensive functionality and user-centric design of the L2GS Library System.</p>
        </div>
      </div>
    );
  }
}

export default App;
