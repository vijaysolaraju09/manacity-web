import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { sampleVerifiedUsers } from "../../data/sampleHomeData";
import "./VerifiedUsers.scss";

interface VerifiedUser {
  _id: string;
  name: string;
  profession?: string;
  image?: string;
}

const VerifiedUsers = () => {
  const [users, setUsers] = useState<VerifiedUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/verified-users")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setUsers(res.data);
        } else {
          setUsers(sampleVerifiedUsers);
        }
      })
      .catch(() => setUsers(sampleVerifiedUsers));
  }, []);

  return (
    <div className="verified-users">
      <h2>Verified Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user._id}
            className="user-card"
            onClick={() => navigate(`/verified-users/${user._id}`)}
          >
            <img
              src={
                user.image ||
                `https://ui-avatars.com/api/?name=${user.name}&background=random`
              }
              alt={user.name}
            />
            <h3>{user.name}</h3>
            {user.profession && <p>{user.profession}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedUsers;
