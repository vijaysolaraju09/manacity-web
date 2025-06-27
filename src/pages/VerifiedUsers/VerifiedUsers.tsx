import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { sampleVerifiedUsers } from "../../data/sampleHomeData";
import "./VerifiedUsers.scss";
import fallbackImage from "../../assets/no-image.svg";

interface VerifiedUser {
  _id: string;
  name: string;
  profession?: string;
  image?: string;
}

import Shimmer from "../../components/Shimmer";

const VerifiedUsers = () => {
  const [users, setUsers] = useState<VerifiedUser[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      })
      .catch(() => {
        setUsers(sampleVerifiedUsers);
        setLoading(false);
      });
  }, []);

  return (
    <div className="verified-users">
      <h2>Verified Users</h2>
      <div className="user-list">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="user-card">
                <Shimmer className="rounded" style={{ height: 140 }} />
                <Shimmer style={{ height: 16, marginTop: 8, width: "60%" }} />
              </div>
            ))
          : users.map((user) => (
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
                  onError={(e) => (e.currentTarget.src = fallbackImage)}
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
