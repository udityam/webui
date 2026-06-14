import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateRole = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const createRole = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${window.location.origin}/api/v1/roles`,
        {
          name: form.name,
          description: form.description,
          composite: false,
          clientRole: false,
          attributes: {},
        }
      );

      setSuccess("Role created successfully!");

      setTimeout(() => {
        navigate("/console/settings/roles");
      }, 1500);

    } catch (err) {
      console.error("CREATE ROLE ERROR:", err);
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
          Create Role
        </h1>

        {success && (
          <p className="text-green-600 text-sm">
            {success}
          </p>
        )}

        <div className="space-y-2">
          <Label>Role Name</Label>

          <Input
            placeholder="Role Name"
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
            placeholder="Description"
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
            onClick={createRole}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Role"}
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

export default CreateRole;