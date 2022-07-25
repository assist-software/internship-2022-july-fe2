import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";

const ListObject = ({ listView, admin, hideApproval, pending, listing }) => {
  const navigate = useNavigate();
  const { listings } = useStateProvider();

  return (
    <div>
      {listings?.map(
        (listing, index) =>
          listing.status !== pending && (
            <>
              <Card
                key={index}
                image={listing.images}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location}
                listView={listView}
                listingId={listing.id}
                admin={admin}
                hideApproval={hideApproval}
                listing={listing}
                onClick={() => {
                  navigate("/listing/" + listing.id);
                }}
              />
            </>
          )
      )}
    </div>
  );
};

export default ListObject;
