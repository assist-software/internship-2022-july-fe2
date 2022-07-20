import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import Listing from "../Listing/Listing";

const Home = () => {
  const { user } = useAuth();
  const [view, setView] = useState(false);
  return (
    <div>
      <div>
        <Tabs />
        <Nav setView={setView} />
      </div>
      {user?.role === 1 && (
        <>
          {view ? (
            <Listing pending={1} hideApproval admin />
          ) : (
            <Listing pending={0} admin />
          )}
        </>
      )}
      {user?.role === 0 && (
        <>
          {!view ? (
            <>
              <Carousel title="Most view" />
              <Carousel title="Big Houses" />
              <Carousel title="Small Houses" />
            </>
          ) : (
            <Listing />
          )}
        </>
      )}
      {user?.role == null && (
        <>
          <Carousel title="Most view" />
          <Carousel title="Big Houses" />
          <Carousel title="Small Houses" />
        </>
      )}
      {/* {user?.role === 1 ? (
        <>
          {view ? (
            <Listing pending={1} hideApproval admin />
          ) : (
            <Listing pending={0} admin />
          )}
        </>
      ) : (
        <>
          <Carousel title="Most view" />
          <Carousel title="Big Houses" />
          <Carousel title="Small Houses" />
        </>
      )} */}

      {/* {user?.role === 1? (
        <div>admin</div>
      ) : user?.role === 0? (
        <div>user</div>
      ) : (
        <div>guest</div>
      )} */}
    </div>
  );
};

export default Home;
