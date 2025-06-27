import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { sampleEvents } from "../../data/sampleHomeData";
import "./Events.scss";

interface EventItem {
  _id: string;
  title?: string;
  name?: string;
  category?: string;
  startDate?: string;
  date?: string;
  status?: string;
  banner?: string;
  image?: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setEvents(res.data);
        } else {
          setEvents(sampleEvents);
        }
      })
      .catch(() => setEvents(sampleEvents));
  }, []);

  const getCountdown = (date: string) => {
    const diff = new Date(date).getTime() - Date.now();
    if (diff <= 0) return "Started";
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${d}d ${h}h`;
  };

  return (
    <div className="events">
      <h2>Events & Tournaments</h2>
      <div className="event-list">
        {events.map((ev) => {
          const date = ev.startDate || ev.date || "";
          return (
            <div
              key={ev._id}
              className="event-card"
              onClick={() => navigate(`/events/${ev._id}`)}
            >
              <img
                src={ev.banner || ev.image || "https://via.placeholder.com/300x200?text=Event"}
                alt={ev.title || ev.name}
              />
              <h3>{ev.title || ev.name}</h3>
              {ev.category && <p className="cat">{ev.category}</p>}
              {date && <p className="time">{getCountdown(date)}</p>}
              {ev.status && <span className={`status ${ev.status}`}>{ev.status}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
