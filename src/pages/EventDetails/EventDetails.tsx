import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/client";
import { sampleEvent } from "../../data/sampleData";
import "./EventDetails.scss";

interface Event {
  _id: string;
  name: string;
  image?: string;
  category: string;
  location: string;
  startDate?: string;
  date?: string;
  description: string;
  adminNote?: string;
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<Array<{ userId: string; name: string; score: number }>>([]);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        if (res.data) {
          setEvent(res.data);
          startCountdown(res.data.startDate || res.data.date);
        } else {
          setEvent(sampleEvent);
          startCountdown(sampleEvent.startDate || sampleEvent.date);
        }
      })
      .catch(() => {
        setEvent(sampleEvent);
        startCountdown(sampleEvent.startDate || sampleEvent.date);
      });

    api
      .get(`/events/${id}/leaderboard`)
      .then((res) => {
        if (Array.isArray(res.data)) setLeaderboard(res.data);
      })
      .catch(() => setLeaderboard([]));
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

  const handleRegister = () => {
    api
      .post("/events/register", { eventId: id })
      .then(() => {
        setRegistered(true);
        setMessage("Registered successfully!");
      })
      .catch(() => setMessage("Registration failed"));
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

        <button className="register-btn" onClick={handleRegister} disabled={registered}>
          {registered ? "Registered" : "Register Now"}
        </button>

        {message && <p className="message">{message}</p>}

        {leaderboard.length > 0 && (
          <div className="leaderboard">
            <h3>Leaderboard</h3>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr key={entry.userId} className={i < 3 ? "winner" : ""}>
                    <td>{i + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
