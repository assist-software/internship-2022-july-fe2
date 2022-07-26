import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment } from "react";

const ListObject = ({ listView, admin, hideApproval, pending, listing }) => {
  const navigate = useNavigate();
  const { listings } = useStateProvider();

  return (
    <div>
      {listings?.map(
        (listing, index) =>
          listing.status !== pending && (
            <Fragment key={`${listing.id}_${index}`}>
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
            </Fragment>
          )
      )}
    </div>
  );
};

export default ListObject;
