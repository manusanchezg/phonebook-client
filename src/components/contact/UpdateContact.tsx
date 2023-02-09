import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import defaultProfilePic from "../../assets/profile.svg";
import { GET_CONTACT_INFO } from "../../GraphQL/queries";

function UpdateContact({
  show,
  onHide,
  contactId,
}: {
  show: boolean;
  onHide: () => void;
  contactId: string;
}) {
  const { data, loading, error } = useQuery(GET_CONTACT_INFO, {
    variables: { contactId },
  });

  const image = "";
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loading ? (
          <>
            <div className="d-flex justify-content-around">
              <figure className="d-flex flex-column justify-content-center ms-3  w-25">
                <img
                  className="img-thumbnail"
                  src={
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
                      data.Contact.photo
                    )
                      ? data.Contact.photo
                      : defaultProfilePic
                  }
                  alt=""
                />
                <label
                  className="mt-2 text-center border py-2 rounded upload-button"
                  htmlFor="files"
                >
                  Select picture
                </label>
                <input
                  type="file"
                  id="files"
                  style={{ visibility: "hidden" }}
                />
              </figure>
              <div className="d-flex flex-column justify-content-center w-50">
                <label htmlFor="firstName"></label>
                <h2 className="ms-3">{`${data.Contact.firstName} ${data.Contact.lastName}`}</h2>
                <div className="mb-3">
                  <label htmlFor="nickname" className="fw-bolder fs-5">
                    Nickname:{" "}
                  </label>{" "}
                  <span>
                    {data.Contact.nickname || "Doesn't have a nickname yet"}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="fw-bolder fs-5">
                    Address:{" "}
                  </label>{" "}
                  <span>{data.Contact.address}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumbers" className="fw-bolder fs-5">
                    Phone number/s:{" "}
                  </label>{" "}
                  <ul className="list-group list-group-flush w-50">
                    {data.Contact.phoneNumbers.map((phone: string) => (
                      <li className="list-group-item text-center">{phone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success">Update</Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateContact;
