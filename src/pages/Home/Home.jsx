import { useEffect, useState } from "react";
import { getListings } from "../../api/API";
import Carousel from "../../components/Carousel/Carousel";
import Nav from "../../components/Nav/Nav";
import Tabs from "../../components/Tabs/Tabs";
import useAuth from "../../hooks/useAuth";
import Listing from "../Listing/Listing";
import useStateProvider from "../../hooks/useStateProvider";
import PendingApproval from "../../components/Nav/PendingApproval";
import MyListings from "../../components/Nav/MyListings";

const Home = () => {
  const { user } = useAuth();
  const { setListings } = useStateProvider();

  const [view, setView] = useState(false);
  useEffect(() => {
    getListings().then((res) => setListings(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <Tabs />
        <Nav view={view} setView={setView} />
      </div>
      {user?.role === 1 && (
        <>
          {view ? (
            <PendingApproval pending={1} hideApproval admin />
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
            <MyListings />
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
    </div>
  );
};

export default Home;
