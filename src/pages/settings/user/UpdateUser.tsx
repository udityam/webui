import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UpdateUser = () => {

  const navigate = useNavigate();
  const { userId } = useParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
  firstname: "",
  lastname: "",
  email: "",
  enabled: true,
  });

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(
       `${window.location.origin}/api/v1/users/${userId}`
        );

        setForm({
        firstname: res.data.firstname || "",
        lastname: res.data.lastname || "",
        email: res.data.email || "",
        enabled: res.data.enabled ?? true,
        });
      } catch (err) {
        console.error("FETCH USER ERROR:", err);
      }
    };

    if (userId) {
      fetchUser();
    }

  }, [userId]);

  const updateUser = async () => {

    try {

      setLoading(true);

      await axios.put(
        `${window.location.origin}/api/v1/users/${userId}`,
        {
          email: form.email,
          firstname: form.firstname,
          lastname: form.lastname,
          enabled: form.enabled,
        }
      );

      setSuccess("User updated successfully!");

      setTimeout(() => {
        navigate("/console/settings/users");
      }, 1500);

    } catch (err) {

      console.error(
        "UPDATE USER ERROR:",
        err
      );

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
          Update User
        </h1>

        {success && (
          <p className="text-green-600 text-sm">
            {success}
          </p>
        )}

        <div className="space-y-2">

  <Label>First Name</Label>

  <Input
    placeholder="First Name"
    value={form.firstname}
    onChange={(e) =>
      setForm({
        ...form,
        firstname: e.target.value,
      })
    }
  />

</div>

<div className="space-y-2">

  <Label>Last Name</Label>

  <Input
    placeholder="Last Name"
    value={form.lastname}
    onChange={(e) =>
      setForm({
        ...form,
        lastname: e.target.value,
      })
    }
  />

</div>

        <div className="space-y-2">

          <Label>Email</Label>

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

        </div>

        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              setForm({
                ...form,
                enabled: e.target.checked,
              })
            }
          />

          <Label>Enabled</Label>

        </div>

        <div className="flex gap-3">

          <Button
            onClick={updateUser}
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update User"}
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              navigate("/console/settings/users")
            }
          >
            Cancel
          </Button>

        </div>

      </Card>

    </div>
  );
};

export default UpdateUser;