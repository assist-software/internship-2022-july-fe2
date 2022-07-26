import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import useStateProvider from "../../hooks/useStateProvider";
import { Fragment } from "react";

const ListObject = ({ admin, hideApproval, pending }) => {
  const navigate = useNavigate();
  const { listings } = useStateProvider();

  //grid view list view
  const { listView } = useStateProvider();
  return (
    <div>
      {listings?.map(
        (listing, index) =>
          listing.status !== pending && (
            <Fragment key={`${listing.id}_${index}`}>
              <Card
                key={index}
                image={listing.images[0]}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={listing.location[2] + ", " + listing.location[5]}
                listView={listView}
                listingId={listing.id}
                admin={admin}
                hideApproval={hideApproval}
                listing={listing}
                pending={pending}
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
