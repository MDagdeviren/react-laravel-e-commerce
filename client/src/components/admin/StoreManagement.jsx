import React, { useEffect } from "react";
import { Table, Button, Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStores } from "../../features/storeSlice";
import { toast } from "react-toastify";
import {
  getApprovalStores,
  postApprovalStore,
} from "../../features/storeApprovalSlice";

const StoreManagement = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store);
  const storeApproval = useSelector((state) => state.storeApproval);

  useEffect(() => {
    dispatch(getStores());
    dispatch(getApprovalStores());
  }, [dispatch]);

  const onClick = (event, id) => {
    dispatch(postApprovalStore({ id })).then(
      (data) => {
        toast.success("Added " + data.payload.name + " Store");
      },
      (err) => {}
    );
    dispatch(getStores());
  };

  return (
    <div>
      {storeApproval.length > 0 && (
        <>
          <div className="m-4">
            <Button color="primary" outline>
              Awaiting Approval Table <Badge pill>{storeApproval.length}</Badge>
            </Button>
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Store Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {storeApproval?.map((store, key) => (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>{store.phone_number}</td>
                  <td>
                    <Button
                      onClick={(e) => onClick(e, store.id)}
                      value={store.id}
                      className="btn btn-success"
                    >
                      Approval
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <div className="m-4">
        <Button color="primary" outline>
          Stores Table <Badge pill>{stores.length}</Badge>
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Store Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((store, key) => (
            <tr key={key}>
              <th scope="row">{key + 1}</th>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StoreManagement;
