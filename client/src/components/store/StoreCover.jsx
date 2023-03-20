import React, { useEffect } from "react";
import { getStore, putCover, putLogo } from "../../features/storeInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";
import EditModal from "../storeApplication/EditModal";

const StoreCover = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const store = useSelector((state) => state.storeInfo);

  useEffect(() => {
    if (Object.keys(store).length === 0) {
      dispatch(getStore()).then(() => {});
    }
  }, []);

  //LOGO UPDATE
  const onChange = (e) => {
    const item = {
      id: store.id,
      logo: e.target.files[0],
    };
    dispatch(putLogo(item)).then(
      () => {
        toast.success("Updated Logo");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const onChangeCover = (e) => {
    const item = {
      id: store.id,
      cover: e.target.files[0],
    };
    dispatch(putCover(item)).then(
      () => {
        toast.success("Updated Cover");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <div className="container">
      <Card inverse>
        {store.photos && (
          <div className="">
            <div
              style={{ borderRadius: 0, width: "100%", height: "100%" }}
              className="avatar"
              id="avatar"
            >
              <div className="preview">
                <CardImg
                  alt="Card image cap"
                  src={
                    "http://127.0.0.1:8000/store_images/" +
                    store.photos[1]?.path
                  }
                  style={{
                    height: 270,
                  }}
                  width="100%"
                />
                <CardImgOverlay>
                  {token.user.user_level === 1 && (
                    <div className="avatar_upload">
                      <label className="upload_label">
                        Upload
                        <input
                          type="file"
                          id="upload"
                          onChange={(e) => onChangeCover(e)}
                        ></input>
                      </label>
                    </div>
                  )}

                  <CardTitle className="topleft" tag="h5">
                    {store.name}
                  </CardTitle>
                  <CardText className="bottomright">
                    {store.address} <br />
                    {store.phone_number} <br />
                    {store.email}
                  </CardText>
                </CardImgOverlay>
              </div>
            </div>
          </div>
        )}

        <CardImgOverlay>
          {store.photos && (
            <div className="bottomleft">
              <div className="avatar" id="avatar">
                <div className="preview">
                  {" "}
                  <img
                    className="avatar_img"
                    id="avatar-image"
                    alt="logo"
                    src={
                      "http://127.0.0.1:8000/store_images/" +
                      store.photos[0]?.path
                    }
                  />
                  {token.user.user_level === 1 && (
                    <div className="avatar_upload">
                      <label className="upload_label">
                        Upload
                        <input
                          type="file"
                          id="upload"
                          onChange={(e) => onChange(e)}
                        ></input>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardImgOverlay>
      </Card>
      <div className="d-flex justify-content-end me-2" xs="4">
        <EditModal store={store} />
      </div>
    </div>
  );
};

export default StoreCover;
