import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UpdateRole = () => {
  const navigate = useNavigate();
  const { roleName } = useParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `${window.location.origin}/api/v1/roles/${roleName}`
        );

        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
        });

      } catch (err) {
        console.error("FETCH ROLE ERROR:", err);
      }
    };

    if (roleName) {
      fetchRole();
    }
  }, [roleName]);

  const updateRole = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${window.location.origin}/api/v1/roles/${roleName}`,
        {
          name: form.name,
          description: form.description,
          attributes: {},
        }
      );

      setSuccess("Role updated successfully!");

      setTimeout(() => {
        navigate("/console/settings/roles");
      }, 1500);

    } catch (err) {
      console.error("UPDATE ROLE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto p-6 space-y-5">

        <Button
          variant="ghost"
          onClick={() => navigate("/console/settings/roles")}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <h1 className="text-2xl font-bold">
          Update Role
        </h1>

        {success && (
          <p className="text-green-600 text-sm">
            {success}
          </p>
        )}

        <div className="space-y-2">
          <Label>Role Name</Label>

          <Input
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
          <Label>Description</Label>

          <Input
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={updateRole}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Role"}
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              navigate("/console/settings/roles")
            }
          >
            Cancel
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default UpdateRole;