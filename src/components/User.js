import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserActions from "../actions/UserActions";
import utils from "../utils";
import "./css/User.css";

function User(props) {
  const { userData } = props;

  const dispatch = useDispatch();

  const updateUser = () => {
    const data = {
      ...userData,
      name,
      email,
      address,
    };
    dispatch(UserActions.updateUser(data));
  };

  const deleteUser = () => dispatch(UserActions.deleteUser(userData.id));
  const selectUser = () => dispatch(UserActions.selectUser(userData.id));

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [address, setAddress] = useState(userData.address);
  const [userTask, setUserTask] = useState([]);
  const [userPosts, setUserPost] = useState([]);
  const [allTasksCompleted, toggleAllTasksCompleted] = useState(true);
  const [showExtraDetails, toggleShowExtraDetails] = useState(false);

  const selectedUserId = useSelector((state) => state.selectedUserId);

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setAddress(userData.address);
  }, [userData]);

  useEffect(() => {
    (async function () {
      let resp = await utils.getUserTasks(userData.id);
      setUserTask(resp.userTasks);
      if (resp.userTasks.some((task) => task.completed === false)) {
        toggleAllTasksCompleted(false);
      }
      resp = await utils.getUserPosts(userData.id);
      setUserPost(resp);
    })();
  }, [userData.id]);

  const extraDetails = useMemo(() => {
    return showExtraDetails ? (
      <div>
        <div className="userInputs">
          <label>Street:</label>
          <input
            type="text"
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            value={address.street}
          />
        </div>
        <div className="userInputs">
          <label>City:</label>
          <input
            type="text"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            value={address.city}
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            onChange={(e) =>
              setAddress({ ...address, zipcode: e.target.value })
            }
            value={address.zipcode}
          />
        </div>
      </div>
    ) : null;
  }, [address, showExtraDetails]);

  const userSelected = useMemo(() => userData.id === selectedUserId, [
    selectedUserId,
    userData.id,
  ]);

  const hasChange = useMemo(() => {
    return userData.name !== name || userData.email !== email;
  }, [userData.name, userData.email, name, email]);

  const bgColor = useMemo(() => {
    return userSelected ? "orangeBg" : "";
  }, [userSelected]);
  const borderColor = useMemo(
    () => (allTasksCompleted ? "greenBorder" : "redBorder"),
    [allTasksCompleted]
  );

  return (
    <div className={`userDetails ${borderColor} ${bgColor}`}>
      <div>
        <Link to="/todosAndPosts" onClick={selectUser}>
          ID : {userData.id}
        </Link>
      </div>
      <div className="userInputs">
        <label>Name :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="buttonsWrapper">
        <input
          type="button"
          value="Other Data"
          onClick={() => toggleShowExtraDetails(!showExtraDetails)}
          className="btn btn-light"
        />
        <div>
          <input
            type="button"
            value="Update"
            disabled={!hasChange}
            onClick={updateUser}
            className="btn btn-warning"
          />{" "}
          <input
            type="button"
            value="Delete"
            onClick={deleteUser}
            className="btn btn-warning"
          />
        </div>
      </div>

      <div>{extraDetails}</div>
    </div>
  );
}

export default User;
