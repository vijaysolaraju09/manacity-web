import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import "./EventDetails.scss";

interface Event {
  _id: string;
  name: string;
  image?: string;
  category: string;
  location: string;
  date: string;
  description: string;
  adminNote?: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => {
      setEvent(res.data);
      startCountdown(res.data.date);
    });
  }, [id]);

  const startCountdown = (eventDate: string) => {
    const interval = setInterval(() => {
      const distance = new Date(eventDate).getTime() - Date.now();
      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Started");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((distance / (1000 * 60)) % 60);
        setCountdown(`${days}d ${hrs}h ${mins}m`);
      }
    }, 1000);
  };

  if (!event) return <div className="event-details">Loading...</div>;

  return (
    <div className="event-details">
      <img
        src={event.image || "https://via.placeholder.com/600x300?text=Event"}
        alt={event.name}
        className="event-img"
      />
      <div className="info">
        <h1>{event.name}</h1>
        <p className="meta">
          {event.category} • {event.location}
        </p>
        <p className="countdown">Starts in: {countdown}</p>
        <p className="description">{event.description}</p>

        {event.adminNote && (
          <div className="admin-note">
            <strong>Admin Note:</strong> {event.adminNote}
          </div>
        )}

        <button className="register-btn">Register Now</button>
      </div>
    </div>
  );
};

export default EventDetails;
