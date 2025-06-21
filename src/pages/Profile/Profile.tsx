import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { motion } from "framer-motion";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    location: user.location,
    address: user.address || "",
  });
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyForm, setVerifyForm] = useState({ profession: "", bio: "" });
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [businessForm, setBusinessForm] = useState({
    name: "",
    category: "",
    location: "",
    address: "",
  });

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessForm({ ...businessForm, [name]: value });
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to request business/shop
    alert("Business request submitted!");
    setShowBusinessModal(false);
  };

  const handleVerifyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVerifyForm({ ...verifyForm, [name]: value });
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to submit verification request
    alert("Verification request submitted!");
    setShowVerifyModal(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to update profile
    alert("Profile updated!");
    setShowEdit(false);
  };

  return (
    <div className="profile">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="avatar">{user.name[0].toUpperCase()}</div>

        <h2>{user.name}</h2>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Location:</strong> {user.location}
        </p>
        <p>
          <strong>Address:</strong> {user.address || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <div className="actions">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowEdit(true)}
          >
            Edit Profile
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowVerifyModal(true)}
          >
            Request Verification
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowBusinessModal(true)}
          >
            Request Business Access
          </motion.button>

          <motion.button
            className="logout"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {showEdit && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />
              </label>

              <label>
                Location
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  required
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                />
              </label>

              <div className="modal-actions">
                <button type="submit">Save</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showVerifyModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Request Verification</h3>
            <form onSubmit={handleVerifySubmit} className="edit-form">
              <label>
                Profession
                <input
                  type="text"
                  name="profession"
                  value={verifyForm.profession}
                  onChange={handleVerifyChange}
                  required
                />
              </label>

              <label>
                Bio
                <textarea
                  name="bio"
                  rows={4}
                  value={verifyForm.bio}
                  onChange={handleVerifyChange}
                  required
                />
              </label>

              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowVerifyModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showBusinessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Request Business Access</h3>
            <form onSubmit={handleBusinessSubmit} className="edit-form">
              <label>
                Business Name
                <input
                  type="text"
                  name="name"
                  value={businessForm.name}
                  onChange={handleBusinessChange}
                  required
                />
              </label>

              <label>
                Category
                <input
                  type="text"
                  name="category"
                  value={businessForm.category}
                  onChange={handleBusinessChange}
                  required
                />
              </label>

              <label>
                Location
                <input
                  type="text"
                  name="location"
                  value={businessForm.location}
                  onChange={handleBusinessChange}
                  required
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  name="address"
                  value={businessForm.address}
                  onChange={handleBusinessChange}
                  required
                />
              </label>

              <div className="modal-actions">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowBusinessModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
