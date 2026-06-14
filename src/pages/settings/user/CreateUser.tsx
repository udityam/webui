import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
const CreateUser = () => {

  const navigate = useNavigate();

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    roles: "viewer",
  });

  const createUser = async () => {

    try {

      setLoading(true);

      const [firstName, lastName] = form.name.split(" ");

      await axios.post(`${window.location.origin}/api/v1/users`, {
        username: form.username,
        email: form.email,
        firstname: firstName || "",
        lastname: lastName || "",
        password: form.password,
        temporary_password: true,
        roles: [form.roles],
      });
      setSuccess("User created successfully!");

      setTimeout(() => {
        navigate("/console/settings/users");
      }, 1500);

    } catch (err: any) {

      console.log(
        "CREATE USER ERROR:",
        err.response?.data
      );

      console.error(err);
    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-6">

      <Card className="max-w-2xl mx-auto p-6 space-y-5">
        <Button
          variant="ghost"
          onClick={() => navigate("/console/settings/users")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <h1 className="text-2xl font-bold">
          Create User
        </h1>
        {success && (
          <p className="text-green-600 text-sm mb-3">
            {success}
          </p>
        )}

        <div className="space-y-2">

          <Label>Username</Label>

          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>Name</Label>

          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>Email</Label>

          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>Password</Label>

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

        </div>

        <div className="space-y-2">

          <Label>Role</Label>

          <Input
            placeholder="viewer"
            value={form.roles}
            onChange={(e) =>
              setForm({
                ...form,
                roles: e.target.value,
              })
            }
          />

        </div>

        <div className="flex gap-3">

          <Button
            onClick={createUser}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create User"}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/console/settings/users")}
          >
            Cancel
          </Button>

        </div>

      </Card>

    </div>
  );
};

export default CreateUser;