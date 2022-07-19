import Carousel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import Listing from "../Listing/Listing";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>
        <Tabs />
        <Nav />
      </div>
      {user?.role === "admin" ? (
        <Listing hideControls />
      ) : (
        <>
          <Carousel title="Most view" />
          <Carousel title="Big Houses" />
          <Carousel title="Small Houses" />
        </>
      )}

      {/* {user?.role === "admin" ? (
        <div>admin</div>
      ) : user?.role === "user" ? (
        <div>user</div>
      ) : (
        <div>guest</div>
      )} */}
    </div>
  );
};

export default Home;
