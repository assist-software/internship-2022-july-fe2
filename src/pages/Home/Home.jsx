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

const Home = ({ showcontrols }) => {
  const { user } = useAuth();
  const { setListings } = useStateProvider();
  const { setListView } = useStateProvider();

  const [view, setView] = useState(false);
  useEffect(() => {
    getListings().then((res) => setListings(res));
    if (user?.role === 1) {
      setListView(true);
    } else if (user?.role === 0) {
      setListView(false);
    } else {
      setListView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setListView]);

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
            <Listing
              showcontrols={showcontrols}
              pending={0}
              pending2={2}
              admin
            />
          )}
        </>
      )}
      {user?.role === 0 && (
        <>
          {!view ? (
            <>
              <Carousel
                all
                showcontrols
                pending={0}
                pending2={2}
                title="Latest"
              />
              <Carousel
                category="big"
                showcontrols
                pending={0}
                pending2={2}
                title="Big Houses"
              />
              <Carousel
                category="small"
                showcontrols
                pending={0}
                pending2={2}
                title="Small Houses"
              />
            </>
          ) : (
            <MyListings showcontrols={showcontrols} />
          )}
        </>
      )}
      {user?.role == null && (
        <>
          <Carousel
            mostView
            showcontrols
            pending={0}
            pending2={2}
            title="Latest"
          />
          <Carousel
            category="big"
            showcontrols
            pending={0}
            pending2={2}
            title="Big Houses"
          />
          <Carousel
            category="small"
            showcontrols
            pending={0}
            pending2={2}
            title="Small Houses"
          />
        </>
      )}
    </div>
  );
};

export default Home;
