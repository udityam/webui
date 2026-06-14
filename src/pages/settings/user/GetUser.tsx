import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GetUser = () => {

  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(
          `${window.location.origin}/api/v1/users/${userId}`
        );

        setUser(res.data);

      } catch (err) {

        console.error(err);

      }
    };

    if (userId) {
      fetchUser();
    }

  }, [userId]);

  if (!user) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <Card className="max-w-3xl mx-auto p-8 shadow-lg rounded-2xl">

        <Button
          variant="ghost"
          onClick={() => navigate("/console/settings/users")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">
          User Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Username
            </p>
            <p className="font-semibold text-lg">
              {user?.username || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>
            <p className="font-semibold text-lg">
              {user?.email || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              First Name
            </p>
            <p className="font-semibold text-lg">
              {user?.firstname || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Last Name
            </p>
            <p className="font-semibold text-lg">
              {user?.lastname || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Roles
            </p>
            <p className="font-semibold text-lg">
              {user?.roles?.join(", ") || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <Badge
              variant="outline"
              className={
                user?.enabled
                  ? "text-green-600 border-green-600"
                  : "text-red-600 border-red-600"
              }
            >
              {user?.enabled ? "Enabled" : "Disabled"}
            </Badge>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default GetUser;