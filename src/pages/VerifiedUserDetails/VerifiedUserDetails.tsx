import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import "./VerifiedUserDetails.scss";

interface VerifiedUser {
  _id: string;
  name: string;
  profession: string;
  bio: string;
  location: string;
  contact?: string;
  avatar?: string;
}

const VerifiedUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<VerifiedUser | null>(null);

  useEffect(() => {
    api.get(`/verified-users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  if (!user) return <div className="verified-user-details">Loading...</div>;

  return (
    <div className="verified-user-details">
      <div className="header">
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${user.name}&background=random`
          }
          alt={user.name}
        />
        <div className="info">
          <h2>{user.name}</h2>
          <p>{user.profession}</p>
          <p>{user.location}</p>
        </div>
      </div>

      <div className="bio">
        <h4>About</h4>
        <p>{user.bio}</p>
      </div>

      {user.contact && (
        <a
          href={`https://wa.me/${user.contact}`}
          className="contact-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact on WhatsApp
        </a>
      )}
    </div>
  );
};

export default VerifiedUserDetails;
