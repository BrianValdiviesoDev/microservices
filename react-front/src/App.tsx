import axios from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
function App() {
  const socketUrl = import.meta.env.VITE_SOCKETIO_URL;
  const socket = io(socketUrl);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [notifications, setNotifications] = useState<string[]>([]);

  const makeRequest = async (url: string) => {
    console.log('Who are you?');
    const res = await axios.get(url);
    console.log(res.data);
  };

  const sayHello = () => {
    console.log('Hello');
    socket.emit('message', `Hello i am ${import.meta.env.VITE_APP_NAME}`);
  };

  useEffect(() => {
    return () => {
      console.log(`I am ${import.meta.env.VITE_APP_NAME}`);
      if (import.meta.env.VITE_API_URL) {
        makeRequest(import.meta.env.VITE_API_URL);
      }

      socket.on('connect', () => {
        setIsConnected(true);
        sayHello();
      });
      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('notification', (data: string) => {
        notifications.push(data);
        setNotifications([...notifications]);
      });

      socket.on('connect_error', (error: Error) => {
        console.error('Connection error', error);
      });
      socket.on('connect_timeout', (timeout: number) => {
        console.error('Connection timeout', timeout);
      });
    };
  }, []);
  return (
    <>
      <h1>Micro Frontend with React and Vite</h1>
      <h2>APP NAME: {import.meta.env.VITE_APP_NAME}</h2>
      <h2>APP PORT: {import.meta.env.VITE_APP_PORT}</h2>

      <h2>
        SOCKETS: {isConnected ? 'Connected' : `Connection to ${socketUrl} ...`}
      </h2>
      <button onClick={sayHello}>Say hello</button>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
