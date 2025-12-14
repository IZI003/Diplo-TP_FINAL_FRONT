import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { UseUsers } from "../Context/UserContext";

export default function UserEdit() {
  const { id } = useParams();
  const { users, updateUser } = UseUsers();

  const existing = users.find(u => u._id === id);

  const [user, setUser] = useState(existing || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
  };

  useEffect(() => {
    if (existing) setUser(existing);
  }, [existing]);

  return <UserForm user={user} setUser={setUser} onSubmit={handleSubmit} />;
}
